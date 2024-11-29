export const getWebsiteLanguage = () => {
  const htmlElement = document.documentElement;
  return htmlElement.lang || navigator.language || "en";
};

export const getTextNodes = () => {
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
