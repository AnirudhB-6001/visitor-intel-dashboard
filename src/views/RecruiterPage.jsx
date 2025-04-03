import React from "react";
import RecruiterInsightsView from "../components/RecruiterInsightsView";
import UTMBuilderPanel from "../components/UTMBuilderPanel";
import UTMSourcesPieChart from "../components/recruiter/UTMSourcesPieChart";
import RecruiterTrafficLineChart from "../components/recruiter/RecruiterTrafficLineChart"; // ✅ Corrected name

function RecruiterPage({ data }) {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-center text-blue-400">🎯 Recruiter Intelligence</h2>

      {/* Key Insights + UTM Builder */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-800 p-5 rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">🔍 Recruiter Key Insights</h3>
          <RecruiterInsightsView data={data} />
        </div>

        <div className="bg-slate-800 p-5 rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">🎯 UTM Link Builder</h3>
          <UTMBuilderPanel />
        </div>
      </div>

      {/* Graphs Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-800 p-5 rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Top UTM Sources</h3>
          <UTMSourcesPieChart data={data} />
        </div>

        <div className="bg-slate-800 p-5 rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Recruiter Traffic Over Time</h3>
          <RecruiterTrafficLineChart data={data} />
        </div>
      </div>
    </div>
  );
}

export default RecruiterPage;