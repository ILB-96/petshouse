"use state";
import React from "react";
import { FormFieldProps } from "./FormGenericType";
import { Input } from "../ui/input";

const FormNumber: React.FC<FormFieldProps> = ({ field, form, formField }) => {
  return (
    <Input
      type="number"
      className="shadow-muted focus-visible:ring-ring shadow-md rounded-sm"
      id={field.name}
      aria-describedby={field.name}
      aria-invalid={!!form.formState.errors[field.name]}
      {...formField}
      onChange={(e) => {
        const value =
          e.target.value === "" ? undefined : Number(e.target.value);
        formField.onChange(value);
      }}
    />
  );
};

export default FormNumber;
