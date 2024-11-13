/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

let currentlyOpenPopUp = null; // Track the currently open popup

const getWebsiteLanguage = () => {
  const htmlElement = document.documentElement;
  return htmlElement.lang || navigator.language || "en";
};

//getting all nodes from the currently open website and from their dom

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
  console.log(textNodes);
  return textNodes;
};

// detected node and its children

const highlightNode = (node, text) => {
  const span = document.createElement("div");
  const editBtn = document.createElement("button");

  // div styling
  span.style.cssText = `
    background-color: transparent;
    color: #ffffff;
    border: 1px solid red;
    position: relative;
    padding: 6px 6px;
  `;

  // edit button styling
  editBtn.textContent = "Edit";
  editBtn.style.cssText = `
    background-color: transparent;
    color: #ffffff;
    border: 1px solid #008000;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 6px;
    z-index: 9999;
    padding: 0px 5px;
    cursor: pointer;
  `;
  span.appendChild(editBtn);

  // Create the popUp and add to the span
  const popUp = document.createElement("div");
  popUp.id = "popUp";
  popUp.className = "pop-up";
  popUp.innerHTML = `
    <p style="color:white; font-size:14px; font-weight:500;">${text}</p>
    <button class="translate-btn">Translate</button>
  `;
  popUp.style.display = "none";
  span.appendChild(popUp);

  // Add event listener to the edit button
  editBtn.addEventListener("click", () => {
    // Close any currently open popup
    if (currentlyOpenPopUp && currentlyOpenPopUp !== popUp) {
      currentlyOpenPopUp.style.display = "none";
      currentlyOpenPopUp.classList.remove("active");
    }

    // Toggle the display of the current popup
    popUp.classList.toggle("active");
    popUp.style.display = popUp.classList.contains("active") ? "block" : "none";

    // Update the currently open popup reference
    currentlyOpenPopUp = popUp.classList.contains("active") ? popUp : null;

    // Popup styling when active
    if (popUp.classList.contains("active")) {
      popUp.style.cssText += `
        position: absolute;
        top:28px;
        right:-151px;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #045b42;
        height: 150px;
        width: 150px;
        border:1px solid black;
        border-radius:8px;
        z-index: 1000;
      `;
    }
  });

  node.parentNode.insertBefore(span, node);
  span.appendChild(node);

  return span;
};

// Detect untranslated content and highlight it

const detectUntranslatedContent = async () => {
  const translations = await new Promise((resolve) => {
    chrome.storage.sync.get("translations", (data) => {
      resolve(data.translations || {});
    });
  });

  const textNodes = getTextNodes();
  const untranslatedTexts = [];

  textNodes.forEach((node) => {
    console.log(node);
    const text = node.textContent.trim();
    if (!translations[text]) {
      const highlightedNode = highlightNode(node, text);
      untranslatedTexts.push({ text, element: highlightedNode });
    }
  });

  //send the message to the background.js file

  chrome.runtime.sendMessage({
    action: "foundUntranslatedText",
    untranslatedTexts,
  });
};

//receive the message from app.js and according to the message call a function
chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "detectUntranslated") {
    detectUntranslatedContent();
  }
});
