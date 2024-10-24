"use client";
import { options } from "./config";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Select from "react-select";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import ErrorBubble from "./error-bubble";
import { PrimaryButton, SectionContainer } from "@/styles/style";
import { createGroupAction } from "@/actions/group-action";
import MenuList from "@/components/ui/menu-list";
import useAuth from "@/hooks/use-auth";
import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Icons } from "../icons";

const formSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(5).max(1000),
  country: z.string().min(1).max(50),
  category: z.string().min(1).max(50),
  subCategory: z.string().min(1).max(50),
  expireAt: z.date(),
});
type FormSchema = z.infer<typeof formSchema>;

const GroupForm = () => {
  const { user, loading } = useAuth();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      country: "Global",
      category: "Technology",
      subCategory: "Smartphones",
      expireAt: new Date(),
    },
  });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: FormSchema) => {
    console.log(data);
    if (!user) {
      console.error("User is not authenticated");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await createGroupAction(
        user,
        data.name,
        data.description,
        data.country,
        data.category as Category,
        data.subCategory,
        data.expireAt
      );
      toast({ description: response.message });
      router.push("/groups");
    } catch (error) {
      console.error("Error creating group:", error);
      toast({ description: "Failed to create group." });
    }
  };

  const formatOptions = (options: string[]) =>
    options.map((option) => ({ value: option, label: option }));

  const memoizedOptions = useMemo(
    () =>
      Object.entries(options).map(([key, value]) => (
        <FormField
          key={key}
          control={form.control}
          name={key as keyof FormSchema}
          render={({ field }) => (
            <FormItem className="w-52">
              <Label htmlFor={key}>{value.title}</Label>
              <FormControl>
                <Select
                  options={formatOptions(value.selections)}
                  onChange={(selected) => {
                    field.onChange(selected?.value);
                  }}
                  value={
                    field.value
                      ? { value: field.value, label: field.value }
                      : null
                  }
                  placeholder={value.title}
                  components={{ MenuList }}
                />
              </FormControl>
            </FormItem>
          )}
        />
      )),
    [form.control]
  );

  if (loading) return <Icons.Loader />;

  return (
    <SectionContainer>
      <div className="login-box relative flex w-full items-center justify-center">
        <Form {...form}>
          <form
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
            aria-label="Contact Form"
            className="grid grid-cols-2 gap-4 grid-rows-[auto_auto_1fr_auto] max-h-[30rem]"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="name">Name</Label>
                  <FormControl>
                    <Input
                      type="text"
                      id="name"
                      aria-describedby="name"
                      autoComplete="name"
                      aria-invalid={!!form.formState.errors.name}
                      className={cn(
                        "focus-visible:ring-ring rounded-xs h-[2.35rem] bg-white border-gray-300",
                        form.formState.errors.name && "border-destructive"
                      )}
                      required
                      {...field}
                    />
                  </FormControl>
                  <ErrorBubble error={form.formState.errors.name} />
                </FormItem>
              )}
            />
            {memoizedOptions}

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-2 h-full">
                  <Label htmlFor="description">Description</Label>
                  <FormControl>
                    <Textarea
                      required
                      id="description"
                      aria-invalid={!!form.formState.errors.description}
                      autoComplete="off"
                      aria-describedby="description"
                      className={cn(
                        "shadow-muted focus-visible:ring-ring min-h-32 shadow-md rounded-sm",
                        form.formState.errors.description &&
                          "border-destructive"
                      )}
                      {...field}
                    />
                  </FormControl>
                  <ErrorBubble error={form.formState.errors.description} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expireAt"
              render={({ field }) => (
                <FormItem className="size-fit">
                  <Label htmlFor="expireAt">Expiration Date</Label>
                  <FormControl>
                    <Input
                      type="date"
                      id="expireAt"
                      aria-invalid={!!form.formState.errors.expireAt}
                      className={cn(
                        "focus-visible:ring-ring rounded-xs h-[2.35rem] bg-white border-gray-300",
                        form.formState.errors.name && "border-destructive"
                      )}
                      value={
                        field.value
                          ? field.value.toISOString().split("T")[0]
                          : new Date().toISOString().split("T")[0]
                      }
                      onChange={(e) =>
                        field.onChange(
                          (e.target as HTMLInputElement).valueAsDate || null
                        )
                      }
                      required
                    />
                  </FormControl>
                  <ErrorBubble error={form.formState.errors.expireAt} />
                </FormItem>
              )}
            />
            <div className="mt-auto mb-2">
              <PrimaryButton type="submit" disabled={isSubmitting}>
                <span>Submit</span>
              </PrimaryButton>
            </div>
          </form>
        </Form>
      </div>
    </SectionContainer>
  );
};

export default GroupForm;
