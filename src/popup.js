"use strict";
import * as dayjs from 'dayjs'

import "./popup.css";

(function() {
  function downloadHistory() {
    chrome.runtime.sendMessage(
      {
        type: "GET_HISTORY",
      },
      (response) => {
        downloadFile(response);
      }
    );
    return true;
  }

  function setup() {
    document.querySelector("#download").addEventListener("click", () => {
      downloadHistory();
    });
  }

  document.addEventListener("DOMContentLoaded", setup);
})();

function convertToObjectUrl(csv) {
  return URL.createObjectURL(new Blob(['\uFEFF' + csv], { type: "text/csv;charset=utf-8" }));
}

function downloadFile(csv) {
  // convert csv string to object url
  const objectUrl = convertToObjectUrl(csv);
  // create a link
  const link = document.createElement("a");
  // set the link href
  link.href = objectUrl;
  // set the file name
  link.download = `${dayjs().format('YYYY-MM-DD-HH:mm')}-history.csv`;

  // append link to document, click it, then remove it
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
