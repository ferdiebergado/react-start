import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FromRouteState {
  from: string;
}

export function isFromRouteState(object: unknown): object is FromRouteState {
  if (object === null || typeof object !== 'object') {
    return false;
  }
  return 'from' in object && typeof object.from === 'string';
}
