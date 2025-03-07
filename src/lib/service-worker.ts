"use client";

import { useEffect } from "react";
import { initializeMessaging } from "./notification";

export default function ServiceWorker() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      if (navigator.serviceWorker) {
        navigator.serviceWorker
          .register("/firebase-messaging-sw.js")
          .then((registration) => {
            console.log(
              "Service Worker registered with scope:",
              registration.scope
            );
            initializeMessaging();
          })
          .catch((error) => {
            console.error("Service Worker registration failed:", error);
          });
      }
    }
  }, []);

  return null;
}
