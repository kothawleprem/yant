// chrome.runtime.sendMessage('I am loading content script', (response) => {
//     console.log(response);
//     console.log('I am content script')

// })

// window.onload = (event) => {
//     console.log('page is fully loaded');
// };

document.addEventListener("selectionchange", function () {
  let selectedText = document.getSelection().toString();
  console.log(selectedText);
  chrome.runtime.sendMessage({ type: "selectedText", data: selectedText });
});