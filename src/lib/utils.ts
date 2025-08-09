import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function getErrorMessage(e: unknown) {
  return axios.isAxiosError(e)
    ? (e.response?.data as { message?: string } | undefined)?.message ??
        e.message
    : e instanceof Error
    ? e.message
    : "Something went wrong";
}
