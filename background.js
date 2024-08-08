chrome.runtime.onInstalled.addListener(() => {
    console.log("Bookmark Exporter extension installed");
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'exportBookmarks') {
      chrome.bookmarks.getTree((bookmarkTreeNodes) => {
        const bookmarks = [];
        const traverseBookmarks = (nodes) => {
          for (let node of nodes) {
            if (node.url) {
              bookmarks.push(node.url);
            }
            if (node.children) {
              traverseBookmarks(node.children);
            }
          }
        };
        traverseBookmarks(bookmarkTreeNodes);
  
        try {
        //   const blob = new Blob([bookmarks.join('\n')], { type: 'text/plain' });
        
  
          chrome.downloads.download({
            url: bookmarks.join('\n'),
            filename: 'bookmarks.txt'
          }, (downloadId) => {
            if (chrome.runtime.lastError) {
              sendResponse({ success: false, error: chrome.runtime.lastError.message });
            } else {
              sendResponse({ success: true, downloadId: downloadId });
            }
          });
        } catch (error) {
          console.error('Failed to create download URL:', error);
          sendResponse({ success: false, error: error.message });
        }
      });
  
      // Return true to indicate you want to send a response asynchronously
      return true;
    }
  });
  