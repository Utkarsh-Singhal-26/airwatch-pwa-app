"use server";

import { UserSession } from "@/interfaces/session";
import { cookies } from "next/headers";

const SESSION_EXPIRATION_TIME = process.env.SESSION_EXPIRATION_TIME;
const SESSION_KEY = process.env.SESSION_KEY;

if (!SESSION_EXPIRATION_TIME) {
  throw new Error("SESSION_EXPIRATION_TIME is not defined");
}

if (!SESSION_KEY) {
  throw new Error("SESSION_KEY is not defined");
}

async function getSession(): Promise<UserSession | Error> {
  try {
    const cookieStore = await cookies();
    const currentSessionCookie = cookieStore.get(SESSION_KEY as string);

    return currentSessionCookie?.value
      ? JSON.parse(currentSessionCookie.value)
      : new Error("No session found");
  } catch (error) {
    return new Error("Failed to get session", { cause: error });
  }
}

async function createSession(
  session: Partial<UserSession>
): Promise<UserSession | Error> {
  try {
    const cookieStore = await cookies();
    const currentSessionCookie = cookieStore.get(SESSION_KEY as string);

    const expirationDate = new Date(
      Date.now() + +(SESSION_EXPIRATION_TIME as string)
    );

    const updatedSession = {
      ...(currentSessionCookie?.value
        ? JSON.parse(currentSessionCookie.value)
        : {
            expiresAt: expirationDate.getTime(),
            user: {
              name: "",
              email: "",
              phone: "",
            },
            settings: {
              pushNotifications: false,
              dailyForecast: false,
              aqiAlerts: false,
              aqiThreshold: 100,
              locationAccess: false,
              temperatureUnit: "celsius",
            },
            dailyChallenge: {
              lastUpdated: Date.now(),
              completed: false,
            },
          }),
      ...session,
    };

    cookieStore.set(SESSION_KEY as string, JSON.stringify(updatedSession), {
      expires: expirationDate,
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return await getSession();
  } catch (error) {
    return new Error("Failed to create session", { cause: error });
  }
}

async function deleteSession(): Promise<void | Error> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_KEY as string);
  } catch (error) {
    return new Error("Failed to delete session", { cause: error });
  }
}

export { createSession, deleteSession, getSession };
