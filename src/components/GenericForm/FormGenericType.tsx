import React from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { Label } from "../ui/label";

export interface FormFieldProps {
  field: {
    type?: string;
    name: string;
    label: string;
    default?: string;
    hidden?: boolean;
    values?: { label: string; value: string }[];
  };
  form: {
    formState: {
      errors: {
        [key: string]: ClassValue;
      };
    };
  };
  formField: {
    value: any;
    onChange: (value: any) => void;
  };
}

const FormGenericType: React.FC<FormFieldProps> = ({
  field,
  form,
  formField,
}) => {
  const isDate = field.type === "date";
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
      onChange={(e) => {
        const newValue = isDate ? new Date(e.target.value) : e.target.value;
        formField.onChange(newValue);
      }}
    />
  );
};

export default FormGenericType;
