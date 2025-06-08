// src/shared/utils/formValidation.ts
import { ZodSchema, type ZodIssue } from "zod";

export type FormErrors<T> = {
  [K in keyof T]?: string;
};

export const validateFormData = <T>(
  schema: ZodSchema<T>,
  data: T
): FormErrors<T> | null => {
  const validationResult = schema.safeParse(data);

  if (!validationResult.success) {
    const newErrors: FormErrors<T> = {};
    validationResult.error.issues.forEach((issue: ZodIssue) => {
      if (issue.path.length > 0 && typeof issue.path[0] === "string") {
        newErrors[issue.path[0] as keyof T] = issue.message;
      }
    });
    return newErrors;
  }

  return null; // No hay errores
};
