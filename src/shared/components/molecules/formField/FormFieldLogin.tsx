// @shared/components/molecules
import React from "react";
import { InputText } from "@shared/components/atoms/inputs"; // Ruta correcta a InputText
import { FormErrorText } from "@shared/components/atoms/formErrorText"; // Ruta correcta a FormErrorText

interface FormFieldProps {
  id: string;
  label: string;
  type: string;
  autoComplete?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Tipo explícito para 'e'
  error?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  type,
  autoComplete,
  required,
  value,
  onChange,
  error,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <InputText
          className="p-3 transition-all duration-300 outline-0"
          id={id}
          name={id}
          type={type}
          autoComplete={autoComplete}
          required={required}
          value={value}
          onChange={onChange}
          // error={!!error} // Pasa el error como booleano a InputText si lo espera
        />
      </div>
      {error && <FormErrorText message={error} />}
    </div>
  );
};
