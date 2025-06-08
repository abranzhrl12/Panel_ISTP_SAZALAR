// src/shared/utils/formValidation.ts
import { ZodSchema, type ZodIssue } from "zod";

export type FormErrors<T> = {
  [K in keyof T]?: string;
};

/**
 * Valida datos usando un esquema Zod y devuelve los errores formateados.
 * @param schema El esquema Zod para validar los datos.
 * @param data Los datos a validar.
 * @returns Un objeto de errores si la validación falla, o null si es exitosa.
 */
export const validateFormData = <T>(
  schema: ZodSchema<T>,
  data: T
): FormErrors<T> | null => {
  const validationResult = schema.safeParse(data);

  if (!validationResult.success) {
    const newErrors: FormErrors<T> = {};
    validationResult.error.issues.forEach((issue: ZodIssue) => {
      // Zod `path` es un array, para campos simples como 'email' o 'password' el path[0] es suficiente
      if (issue.path.length > 0 && typeof issue.path[0] === "string") {
        newErrors[issue.path[0] as keyof T] = issue.message;
      }
    });
    return newErrors;
  }

  return null; // No hay errores
};
