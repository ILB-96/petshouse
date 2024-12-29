import React from "react";
import { FormFieldProps } from "./FormGenericType";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "../ui/button";
import {
  FormControl,
  FormDescription,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";

interface Option {
  label: string;
  value: string;
}

const FormDropdown: React.FC<FormFieldProps> = ({ field, form, formField }) => {
  const options: Option[] = field.values || []; // Ensure `field.values` is an array

  return (
    <div className="flex flex-col space-y-8 mt-5">
      <FormLabel>{field.label || "Select an Option"}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "w-[200px] justify-between",
                !formField.value && "text-muted-foreground"
              )}
            >
              {formField.value
                ? options.find((option) => option.value === formField.value)
                    ?.label
                : "Select option"}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search..." className="h-9" />
            <CommandList>
              <CommandEmpty>No options found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    value={option.label}
                    key={option.value}
                    onSelect={() => {
                      form.setValue(field.name, option.value); // Ensure `form` is properly set up
                    }}
                  >
                    {option.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        option.value === formField.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <FormMessage />
    </div>
  );
};

export default FormDropdown;
