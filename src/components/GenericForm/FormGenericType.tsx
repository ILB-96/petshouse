import React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FormFieldProps } from "@/types";

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
      value={
        isDate && formField.value
          ? new Date(formField.value as string).toISOString().split("T")[0]
          : (formField.value as string)
      }
      onChange={(e) => {
        const newValue = isDate ? new Date(e.target.value) : e.target.value;
        formField.onChange(newValue as string);
      }}
    />
  );
};

export default FormGenericType;
