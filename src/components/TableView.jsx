// TableView.jsx — TanStack Table v8 with Visitor Alias and Session Label (localStorage)

import React, { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper
} from "@tanstack/react-table";
import { saveAs } from "file-saver";

const columnHelper = createColumnHelper();

const formatDuration = (seconds) => {
  if (isNaN(seconds) || seconds === null) return "-";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}m ${secs}s`;
};

const formatTimestamp = (timestamp) => {
  try {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    }).format(date);
  } catch {
    return "-";
  }
};

function TableView({ data }) {
  const [columnFilters, setColumnFilters] = useState([]);

  // LocalStorage Alias Maps
  const visitorAliasMap = useMemo(() => {
    const stored = JSON.parse(localStorage.getItem("visitorAliasMap")) || {};
    let counter = Object.keys(stored).length;
    data.forEach((row) => {
      if (row.fingerprint_id && !stored[row.fingerprint_id]) {
        counter++;
        stored[row.fingerprint_id] = `Visitor_${String(counter).padStart(3, "0")}`;
      }
    });
    localStorage.setItem("visitorAliasMap", JSON.stringify(stored));
    return stored;
  }, [data]);

  const sessionAliasMap = useMemo(() => {
    const stored = JSON.parse(localStorage.getItem("sessionAliasMap")) || {};
    let counter = Object.keys(stored).length;
    data.forEach((row) => {
      if (row.session_id && !stored[row.session_id]) {
        counter++;
        stored[row.session_id] = `Session_${String(counter).padStart(3, "0")}`;
      }
    });
    localStorage.setItem("sessionAliasMap", JSON.stringify(stored));
    return stored;
  }, [data]);

  const enhancedData = useMemo(() => {
    return data.map(row => ({
      ...row,
      visitor_alias: visitorAliasMap[row.fingerprint_id] || "-",
      session_label: sessionAliasMap[row.session_id] || "-",
    }));
  }, [data, visitorAliasMap, sessionAliasMap]);

  const uniqueValues = useMemo(() => {
    const values = {};
    enhancedData.forEach((row) => {
      Object.entries(row).forEach(([key, value]) => {
        if (!values[key]) values[key] = new Set();
        values[key].add(value || "");
      });
    });
    return Object.fromEntries(
      Object.entries(values).map(([k, v]) => [k, Array.from(v).sort()])
    );
  }, [enhancedData]);

  const columnKeys = [
    "visitor_alias", "session_label", // new derived fields
    "id", "timestamp", "page", "referrer", "device", "session_id", "fingerprint_id", "ip_address",
    "city", "region", "country", "organization", "utm_source", "utm_medium", "utm_campaign",
    "utm_term", "utm_content", "event_type", "event_data", "event_page", "derived_visit_type",
    "derived_traffic_type", "derived_entry_page", "derived_bounced", "derived_geo_region_type",
    "derived_landing_source", "time_on_page_sec"
  ];

  const columns = columnKeys.map((key) =>
    columnHelper.accessor(key, {
      header: () => (
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold">
            {key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
          </span>
          <select
            className="select select-xs select-bordered bg-slate-800 text-slate-200"
            value={table.getColumn(key)?.getFilterValue() ?? ""}
            onChange={(e) => table.getColumn(key)?.setFilterValue(e.target.value || undefined)}
          >
            <option value="">All</option>
            {uniqueValues[key]?.map((val) => (
              <option key={val} value={val}>{val || "(empty)"}</option>
            ))}
          </select>
        </div>
      ),
      cell: (info) => {
        const val = info.getValue();
        if (key === "time_on_page_sec") return <span className="text-yellow-300 font-semibold">{formatDuration(val)}</span>;
        if (key === "timestamp") return <span>{formatTimestamp(val)}</span>;
        if (key.includes("utm")) return <span className="text-blue-300">{val}</span>;
        if (key.includes("bounced")) return <span className="text-red-400">{val}</span>;
        if (key.includes("country")) return <span className="text-green-300">{val}</span>;
        if (key.includes("id") && key !== "visitor_alias" && key !== "session_label") return <span className="text-slate-400">{val}</span>;
        return val;
      },
      filterFn: "equalsString",
    })
  );

  const table = useReactTable({
    data: enhancedData,
    columns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const exportCSV = () => {
    if (!enhancedData.length) return;
  
    const headerKeys = Object.keys(enhancedData[0]);
    const headers = headerKeys.map((key) =>
      key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    );
  
    const rows = enhancedData.map((row) =>
      headerKeys.map((key) => `"${row[key] ?? ""}"`).join(",")
    );
  
    const csvContent = [headers.join(","), ...rows].join("\n");
  
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "visitor_logs_full.csv");
  };  

  return (
    <div className="overflow-x-auto p-4 border border-slate-700 rounded-2xl shadow-xl bg-slate-900 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 px-2">
        <h2 className="text-2xl font-bold text-white">🧾 Visitor Intelligence Table</h2>
        <button onClick={exportCSV} className="btn btn-accent">Export CSV</button>
      </div>

      {/* Table */}
      <div className="overflow-auto rounded-md shadow-inner border border-slate-700">
        <table className="table table-auto w-auto text-sm border-collapse">
          <thead className="bg-base-200 text-base-content">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className={`py-3 border border-slate-700 font-semibold text-left whitespace-nowrap align-top ${header.column.id === "id" ? "pl-16 pr-4" : "px-4"}`}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-slate-700 transition-all border-b border-slate-700">
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    className={`py-2 border-r border-slate-700 font-mono text-xs whitespace-nowrap min-w-[10rem] ${cell.column.id === "id" ? "pl-16 pr-4" : "px-4"}`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableView;