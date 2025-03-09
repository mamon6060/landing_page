"use server";
import { apiBaseUrl } from "@/src/config/config";

export const getProducts = async () => {
  const res = await fetch(`${apiBaseUrl}/products`);

  if (!res.ok) {
    throw new Error(`Failed to fetch reviews: ${res.statusText}`);
  }

  return res.json();
};
