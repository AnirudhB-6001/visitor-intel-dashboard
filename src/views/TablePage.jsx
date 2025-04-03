import React from "react";
import TableView from "../components/TableView";
import OverviewCards from "../components/OverviewCards";

function TablePage({ data }) {
  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold text-center">Visitor Intelligence Dashboard</h2>

      {/* Overview Cards Section */}
      <OverviewCards data={data} />

      {/* Full Table Section */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Full Visitor Data</h3>
        <TableView data={data} />
      </div>
    </div>
  );
}

export default TablePage;