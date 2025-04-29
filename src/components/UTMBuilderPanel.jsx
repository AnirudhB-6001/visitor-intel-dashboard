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
  const [copied, setCopied] = useState(false);

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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateLink());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 mb-10">
      <div className="card bg-base-200 shadow-xl p-6 space-y-6">
        <h3 className="text-2xl font-bold text-base-content">🎯 Build Custom UTM Link</h3>

        {/* Base URL */}
        <div>
          <label className="block text-sm font-medium text-base-content mb-1">Base URL</label>
          <input
            type="text"
            value={baseUrl}
            readOnly
            className="input input-bordered w-full bg-base-100 text-sm text-gray-400 cursor-not-allowed"
          />
        </div>

        {/* UTM Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["source", "medium", "campaign", "term", "content"].map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium text-base-content capitalize mb-1">
                {key}
              </label>
              <input
                type="text"
                name={key}
                value={utmFields[key]}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder={`e.g., ${key === "source" ? "linkedin" : key}`}
              />
            </div>
          ))}
        </div>

        {/* Result + Copy */}
        <div>
          <label className="block text-sm font-medium text-base-content mb-1">Generated URL</label>
          <div className="flex items-start gap-2">
            <textarea
              readOnly
              className="textarea textarea-bordered w-full font-mono text-sm text-gray-500"
              value={generateLink()}
              rows={3}
            />
            <button onClick={copyToClipboard} className="btn btn-accent h-fit whitespace-nowrap">
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UTMBuilderPanel;