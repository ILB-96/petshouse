"use client";

import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { FormFieldProps } from "./FormGenericType";
import { Label } from "../ui/label";
import Image from "next/image"; // for image preview
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"; // Shadcn's Popover components
import { Button } from "../ui/button";
import { getMedia } from "@/actions/media"; // Assuming this is the API to fetch media

const FormImages: React.FC<FormFieldProps> = ({ field, form, formField }) => {
  const [previews, setPreviews] = useState<string[]>([]); // Stores selected image URLs
  const [files, setFiles] = useState<any[]>([]); // Media files with URLs
  const [searchQuery, setSearchQuery] = useState<string>(""); // Search query
  const [currentPage, setCurrentPage] = useState<number>(1); // Current page for pagination
  const [totalCount, setTotalCount] = useState<number>(0); // Total count of media items
  const items_per_page = 9; // Items per page

  // Fetch media items based on search query and pagination
  const fetchMedia = async () => {
    const { count, items } = await getMedia(
      searchQuery,
      currentPage,
      items_per_page
    );
    setFiles(items);
    setTotalCount(count);
  };

  // Fetch files from the media API when the popover opens or when the search query/page changes
  useEffect(() => {
    fetchMedia();
  }, [searchQuery, currentPage]);

  // Handle selecting/deselecting a file from the list
  const handleSelectFile = (fileUrl: string, fileId: string) => {
    const isAlreadySelected = previews.includes(fileUrl);
    if (isAlreadySelected) {
      const updatedPreviews = previews.filter((url) => url !== fileUrl);
      setPreviews(updatedPreviews);
      formField.onChange(
        updatedPreviews.map(
          (url) => files.find((file) => file.source === url)?._id
        )
      ); // Update form value with IDs
    } else {
      const updatedPreviews = [...previews, fileUrl];
      setPreviews(updatedPreviews);
      formField.onChange(
        updatedPreviews.map(
          (url) => files.find((file) => file.source === url)?._id
        )
      ); // Update form value with IDs
    }
  };

  // Handle changing the search query
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search change
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  function handleRemoveImage(index: number): void {
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setPreviews(updatedPreviews);
    formField.onChange(updatedPreviews); // Update form field value
  }
  return (
    <div className="flex flex-col space-y-8 mt-20">
      <Label htmlFor={field.name}>{field.label}</Label>

      {/* Popover Trigger */}
      <Popover>
        <PopoverTrigger
          asChild
          onClick={fetchMedia} // Fetch files when the popover opens
        >
          <button className="shadow-md focus-visible:ring-ring rounded-sm p-2 bg-blue-500 text-white">
            Select Images
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-96 p-4">
          <h2 className="text-lg font-bold mb-4">Select Images</h2>

          {/* Search Input */}
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Search for media..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="mt-2"
            />
          </div>

          {/* Drive Files */}
          <div className="grid grid-cols-3 gap-4">
            {files.map((file, index) => (
              <div
                key={index}
                className={`border rounded-sm p-2 cursor-pointer hover:bg-gray-100 ${
                  previews.includes(file.source) ? "bg-blue-100" : ""
                }`}
                onClick={() => handleSelectFile(file.source)} // Toggle selection
              >
                <Image
                  src={file.source}
                  alt={`Drive File ${file.name}`}
                  width={100}
                  height={100}
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            <Button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </Button>
            <span className="mx-4">
              Page {currentPage} of {Math.ceil(totalCount / items_per_page)}
            </span>
            <Button
              disabled={currentPage * items_per_page >= totalCount}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {/* Selected Previews */}
      <div className="flex flex-wrap gap-4 mt-4">
        {previews.map((preview, index) => (
          <div key={preview} className="relative">
            <Image
              src={preview}
              alt={`Selected image ${index + 1}`}
              width={100}
              height={100}
              className="object-cover rounded-sm border"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full text-xs"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormImages;
