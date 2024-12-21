import { cn } from "@/lib/utils";
import React from "react";
import { Textarea } from "../ui/textarea";
import { FormFieldProps } from "./FormGenericType";

const FormTextArea: React.FC<FormFieldProps> = ({ field, form, formField }) => {
  return (
    <Textarea
      required
      id={field.name}
      aria-invalid={!!form.formState.errors[field.name]}
      autoComplete="off"
      aria-describedby={field.name}
      className={cn(
        "shadow-muted focus-visible:ring-ring min-h-32 shadow-md rounded-sm",
        form.formState.errors[field.name] && "border-destructive"
      )}
      {...formField}
    />
  );
};

export default FormTextArea;
