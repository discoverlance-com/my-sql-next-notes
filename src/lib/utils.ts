import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getNoteWithSlug } from "./db/notes.server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function validateSlug(slug: string) {
  return await getNoteWithSlug(slug);
}
