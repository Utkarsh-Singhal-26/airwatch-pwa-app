"use client";

import { AQIDetailChart } from "@/components/aqi-detail-chart";
import { PollutantChart } from "@/components/pollutant-chart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Info } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Details() {
  const [activeTab, setActiveTab] = useState("hourly");

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto max-w-md p-4">
        <header className="mb-6 flex items-center">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Detailed Air Quality</h1>
        </header>

        <Card className="mb-6 border-gray-200">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>New Delhi</CardTitle>
              <div className="text-sm text-gray-500">Updated 5 minutes ago</div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <div className="text-6xl font-bold">142</div>
                <div className="text-sm font-medium">Unhealthy</div>
              </div>
              <div className="rounded-md bg-gray-50 p-3">
                <div className="mb-1 text-sm font-medium">
                  Primary Pollutant
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xl font-bold">PM2.5</span>
                  <span className="text-sm text-gray-600">85 µg/m³</span>
                </div>
              </div>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-3">
              <div className="rounded-md bg-gray-50 p-3">
                <div className="text-xs text-gray-500">Health Risk</div>
                <div className="font-medium">High</div>
              </div>
              <div className="rounded-md bg-gray-50 p-3">
                <div className="text-xs text-gray-500">Visibility</div>
                <div className="font-medium">3.2 km</div>
              </div>
              <div className="rounded-md bg-gray-50 p-3">
                <div className="text-xs text-gray-500">Pressure</div>
                <div className="font-medium">1012 hPa</div>
              </div>
              <div className="rounded-md bg-gray-50 p-3">
                <div className="text-xs text-gray-500">UV Index</div>
                <div className="font-medium">5 (Moderate)</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle>AQI Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="hourly"
              className="w-full"
              onValueChange={setActiveTab}
            >
              <TabsList className="mb-4 grid w-full grid-cols-3">
                <TabsTrigger value="hourly">Hourly</TabsTrigger>
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
              </TabsList>
              <TabsContent value="hourly" className="mt-0">
                <AQIDetailChart period="hourly" />
              </TabsContent>
              <TabsContent value="daily" className="mt-0">
                <AQIDetailChart period="daily" />
              </TabsContent>
              <TabsContent value="weekly" className="mt-0">
                <AQIDetailChart period="weekly" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="mb-6 border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle>Pollutant Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 grid grid-cols-2 gap-3">
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
              <div className="flex justify-between rounded-md border border-gray-100 p-2">
                <span>SO2</span>
                <span className="font-medium">12 ppb</span>
              </div>
              <div className="flex justify-between rounded-md border border-gray-100 p-2">
                <span>CO</span>
                <span className="font-medium">0.8 ppm</span>
              </div>
            </div>

            <PollutantChart />

            <div className="mt-4 rounded-md bg-gray-50 p-3">
              <div className="mb-1 flex items-center">
                <Info className="mr-2 h-4 w-4" />
                <span className="font-medium">What does this mean?</span>
              </div>
              <p className="text-sm text-gray-600">
                PM2.5 is the primary pollutant, with levels 3.4x higher than WHO
                guidelines. These fine particles can penetrate deep into the
                lungs and bloodstream, causing respiratory and cardiovascular
                issues.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle>Health Impact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-md bg-gray-50 p-3">
              <div className="font-medium">General Population</div>
              <p className="text-sm text-gray-600">
                Increased likelihood of respiratory symptoms in sensitive
                individuals. Everyone may begin to experience health effects.
              </p>
            </div>
            <div className="rounded-md bg-gray-50 p-3">
              <div className="font-medium">Sensitive Groups</div>
              <p className="text-sm text-gray-600">
                People with respiratory or heart disease, the elderly and
                children should limit prolonged outdoor exertion.
              </p>
            </div>
            <div className="rounded-md bg-gray-50 p-3">
              <div className="font-medium">Long-term Exposure</div>
              <p className="text-sm text-gray-600">
                Prolonged exposure may lead to increased rates of chronic
                bronchitis, reduced lung function and increased mortality from
                lung cancer and heart disease.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
