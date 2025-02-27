"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/chart";

const data = [
  { name: "PM2.5", value: 85, limit: 25 },
  { name: "PM10", value: 120, limit: 50 },
  { name: "NO2", value: 45, limit: 40 },
  { name: "O3", value: 30, limit: 100 },
  { name: "SO2", value: 12, limit: 20 },
  { name: "CO", value: 0.8, limit: 4 },
];

export function PollutantChart() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 10,
            left: -20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "0.375rem",
              fontSize: "0.875rem",
            }}
            formatter={(value, name, props) => {
              const item = data.find((d) => d.name === props.payload.name);
              const percentage = item
                ? Math.round((item.value / item.limit) * 100)
                : 0;
              return [`${value} (${percentage}% of limit)`, props.payload.name];
            }}
          />
          <Bar dataKey="value" fill="#000000" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
