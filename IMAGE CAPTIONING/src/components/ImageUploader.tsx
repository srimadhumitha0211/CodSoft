import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  selectedImage: string | null;
}

export function ImageUploader({ onImageSelect, selectedImage }: ImageUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onImageSelect(acceptedFiles[0]);
    }
  }, [onImageSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
    onDropRejected: (fileRejections) => {
      const error = fileRejections[0]?.errors[0];
      if (error?.code === 'file-too-large') {
        alert('File is too large. Maximum size is 10MB.');
      } else if (error?.code === 'file-invalid-type') {
        alert('Invalid file type. Please upload an image file.');
      }
    }
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
      >
        <input {...getInputProps()} />
        {selectedImage ? (
          <div className="space-y-4">
            <img
              src={selectedImage}
              alt="Preview"
              className="max-h-96 mx-auto rounded-lg shadow-lg"
            />
            <p className="text-sm text-gray-500">Drop a new image to replace</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center">
              {isDragActive ? (
                <ImageIcon className="h-12 w-12 text-blue-500" />
              ) : (
                <Upload className="h-12 w-12 text-gray-400" />
              )}
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900">
                {isDragActive ? 'Drop your image here' : 'Drag & drop your image here'}
              </p>
              <p className="text-sm text-gray-500">or click to select a file</p>
            </div>
            <p className="text-xs text-gray-400">
              Supports: JPG, PNG, WebP (max 10MB)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}