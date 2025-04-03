import React from "react";
import { saveAs } from "file-saver";

function TableView({ data }) {
  const exportCSV = () => {
    const header = Object.keys(data[0] || {}).join(",");
    const rows = data.map((row) => Object.values(row).join(","));
    const csvContent = [header, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "visitor_logs.csv");
  };

  const columns = [
    { label: "ID", key: "id", group: "Visit Info" },
    { label: "Page", key: "page", group: "Visit Info" },
    { label: "Referrer", key: "referrer", group: "Visit Info" },
    { label: "Device", key: "device", group: "Visit Info" },
    { label: "Session ID", key: "session_id", group: "Session Identifiers" },
    { label: "Fingerprint", key: "fingerprint_id", group: "Session Identifiers" },
    { label: "IP", key: "ip_address", group: "Visit Info" },
    { label: "City", key: "city", group: "Geolocation" },
    { label: "Region", key: "region", group: "Geolocation" },
    { label: "Country", key: "country", group: "Geolocation" },
    { label: "Org", key: "organization", group: "Geolocation" },
    { label: "UTM Source", key: "utm_source", group: "UTM + Event" },
    { label: "Event Type", key: "event_type", group: "UTM + Event" },
    { label: "Event Data", key: "event_data", group: "UTM + Event" },
    { label: "Event Page", key: "event_page", group: "UTM + Event" },
    { label: "Visit Type", key: "derived_visit_type", group: "Derived" },
    { label: "Traffic Type", key: "derived_traffic_type", group: "Derived" },
    { label: "Entry Page", key: "derived_entry_page", group: "Derived" },
    { label: "Bounced", key: "derived_bounced", group: "Derived" },
    { label: "Geo Region", key: "derived_geo_region_type", group: "Derived" },
    { label: "Landing Source", key: "derived_landing_source", group: "Derived" },
  ];

  const groupColors = {
    "Visit Info": "bg-slate-800",
    "Session Identifiers": "bg-slate-700",
    "Geolocation": "bg-slate-800",
    "UTM + Event": "bg-slate-700",
    "Derived": "bg-slate-800",
  };

  return (
    <div className="overflow-x-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Visitor Intelligence Table</h2>
        <button
          onClick={exportCSV}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
        >
          Export CSV
        </button>
      </div>
      {data.length === 0 ? (
        <p className="text-center text-gray-400">No data available</p>
      ) : (
        <table className="min-w-full border border-slate-600 rounded overflow-hidden text-sm text-white">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 border border-slate-700 whitespace-nowrap font-semibold text-left ${groupColors[col.group]}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr
                key={idx}
                className={idx % 2 === 0 ? "bg-slate-900" : "bg-slate-800"}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-4 py-2 border border-slate-700 whitespace-nowrap font-mono ${
                      col.key.includes("session") || col.key.includes("fingerprint")
                        ? "text-xs"
                        : ""
                    }`}
                  >
                    {row[col.key] || "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TableView;