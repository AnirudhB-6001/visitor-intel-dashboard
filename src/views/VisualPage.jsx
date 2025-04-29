import React from "react";
import Layout from "../components/Layout";
import OverviewCards from "../components/OverviewCards";
import InsightsView from "../components/InsightsView";
import PageViewBarChart from "../components/graphs/PageViewBarChart";
import CountryPieChart from "../components/graphs/CountryPieChart";
import DeviceLineChart from "../components/graphs/DeviceLineChart";
import BounceAreaChart from "../components/graphs/BounceAreaChart";

function VisualPage({ data }) {
  return (
    <Layout>
      <h2 className="text-3xl font-bold text-center">📊 Visual Analytics Dashboard</h2>

      <OverviewCards data={data} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800 p-5 rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold mb-3">Page Views</h3>
          <PageViewBarChart data={data} />
        </div>
        <div className="bg-slate-800 p-5 rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold mb-3">Country Distribution</h3>
          <CountryPieChart data={data} />
        </div>
        <div className="bg-slate-800 p-5 rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold mb-3">Device Usage Trends</h3>
          <DeviceLineChart data={data} />
        </div>
        <div className="bg-slate-800 p-5 rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold mb-3">Bounce Rate Over Time</h3>
          <BounceAreaChart data={data} />
        </div>
      </div>

      <div className="bg-slate-800 p-6 rounded-2xl shadow-md">
        <h3 className="text-lg font-semibold mb-4">🧠 Key Insights</h3>
        <InsightsView data={data} />
      </div>
    </Layout>
  );
}

export default VisualPage;
