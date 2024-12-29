"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getMedia } from "@/actions/media";
import { IMedia } from "@/models/Media";

interface MediaSelectorProps {
  onSelect: (file: IMedia) => void; // Callback for when a file is selected
  selectedFiles: IMedia[]; // Array of currently selected files
  allowMultiple?: boolean; // Allow selecting multiple files
}

const MediaSelector: React.FC<MediaSelectorProps> = ({
  onSelect,
  selectedFiles,
  allowMultiple = true,
}) => {
  const [media, setMedia] = useState<IMedia[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true);
      const { items } = await getMedia("", 1, 100); // Fetch all media (adjust pagination if needed)
      setMedia(items);
      setLoading(false);
    };

    fetchMedia();
  }, []);

  const isSelected = (file: IMedia) =>
    selectedFiles.some((item) => item.name === file.name);

  const handleSelect = (file: IMedia) => {
    if (!allowMultiple && selectedFiles.length > 0) return;
    onSelect(file);
  };

  return (
    <div>
      {loading ? (
        <p>Loading media...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Preview</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Select</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {media.map((item) => (
              <TableRow key={item.name}>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <Image
                    src={item.source}
                    alt={item.caption || ""}
                    width={50}
                    height={50}
                  />
                </TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>
                  <Button
                    variant={isSelected(item) ? "default" : "outline"}
                    onClick={() => handleSelect(item)}
                  >
                    {isSelected(item) ? "Selected" : "Select"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default MediaSelector;
