// src/components/Layout.jsx
import React from "react";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-base-100 text-base-content px-6 py-8 max-w-7xl mx-auto space-y-8">
      {children}
    </div>
  );
}

export default Layout;