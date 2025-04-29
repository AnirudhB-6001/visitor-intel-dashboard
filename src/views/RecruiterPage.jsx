// src/views/RecruiterPage.jsx
import React from "react";
import Layout from "../components/Layout";
import RecruiterInsightsGrid from "../components/RecruiterInsightsGrid";
import UTMBuilderPanel from "../components/UTMBuilderPanel";
import UTMSourcesPieChart from "../components/recruiter/UTMSourcesPieChart";
import RecruiterTrafficLineChart from "../components/recruiter/RecruiterTrafficLineChart";

function RecruiterPage({ data }) {
  return (
    <Layout>
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center text-primary">🎯 Recruiter Intelligence</h2>
          <RecruiterInsightsGrid data={data} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-center text-secondary">📊 Top UTM Sources</h3>
            <UTMSourcesPieChart data={data} />
          </div>
        </div>

        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-center text-accent">📈 Recruiter Traffic Over Time</h3>
            <RecruiterTrafficLineChart data={data} />
          </div>
        </div>
      </div>

      <div className="card bg-base-200 shadow-xl mt-6">
        <div className="card-body">
          <h3 className="card-title text-center text-primary">🎯 UTM Link Builder</h3>
          <UTMBuilderPanel />
        </div>
      </div>
    </Layout>
  );
}

export default RecruiterPage;