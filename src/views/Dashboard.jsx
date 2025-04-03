import React from "react";
import TablePage from "./TablePage";
import VisualPage from "./VisualPage";
import RecruiterPage from "./RecruiterPage"; // ✅ new import

function Dashboard({ data, activeTab, setActiveTab }) {
  return (
    <div>
      {/* Tab Buttons */}
      <div className="flex justify-center gap-4 mb-6 flex-wrap">
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

        <button
          onClick={() => setActiveTab("recruiter")}
          className={`px-4 py-2 rounded font-medium ${
            activeTab === "recruiter" ? "bg-blue-600" : "bg-slate-700 hover:bg-slate-600"
          }`}
        >
          Recruiter View
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === "table" && <TablePage data={data} />}
      {activeTab === "visual" && <VisualPage data={data} />}
      {activeTab === "recruiter" && <RecruiterPage data={data} />}
    </div>
  );
}

export default Dashboard;