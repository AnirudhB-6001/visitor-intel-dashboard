import React from "react";

function OverviewCards({ data }) {
  // Basic metrics
  const totalVisits = data.length;
  const uniqueSessions = new Set(data.map((d) => d.session_id)).size;
  const uniqueVisitors = new Set(data.map((d) => d.fingerprint_id)).size;
  const bouncedSessions = data.filter((d) => d.derived_bounced === "Yes").length;
  const bounceRate = totalVisits > 0 ? ((bouncedSessions / totalVisits) * 100).toFixed(1) : 0;

  // Top country calculation
  const countryCount = data.reduce((acc, d) => {
    if (d.country) {
      acc[d.country] = (acc[d.country] || 0) + 1;
    }
    return acc;
  }, {});
  const topCountry = Object.entries(countryCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";

  const cards = [
    {
      label: "Total Visits",
      value: totalVisits,
    },
    {
      label: "Unique Sessions",
      value: uniqueSessions,
    },
    {
      label: "Unique Visitors",
      value: uniqueVisitors,
    },
    {
      label: "Bounce Rate",
      value: `${bounceRate}%`,
    },
    {
      label: "Top Country",
      value: topCountry,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="bg-slate-800 rounded-xl shadow-md p-4 text-center hover:bg-slate-700 transition-all duration-300"
        >
          <div className="text-sm text-gray-400 mb-1 uppercase tracking-wide">
            {card.label}
          </div>
          <div className="text-xl font-bold text-white">{card.value}</div>
        </div>
      ))}
    </div>
  );
}

export default OverviewCards;