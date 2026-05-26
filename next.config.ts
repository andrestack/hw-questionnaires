import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        has: [
          {
            type: "host",
            value: "start.hinterlandweb.com",
          },
        ],
        destination: "/start",
        permanent: false,
      },
      {
        source: "/",
        has: [
          {
            type: "host",
            value: "audit.hinterlandweb.com",
          },
        ],
        destination: "/audit",
        permanent: false,
      },
      {
        source: "/",
        has: [
          {
            type: "host",
            value: "blueprint.hinterlandweb.com",
          },
        ],
        destination: "/blueprint",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
