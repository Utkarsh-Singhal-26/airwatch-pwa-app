"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Home, Leaf, Map, MapPin, Search, Settings, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function MapView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Simulate search results
      setSearchResults(
        [
          "Mumbai, India",
          "Melbourne, Australia",
          "Madrid, Spain",
          "Montreal, Canada",
        ].filter((location) =>
          location.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setSearchResults([]);
    }
  };

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setSearchResults([]);
    setSearchQuery("");
  };

  const clearSelectedLocation = () => {
    setSelectedLocation(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto max-w-md p-4">
        <header className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Air Quality Map</h1>
        </header>

        <div className="mb-4 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search location..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="border-gray-200"
            onClick={handleSearch}
          >
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="border-gray-200">
            <MapPin className="h-4 w-4" />
          </Button>
        </div>

        {searchResults.length > 0 && (
          <Card className="mb-4 border-gray-200">
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {searchResults.map((location, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="flex w-full justify-start rounded-none px-4 py-2 text-left"
                    onClick={() => handleLocationSelect(location)}
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    {location}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="relative mb-6 h-[500px] overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
          {/* Map placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <Map className="mx-auto mb-2 h-12 w-12" />
              <p>Map view with AQI data</p>
              {selectedLocation && (
                <div className="mt-2 font-medium">
                  Showing: {selectedLocation}
                </div>
              )}
            </div>
          </div>

          {/* AQI Legend */}
          <div className="absolute bottom-4 right-4 rounded-md bg-white p-2 shadow-sm">
            <div className="mb-1 text-xs font-medium">AQI Legend</div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
              <div className="flex items-center">
                <div className="mr-1 h-3 w-3 rounded-full bg-gray-300"></div>
                <span>0-50</span>
              </div>
              <div className="flex items-center">
                <div className="mr-1 h-3 w-3 rounded-full bg-gray-500"></div>
                <span>51-100</span>
              </div>
              <div className="flex items-center">
                <div className="mr-1 h-3 w-3 rounded-full bg-gray-700"></div>
                <span>101-150</span>
              </div>
              <div className="flex items-center">
                <div className="mr-1 h-3 w-3 rounded-full bg-black"></div>
                <span>151+</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Card className="border-gray-200">
            <CardContent className="flex items-center justify-between p-3">
              <div>
                <div className="font-medium">New Delhi</div>
                <div className="text-sm text-gray-500">Current Location</div>
              </div>
              <div className="flex items-center">
                <div className="mr-2 text-xl font-bold">142</div>
                <div className="rounded-full bg-gray-700 px-2 py-1 text-xs text-white">
                  Unhealthy
                </div>
              </div>
            </CardContent>
          </Card>

          {selectedLocation && (
            <Card className="border-gray-200">
              <CardContent className="flex items-center justify-between p-3">
                <div>
                  <div className="font-medium">
                    {selectedLocation.split(",")[0]}
                  </div>
                  <div className="text-sm text-gray-500">Searched Location</div>
                </div>
                <div className="flex items-center">
                  <div className="mr-2 text-xl font-bold">
                    {selectedLocation.includes("Mumbai")
                      ? "85"
                      : selectedLocation.includes("Melbourne")
                        ? "45"
                        : selectedLocation.includes("Madrid")
                          ? "62"
                          : "58"}
                  </div>
                  <div
                    className={`rounded-full px-2 py-1 text-xs ${
                      selectedLocation.includes("Mumbai")
                        ? "bg-gray-500 text-white"
                        : selectedLocation.includes("Melbourne")
                          ? "bg-gray-300 text-black"
                          : "bg-gray-500 text-white"
                    }`}
                  >
                    {selectedLocation.includes("Mumbai")
                      ? "Moderate"
                      : selectedLocation.includes("Melbourne")
                        ? "Good"
                        : selectedLocation.includes("Madrid")
                          ? "Moderate"
                          : "Moderate"}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-2"
                    onClick={clearSelectedLocation}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
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
                <Map className="h-5 w-5 text-black" />
                <span className="text-xs font-medium">Map</span>
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
