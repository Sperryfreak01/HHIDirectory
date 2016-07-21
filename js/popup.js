// This callback function is called when the content script has been 
// injected and returned its results
function onPageDetailsReceived(pageDetails)  { 
    document.getElementById('First').value = pageDetails.First; 
    document.getElementById('Last').value = pageDetails.Last; 
    document.getElementById('Extension').innerText = pageDetails.Extension; 
}

// Global reference to the status display SPAN
var statusDisplay = null;

// POST the data to the server using XMLHttpRequest
function addBookmark() {
    var jqxhr = $.get( "https://lkftcmp01.ad.spectrumhhi.com:8443", { First: "John"}, function() {
        alert( "success" );

    })
    .done(function() {
        alert( "second success" );
        console.log("stuff");
    })
    .fail(function() {
        alert( "error" );
    });
    }



// When the popup HTML has loaded
window.addEventListener('load', function(evt) {
    // Cache a reference to the status display SPAN
    statusDisplay = document.getElementById('status-display');
    // Handle the bookmark form submit event with our addBookmark function
    document.getElementById('addbookmark').addEventListener('submit', addBookmark);
    // Get the event page
    chrome.runtime.getBackgroundPage(function(eventPage) {
        // Call the getPageInfo function in the event page, passing in 
        // our onPageDetailsReceived function as the callback. This injects 
        // content.js into the current tab's HTML
        eventPage.getPageDetails(onPageDetailsReceived);
    });
});