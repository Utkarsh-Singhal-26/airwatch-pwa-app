"use client";

import { AQIChart } from "@/components/aqi-chart";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertTriangle,
  Droplets,
  Home,
  Leaf,
  Map,
  RefreshCw,
  Settings,
  Share2,
  Thermometer,
  Wind,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto max-w-md p-4">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">AirWatch</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={refreshData}
            disabled={loading}
          >
            <RefreshCw className={`h-5 w-5 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </header>

        <Card className="mb-6 border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>Current Air Quality</span>
              <span className="text-sm text-gray-500">New Delhi</span>
            </CardTitle>
            <CardDescription>Updated 5 minutes ago</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-6xl font-bold">142</div>
                <div className="text-sm font-medium">Unhealthy</div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex flex-col items-center">
                  <Thermometer className="mb-1 h-5 w-5" />
                  <span>32°C</span>
                </div>
                <div className="flex flex-col items-center">
                  <Droplets className="mb-1 h-5 w-5" />
                  <span>65%</span>
                </div>
                <div className="flex flex-col items-center">
                  <Wind className="mb-1 h-5 w-5" />
                  <span>8 km/h</span>
                </div>
                <div className="flex flex-col items-center">
                  <AlertTriangle className="mb-1 h-5 w-5" />
                  <span>PM2.5</span>
                </div>
              </div>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between rounded-md border border-gray-100 p-2">
                <span>PM2.5</span>
                <span className="font-medium">85 µg/m³</span>
              </div>
              <div className="flex justify-between rounded-md border border-gray-100 p-2">
                <span>PM10</span>
                <span className="font-medium">120 µg/m³</span>
              </div>
              <div className="flex justify-between rounded-md border border-gray-100 p-2">
                <span>NO2</span>
                <span className="font-medium">45 ppb</span>
              </div>
              <div className="flex justify-between rounded-md border border-gray-100 p-2">
                <span>O3</span>
                <span className="font-medium">30 ppb</span>
              </div>
            </div>

            <div className="flex justify-between">
              <Link href="/dashboard/share">
                <Button variant="outline" size="sm" className="border-gray-200">
                  <Share2 className="mr-1 h-4 w-4" /> Share
                </Button>
              </Link>
              <Link href="/dashboard/details">
                <Button variant="outline" size="sm" className="border-gray-200">
                  View Details
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle>24-Hour Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <AQIChart />
          </CardContent>
        </Card>

        <Card className="mb-6 border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle>AI Health Recommendations</CardTitle>
            <CardDescription>Personalized for John, 32</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-md bg-gray-50 p-3">
              <div className="font-medium">Asthma Management</div>
              <p className="text-sm text-gray-600">
                With your asthma condition, today&apos;s AQI of 142 is
                concerning. Keep your inhaler accessible and consider
                rescheduling your evening run to early morning when pollution
                levels are lower.
              </p>
            </div>
            <div className="rounded-md bg-gray-50 p-3">
              <div className="font-medium">Indoor Air Quality</div>
              <p className="text-sm text-gray-600">
                Use your air purifier on high setting today. Keep windows closed
                during your work hours (9 AM - 5 PM) when pollution typically
                peaks in your area.
              </p>
            </div>
            <div className="rounded-md bg-gray-50 p-3">
              <div className="font-medium">Commute Recommendation</div>
              <p className="text-sm text-gray-600">
                Consider using the metro instead of cycling today. If you must
                cycle, use your N95 mask and take the route through Central Park
                which has 20% lower PM2.5 levels.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white">
        <div className="container mx-auto max-w-md">
          <div className="flex justify-around py-2">
            <Link href="/dashboard">
              <Button
                variant="ghost"
                className="flex flex-col items-center px-4"
              >
                <Home className="h-5 w-5 text-black" />
                <span className="text-xs font-medium">Home</span>
              </Button>
            </Link>
            <Link href="/map">
              <Button
                variant="ghost"
                className="flex flex-col items-center px-4"
              >
                <Map className="h-5 w-5" />
                <span className="text-xs">Map</span>
              </Button>
            </Link>
            <Link href="/actions">
              <Button
                variant="ghost"
                className="flex flex-col items-center px-4"
              >
                <Leaf className="h-5 w-5" />
                <span className="text-xs">Actions</span>
              </Button>
            </Link>
            <Link href="/settings">
              <Button
                variant="ghost"
                className="flex flex-col items-center px-4"
              >
                <Settings className="h-5 w-5" />
                <span className="text-xs">Settings</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
