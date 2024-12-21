import React from "react";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

const FormCheckBox = ({ field, form, formField }) => {
  return (
    <div className="flex justify-start w-[28rem]">
      <Label htmlFor={field.name} className="ml-5">
        {field.label}
      </Label>
      <input
        type="checkbox"
        id={field.name}
        checked={formField.value}
        onChange={(e) => formField.onChange(e.target.checked)}
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