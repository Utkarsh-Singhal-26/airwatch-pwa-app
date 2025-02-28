"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@/context/user";
import { AIAgent } from "@/lib/ai-agent";
import { CheckCircle2, Home, Leaf, Map, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Actions() {
  const router = useRouter();
  const { currentUser } = useUser();

  const [isUserLoading, setIsUserLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [dailyChallenge, setDailyChallenge] = useState<{
    dailyChallenge: string;
    completed: boolean;
  }>({
    dailyChallenge: "",
    completed: false,
  });
  const [loading, setLoading] = useState(true);
  const [currentAQI] = useState(142);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsUserLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!currentUser) {
      router.push("/");
      return;
    }

    const fetchAIData = async () => {
      try {
        const aiAgent = new AIAgent(currentUser);

        const [recommendationsData, challengeData] = await Promise.all([
          aiAgent.getPersonlizedRecommendations(currentAQI),
          aiAgent.getDailyChallenge(currentAQI),
        ]);

        setRecommendations(recommendationsData);
        setDailyChallenge({
          dailyChallenge: challengeData,
          completed: false,
        });
      } catch (error) {
        console.error("Error fetching AI data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAIData();

    const storedChallenge = localStorage.getItem("dailyChallenge");
    if (storedChallenge) {
      const { dailyChallenge, completed } = JSON.parse(storedChallenge);
      setDailyChallenge({
        dailyChallenge,
        completed,
      });
    }
  }, [currentUser, router, currentAQI]);

  if (isUserLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4">Loading user session...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    router.push("/");
    return;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4">Loading your personalized recommendations...</p>
        </div>
      </div>
    );
  }

  const handleDailyChallengeCompletion = () => {
    setDailyChallenge({
      dailyChallenge: dailyChallenge.dailyChallenge,
      completed: true,
    });
    localStorage.setItem(
      "dailyChallenge",
      JSON.stringify({
        dailyChallenge,
        completed: true,
      })
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto max-w-md p-4">
        <header className="mb-6 flex flex-col items-start justify-between">
          <h1 className="text-2xl font-bold">Climate Actions</h1>
          <div className="text-sm text-gray-600">
            Welcome, {currentUser.name}
          </div>
        </header>

        <Card className="mb-6 border-gray-200">
          <CardHeader>
            <CardTitle>Today&apos;s AI Challenge</CardTitle>
            <CardDescription>Personalized for your profile</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 rounded-md bg-gray-50 p-4">
              <div className="mb-2 flex items-center">
                <span className="font-medium">
                  {dailyChallenge.dailyChallenge.split(`"`)[1]}
                </span>
              </div>
              <p className="mb-3 text-sm text-gray-600">
                Based on your commute preferences and today&apos;s AQI of{" "}
                {currentAQI}, taking the metro instead of cycling can reduce
                your exposure to harmful pollutants by up to 60%. This also
                reduces your carbon footprint by 3.2 kg CO₂ today.
              </p>
            </div>
            <Button
              variant={dailyChallenge.completed ? "outline" : "default"}
              className="w-full"
              onClick={handleDailyChallengeCompletion}
              disabled={dailyChallenge.completed}
            >
              {dailyChallenge.completed
                ? "Completed for today"
                : "Mark as Complete"}
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
            {recommendations.map((recommendation, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-md bg-gray-50 p-3"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0" />
                <div>
                  <div className="font-medium">Recommendation {index + 1}</div>
                  <p className="text-sm text-gray-600">
                    {recommendation.split(". ")[1].split(`"`)[1]}
                  </p>
                </div>
              </div>
            ))}
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
