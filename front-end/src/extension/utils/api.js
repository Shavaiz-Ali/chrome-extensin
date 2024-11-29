/* eslint-disable no-undef */
export const translateText = async (text, translatedText) => {
  console.log(text, translatedText);

  try {
    const response = await fetch(
      "http://localhost:5000/api/transltions/update-translations/673b0419554d6a6957f320f1",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, translatedText }),
      }
    );

    if (response?.ok) {
      console.log("Translation success:", await response.json());
      const tabs = await chrome?.tabs?.query({
        active: true,
        currentWindow: true,
      });

      if (tabs?.[0]?.id) {
        chrome?.tabs?.sendMessage(tabs[0].id, {
          action: "updateChromeStorage",
        });
      }
    } else {
      console.error("Translation failed:", response.statusText);
      throw new Error("Translation failed");
    }
  } catch (error) {
    console.error("Error during translation:", error);
  }
};
