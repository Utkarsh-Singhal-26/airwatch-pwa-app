"use client";

import { AQIChart } from "@/components/aqi-chart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "@/hooks/useSession";
import { AQI } from "@/interfaces/aqi";
import { fetchAQIData } from "@/lib/dashboard";
import { getAQILabel } from "@/lib/map-data";
import {
  ArrowLeft,
  Copy,
  Facebook,
  Linkedin,
  Mail,
  MessageCircle,
  Share2,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Share() {
  const { session } = useSession();

  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
    name: string;
  } | null>(session?.settings.locationAccess ? session.aqiData.location : null);
  const [aqiData, setAqiData] = useState<AQI | null>(null);

  useEffect(() => {
    if (!session) return;

    const fetchData = () => {
      fetchAQIData(
        (loc) => setLocation(loc),
        (data) => setAqiData(data),
        (isLoading) => setLoading(isLoading)
      );
    };

    fetchData();
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [session]);

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-lg font-medium text-gray-600">
          Please log in to view air quality data.
        </p>
      </div>
    );
  }

  const getShareMessage = () => {
    if (!aqiData || !location) return "";

    return `Current Air Quality in ${location.name}:
AQI: ${aqiData.aqi} (${getAQILabel(aqiData.aqi)})
PM2.5: ${aqiData.pm25} µg/m³
Last updated: ${new Date(aqiData.lastUpdated).toLocaleTimeString()}`;
  };

  const shareUrl = `https://airwatch.vercel.app/dashboard/share-details?lat=${location?.lat || ""}&lng=${
    location?.lng || ""
  }&name=${encodeURIComponent(location?.name || "")}`;

  const handleShare = async () => {
    const shareData = {
      title: "AirWatch - Real-time Air Quality",
      text: getShareMessage(),
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(
          `${shareData.text}\n\nCheck it out: ${shareUrl}`
        );
        alert("Share link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto max-w-md p-4">
        <header className="mb-6 flex items-center">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Share Air Quality</h1>
        </header>

        <Card className="mb-6 border-gray-200">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>{location?.name || "Loading..."}</CardTitle>
              <div className="text-sm text-gray-500">
                {loading ? (
                  "Updating..."
                ) : (
                  <>
                    Updated{" "}
                    {aqiData
                      ? new Date(aqiData.lastUpdated).toLocaleTimeString()
                      : "..."}
                  </>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div
                  className={`text-6xl font-bold ${loading ? "opacity-50" : ""}`}
                >
                  {aqiData ? aqiData.aqi : "..."}
                </div>
                <div
                  className={`text-sm font-medium ${loading ? "opacity-50" : ""}`}
                >
                  {aqiData ? getAQILabel(aqiData.aqi) : "Loading..."}
                </div>
              </div>
              <div
                className={`rounded-md bg-gray-50 p-3 ${loading ? "opacity-50" : ""}`}
              >
                <div className="mb-1 text-sm font-medium">
                  Primary Pollutant
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xl font-bold">PM2.5</span>
                  <span className="text-sm text-gray-600">
                    {aqiData ? `${aqiData.pm25} µg/m³` : "..."}
                  </span>
                </div>
              </div>
            </div>

            <AQIChart aqiData={aqiData} loading={loading} />

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-md bg-gray-50 p-3">
                <div className="text-xs text-gray-500">Visibility</div>
                <div className="font-medium">
                  {aqiData ? `${aqiData.visibility} km` : "..."}
                </div>
              </div>
              <div className="rounded-md bg-gray-50 p-3">
                <div className="text-xs text-gray-500">Pressure</div>
                <div className="font-medium">
                  {aqiData ? `${aqiData.pressure} hPa` : "..."}
                </div>
              </div>
            </div>

            <Button
              className="mt-6 w-full"
              size="lg"
              onClick={handleShare}
              disabled={!aqiData || !location}
            >
              <Share2 className="mr-2 h-5 w-5" />
              Share Air Quality
            </Button>
          </CardContent>
        </Card>

        <Card className="mb-6 border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle>Share Options</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="social" className="w-full">
              <TabsList className="mb-4 grid w-full grid-cols-2">
                <TabsTrigger value="social">Social Media</TabsTrigger>
                <TabsTrigger value="message">Message</TabsTrigger>
              </TabsList>

              <TabsContent value="social" className="mt-0">
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant="outline"
                    className="flex flex-col items-center gap-2 p-4 border-gray-200 h-16"
                  >
                    <Twitter className="h-6 w-6" />
                    <span className="text-xs">Twitter</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex flex-col items-center gap-2 p-4 border-gray-200 h-16"
                  >
                    <Facebook className="h-6 w-6" />
                    <span className="text-xs">Facebook</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex flex-col items-center gap-2 p-4 border-gray-200 h-16"
                  >
                    <Linkedin className="h-6 w-6" />
                    <span className="text-xs">LinkedIn</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex flex-col items-center gap-2 p-4 border-gray-200 h-16"
                  >
                    <MessageCircle className="h-6 w-6" />
                    <span className="text-xs">WhatsApp</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex flex-col items-center gap-2 p-4 border-gray-200 h-16"
                  >
                    <Mail className="h-6 w-6" />
                    <span className="text-xs">Email</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex flex-col items-center gap-2 p-4 border-gray-200 h-16"
                    onClick={handleShare}
                  >
                    <Copy className="h-6 w-6" />
                    <span className="text-xs">Copy</span>
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="message" className="mt-0">
                <div className="space-y-4">
                  <div>
                    <Textarea
                      className="h-32 resize-none"
                      value={getShareMessage()}
                      readOnly
                    />
                  </div>
                  <Button
                    className="w-full bg-black text-white hover:bg-gray-800"
                    onClick={handleShare}
                  >
                    Share Message
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="mb-6 border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-gray-200 p-4">
              <div className="mb-2 text-lg font-bold">AirWatch Alert</div>
              <div className="mb-2 text-sm">
                Current Air Quality in {location?.name || "Loading..."} is{" "}
                <span className="font-medium">
                  {aqiData
                    ? `${getAQILabel(aqiData.aqi).toUpperCase()} (AQI: ${
                        aqiData.aqi
                      })`
                    : "Loading..."}
                </span>
              </div>
              <div className="mb-2 text-sm">
                Primary pollutant: PM2.5 (
                {aqiData ? `${aqiData.pm25} µg/m³` : "..."})
              </div>
              <div className="mb-2 text-sm">
                Health advisory:{" "}
                {aqiData && aqiData.aqi > 150
                  ? "Avoid outdoor activities. Everyone may experience health effects."
                  : aqiData && aqiData.aqi > 100
                    ? "Limit outdoor activities. Sensitive groups should stay indoors."
                    : "Air quality is acceptable for most people."}
              </div>
              <div className="text-xs text-gray-500">
                Shared via AirWatch • {new Date().toLocaleDateString()}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
