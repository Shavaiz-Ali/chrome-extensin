/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

let currentlyOpenPopUp = null; // Track the currently open popup

// Get the website's language from the `lang` attribute or the browser's language
const getWebsiteLanguage = () => {
  const htmlElement = document.documentElement;
  return htmlElement.lang || navigator.language || "en";
};

// Get all text nodes from the DOM, excluding script and style tags
const getTextNodes = () => {
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        const isValidText = node.textContent.trim().length > 0;
        const isInValidElement = !["SCRIPT", "STYLE"].includes(
          node.parentElement.tagName
        );
        return isValidText && isInValidElement
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      },
    }
  );

  const textNodes = [];
  let node;
  while ((node = walker.nextNode())) {
    textNodes.push(node);
  }
  return textNodes;
};

// API call to translate and update translations
const Translate = async (text, translatedText) => {
  console.log(text, translatedText);
  try {
    console.log("Text to be translated:", text);
    const response = await fetch(
      "http://localhost:5000/api/transltions/update-translations/673b0419554d6a6957f320f1",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          translatedText,
        }),
      }
    );

    if (response?.status === 200) {
      console.log("success");
      const tabs = await chrome?.tabs?.query({
        active: true,
        currentWindow: true,
      });
      if (tabs?.[0]?.id) {
        console.log(tabs);
        chrome?.tabs?.sendMessage(tabs[0].id, {
          action: "updateChromeStorage",
          // translations,
        });
      }
    }

    if (!response.ok) {
      console.error("Translation failed:", response.statusText);
      throw new Error("Translation failed");
    }

    console.log("Translation success:", await response.json());
  } catch (error) {
    console.error("Error during translation:", error);
  }
};

// Highlight the detected untranslated text and add translation popup
const highlightNode = (node, text) => {
  const span = document.createElement("div");
  const editBtn = document.createElement("button");

  // Div styling
  span.style.cssText = `
    background-color: #045b42;
    color: #ffffff;
    border: 1px solid white;
    position: relative;
    padding: 6px 6px;
  `;

  // Edit button styling
  editBtn.textContent = "Edit";
  editBtn.style.cssText = `
    background-color: #045b42;
    color: #ffffff;
    border: 1px solid white;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 6px;
    z-index: 999999999999 !important;
    padding: 0px 5px;
    cursor: pointer;
  `;
  span.appendChild(editBtn);

  // Create the popup and add it to the span
  const popUp = document.createElement("div");
  popUp.className = "pop-up";
  popUp.innerHTML = `
    <p style="color:white; font-size:14px !important; font-weight:500 !important; text-align:center;">
      ${text}
    </p>
    <input type="text" placeholder="Enter your translation" class="translation-input" style="
      width: 136px;
      height: 30px;
      border: 1px solid black;
      background-color: white;
      color: black;
      font-size: 14px;
      font-weight: semibold;
      margin: 5px 0; 
      border-radius: 4px;"/>
    <button class="translate-btn" style="
      background-color: white;
      color: black;
      padding: 2px 20px !important; 
      border-radius: 3px !important;">
      Translate
    </button>
  `;
  popUp.style.display = "none";
  span.appendChild(popUp);

  // Add click listener to the edit button
  editBtn.addEventListener("click", () => {
    if (currentlyOpenPopUp && currentlyOpenPopUp !== popUp) {
      currentlyOpenPopUp.style.display = "none";
      currentlyOpenPopUp.classList.remove("active");
    }

    popUp.classList.toggle("active");
    popUp.style.display = popUp.classList.contains("active") ? "block" : "none";
    currentlyOpenPopUp = popUp.classList.contains("active") ? popUp : null;

    if (popUp.classList.contains("active")) {
      popUp.style.cssText += `
        position: absolute;
        top: 28px;
        right: -151px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #045b42;
        height: 150px !important;
        width: 150px !important;
        border: 1px solid black;
        border-radius: 8px;
        z-index: 9999999999999999999999999 !important;
      `;
    }

    const translateBtn = popUp.querySelector(".translate-btn");
    translateBtn.addEventListener("click", () => {
      const translationInput = popUp.querySelector(".translation-input");
      const translatedText = translationInput.value.trim();

      if (translatedText) {
        Translate(text, translatedText);
      } else {
        alert("Please enter a valid translation!");
      }
    });
  });

  node.parentNode.insertBefore(span, node);
  span.appendChild(node);

  return span;
};

// Detect untranslated content and highlight it
const detectUntranslatedContent = async (targetLanguage) => {
  const translations = await new Promise((resolve) => {
    chrome.storage.sync.get("translations", (data) => {
      resolve(data.translations || {});
    });
  });

  const textNodes = getTextNodes();
  const untranslatedTexts = [];

  textNodes.forEach((node) => {
    const text = node.textContent.trim();
    const sanitizedKey = text.replace(/\./g, "").replace(/\d/g, "");
    if (
      !translations[targetLanguage] ||
      Object.keys(translations[targetLanguage]).length === 0
    ) {
      console.log(`No translations found for ${targetLanguage}`);
      return;
    }

    const languageBaseJson = translations[targetLanguage];

    console.log(languageBaseJson);

    if (!languageBaseJson[sanitizedKey]) {
      const highlightedNode = highlightNode(node, text);
      untranslatedTexts.push({ text, element: highlightedNode });
    }
  });

  chrome.runtime.sendMessage({
    action: "foundUntranslatedText",
    untranslatedTexts,
  });
};

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "detectUntranslated") {
    const targetLanguage = request.language;
    detectUntranslatedContent(targetLanguage);
  }
});
