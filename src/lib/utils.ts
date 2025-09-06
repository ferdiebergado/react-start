import { clsx, type ClassValue } from 'clsx';
import { unstable_batchedUpdates } from 'react-dom';
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function replaceFormErrors<T extends FieldValues>(
  form: UseFormReturn<T>,
  errors: Partial<Record<keyof T, string>>
) {
  unstable_batchedUpdates(() => {
    Object.entries(errors).forEach(([field, message]) => {
      form.setError(field as Path<T>, {
        type: 'server',
        message,
      });
    });
  });
}
