import React from "react";
import Layout from "../components/Layout";
import TableView from "../components/TableView";
import OverviewCards from "../components/OverviewCards";

function TablePage({ data }) {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Page Header */}
        <h2 className="text-3xl font-bold text-center text-base-content">
          📋 Visitor Intelligence Dashboard
        </h2>

        {/* Summary Cards */}
        <OverviewCards data={data} />

        {/* Table Section */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xl">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-base-content">
            🗃️ Visitor Intelligence Table
          </h3>
          <TableView data={data} />
        </div>
      </div>
    </Layout>
  );
}

export default TablePage;