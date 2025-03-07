import {
  createSession,
  deleteSession,
  getSession,
  isSessionValid,
  updateAqiData,
  updateDailyChallenge,
  updateNotificationTime,
  updateRecommendations,
} from "@/app/actions";
import { UserSession } from "@/interfaces/session";
import { AIAgent } from "@/lib/ai-agent";
import { getCurrentLocation, getLocationName } from "@/lib/dashboard";
import { getAQIData } from "@/lib/map-data";
import { useCallback, useEffect, useState } from "react";

export function useSession() {
  const [session, setSession] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSession = useCallback(() => {
    try {
      const response = getSession();
      if (response instanceof Error) {
        throw response;
      }
      setSession(response);
    } catch {
      setSession(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSession = useCallback(async (updates: Partial<UserSession>) => {
    try {
      const response = await createSession(updates);
      if (response instanceof Error) {
        throw response;
      }
      setSession(response);
      return response;
    } catch {
      throw new Error("Failed to update session");
    }
  }, []);

  const clearSession = useCallback(() => {
    try {
      deleteSession();
      setSession(null);
    } catch {
      throw new Error("Failed to clear session");
    }
  }, []);

  const updateAQIData = useCallback(async () => {
    if (!session?.settings.locationAccess) return null;

    try {
      const position = await getCurrentLocation();
      if (!position) return null;

      const { latitude: lat, longitude: lng } = position.coords;
      const name = await getLocationName(lat, lng);
      const aqi = await getAQIData(lat, lng);
      if (!aqi) return null;

      const updatedSession = await updateAqiData(aqi, { lat, lng, name });
      setSession(updatedSession instanceof Error ? session : updatedSession);
      return updateSession;
    } catch {
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
          await updateDailyChallenge(challenge);
        }

        if (shouldUpdateRecommendations && recommendations) {
          updates.recommendations = {
            lastUpdated: now,
            items: recommendations,
          };
          await updateRecommendations(recommendations);
        }

        const updatedSession = await updateSession(updates);
        return updatedSession.dailyChallenge;
      } catch {
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
    isSessionValid,
    updateNotificationTime,
    updateAqiData,
    updateDailyChallenge,
    updateRecommendations,
  };
}
