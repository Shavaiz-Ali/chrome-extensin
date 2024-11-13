/* eslint-disable no-undef */
chrome.runtime.onInstalled.addListener(async () => {
  console.log("Background script installed and running");

  // Load lang.json
  const langJsonUrl = chrome.runtime.getURL("lang.json");
  const response = await fetch(langJsonUrl);
  const langJson = await response.json();

  // Save lang.json data into Chrome storage
  chrome.storage.sync.set({ translations: langJson }, () => {
    console.log("Translations loaded and stored in Chrome storage.");
  });
});

// Function to load translations from JSON stored in chrome storage
async function getTranslations() {
  return new Promise((resolve) => {
    chrome.storage.sync.get("translations", (data) => {
      resolve(data.translations || {});
    });
  });
}

// Function to save translations back to JSON in chrome storage
// async function saveTranslations(translations) {
//   chrome.storage.sync.set({ translations });
// }

// Function to fetch translation from an API
async function fetchTranslation(text, targetLanguage) {
  console.log("translate api hit successfully", text, targetLanguage);
  try {
    const url = `https://free-google-translator.p.rapidapi.com/external-api/free-google-translator?from=en&to=${targetLanguage}&query=${text}`;
    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": "c12f85e2f8msh5cca653a58d801fp15981ejsn9271b771e623",
        "x-rapidapi-host": "free-google-translator.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: {
        translate: "rapidapi",
      },
    };
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    return result.translation;
  } catch (error) {
    console.error("Error fetching translation:", error);
    return null;
  }
}

// Listen for messages from content or popup script
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  console.log(request);
  if (request.action === "translateText") {
    const translations = await getTranslations();
    const translation = await fetchTranslation(
      request.text,
      request.targetLanguage
    );

    if (translation) {
      const updatedTranslations = {
        ...translations,
        [request?.text]: translation,
      };

      await chrome.storage.sync.set({ translations: updatedTranslations });
    } else {
      sendResponse({ error: "Translation failed" });
    }
  }
  return true;
});
