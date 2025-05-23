import type { ClassValue } from "clsx";
import { clsx } from "clsx";

export function classNames(...inputs: ClassValue[]): string {
  return clsx(...inputs);
}
