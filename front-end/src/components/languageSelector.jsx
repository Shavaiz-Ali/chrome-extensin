/* eslint-disable react/prop-types */
export const LanguageSelector = ({ value, onChange, languages }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-2">Target Language:</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 rounded-lg bg-slate-800 text-white border border-slate-700"
    >
      {Object.entries(languages).map(([code, name]) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </select>
  </div>
);
