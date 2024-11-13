import { useTranslations } from "../hooks/useTranslations";

/* eslint-disable react/prop-types */
export const TranslationList = ({ items, targetLanguage }) => {
  const { handleTranslate } = useTranslations();
  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold mb-4">Untranslated Texts</h3>
      {items.length > 0 ? (
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li
              key={`${item.text}-${index}`}
              className="flex items-center justify-between p-3 bg-slate-800 rounded-lg border border-slate-700"
            >
              <span className="text-sm mr-2 flex-1">{item.text}</span>
              <button
                onClick={() => handleTranslate(item.text, targetLanguage)}
                className="text-sm bg-green-500 hover:bg-green-600 text-white font-medium py-1 px-3 rounded-md transition-colors duration-200"
              >
                Translate
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <p className="text-center text-slate-400">
            All content is translated.
          </p>
          <p className="text-center text-slate-400">Empty.</p>
          <p className="text-center text-slate-400">Try Detecting</p>
        </div>
      )}
    </div>
  );
};
