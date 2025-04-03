import React, { useEffect, useState } from "react";
import Dashboard from "./views/Dashboard";

function App() {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState("table");

  useEffect(() => {
    async function fetchAllData() {
      try {
        const [visitsRes, eventsRes, derivedRes] = await Promise.all([
          fetch("https://visitor-intel-api.onrender.com/dashboard/visits"),
          fetch("https://visitor-intel-api.onrender.com/dashboard/events"),
          fetch("https://visitor-intel-api.onrender.com/dashboard/derived"),
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
            derived_landing_source: matchedDerived?.landing_source || "",
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
      <Dashboard data={data} activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;