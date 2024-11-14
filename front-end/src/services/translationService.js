// import { TRANSLATION_API_URL, API_KEY } from "../config";

export const translateText = async (text, targetLanguage) => {
  console.log("translate api hit successfully", text, targetLanguage);
  try {
    const url = `https://free-google-translator.p.rapidapi.com/external-api/free-google-translator?from=en&to=${targetLanguage}&query=${text}`;
    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": "YOUR_API_KEY",
        "x-rapidapi-host": "free-google-translator.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ translate: "rapidapi" }),
    };
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    return result.translation;
  } catch (error) {
    console.error("Error fetching translation:", error);
    return null;
  }
};
