import React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { FormFieldProps } from "@/types";
import { Input } from "@/components/ui/input";

const FormCheckBox: React.FC<FormFieldProps> = ({ field, form, formField }) => {
  return (
    <div className="flex justify-start w-[28rem]">
      <Label htmlFor={field.name} className="ml-5">
        {field.label}
      </Label>
      <Input
        type="checkbox"
        id={field.name}
        checked={Boolean(formField.value)}
        onChange={(e) => formField.onChange(e.target.checked ? "true" : "")}
        className={cn(
          "h-6 w-6 text-blue-600",
          form.formState.errors[field.name] && "border-destructive"
        )}
        aria-describedby={field.name}
      />
    </div>
  );
};

export default FormCheckBox;
