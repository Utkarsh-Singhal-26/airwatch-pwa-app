import { createSession, deleteSession, getSession } from "@/app/actions";
import { UserSession } from "@/interfaces/session";
import { AIAgent } from "@/lib/ai-agent";
import { getCurrentLocation, getLocationName } from "@/lib/dashboard";
import { getAQIData } from "@/lib/map-data";
import { useCallback, useEffect, useState } from "react";

export function useSession() {
  const [session, setSession] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSession = useCallback(async () => {
    try {
      const response: UserSession | Error = await getSession();
      if (response instanceof Error) {
        throw response;
      }
      setSession(response);
    } catch (error) {
      console.error("Error fetching session:", error);
      setSession(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSession = useCallback(async (updates: Partial<UserSession>) => {
    try {
      const response: UserSession | Error = await createSession(updates);
      if (response instanceof Error) {
        throw response;
      }
      setSession(response);
      return response;
    } catch (error) {
      console.error("Error updating session:", error);
      throw new Error("Failed to update session");
    }
  }, []);

  const clearSession = useCallback(async () => {
    try {
      await deleteSession();
      setSession(null);
    } catch (error) {
      console.error("Error clearing session:", error);
      throw new Error("Failed to clear session");
    }
  }, []);

  const updateAQIData = useCallback(async () => {
    if (!session?.settings.locationAccess) return null;

    try {
      const position = await getCurrentLocation();
      if (!position) {
        throw new Error("Could not get current location");
      }

      const { latitude: lat, longitude: lng } = position.coords;
      const name = await getLocationName(lat, lng);

      const aqi = await getAQIData(lat, lng);
      if (aqi === null) {
        throw new Error("Could not fetch AQI data");
      }

      const response = await fetch(
        `https://api.waqi.info/feed/geo:${lat};${lng}/?token=${process.env.NEXT_PUBLIC_WAQI_API_TOKEN}`
      );

      if (!response.ok) {
        throw new Error(`WAQI API returned status: ${response.status}`);
      }

      const data = await response.json();
      if (!data || data.status !== "ok" || !data.data) {
        throw new Error("Invalid WAQI data structure");
      }

      const time = data.data.time?.iso
        ? new Date(data.data.time.iso).getTime()
        : Date.now();

      await updateSession({
        ...session,
        aqiData: {
          value: aqi,
          lastUpdated: time,
          location: {
            lat,
            lng,
            name,
          },
        },
      });

      return aqi;
    } catch (error) {
      console.error("Error updating AQI data:", error);
      return null;
    }
  }, [session, updateSession]);

  const needsUpdate = useCallback((lastUpdated: number | undefined) => {
    if (!lastUpdated) return true;

    const lastDate = new Date(lastUpdated);
    const now = new Date();

    return (
      lastDate.getDate() !== now.getDate() ||
      lastDate.getMonth() !== now.getMonth() ||
      lastDate.getFullYear() !== now.getFullYear()
    );
  }, []);

  const getDailyChallenge = useCallback(async () => {
    if (!session?.user) return null;

    const shouldUpdateChallenge = needsUpdate(
      session.dailyChallenge?.lastUpdated
    );
    const shouldUpdateRecommendations = needsUpdate(
      session.recommendations?.lastUpdated
    );

    if (shouldUpdateChallenge || shouldUpdateRecommendations) {
      try {
        const currentAQI = session.aqiData?.value ?? 142;
        const aiAgent = new AIAgent(session.user);

        const [challenge, recommendations] = await Promise.all([
          shouldUpdateChallenge ? aiAgent.getDailyChallenge(currentAQI) : null,
          shouldUpdateRecommendations
            ? aiAgent.getPersonalizedRecommendations(currentAQI)
            : null,
        ]);

        const now = Date.now();
        const updates: Partial<UserSession> = {
          ...session,
        };

        if (shouldUpdateChallenge && challenge) {
          updates.dailyChallenge = {
            lastUpdated: now,
            completed: false,
            challenge,
          };
        }

        if (shouldUpdateRecommendations && recommendations) {
          updates.recommendations = {
            lastUpdated: now,
            items: recommendations,
          };
        }

        const updatedSession = await updateSession(updates);
        return updatedSession.dailyChallenge;
      } catch (error) {
        console.error(
          "Error generating daily challenge and recommendations:",
          error
        );
        return null;
      }
    }

    return session.dailyChallenge;
  }, [session, updateSession, needsUpdate]);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  return {
    session,
    loading,
    updateSession,
    clearSession,
    getDailyChallenge,
    updateAQIData,
  };
}
