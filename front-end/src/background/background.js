/* eslint-disable no-undef */

const fetchTranslations = async () => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/transltions/get-translations`,
      {
        method: "GET",
      }
    );

    const results = await response.json();
    console.log(results);
    if (results.status === 200) {
      return results.translations[0].translations;
    }
  } catch (error) {
    console.log(error);
  }
};

chrome.runtime.onInstalled.addListener(async () => {
  console.log("Background script installed and running");

  const translations = await fetchTranslations();
  console.log(translations);

  // Save lang.json data into Chrome storage
  chrome.storage.sync.set({ translations: translations }, () => {
    console.log("Translations loaded and stored in Chrome storage.");
  });
});

// // Function to load translations from JSON stored in chrome storage
// async function getTranslations() {
//   return new Promise((resolve) => {
//     chrome.storage.sync.get("translations", (data) => {
//       resolve(data.translations || {});
//     });
//   });

// Listen for messages from content or popup script
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  console.log(request);
  if (request.action === "updateChromeStorage") {
    await fetchTranslations();
  } else {
    sendResponse({ error: "Translation failed" });
  }
  return true;
});
