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

type Period = "hourly" | "daily" | "weekly";

interface AQIDetailChartProps {
  period: Period;
}

const hourlyData = [
  { time: "00:00", aqi: 120 },
  { time: "02:00", aqi: 115 },
  { time: "04:00", aqi: 105 },
  { time: "06:00", aqi: 95 },
  { time: "08:00", aqi: 110 },
  { time: "10:00", aqi: 130 },
  { time: "12:00", aqi: 145 },
  { time: "14:00", aqi: 155 },
  { time: "16:00", aqi: 160 },
  { time: "18:00", aqi: 150 },
  { time: "20:00", aqi: 142 },
  { time: "22:00", aqi: 135 },
  { time: "Now", aqi: 142 },
];

const dailyData = [
  { time: "Mon", aqi: 95 },
  { time: "Tue", aqi: 110 },
  { time: "Wed", aqi: 125 },
  { time: "Thu", aqi: 142 },
  { time: "Fri", aqi: 135 },
  { time: "Sat", aqi: 120 },
  { time: "Sun", aqi: 115 },
];

const weeklyData = [
  { time: "Week 1", aqi: 105 },
  { time: "Week 2", aqi: 115 },
  { time: "Week 3", aqi: 130 },
  { time: "Week 4", aqi: 142 },
];

export function AQIDetailChart({ period }: AQIDetailChartProps) {
  const data =
    period === "hourly"
      ? hourlyData
      : period === "daily"
        ? dailyData
        : weeklyData;

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
