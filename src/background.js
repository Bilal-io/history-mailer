'use strict';
import * as dayjs from 'dayjs'

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GET_HISTORY') {
    const query = {
      maxResults: 300,
      text: '',
    }
    chrome.history.search(
      query,
      results => {
        // process
        const objectUrl = processHistory(results);
        sendResponse(objectUrl);

        // send email
      }
    )
  }

  return true; // Inform Chrome that we will make a delayed sendResponse
});


function processHistory(history) {
  // convert to csv
  const csv = [];
  csv.push(['url', 'title', 'visitCount', 'lastVisitTime']);
  history.forEach(item => {
    csv.push([item.url, JSON.stringify(item.title), item.visitCount, dayjs(item.lastVisitTime).format('YYYY-MM-DD at HH:mm')].join(','));
  });
  return csv.join('\n');
}
