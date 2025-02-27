"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Bell,
  Calendar,
  Info,
  MapPin,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [locationPermission, setLocationPermission] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState(false);

  // User profile data
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [healthConditions, setHealthConditions] = useState<string[]>([]);
  const [outdoorActivities, setOutdoorActivities] = useState<string[]>([]);
  const [commute, setCommute] = useState("");

  const handleHealthConditionChange = (condition: string) => {
    setHealthConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((item) => item !== condition)
        : [...prev, condition]
    );
  };

  const handleOutdoorActivityChange = (activity: string) => {
    setOutdoorActivities((prev) =>
      prev.includes(activity)
        ? prev.filter((item) => item !== activity)
        : [...prev, activity]
    );
  };

  const nextStep = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      // Save user profile data to local storage or state management solution
      const userProfile = {
        name,
        age: Number.parseInt(age),
        gender,
        activityLevel,
        healthConditions,
        outdoorActivities,
        commute,
      };
      localStorage.setItem("userProfile", JSON.stringify(userProfile));
      router.push("/dashboard");
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <Card className="w-full max-w-md border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl">
            {step === 1 && "Welcome to AirWatch"}
            {step === 2 && "Understanding Air Quality"}
            {step === 3 && "Personalize Your Experience"}
            {step === 4 && "Tell Us About Yourself"}
            {step === 5 && "Your Activities & Health"}
          </CardTitle>
          <CardDescription>
            {step === 1 &&
              "Monitor air quality in real-time and get personalized recommendations"}
            {step === 2 && "Learn how AQI levels affect your health"}
            {step === 3 && "Set your preferences for a better experience"}
            {step === 4 && "Help us personalize your experience"}
            {step === 5 && "For AI-powered personalized recommendations"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-center p-6">
                <Info className="h-16 w-16 text-black" />
              </div>
              <p className="text-center text-gray-700">
                AirWatch provides real-time air quality data, personalized
                recommendations, and alerts to help you make informed decisions
                about outdoor activities.
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="grid gap-2">
                <div className="flex items-center justify-between border-b border-gray-100 py-2">
                  <span className="font-medium">Good (0-50)</span>
                  <span className="text-sm text-gray-600">
                    Minimal health risk
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-100 py-2">
                  <span className="font-medium">Moderate (51-100)</span>
                  <span className="text-sm text-gray-600">
                    Minor respiratory concerns
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-100 py-2">
                  <span className="font-medium">Unhealthy (101-150)</span>
                  <span className="text-sm text-gray-600">
                    Sensitive groups affected
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-100 py-2">
                  <span className="font-medium">Very Unhealthy (151+)</span>
                  <span className="text-sm text-gray-600">
                    Health warnings for everyone
                  </span>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <Label htmlFor="location">Location Access</Label>
                </div>
                <Switch
                  id="location"
                  checked={locationPermission}
                  onCheckedChange={setLocationPermission}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <Label htmlFor="notifications">Notifications</Label>
                </div>
                <Switch
                  id="notifications"
                  checked={notificationPermission}
                  onCheckedChange={setNotificationPermission}
                />
              </div>

              {/* Removed AQI Alert Threshold slider */}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <Label htmlFor="name">Your Name</Label>
              </div>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <Label htmlFor="age">Your Age</Label>
                  </div>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">
                        Prefer not to say
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <Label htmlFor="activity-level">Activity Level</Label>
                </div>
                <Select value={activityLevel} onValueChange={setActivityLevel}>
                  <SelectTrigger id="activity-level">
                    <SelectValue placeholder="Select your activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">
                      Sedentary (Little to no exercise)
                    </SelectItem>
                    <SelectItem value="light">
                      Light (Light exercise 1-3 days/week)
                    </SelectItem>
                    <SelectItem value="moderate">
                      Moderate (Moderate exercise 3-5 days/week)
                    </SelectItem>
                    <SelectItem value="active">
                      Active (Hard exercise 6-7 days/week)
                    </SelectItem>
                    <SelectItem value="very-active">
                      Very Active (Professional athlete)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Do you have any of these health conditions?</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="asthma"
                      checked={healthConditions.includes("asthma")}
                      onCheckedChange={() =>
                        handleHealthConditionChange("asthma")
                      }
                    />
                    <Label htmlFor="asthma" className="text-sm">
                      Asthma
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="allergies"
                      checked={healthConditions.includes("allergies")}
                      onCheckedChange={() =>
                        handleHealthConditionChange("allergies")
                      }
                    />
                    <Label htmlFor="allergies" className="text-sm">
                      Allergies
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="copd"
                      checked={healthConditions.includes("copd")}
                      onCheckedChange={() =>
                        handleHealthConditionChange("copd")
                      }
                    />
                    <Label htmlFor="copd" className="text-sm">
                      COPD
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="heart-disease"
                      checked={healthConditions.includes("heart-disease")}
                      onCheckedChange={() =>
                        handleHealthConditionChange("heart-disease")
                      }
                    />
                    <Label htmlFor="heart-disease" className="text-sm">
                      Heart Disease
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="none"
                      checked={healthConditions.includes("none")}
                      onCheckedChange={() =>
                        handleHealthConditionChange("none")
                      }
                    />
                    <Label htmlFor="none" className="text-sm">
                      None
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>What outdoor activities do you regularly do?</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="running"
                      checked={outdoorActivities.includes("running")}
                      onCheckedChange={() =>
                        handleOutdoorActivityChange("running")
                      }
                    />
                    <Label htmlFor="running" className="text-sm">
                      Running
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="cycling"
                      checked={outdoorActivities.includes("cycling")}
                      onCheckedChange={() =>
                        handleOutdoorActivityChange("cycling")
                      }
                    />
                    <Label htmlFor="cycling" className="text-sm">
                      Cycling
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="walking"
                      checked={outdoorActivities.includes("walking")}
                      onCheckedChange={() =>
                        handleOutdoorActivityChange("walking")
                      }
                    />
                    <Label htmlFor="walking" className="text-sm">
                      Walking
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="team-sports"
                      checked={outdoorActivities.includes("team-sports")}
                      onCheckedChange={() =>
                        handleOutdoorActivityChange("team-sports")
                      }
                    />
                    <Label htmlFor="team-sports" className="text-sm">
                      Team Sports
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>How do you usually commute?</Label>
                <RadioGroup value={commute} onValueChange={setCommute}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="car" id="car" />
                    <Label htmlFor="car">Car</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="public-transport"
                      id="public-transport"
                    />
                    <Label htmlFor="public-transport">Public Transport</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bicycle" id="bicycle" />
                    <Label htmlFor="bicycle">Bicycle</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="walking" id="walking-commute" />
                    <Label htmlFor="walking-commute">Walking</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={step === 1}
            className="border-gray-200"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button
            onClick={nextStep}
            className="bg-black text-white hover:bg-gray-800"
          >
            {step < 5 ? "Next" : "Get Started"}{" "}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
