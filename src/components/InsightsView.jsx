import React from "react";

function InsightView({ data }) {
  if (!data || data.length === 0) {
    return <p className="text-gray-400">No data available for insights.</p>;
  }

  // Insight 1: Total Visits
  const totalVisits = data.length;

  // Insight 2: New vs Returning
  const newVisits = data.filter((d) => d.derived_visit_type === "New").length;
  const returningVisits = totalVisits - newVisits;

  // Insight 3: Top Referrer
  const referrerCounts = {};
  data.forEach((d) => {
    const ref = d.referrer || "Unknown";
    referrerCounts[ref] = (referrerCounts[ref] || 0) + 1;
  });
  const sortedReferrers = Object.entries(referrerCounts).sort((a, b) => b[1] - a[1]);
  const topReferrer = sortedReferrers[0]?.[0] || "-";

  // Insight 4: Bounce Rate
  const bounces = data.filter((d) => d.derived_bounced === "Yes").length;
  const bounceRate = ((bounces / totalVisits) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Visitor Insights</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
        <div className="bg-slate-800 p-4 rounded-xl shadow">
          <p className="text-gray-400">Total Visits</p>
          <p className="text-2xl font-semibold">{totalVisits}</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-xl shadow">
          <p className="text-gray-400">New vs Returning</p>
          <p className="text-lg">{newVisits} New / {returningVisits} Returning</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-xl shadow">
          <p className="text-gray-400">Top Referrer</p>
          <p className="text-lg truncate" title={topReferrer}>{topReferrer}</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-xl shadow">
          <p className="text-gray-400">Bounce Rate</p>
          <p className="text-lg">{bounceRate}%</p>
        </div>
      </div>
    </div>
  );
}

export default InsightView;