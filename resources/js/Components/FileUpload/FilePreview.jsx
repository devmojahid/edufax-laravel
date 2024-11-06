import React from "react";
import { X, FileText, Image as ImageIcon } from "lucide-react";
import { Button } from "@/Components/ui/button";

const FilePreview = ({ file, onRemove, className = "" }) => {
  const isImage = file.type.startsWith("image/");

  return (
    <div className={`relative group ${className}`}>
      {isImage ? (
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            className="object-cover w-full h-full"
          />
        </div>
      ) : (
        <div className="relative aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
          <FileText className="w-8 h-8 text-gray-400" />
        </div>
      )}

      <Button
        variant="destructive"
        size="icon"
        className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => onRemove(file)}
      >
        <X className="w-4 h-4" />
      </Button>

      <p className="mt-1 text-sm text-gray-500 truncate">{file.name}</p>
    </div>
  );
};

export default FilePreview;
