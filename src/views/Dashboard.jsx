import React from "react";
import TablePage from "./TablePage";
import VisualPage from "./VisualPage";

function Dashboard({ data, activeTab, setActiveTab }) {
  return (
    <div>
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
          onClick={() => setActiveTab("visual")}
          className={`px-4 py-2 rounded font-medium ${
            activeTab === "visual" ? "bg-blue-600" : "bg-slate-700 hover:bg-slate-600"
          }`}
        >
          Visual View
        </button>
      </div>

      {activeTab === "table" && <TablePage data={data} />}
      {activeTab === "visual" && <VisualPage data={data} />}
    </div>
  );
}

export default Dashboard;