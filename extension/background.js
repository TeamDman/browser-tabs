chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed");
});

// Function to list all open tabs
chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
        console.log(`Tab ID: ${tab.id}, Title: ${tab.title}, URL: ${tab.url}`);
    });
});
