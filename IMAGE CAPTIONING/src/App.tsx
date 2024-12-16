import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import { ImageUploader } from './components/ImageUploader';
import { CaptionResult } from './components/CaptionResult';
import { generateCaption } from './lib/api';

function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = async (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Reset states
    setCaption(null);
    setError(null);
    setIsLoading(true);

    try {
      const generatedCaption = await generateCaption(file);
      setCaption(generatedCaption);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Brain className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Image Caption AI
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload an image and let AI generate a natural language description.
            Powered by Hugging Face's BLIP image captioning model.
          </p>
        </div>

        <ImageUploader
          onImageSelect={handleImageSelect}
          selectedImage={selectedImage}
        />

        <CaptionResult
          caption={caption}
          isLoading={isLoading}
          error={error}
        />

        {selectedImage && !isLoading && !caption && !error && (
          <div className="mt-6 text-center text-sm text-gray-500">
            Ready to analyze your image
          </div>
        )}
      </div>
    </div>
  );
}

export default App;