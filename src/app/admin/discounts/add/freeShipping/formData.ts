import {
  genericDefault,
  genericFields,
  genericHandleSubmit,
} from "../../formData";

export const defaultValues = {
  ...genericDefault,
  type: "freeShipping",
};

export const fields = genericFields;

export const handleSubmit = async (formData: unknown, id = undefined) => {
  return await genericHandleSubmit(formData, id);
};
