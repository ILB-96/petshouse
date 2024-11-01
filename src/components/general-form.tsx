"use client";
import React, { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodObject, ZodRawShape } from "zod";

import ErrorBubble from "@/components/ui/error-bubble";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import "./company.css";

// Generalized Form Component
const GeneralForm = ({
  formSchema,
  defaultValues,
  fields,
  onSubmit,
}: {
  formSchema: ZodObject<ZodRawShape>;
  defaultValues: Record<string, any>;
  fields: { name: string; type?: string; label: string }[];
  onSubmit: (data: any) => Promise<string>;
}) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: Record<string, any>) => {
    setIsSubmitting(true);
    const message = await onSubmit(data);
    toast({ description: message });
    setIsSubmitting(false);
  };

  return (
    <div className="login-box relative flex w-full flex-col items-center justify-center shadow-md rounded-sm">
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
                      <Textarea
                        required
                        id={field.name}
                        aria-invalid={!!form.formState.errors[field.name]}
                        autoComplete="off"
                        aria-describedby={field.name}
                        className={cn(
                          "shadow-muted focus-visible:ring-ring min-h-32 shadow-md rounded-sm",
                          form.formState.errors[field.name] &&
                            "border-destructive"
                        )}
                        {...formField}
                      />
                    ) : (
                      <Input
                        required
                        type={field.type || "text"}
                        id={field.name}
                        aria-describedby={field.name}
                        autoComplete={field.name}
                        aria-invalid={!!form.formState.errors[field.name]}
                        className={cn(
                          "shadow-md focus-visible:ring-ring rounded-sm",
                          form.formState.errors[field.name] &&
                            "border-destructive"
                        )}
                        {...formField}
                      />
                    )}
                  </FormControl>
                  <Label htmlFor={field.name}>{field.label}</Label>
                  <ErrorBubble error={form.formState.errors[field.name]} />
                </FormItem>
              )}
            />
          ))}
          <div className="my-4 flex w-full justify-center">
            <Button disabled={isSubmitting}>
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

export default GeneralForm;
