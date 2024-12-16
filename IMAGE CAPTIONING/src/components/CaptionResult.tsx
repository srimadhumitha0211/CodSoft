import React from 'react';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';

interface CaptionResultProps {
  caption: string | null;
  isLoading: boolean;
  error: string | null;
}

export function CaptionResult({ caption, isLoading, error }: CaptionResultProps) {
  if (error) {
    return (
      <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-red-700 font-medium">Error</p>
            <p className="text-red-600 mt-1">{error}</p>
            <p className="text-red-500 text-sm mt-2">
              Please try again or upload a different image.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mt-6">
        <div className="flex items-center justify-center space-x-3 bg-blue-50 p-4 rounded-lg">
          <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
          <p className="text-blue-700">Analyzing your image...</p>
        </div>
      </div>
    );
  }

  if (caption) {
    return (
      <div className="mt-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
            <RefreshCw className="h-5 w-5 mr-2 text-green-500" />
            Generated Caption
          </h3>
          <p className="text-gray-700 text-lg">
            {caption}
          </p>
        </div>
      </div>
    );
  }

  return null;
}