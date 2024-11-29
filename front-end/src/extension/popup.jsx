/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useTranslations } from "./hooks/useTranslations";
import { LanguageSelector } from "./components/languageSelector";
import { SUPPORTED_LANGUAGES } from "./constants";
import { TranslationList } from "./components/translationList";

function PopUp() {
  const {
    translations,
    untranslatedTexts,
    progress,
    handleDetectUntranslated,
  } = useTranslations();
  const [targetLanguage, setTargetLanguage] = useState("fr");
  // "Auto Translation Extension": "Extension de Traduction Automatique",

  return (
    <div className="min-h-screen w-[400px] flex flex-col bg-slate-900 p-4 text-white">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
        Auto Translation Extension
      </h2>

      <LanguageSelector
        value={targetLanguage}
        onChange={setTargetLanguage}
        languages={SUPPORTED_LANGUAGES}
      />
      {/* 
      <ProgressBar translated={progress.translated} total={progress.total} /> */}

      <button
        onClick={() => handleDetectUntranslated(targetLanguage)}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-200 mb-4"
      >
        Detect Untranslated Texts
      </button>

      <TranslationList
        items={untranslatedTexts}
        targetLanguage={targetLanguage}
      />
    </div>
  );
}

export default PopUp;
