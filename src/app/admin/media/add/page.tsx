"use client";
import { MainContainer, SectionContainer } from "@/styles/style";
import React, { useState } from "react";
import { IMedia, MediaType } from "@/models/Media";
import { createMedia } from "@/actions/media";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

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
    const mediaData = {
      name: media.name as string,
      source: `https://drive.google.com/uc?id=${media.id as string}`,
      caption: data.caption as string,
      type: media.type as MediaType,
    };

    const { message } = await createMedia(mediaData as IMedia);

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
