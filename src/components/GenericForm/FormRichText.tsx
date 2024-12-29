"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { FormFieldProps } from "./FormGenericType";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";

// Dynamically import ReactQuill
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const FormRichText: React.FC<FormFieldProps> = ({ field, form, formField }) => {
  const [value, setValue] = useState<string>(formField.value || "");

  const handleChange = (content: string) => {
    setValue(content);
    formField.onChange(content);
  };

  return (
    <div className="flex flex-col h-fit space-y-8 mt-14">
      <Label htmlFor={field.name}>{field.label}</Label>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleChange}
        className={cn(
          "focus-visible:ring-ring rounded-sm h-40",
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
