"use client";
import { MainContainer, SectionContainer } from "@/styles/style";
import React, { useEffect, useState } from "react";
import GenericForm from "@/components/GenericForm/GenericForm";
import { createProduct } from "@/actions/product";
import { IProduct, productSchemaZod } from "@/models/Product";
import { findAllCompaniesSlug as findAllCompanies } from "@/actions/company"; // Import your server action for companies
import { findAllCategories as findAllCategories } from "@/actions/category"; // Assuming there's a similar action for categories
import { IMedia, MediaType } from "@/models/Media";
import { createMedia } from "@/actions/media";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

const handleSubmit = async (media: IMedia) => {
  console.log(media);
};

const AddMediaPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Form data before submission:", data);

    const res = await fetch("/api/drive/upload", {
      method: "POST",
      body: formData,
    });

    const fileData = await res.json();
    const media = await fileData.media;
    console.log("HEY", media);
    const { message } = await createMedia({
      name: media.name as string,
      source: `https://drive.google.com/uc?id=${media.id as string}`,
      caption: data.caption as string,
      type: media.type as MediaType,
    });

    toast({ description: message });
    setIsSubmitting(false);
  };
  return (
    <MainContainer>
      <SectionContainer>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="name">Name</Label>
          <Input type="text" name="name" />
          <Label htmlFor="caption">Caption</Label>
          <Input type="text" name="caption" />
          <Label htmlFor="file">File</Label>
          <Input type="file" name="file" />
          <div className="my-14 flex w-full justify-center">
            <Button type="submit" disabled={isSubmitting}>
              <span>Submit</span>
            </Button>
          </div>
        </form>
      </SectionContainer>
    </MainContainer>
  );
};

export default AddMediaPage;
