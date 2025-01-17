"use state";
import React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FormFieldProps } from "@/types";

const FormText: React.FC<FormFieldProps> = ({ field, form, formField }) => {
  return (
    <Input
      required
      type="text"
      id={field.name}
      aria-describedby={field.name}
      autoComplete={field.name}
      aria-invalid={!!form.formState.errors[field.name]}
      className={cn(
        "shadow-md focus-visible:ring-ring rounded-sm",
        form.formState.errors[field.name] && "border-destructive"
      )}
      value={formField.value as string}
      onChange={(e) => formField.onChange(e.target.value)}
    />
  );
};

export default FormText;
