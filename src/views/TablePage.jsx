import React from "react";
import TableView from "../components/TableView";
import OverviewCards from "../components/OverviewCards";

function TablePage({ data }) {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-center">📋 Visitor Intelligence Dashboard</h2>

      {/* Summary Bar */}
      <OverviewCards data={data} />

      {/* Table Card */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xl">
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span role="img" aria-label="Table">🗃️</span> Visitor Intelligence Table
        </h3>
        <TableView data={data} />
      </div>
    </div>
  );
}

export default TablePage;