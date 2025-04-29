import React from "react";
import Layout from "../components/Layout";
import TableView from "../components/TableView";
import OverviewCards from "../components/OverviewCards";

function TablePage({ data }) {
  return (
    <Layout>
      <h2 className="text-3xl font-bold text-center">📋 Visitor Intelligence Dashboard</h2>

      <OverviewCards data={data} />

      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xl">
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          🗃️ Visitor Intelligence Table
        </h3>
        <TableView data={data} />
      </div>
    </Layout>
  );
}

export default TablePage;