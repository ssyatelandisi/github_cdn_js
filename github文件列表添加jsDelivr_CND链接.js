// ==UserScript==
// @name         github文件列表添加jsDelivr CND链接
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  github文件列表添加jsDelivr CND链接
// @author       ssyatelandisi
// @match        *://github.com/*
// @grant        none
// ==/UserScript==

(function () {
  const TMP_els = document.querySelectorAll(
    "#repo-content-pjax-container > div > div.gutter-condensed.gutter-lg.flex-column.flex-md-row.d-flex > div.flex-shrink-0.col-12.col-md-9.mb-4.mb-md-0 > div.Box.mb-3 > div.js-details-container.Details > div.Details-content--hidden-not-important.js-navigation-container.js-active-navigation-container.d-md-block > div > div.flex-auto.min-width-0.col-md-2.mr-3"
  );
  for (let el of TMP_els) {
    let github_url = el
      .getElementsByTagName("span")[0]
      .getElementsByTagName("a")[0]
      .getAttribute("href");
    const reg =
      "^(https://github.com|http://github.com)?/(.+?)/(.+?)/blob/(.+?)/(.*)$";
    let r = github_url.match(reg);
    if (r) {
      let jsdelivr_cdn_url = `https://cdn.jsdelivr.net/gh/${r[2]}/${r[3]}@${r[4]}/${r[5]}`;
      let a = document.createElement("a");
      a.innerHTML = `🚩jsDelivr CDN`;
      a.setAttribute("href", jsdelivr_cdn_url);
      a.setAttribute("target", "_blank");
      a.setAttribute("style", "color:#ff5627;background-color:#eee;");
      el.getElementsByTagName("span")[0].appendChild(a);
    }
  }
})();
