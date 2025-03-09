"use server";
import { apiBaseUrl } from "@/src/config/config";

export const getReviews = async () => {
  const res = await fetch(`${apiBaseUrl}/reviews`);

  if (!res.ok) {
    throw new Error(`Failed to fetch reviews: ${res.statusText}`);
  }

  return res.json();
};
