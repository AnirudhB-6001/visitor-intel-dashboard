import React from "react";

function RecruiterInsightsView({ data }) {
  const recruiterTraffic = data.filter(
    (d) => d.utm_source && ["linkedin", "naukri", "indeed", "foundit", "recruiter"].some(src => d.utm_source.toLowerCase().includes(src))
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
    <div className="space-y-4 text-sm">
      <h3 className="text-lg font-semibold text-blue-300">🔍 UTM Source Breakdown</h3>
      <ul className="list-disc pl-5">
        {topUTMSources.map(([src, count]) => (
          <li key={src}>{src}: {count}</li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold text-blue-300">📍 Top Pages Visited by Recruiters</h3>
      <ul className="list-disc pl-5">
        {topPages.slice(0, 5).map(([page, count]) => (
          <li key={page}>{page}: {count}</li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold text-blue-300">⏰ Peak Visit Hours</h3>
      <ul className="list-disc pl-5">
        {topHours.slice(0, 5).map(([hour, count]) => (
          <li key={hour}>{hour}:00 - {count} visits</li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold text-blue-300">🔗 Referrer Text</h3>
      <ul className="list-disc pl-5">
        {topReferrers.slice(0, 5).map(([ref, count]) => (
          <li key={ref}>{ref}: {count}</li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold text-blue-300">🧍 Recruiter Type</h3>
      <p>New: {newRecruiters.size} | Returning: {returningRecruiters.size}</p>

      <h3 className="text-lg font-semibold text-blue-300">🌍 Geo Distribution</h3>
      <ul className="list-disc pl-5">
        {countryCounts.slice(0, 5).map(([country, count]) => (
          <li key={country}>{country}: {count}</li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold text-blue-300">⚠️ Anomalies</h3>
      <ul className="list-disc pl-5">
        {frequentIPs.map(([ip, count]) => (
          <li key={ip}>Suspicious IP: {ip} ({count} visits)</li>
        ))}
      </ul>
    </div>
  );
}

export default RecruiterInsightsView;