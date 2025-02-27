"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Award,
  Calendar,
  CheckCircle2,
  Home,
  Leaf,
  Map,
  Settings,
} from "lucide-react";
import Link from "next/link";

export default function Actions() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto max-w-md p-4">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Climate Actions</h1>
        </header>

        <Card className="mb-6 border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle>Today&apos;s AI Challenge</CardTitle>
            <CardDescription>Personalized for your profile</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 rounded-md bg-gray-50 p-4">
              <div className="mb-2 flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                <span className="font-medium">Use public transport</span>
              </div>
              <p className="mb-3 text-sm text-gray-600">
                Based on your commute preferences and today&apos;s AQI of 142,
                taking the metro instead of cycling can reduce your exposure to
                harmful pollutants by up to 60%. This also reduces your carbon
                footprint by 3.2 kg CO₂ today.
              </p>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="font-medium">2</span> of{" "}
                  <span className="font-medium">5</span> days completed
                </div>
                <Progress value={40} className="h-2 w-24" />
              </div>
            </div>
            <Button className="w-full bg-black text-white hover:bg-gray-800">
              Mark as Complete
            </Button>
          </CardContent>
        </Card>

        <Card className="mb-6 border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle>AI Personalized Recommendations</CardTitle>
            <CardDescription>
              Based on your health profile and activities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3 rounded-md bg-gray-50 p-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0" />
              <div>
                <div className="font-medium">Safe Hours for Running</div>
                <p className="text-sm text-gray-600">
                  With your asthma condition, today&apos;s best time for your
                  running routine is between 6 AM - 7:30 AM when AQI is forecast
                  to be below 100.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-md bg-gray-50 p-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0" />
              <div>
                <div className="font-medium">Indoor Air Management</div>
                <p className="text-sm text-gray-600">
                  Run your air purifier on high setting from 10 AM - 4 PM today
                  when outdoor pollution is expected to peak in your
                  neighborhood.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-md bg-gray-50 p-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0" />
              <div>
                <div className="font-medium">Local Initiative</div>
                <p className="text-sm text-gray-600">
                  Based on your interests, there&apos;s a community tree
                  planting event this weekend at Central Park, 2 km from your
                  location.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle>Your AI-Analyzed Impact</CardTitle>
            <CardDescription>
              Personalized environmental contribution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center justify-center">
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-4 border-gray-200">
                <div className="absolute h-24 w-24 rounded-full border-4 border-black"></div>
                <Award className="h-10 w-10" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-md bg-gray-50 p-2">
                <div className="text-xl font-bold">12</div>
                <div className="text-xs text-gray-600">
                  Challenges Completed
                </div>
              </div>
              <div className="rounded-md bg-gray-50 p-2">
                <div className="text-xl font-bold">45</div>
                <div className="text-xs text-gray-600">Days Tracked</div>
              </div>
              <div className="rounded-md bg-gray-50 p-2">
                <div className="text-xl font-bold">120</div>
                <div className="text-xs text-gray-600">kg CO₂ Saved</div>
              </div>
            </div>
            <div className="mt-4 rounded-md bg-gray-50 p-3">
              <p className="text-sm text-gray-600">
                Based on your activity profile and completed challenges,
                you&apos;ve reduced your carbon footprint by 18% compared to the
                average user in your area. Your consistent use of public
                transport on high AQI days has contributed most to this
                reduction.
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
                <Leaf className="h-5 w-5 text-black" />
                <span className="text-xs font-medium">Actions</span>
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
