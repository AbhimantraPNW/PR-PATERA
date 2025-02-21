"use client";

import { FC } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Label } from "./ui/label";

interface DropZoneProps {
  label: string;
  isError: boolean;
  onDrop: (files: FileWithPath[]) => void;
}

const Dropzone: FC<DropZoneProps> = ({ isError, label, onDrop }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxFiles: 4,
    onDrop: (acceptedFiles) => {
      onDrop(acceptedFiles);
    },
  });

  return (
    <div className="space-y-1.5">
      <Label className={isError ? "text-red-500" : ""}>{label}</Label>

      <div
        {...getRootProps({
          className: "p-10 border flex justify-center rounded-md",
        })}
      >
        <input {...getInputProps()}/>
        <Label className="text-base">
          Click untuk mengupload gambar
        </Label>
      </div>

      {isError && (
        <div className="text-xs text-red-500">{label} is Required</div>
      )}
    </div>
  );

};

export default Dropzone;
