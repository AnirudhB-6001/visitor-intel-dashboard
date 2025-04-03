import React, { useEffect, useState } from "react";
import TableView from "./components/TableView";
import GraphView from "./components/GraphView";
import InsightsView from "./components/InsightsView";

function App() {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState("table");

  useEffect(() => {
    async function fetchAllData() {
      try {
        const [visitsRes, eventsRes, derivedRes] = await Promise.all([
          fetch("https://visitor-intel-api.onrender.com/dashboard/visits"),
          fetch("https://visitor-intel-api.onrender.com/dashboard/events"),
          fetch("https://visitor-intel-api.onrender.com/dashboard/derived")
        ]);

        const visits = await visitsRes.json();
        const events = await eventsRes.json();
        const derived = await derivedRes.json();

        const combined = visits.map((v) => {
          const matchedEvent = events.find(
            (e) => e.session_id === v.session_id && e.fingerprint_id === v.fingerprint_id
          );
          const matchedDerived = derived.find(
            (d) => d.session_id === v.session_id && d.fingerprint_id === v.fingerprint_id
          );

          return {
            ...v,
            event_type: matchedEvent?.event_type || "",
            event_data: matchedEvent?.event_data || "",
            event_page: matchedEvent?.page || "",
            derived_visit_type: matchedDerived?.visit_type || "",
            derived_traffic_type: matchedDerived?.traffic_type || "",
            derived_entry_page: matchedDerived?.entry_page || "",
            derived_bounced: matchedDerived?.bounced || "",
            derived_geo_region_type: matchedDerived?.geo_region_type || "",
            derived_landing_source: matchedDerived?.landing_source || ""
          };
        });

        setData(combined);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchAllData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setActiveTab("table")}
          className={`px-4 py-2 rounded font-medium ${
            activeTab === "table" ? "bg-blue-600" : "bg-slate-700 hover:bg-slate-600"
          }`}
        >
          Table View
        </button>
        <button
          onClick={() => setActiveTab("graph")}
          className={`px-4 py-2 rounded font-medium ${
            activeTab === "graph" ? "bg-blue-600" : "bg-slate-700 hover:bg-slate-600"
          }`}
        >
          Graph View
        </button>
        <button
          onClick={() => setActiveTab("insights")}
          className={`px-4 py-2 rounded font-medium ${
            activeTab === "insights" ? "bg-blue-600" : "bg-slate-700 hover:bg-slate-600"
          }`}
        >
          Insights View
        </button>
      </div>

      {activeTab === "table" && <TableView data={data} />}
      {activeTab === "graph" && <GraphView data={data} />}
      {activeTab === "insights" && <InsightsView data={data} />}
    </div>
  );
}

export default App;