import React from "react";
import OverviewCards from "../components/OverviewCards";
import InsightsView from "../components/InsightsView";

// Graph Components
import PageViewBarChart from "../components/graphs/PageViewBarChart";
import CountryPieChart from "../components/graphs/CountryPieChart";
import DeviceLineChart from "../components/graphs/DeviceLineChart";
import BounceAreaChart from "../components/graphs/BounceAreaChart";

function VisualPage({ data }) {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-10">
      <h2 className="text-3xl font-bold text-center mb-4">📊 Visual Analytics Dashboard</h2>

      {/* Overview Cards */}
      <OverviewCards data={data} />

      {/* Chart Grid */}
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

      {/* Insights Section */}
      <div className="bg-slate-800 p-6 rounded-2xl shadow-md">
        <h3 className="text-lg font-semibold mb-4">🧠 Key Insights</h3>
        <InsightsView data={data} />
      </div>
    </div>
  );
}

export default VisualPage;
