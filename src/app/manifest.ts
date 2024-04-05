import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "API Wishman",
    short_name: "API Wishman",
    description: "Check the status of your application's API endpoints",
    start_url: "/",
    display: "standalone",
    background_color: "white",
    theme_color: "green",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
