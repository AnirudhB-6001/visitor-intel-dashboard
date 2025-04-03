import React from "react";

function InsightsView({ data }) {
  if (!data || data.length === 0) {
    return <p className="text-center text-gray-400">No insights to display</p>;
  }

  const totalVisits = data.length;
  const topPage = getTopValue(data.map((d) => d.page));
  const topReferrer = getTopValue(data.map((d) => d.referrer));
  const topCountry = getTopValue(data.map((d) => d.country));
  const deviceStats = getDistribution(data.map((d) => d.device));
  const bounceRate = (
    (data.filter((d) => d.derived_bounced === "Yes").length / totalVisits) *
    100
  ).toFixed(1);
  const mostCommonEvent = getTopValue(data.map((d) => d.event_type));
  const newCount = data.filter((d) => d.derived_visit_type === "New").length;
  const returningCount = data.filter((d) => d.derived_visit_type === "Returning").length;

  // Anomaly candidates
  const fingerprintHits = countOccurrences(data.map((d) => d.fingerprint_id));
  const maxFingerprint = getTopValue(Object.entries(fingerprintHits));

  const ipHits = countOccurrences(data.map((d) => d.ip_address));
  const maxIP = getTopValue(Object.entries(ipHits));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-200">
      {/* Traffic Insights */}
      <div className="bg-slate-800 p-4 rounded-2xl shadow-xl">
        <h3 className="text-lg font-semibold mb-2">📈 Traffic Overview</h3>
        <ul className="space-y-1">
          <li>Top Page: <span className="text-teal-400">{topPage}</span></li>
          <li>Top Referrer: <span className="text-blue-400">{topReferrer}</span></li>
          <li>Top Country: <span className="text-green-400">{topCountry}</span></li>
          <li>Devices: {deviceStats}</li>
        </ul>
      </div>

      {/* Engagement */}
      <div className="bg-slate-800 p-4 rounded-2xl shadow-xl">
        <h3 className="text-lg font-semibold mb-2">📊 Engagement Patterns</h3>
        <ul className="space-y-1">
          <li>Bounce Rate: <span className="text-red-400">{bounceRate}%</span></li>
          <li>Most Frequent Event: <span className="text-yellow-400">{mostCommonEvent || "-"}</span></li>
          <li>Common Entry Page: <span className="text-cyan-400">{getTopValue(data.map((d) => d.derived_entry_page))}</span></li>
        </ul>
      </div>

      {/* Visitor Behavior */}
      <div className="bg-slate-800 p-4 rounded-2xl shadow-xl">
        <h3 className="text-lg font-semibold mb-2">🧍 Visitor Behavior</h3>
        <ul className="space-y-1">
          <li>New Visitors: <span className="text-indigo-400">{newCount}</span></li>
          <li>Returning Visitors: <span className="text-purple-400">{returningCount}</span></li>
          <li>Most Repeated Fingerprint: <span className="text-orange-400">{maxFingerprint}</span></li>
        </ul>
      </div>

      {/* Anomalies */}
      <div className="bg-slate-800 p-4 rounded-2xl shadow-xl">
        <h3 className="text-lg font-semibold mb-2">🚨 Potential Anomalies</h3>
        <ul className="space-y-1">
          <li>High Fingerprint Activity: <span className="text-red-400">{maxFingerprint}</span></li>
          <li>Frequent IP Hits: <span className="text-red-400">{maxIP}</span></li>
        </ul>
      </div>
    </div>
  );
}

function getTopValue(arr) {
  if (!arr || arr.length === 0) return "-";
  const freq = countOccurrences(arr);
  return Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];
}

function countOccurrences(arr) {
  return arr.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});
}

function getDistribution(arr) {
  const counts = countOccurrences(arr);
  const total = arr.length;
  return Object.entries(counts)
    .map(([k, v]) => `${k}: ${((v / total) * 100).toFixed(1)}%`)
    .join(", ");
}

export default InsightsView;