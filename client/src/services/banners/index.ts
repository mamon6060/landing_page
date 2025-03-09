// "use server";
// import { apiBaseUrl } from "@/src/config/config";

import { apiBaseUrl } from "@/src/config/config";

export const getBanners = async () => {
  const res = await fetch(`${apiBaseUrl}/banners`);

  if (!res.ok) {
    throw new Error(`Failed to fetch reviews: ${res.statusText}`);
  }

  return res.json();
};

// export const getBanners = async () => {
//   const res = await fetch(`${apiBaseUrl}/landingbanner`);
//   console.log("Response status:", res.status);

//   if (!res.ok) {
//     throw new Error(`Failed to fetch reviews: ${res.statusText}`);
//   }

//   const json = await res.json();
//   console.log("Fetched banner data:", json); // Debugging
//   return json;
// };
