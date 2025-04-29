import React from "react";

function RecruiterInsightsGrid({ data }) {
  const recruiterTraffic = data.filter(
    (d) =>
      d.utm_source &&
      ["linkedin", "naukri", "indeed", "foundit", "recruiter"].some((src) =>
        d.utm_source.toLowerCase().includes(src)
      )
  );

  const getCounts = (key) => {
    const counts = {};
    recruiterTraffic.forEach((d) => {
      const value = d[key] || "-";
      counts[value] = (counts[value] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  };

  const topUTMSources = getCounts("utm_source");
  const topPages = getCounts("page");
  const topReferrers = getCounts("referrer");
  const countryCounts = getCounts("country");

  const newRecruiters = new Set(
    recruiterTraffic.filter((d) => d.derived_visit_type === "New").map((d) => d.fingerprint_id)
  );
  const returningRecruiters = new Set(
    recruiterTraffic.filter((d) => d.derived_visit_type === "Returning").map((d) => d.fingerprint_id)
  );

  const frequentIPs = getCounts("ip_address").filter(([ip, count]) => count > 3);

  const activeHours = recruiterTraffic.map((d) => new Date(d.timestamp).getHours());
  const hourMap = {};
  activeHours.forEach((h) => {
    hourMap[h] = (hourMap[h] || 0) + 1;
  });

  const topHours = Object.entries(hourMap).sort((a, b) => b[1] - a[1]);

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm text-left">
      <div className="bg-slate-700 p-4 rounded-xl">
        <h3 className="font-semibold text-blue-300 text-base">🔎 UTM Source Breakdown</h3>
        <ul className="list-disc pl-4">
          {topUTMSources.map(([src, count]) => (
            <li key={src}>
              {src}: <span className="font-bold text-white">{count}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-slate-700 p-4 rounded-xl">
        <h3 className="font-semibold text-pink-300 text-base">📍 Top Pages Visited</h3>
        <ul className="list-disc pl-4">
          {topPages.slice(0, 5).map(([page, count]) => (
            <li key={page}>
              {page}: <span className="font-bold text-white">{count}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-slate-700 p-4 rounded-xl">
        <h3 className="font-semibold text-red-300 text-base">⏰ Peak Visit Hours</h3>
        <ul className="list-disc pl-4">
          {topHours.slice(0, 5).map(([hour, count]) => (
            <li key={hour}>
              {hour}:00 — <span className="font-bold text-white">{count}</span> visits
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-slate-700 p-4 rounded-xl">
        <h3 className="font-semibold text-gray-300 text-base">🔗 Referrer Text</h3>
        <ul className="list-disc pl-4">
          {topReferrers.slice(0, 5).map(([ref, count]) => (
            <li key={ref}>
              {ref}: <span className="font-bold text-white">{count}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-slate-700 p-4 rounded-xl">
        <h3 className="font-semibold text-orange-300 text-base">🧍 Recruiter Type</h3>
        <p>
          New: <span className="font-bold text-white">{newRecruiters.size}</span> | Returning: {" "}
          <span className="font-bold text-white">{returningRecruiters.size}</span>
        </p>
      </div>

      <div className="bg-slate-700 p-4 rounded-xl">
        <h3 className="font-semibold text-green-300 text-base">🌍 Geo Distribution</h3>
        <ul className="list-disc pl-4">
          {countryCounts.slice(0, 5).map(([country, count]) => (
            <li key={country}>
              {country}: <span className="font-bold text-white">{count}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-slate-700 p-4 rounded-xl col-span-full">
        <h3 className="font-semibold text-yellow-300 text-base">⚠️ Anomalies</h3>
        <ul className="list-disc pl-4">
          {frequentIPs.map(([ip, count]) => (
            <li key={ip}>
              Suspicious IP: <span className="text-white">{ip}</span> ({count} hits)
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RecruiterInsightsGrid;