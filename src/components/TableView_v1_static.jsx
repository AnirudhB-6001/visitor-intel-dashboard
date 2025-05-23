import React from "react";
import { saveAs } from "file-saver";

const formatDuration = (seconds) => {
  if (isNaN(seconds) || seconds === null) return "-";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}m ${secs}s`;
};

const formatTimestamp = (timestamp) => {
  try {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    }).format(date);
  } catch {
    return "-";
  }
};

function TableView({ data }) {
  const exportCSV = () => {
    const header = Object.keys(data[0] || {}).join(",");
    const rows = data.map((row) => Object.values(row).join(","));
    const csvContent = [header, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "visitor_logs.csv");
  };

  const columns = [
    { label: "ID", key: "id" },
    { label: "Timestamp", key: "timestamp" },
    { label: "Page", key: "page" },
    { label: "Referrer", key: "referrer" },
    { label: "Device", key: "device" },
    { label: "Session ID", key: "session_id" },
    { label: "Fingerprint", key: "fingerprint_id" },
    { label: "IP", key: "ip_address" },
    { label: "City", key: "city" },
    { label: "Region", key: "region" },
    { label: "Country", key: "country" },
    { label: "Org", key: "organization" },
    { label: "UTM Source", key: "utm_source" },
    { label: "UTM Medium", key: "utm_medium" },
    { label: "UTM Campaign", key: "utm_campaign" },
    { label: "UTM Term", key: "utm_term" },
    { label: "UTM Content", key: "utm_content" },
    { label: "Event Type", key: "event_type" },
    { label: "Event Data", key: "event_data" },
    { label: "Event Page", key: "event_page" },
    { label: "Visit Type", key: "derived_visit_type" },
    { label: "Traffic Type", key: "derived_traffic_type" },
    { label: "Entry Page", key: "derived_entry_page" },
    { label: "Bounced", key: "derived_bounced" },
    { label: "Geo Region", key: "derived_geo_region_type" },
    { label: "Landing Source", key: "derived_landing_source" },
    { label: "Time on Page", key: "time_on_page_sec" },
  ];

  const totalVisits = data.length;
  const uniqueSessions = new Set(data.map((d) => d.session_id)).size;
  const uniqueVisitors = new Set(data.map((d) => d.fingerprint_id)).size;
  const bouncedCount = data.filter((d) => d.derived_bounced === "Yes").length;
  const bounceRate = ((bouncedCount / totalVisits) * 100).toFixed(1);
  const topCountry = [...new Set(data.map((d) => d.country))][0] || "-";

  return (
    <div className="overflow-x-auto p-4 border border-slate-700 rounded-2xl shadow-xl bg-slate-900 space-y-4">
      {/* Summary Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-2">
        <h2 className="text-2xl font-bold text-white">🧾 Visitor Intelligence Table</h2>
        <div className="flex flex-wrap gap-4 text-sm text-slate-300">
          <span>Total: <span className="text-teal-400 font-semibold">{totalVisits}</span></span>
          <span>Sessions: <span className="text-teal-400 font-semibold">{uniqueSessions}</span></span>
          <span>Visitors: <span className="text-cyan-300 font-semibold">{uniqueVisitors}</span></span>
          <span>Bounce: <span className="text-red-400 font-semibold">{bounceRate}%</span></span>
          <span>Top Country: <span className="text-green-400 font-semibold">{topCountry}</span></span>
        </div>
        <button onClick={exportCSV} className="btn btn-accent">
          Export CSV
        </button>
      </div>

      {/* Table */}
      {data.length === 0 ? (
        <p className="text-center text-gray-400">No data available</p>
      ) : (
        <div className="overflow-auto rounded-md shadow-inner border border-slate-700">
          <table className="table table-auto w-auto text-sm border-collapse">
            <thead className="bg-base-200 text-base-content sticky top-0 z-10">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`py-3 border border-slate-700 font-semibold text-left whitespace-nowrap ${
                      col.key === "id" ? "pl-16 pr-4" : "px-4"
                    }`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-700 transition-all border-b border-slate-700">
                  {columns.map((col, colIdx) => {
                    const raw = row[col.key];
                    let rendered = raw;

                    if (col.key === "time_on_page_sec") {
                      rendered = formatDuration(raw);
                    } else if (col.key === "timestamp") {
                      rendered = formatTimestamp(raw);
                    }

                    return (
                      <td
                        key={col.key}
                        title={raw || "-"}
                        className={`py-2 border-r border-slate-700 font-mono text-xs whitespace-nowrap min-w-[10rem] ${
                          col.key.includes("id") ? "text-slate-400" :
                          col.key.includes("bounced") ? "text-red-400" :
                          col.key.includes("country") ? "text-green-300" :
                          col.key.includes("utm") ? "text-blue-300" :
                          col.key === "time_on_page_sec" ? "text-yellow-300 font-semibold" :
                          "text-gray-200"
                        } ${colIdx === 0 ? "pl-16 pr-4" : "px-4"}`}
                      >
                        {rendered || "-"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TableView;