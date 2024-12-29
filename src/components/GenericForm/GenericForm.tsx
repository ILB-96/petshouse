"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodObject, ZodRawShape } from "zod";

import ErrorBubble from "@/components/ui/error-bubble";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import "./company.css";
import FormTextArea from "./FormTextArea";
import FormCheckBox from "./FormCheckBox";
import FormText from "./FormText";
import FormGenericType from "./FormGenericType";
import FormRichText from "./FormRichText";
import FormDropdown from "./FormDropdown";
import FormNumber from "./FormNumber";
import FormImages from "./FormImages";

const GenericForm = ({
  formSchema,
  defaultValues,
  fields,
  onSubmit,
}: {
  formSchema: ZodObject<ZodRawShape>;
  defaultValues?: Record<string, unknown>;
  fields: {
    name: string;
    type?: string;
    label: string;
    values?: any[];
    default?: any;
  }[];
  onSubmit: (data: unknown) => Promise<string>;
}) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues:
      defaultValues ||
      Object.fromEntries(
        fields.map((field) => [field.name, field?.default || ""])
      ),
  });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: Record<string, unknown>) => {
    console.log("Form data before submission:", data);
    setIsSubmitting(true);
    const message = await onSubmit(data);
    toast({ description: message });
    setIsSubmitting(false);
  };

  return (
    <div className="login-box relative flex w-full flex-col items-center justify-center">
      <Form {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit(handleSubmit)}
          aria-label="Form"
        >
          {fields.map((field) => (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name}
              render={({ field: formField }) => (
                <FormItem className="user-box w-full">
                  <FormControl>
                    {field.type === "textarea" ? (
                      <FormTextArea
                        field={field}
                        form={form}
                        formField={formField}
                      />
                    ) : field.type === "rich-text" ? (
                      <FormRichText
                        field={field}
                        form={form}
                        formField={formField}
                      />
                    ) : field.type === "checkbox" ? (
                      <FormCheckBox
                        field={field}
                        form={form}
                        formField={formField}
                      />
                    ) : field.type === "text" ? (
                      <FormText
                        field={field}
                        form={form}
                        formField={formField}
                      />
                    ) : field.type === "dropdown" ? (
                      <FormDropdown
                        field={field}
                        form={form}
                        formField={formField}
                      />
                    ) : field.type === "number" ? (
                      <FormNumber
                        field={field}
                        form={form}
                        formField={formField}
                      />
                    ) : field.type === "file" ? (
                      <FormImages
                        field={field}
                        form={form}
                        formField={formField}
                      />
                    ) : (
                      <FormGenericType
                        field={field}
                        form={form}
                        formField={formField}
                      />
                    )}
                  </FormControl>
                  {field.type !== "checkbox" &&
                    field.type !== "rich-text" &&
                    field.type !== "dropdown" &&
                    field.type !== "file" && (
                      <>
                        <Label htmlFor={field.name}>{field.label}</Label>
                        <ErrorBubble
                          error={form.formState.errors[field.name]}
                        />
                      </>
                    )}
                </FormItem>
              )}
            />
          ))}
          <div className="my-14 flex w-full justify-center">
            <Button type="submit" disabled={isSubmitting}>
              <span>Submit</span>
              {/* <Icons.send
                height="1.3rem"
                width="1.3rem"
                className="text-accent-foreground opacity-75"
              /> */}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default GenericForm;
