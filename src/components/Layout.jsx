// src/components/Layout.jsx
import React from "react";

function Layout({ children }) {
  return (
    <main className="min-h-screen bg-base-100 text-base-content">
      <div className="container mx-auto px-6 py-8 space-y-8">
        {children}
      </div>
    </main>
  );
}

export default Layout;
