"use server";
import { apiBaseUrl } from "@/src/config/config";

export const getCarts = async () => {
  const res = await fetch(`${apiBaseUrl}/carts`);

  if (!res.ok) {
    throw new Error(`Failed to fetch reviews: ${res.statusText}`);
  }

  return res.json();
};
