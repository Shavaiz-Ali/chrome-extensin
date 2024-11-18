/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useState, useEffect } from "react";
// import { translateText } from "../services/translationService";
import { storage } from "../utils/chrome";

export const useTranslations = () => {
  const [translations, setTranslations] = useState({});
  const [untranslatedTexts, setUntranslatedTexts] = useState([]);
  const [progress, setProgress] = useState({ translated: 0, total: 0 });

  useEffect(() => {
    const loadTranslations = async () => {
      const data = await storage.get("translations");
      setTranslations(data.translations || {});
    };

    const setupMessageListener = () => {
      const listener = (message) => {
        if (message.action === "foundUntranslatedText") {
          setUntranslatedTexts(message.untranslatedTexts);
          updateProgress(message.untranslatedTexts.length);
        }
      };

      chrome?.runtime?.onMessage.addListener(listener);
      return () => chrome?.runtime?.onMessage.removeListener(listener);
    };

    loadTranslations();
    const cleanup = setupMessageListener();
    return cleanup;
  }, []);

  const updateProgress = (untranslatedCount) => {
    const translated = Object.keys(translations).length;
    const total = translated + untranslatedCount;
    setProgress({ translated, total });
  };

  const handleDetectUntranslated = async () => {
    const tabs = await chrome?.tabs?.query({
      active: true,
      currentWindow: true,
    });
    if (tabs?.[0]?.id) {
      chrome?.tabs?.sendMessage(tabs[0].id, {
        action: "detectUntranslated",
        translations,
      });
    }
  };
  //   // Placeholder translation (replace this with API call if needed)
  //   const translatedText = text;
  //   handleSaveTranslation(text, translatedText);

  //   console.log(text);

  //   // Remove from untranslatedTexts after saving
  //   setUntranslatedTexts(
  //     untranslatedTexts.filter((item) => item.text !== text)
  //   );

  //   // Update the text on the page immediately
  //   if (chrome?.tabs) {
  //     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //       if (tabs[0]?.id) {
  //         console.log("checking", chrome.tabs);
  //         chrome.runtime.sendMessage(
  //           {
  //             action: "translateText",
  //             text: text,
  //             targetLanguage: "es",
  //           },
  //           (response) => {
  //             if (chrome.runtime.lastError) {
  //               console.error(
  //                 "Error sending message:",
  //                 chrome.runtime.lastError
  //               );
  //             } else {
  //               console.log("Message sent to background:", response);
  //             }
  //           }
  //         );
  //       }
  //     });
  //   }
  // };

  const handleTranslate = async (text, targetLanguage) => {
    // alert(`Translating: ${text} to ${targetLanguage}`); // Fixed alert syntax
    // console.log("translating", text, targetLanguage);
    // try {
    //   // if (translation) {
    //   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    //     if (tabs[0]?.id) {
    //       console.log("checking", chrome.tabs);
    //       chrome.runtime.sendMessage(
    //         {
    //           action: "translateText",
    //           text: text,
    //           targetLanguage: targetLanguage,
    //         },
    //         (response) => {
    //           if (chrome.runtime.lastError) {
    //             console.error(
    //               "Error sending message:",
    //               chrome.runtime.lastError
    //             );
    //           } else {
    //             alert("message sent successfully");
    //             console.log("Message sent to background:", response);
    //           }
    //         }
    //       );
    //     }
    //   });
    //   // const updatedTranslations = {
    //   //   ...translations,
    //   //   [text]: translation,
    //   // };
    //   // await storage.set({ translations: updatedTranslations });
    //   // setTranslations(updatedTranslations);
    //   // setUntranslatedTexts((prev) =>
    //   //   prev.filter((item) => item.text !== text)
    //   // );
    //   // // Make sure untranslatedTexts is defined before accessing length
    //   // if (untranslatedTexts?.length !== undefined) {
    //   //   updateProgress(untranslatedTexts.length - 1);
    //   // }
    //   // }
    // } catch (error) {
    //   console.error("Translation failed:", error);
    //   alert(`Translation failed: ${error.message}`); // Add user feedback
    // }
  };
  return {
    translations,
    untranslatedTexts,
    progress,
    handleTranslate,
    handleDetectUntranslated,
  };
};
