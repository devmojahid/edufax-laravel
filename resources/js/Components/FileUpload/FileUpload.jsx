import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Progress } from "@/Components/ui/progress";
import FilePreview from "./FilePreview";

const FileUpload = ({
  onFileSelect,
  multiple = false,
  accept = ["image/*", "application/pdf"],
  maxSize = 5242880,
  className = "",
}) => {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles((prev) => [...prev, ...acceptedFiles]);
      onFileSelect(acceptedFiles);
      simulateProgress();
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
    accept: accept.reduce((acc, curr) => ({ ...acc, [curr]: [] }), {}),
    maxSize,
  });

  const simulateProgress = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const removeFile = (fileToRemove) => {
    setFiles((prev) => prev.filter((file) => file !== fileToRemove));
  };

  return (
    <div className={className}>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
                    ${isDragActive ? "border-primary" : "border-gray-300"}
                    hover:border-primary transition-colors`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-primary">Drop the files here...</p>
        ) : (
          <p>Drag 'n' drop files here, or click to select files</p>
        )}
      </div>

      {files.length > 0 && (
        <div className="mt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {files.map((file, index) => (
              <FilePreview key={index} file={file} onRemove={removeFile} />
            ))}
          </div>
          <Progress value={uploadProgress} className="w-full mt-4" />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
