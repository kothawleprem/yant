chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "logToConsole",
    title: "Log selected text to console",
    contexts: ["selection"],
  });
});

let clipboard: string | undefined;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "selectedText") {
    clipboard = request.data;
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "logToConsole") {
    console.log("clicked", clipboard);
    chrome.storage.local.get(["activeTopic", "activeToken"], (result) => {
     const activeTopic = result.activeTopic || -1; // Set default value if not found
     const activeToken = result.activeToken || -1; // Set default value if not found
     console.log("Active retrieved:", activeTopic, activeToken);

     // Call API to store the data with token as auth
     const body_data = {
       topic: activeTopic,
       content: clipboard,
     };

     fetch("http://127.0.0.1:8000/api/data/notes/", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         Authorization: `Token ${activeToken}`,
       },
       body: JSON.stringify(body_data),
     })
       .then((response) => {
         if (!response.ok) {
           throw new Error("Failed to fetch data");
         }
         return response.json();
       })
       .then((data) => {
         // Handle the response data
         console.log("Data fetched successfully:", data);
       })
       .catch((error) => {
         console.error("Error fetching data:", error);
       });
   });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("listening")
  if (message.type === "updateActiveTopic") {
    const { topicId } = message;
    chrome.storage.local.set({ activeTopic: topicId }, () => {
      if (chrome.runtime.lastError) {
        console.error(
          "Error saving active topic to storage:",
          chrome.runtime.lastError.message
        );
      } else {
        console.log("Active topic saved successfully");
      }
    });
  }

  if (message.type === "updateActiveToken") {
    const { token } = message;
    console.log("updating active token", token);
    chrome.storage.local.set({ activeToken: token }, () => {
      if (chrome.runtime.lastError) {
        console.error(
          "Error saving active topic to storage:",
          chrome.runtime.lastError.message
        );
      } else {
        console.log("Active topic saved successfully");
      }
    });
  }
});
