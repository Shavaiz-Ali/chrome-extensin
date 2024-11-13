/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const getWebsiteLanguage = () => {
  const htmlElement = document.documentElement;
  return htmlElement.lang || navigator.language || "en";
};

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

const highlightNode = (node) => {
  const span = document.createElement("span");
  span.style.backgroundColor = "#008000";
  span.style.color = "#ffffff";
  span.style.border = "1px solid #ffffff";
  node.parentNode.insertBefore(span, node);
  span.appendChild(node);
  return span;
};

const detectUntranslatedContent = async () => {
  const translations = await new Promise((resolve) => {
    chrome.storage.sync.get("translations", (data) => {
      resolve(data.translations || {});
    });
  });

  const textNodes = getTextNodes();
  const untranslatedTexts = [];

  textNodes.forEach((node) => {
    const text = node.textContent.trim();
    if (!translations[text]) {
      const highlightedNode = highlightNode(node);
      untranslatedTexts.push({ text, element: highlightedNode });
    }
  });

  chrome.runtime.sendMessage({
    action: "foundUntranslatedText",
    untranslatedTexts,
  });
};

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "detectUntranslated") {
    detectUntranslatedContent();
  }
});
