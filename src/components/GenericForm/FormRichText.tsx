import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FormFieldProps } from "./FormGenericType";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";

const FormRichText: React.FC<FormFieldProps> = ({ field, form, formField }) => {
  return (
    <div className="flex flex-col space-y-8 mt-5">
      <Label htmlFor={field.name} className="">
        {field.name}
      </Label>
      <ReactQuill
        theme="snow"
        value={formField.value || ""}
        onChange={formField.onChange}
        className={cn(
          "shadow-muted focus-visible:ring-ring shadow-md rounded-sm",
          form.formState.errors[field.name] && "border-destructive"
        )}
        id={field.name}
        aria-describedby={field.name}
        aria-invalid={!!form.formState.errors[field.name]}
      />
    </div>
  );
};

export default FormRichText;
