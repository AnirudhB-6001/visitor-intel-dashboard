// components/MiniInsights.jsx — Clean Version

import React, { useMemo } from "react";

function MiniInsights({ data }) {
  const metrics = useMemo(() => {
    const visitors = new Set();
    const sessions = new Set();
    let totalVisits = 0;
    let bouncedCount = 0;
    const countryCount = {};
    const deviceCount = {};

    data.forEach((row) => {
      if (row.fingerprint_id) visitors.add(row.fingerprint_id);
      if (row.session_id) sessions.add(row.session_id);
      totalVisits++;
      if (row.derived_bounced === "Yes") bouncedCount++;

      if (row.country) {
        countryCount[row.country] = (countryCount[row.country] || 0) + 1;
      }
      if (row.device) {
        deviceCount[row.device] = (deviceCount[row.device] || 0) + 1;
      }
    });

    const topCountry = Object.entries(countryCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";
    const topDevice = Object.entries(deviceCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";

    return {
      totalVisitors: visitors.size,
      totalSessions: sessions.size,
      totalVisits,
      bounceRate: totalVisits ? ((bouncedCount / totalVisits) * 100).toFixed(1) : 0,
      topCountry,
      topDevice,
    };
  }, [data]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 min-h-[200px]">
        <div className="card bg-base-200 shadow-md">
          <div className="card-body">
            <h2 className="card-title text-sm">Visitors</h2>
            <p className="text-2xl font-bold text-accent">{metrics.totalVisitors}</p>
          </div>
        </div>
        <div className="card bg-base-200 shadow-md">
          <div className="card-body">
            <h2 className="card-title text-sm">Sessions</h2>
            <p className="text-2xl font-bold text-primary">{metrics.totalSessions}</p>
          </div>
        </div>
        <div className="card bg-base-200 shadow-md">
          <div className="card-body">
            <h2 className="card-title text-sm">Visits</h2>
            <p className="text-2xl font-bold text-info">{metrics.totalVisits}</p>
          </div>
        </div>
        <div className="card bg-base-200 shadow-md">
          <div className="card-body">
            <h2 className="card-title text-sm">Bounce Rate</h2>
            <p className="text-2xl font-bold text-error">{metrics.bounceRate}%</p>
          </div>
        </div>
        <div className="card bg-base-200 shadow-md">
          <div className="card-body">
            <h2 className="card-title text-sm">Top Country</h2>
            <p className="text-xl font-bold text-success">{metrics.topCountry}</p>
          </div>
        </div>
        <div className="card bg-base-200 shadow-md">
          <div className="card-body">
            <h2 className="card-title text-sm">Top Device</h2>
            <p className="text-xl font-bold text-warning">{metrics.topDevice}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MiniInsights;