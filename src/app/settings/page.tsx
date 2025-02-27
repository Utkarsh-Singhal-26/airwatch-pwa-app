"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Bell,
  ChevronRight,
  Home,
  Info,
  Leaf,
  LogOut,
  Map,
  MapPin,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto max-w-md p-4">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Settings</h1>
        </header>

        <Card className="mb-6 border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <Label htmlFor="push-notifications">Push Notifications</Label>
              </div>
              <Switch id="push-notifications" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <Label htmlFor="daily-forecast">Daily Forecast</Label>
              </div>
              <Switch id="daily-forecast" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <Label htmlFor="aqi-alerts">AQI Alerts</Label>
              </div>
              <Switch id="aqi-alerts" defaultChecked />
            </div>

            <div className="space-y-2">
              <Label>AQI Alert Threshold: 100</Label>
              <Slider
                defaultValue={[100]}
                min={50}
                max={200}
                step={1}
                onValueChange={(value) => console.log(value)}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>50</span>
                <span>100</span>
                <span>150</span>
                <span>200</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle>Location Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <Label htmlFor="location-access">Location Access</Label>
              </div>
              <Switch id="location-access" defaultChecked />
            </div>

            <div className="space-y-2">
              <Label>Temperature Unit</Label>
              <RadioGroup defaultValue="celsius">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="celsius" id="celsius" />
                  <Label htmlFor="celsius">Celsius (°C)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fahrenheit" id="fahrenheit" />
                  <Label htmlFor="fahrenheit">Fahrenheit (°F)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="rounded-md bg-gray-50 p-3">
              <div className="font-medium">Saved Locations</div>
              <div className="mt-2 space-y-2">
                <div className="flex items-center justify-between">
                  <span>New Delhi (Current)</span>
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span>Mumbai</span>
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span>Bangalore</span>
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle>Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="flex w-full items-center justify-between border-gray-200"
            >
              <div className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                <span>Profile</span>
              </div>
              <ChevronRight className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              className="flex w-full items-center justify-between border-gray-200"
            >
              <div className="flex items-center">
                <Info className="mr-2 h-5 w-5" />
                <span>About</span>
              </div>
              <ChevronRight className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              className="flex w-full items-center justify-between border-gray-200"
            >
              <div className="flex items-center">
                <LogOut className="mr-2 h-5 w-5" />
                <span>Sign Out</span>
              </div>
              <ChevronRight className="h-4 w-4" />
            </Button>
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
                <Home className="h-5 w-5" />
                <span className="text-xs">Home</span>
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
                <Settings className="h-5 w-5 text-black" />
                <span className="text-xs font-medium">Settings</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
