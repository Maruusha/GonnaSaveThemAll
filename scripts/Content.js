async function sendMessageToActiveTab(message) {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    // TODO: Do something with the response.

    var unorderedList = document.getElementById("list_of_url");
    var currentURLTextHolder = document.getElementById("current_url");
    let currentUrlText = chrome.tabs.url
    console.log(message)
    console.log(currentUrlText);
    console.log(tab);

}