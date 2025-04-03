// components/UTMBuilderPanel.jsx
import React, { useState } from "react";

function UTMBuilderPanel() {
  const [utmFields, setUtmFields] = useState({
    source: "",
    medium: "",
    campaign: "",
    term: "",
    content: "",
  });

  const baseUrl = "https://anirudhbatraofficial.com";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUtmFields((prev) => ({ ...prev, [name]: value }));
  };

  const generateLink = () => {
    const queryParams = Object.entries(utmFields)
      .filter(([_, value]) => value)
      .map(([key, value]) => `utm_${key}=${encodeURIComponent(value)}`)
      .join("&");

    return `${baseUrl}${queryParams ? `/?${queryParams}` : ""}`;
  };

  return (
    <div className="bg-slate-900 text-white p-6 rounded-xl shadow-md space-y-4">
      <h3 className="text-xl font-semibold">🎯 Build Custom UTM Link</h3>

      {/* Base URL */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Base URL</label>
        <input
          type="text"
          value={baseUrl}
          readOnly
          className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-600 text-slate-400 cursor-not-allowed"
        />
      </div>

      {/* UTM Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {["source", "medium", "campaign", "term", "content"].map((key) => (
          <div key={key}>
            <label className="block text-sm font-medium text-slate-300 capitalize mb-1">
              {key}
            </label>
            <input
              type="text"
              name={key}
              value={utmFields[key]}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-600"
              placeholder={`e.g., ${key === "source" ? "linkedin" : key}`}
            />
          </div>
        ))}
      </div>

      {/* Result */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-slate-300 mb-1">Generated URL</label>
        <textarea
          readOnly
          className="w-full p-3 bg-slate-800 border border-slate-600 rounded font-mono text-xs text-slate-400"
          value={generateLink()}
          rows={3}
        />
      </div>
    </div>
  );
}

export default UTMBuilderPanel;