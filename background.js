chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
  console.log(details)
  if (!details.url.includes("atlassian.net/secure/RapidBoard.jspa")) {
    return
  }
  if (details.url.includes("modal")) {
    return
  }
  chrome.tabs.executeScript(null, { file: "sumEstimates.js" });
});
