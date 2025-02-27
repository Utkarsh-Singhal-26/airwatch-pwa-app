"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Check,
  Copy,
  Facebook,
  Linkedin,
  Mail,
  MessageCircle,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Share() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("social");

  const shareUrl = "https://airwatch.app/share/delhi-142";

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
              <CardTitle>New Delhi</CardTitle>
              <div className="text-sm text-gray-500">Updated 5 minutes ago</div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex items-center justify-center">
              <div className="text-center">
                <div className="text-7xl font-bold">142</div>
                <div className="text-lg font-medium">Unhealthy</div>
              </div>
            </div>

            <div className="mb-4 rounded-md bg-gray-50 p-3">
              <div className="mb-2 text-sm font-medium">
                Share this air quality data
              </div>
              <div className="flex items-center">
                <Input value={shareUrl} readOnly className="mr-2 bg-white" />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopy}
                  className="border-gray-200"
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle>Share Options</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="social"
              className="w-full"
              onValueChange={setActiveTab}
            >
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
                      defaultValue={`Current Air Quality in New Delhi is UNHEALTHY (AQI: 142). Primary pollutant is PM2.5. Stay safe and limit outdoor activities. Check more details at: ${shareUrl}`}
                    />
                  </div>
                  <Button className="w-full bg-black text-white hover:bg-gray-800">
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
                Current Air Quality in New Delhi is{" "}
                <span className="font-medium">UNHEALTHY (AQI: 142)</span>
              </div>
              <div className="mb-2 text-sm">
                Primary pollutant: PM2.5 (85 µg/m³)
              </div>
              <div className="mb-2 text-sm">
                Health advisory: Limit outdoor activities. Sensitive groups
                should stay indoors.
              </div>
              <div className="text-xs text-gray-500">
                Shared via AirWatch • February 27, 2025
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
