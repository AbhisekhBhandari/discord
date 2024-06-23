"use client";
import { usePathname } from "next/navigation";

export function usePathName() {
  return usePathname().split("/");
}
