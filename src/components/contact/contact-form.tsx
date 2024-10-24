"use client";
import "./contact.css";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import ErrorBubble from "./error-bubble";
import { Icons } from "./icons";

import { contactAction } from "@/actions/contact-action";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
const formSchema = z.object({
  name: z.string().min(1).max(20),
  email: z.string().email(),
  info: z.string().min(5).max(1000),
});
type FormSchema = z.infer<typeof formSchema>;
const ContactForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      info: "",
    },
  });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = async ({ name, email, info }: FormSchema) => {
    setIsSubmitting(true);
    const { message } = await contactAction(name, email, info);
    toast({ description: message });
  };
  return (
    <div className="login-box relative flex w-full flex-col items-center justify-center shadow-md rounded-sm">
      <Form {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          aria-label="Contact Form"
        >
          <div className="flex flex-row space-x-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="user-box w-2/5">
                  <FormControl>
                    <Input
                      type="text"
                      id="name"
                      aria-describedby="name"
                      autoComplete="name"
                      aria-invalid={!!form.formState.errors.name}
                      className={cn(
                        "shadow-md focus-visible:ring-ring rounded-sm",
                        form.formState.errors.name && "border-destructive"
                      )}
                      required
                      {...field}
                    />
                  </FormControl>
                  <Label htmlFor="name">Name</Label>
                  <ErrorBubble error={form.formState.errors.name} />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="user-box w-3/5">
                  <FormControl>
                    <Input
                      required
                      type="text"
                      id="email"
                      aria-describedby="email"
                      autoComplete="email"
                      aria-invalid={!!form.formState.errors.email}
                      className={cn(
                        "focus-visible:ring-ring shadow-md rounded-sm",
                        form.formState.errors.email && "border-destructive"
                      )}
                      {...field}
                    />
                  </FormControl>
                  <Label htmlFor="email">Email</Label>
                  <ErrorBubble error={form.formState.errors.email} />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="info"
            render={({ field }) => (
              <FormItem className="user-box">
                <FormControl>
                  <Textarea
                    required
                    id="info"
                    aria-invalid={!!form.formState.errors.info}
                    autoComplete="off"
                    aria-describedby="info"
                    className={cn(
                      "shadow-muted focus-visible:ring-ring min-h-32 shadow-md rounded-sm",
                      form.formState.errors.info && "border-destructive"
                    )}
                    {...field}
                  />
                </FormControl>
                <Label htmlFor="info">Message</Label>
                <ErrorBubble error={form.formState.errors.info} />
              </FormItem>
            )}
          />
          <div className="my-4 flex w-full justify-center">
            <Button disabled={isSubmitting}>
              <span>Submit</span>
              <Icons.send
                height="1.3rem"
                width="1.3rem"
                className="text-accent-foreground opacity-75"
              />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default ContactForm;
