import React from "react";

import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

export interface FormFieldProps {
  field: {
    type?: string;
    name: string;
  };
  form: {
    formState: {
      errors: {
        [key: string]: ClassValue;
      };
    };
  };
  formField: object;
}

const FormGenericType: React.FC<FormFieldProps> = ({
  field,
  form,
  formField,
}) => {
  return (
    <Input
      required
      type={field.type}
      id={field.name}
      aria-describedby={field.name}
      autoComplete={field.name}
      aria-invalid={!!form.formState.errors[field.name]}
      className={cn(
        "shadow-md focus-visible:ring-ring rounded-sm",
        form.formState.errors[field.name] && "border-destructive"
      )}
      {...formField}
    />
  );
};

export default FormGenericType;
