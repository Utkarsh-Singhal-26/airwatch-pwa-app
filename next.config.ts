import withPWA from "@ducanh2912/next-pwa";
import type { NextConfig } from "next";

const withPWAConfig = withPWA({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  workboxOptions: {
    disableDevLogs: true,
  },
  disable: false
  // disable: process.env.NODE_ENV === "development"
});

const nextConfig: NextConfig = {
  /* config options here */
};

export default withPWAConfig(nextConfig);