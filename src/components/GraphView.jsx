import React from "react";
import PageViewBarChart from "./graphs/PageViewBarChart";
import CountryPieChart from "./graphs/CountryPieChart";
import DeviceLineChart from "./graphs/DeviceLineChart";
import BounceAreaChart from "./graphs/BounceAreaChart";

function GraphView({ data }) {
  return (
    <div className="space-y-8">
      {/* Grid Layout for Graphs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Page Views */}
        <div className="bg-slate-800 rounded-2xl p-4 shadow-xl">
          <h3 className="text-lg font-semibold text-teal-300 mb-2">Page View Distribution</h3>
          <PageViewBarChart data={data} />
        </div>

        {/* Country Pie Chart */}
        <div className="bg-slate-800 rounded-2xl p-4 shadow-xl">
          <h3 className="text-lg font-semibold text-teal-300 mb-2">Country Share</h3>
          <CountryPieChart data={data} />
        </div>

        {/* Device Line Chart */}
        <div className="bg-slate-800 rounded-2xl p-4 shadow-xl">
          <h3 className="text-lg font-semibold text-teal-300 mb-2">Device Usage Over Sessions</h3>
          <DeviceLineChart data={data} />
        </div>

        {/* Bounce Area Chart */}
        <div className="bg-slate-800 rounded-2xl p-4 shadow-xl">
          <h3 className="text-lg font-semibold text-teal-300 mb-2">Bounce Rate Trend</h3>
          <BounceAreaChart data={data} />
        </div>
      </div>
    </div>
  );
}

export default GraphView;