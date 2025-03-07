import withPWA from "@ducanh2912/next-pwa";
import type { NextConfig } from "next";

const withPWAConfig = withPWA({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  workboxOptions: {
    disableDevLogs: true,
    runtimeCaching: [
      {
        urlPattern: ({ request }) => request.destination === "image",
        handler: "CacheFirst",
        options: {
          cacheName: "images-cache",
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 7 * 24 * 60 * 60,
          },
        },
      },
      {
        urlPattern: ({ request }) =>
          request.destination === "script" || request.destination === "style",
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "static-resources",
          expiration: {
            maxAgeSeconds: 60 * 60 * 24 * 30,
          },
        },
      },
      {
        urlPattern: /^https:\/\/.+/,
        handler: "NetworkFirst",
        options: {
          cacheName: "pages-cache",
          expiration: {
            maxEntries: 50,
          },
        },
      },
      {
        urlPattern: "/",
        handler: "NetworkFirst",
        options: {
          cacheName: "start-url",
          plugins: [
            {
              cacheWillUpdate: async function (params) {
                return params.response;
              },
            },
          ],
        },
      },
    ],
  },
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      config.plugins.push(
        new webpack.DefinePlugin({
          "self.FIREBASE_API_KEY": JSON.stringify(
            process.env.NEXT_PUBLIC_FIREBASE_API_KEY
          ),
          "self.FIREBASE_AUTH_DOMAIN": JSON.stringify(
            process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
          ),
          "self.FIREBASE_PROJECT_ID": JSON.stringify(
            process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
          ),
          "self.FIREBASE_STORAGE_BUCKET": JSON.stringify(
            process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
          ),
          "self.FIREBASE_MESSAGING_SENDER_ID": JSON.stringify(
            process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
          ),
          "self.FIREBASE_APP_ID": JSON.stringify(
            process.env.NEXT_PUBLIC_FIREBASE_APP_ID
          ),
        })
      );
    }

    return config;
  },
  async headers() {
    return [
      {
        source: "/(firebase-messaging-sw.js)",
        headers: [
          {
            key: "Service-Worker-Allowed",
            value: "/",
          },
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default withPWAConfig(nextConfig);
