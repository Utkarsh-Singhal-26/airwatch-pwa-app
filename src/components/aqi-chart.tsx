"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/chart";

const data = [
  { time: "00:00", aqi: 120 },
  { time: "03:00", aqi: 110 },
  { time: "06:00", aqi: 95 },
  { time: "09:00", aqi: 130 },
  { time: "12:00", aqi: 145 },
  { time: "15:00", aqi: 160 },
  { time: "18:00", aqi: 142 },
  { time: "21:00", aqi: 135 },
  { time: "Now", aqi: 142 },
];

export function AQIChart() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: -20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="time" tick={{ fontSize: 12 }} />
          <YAxis domain={[50, 200]} tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "0.375rem",
              fontSize: "0.875rem",
            }}
          />
          <Line
            type="monotone"
            dataKey="aqi"
            stroke="#000000"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
