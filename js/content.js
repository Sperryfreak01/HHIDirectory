// Send a message containing the page details back to the event page
chrome.runtime.sendMessage({
    'First': document.title,
    'Last': window.location.href,
    'Extension': window.getSelection().toString()
});