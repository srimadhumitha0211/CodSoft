const HUGGINGFACE_API_URL = 'https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base';
const HUGGINGFACE_API_KEY = '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';

interface HuggingFaceResponse {
  generated_text: string;
}

export async function generateCaption(imageFile: File): Promise<string> {
  if (!imageFile) {
    throw new Error('No image file provided');
  }

  if (imageFile.size > 10 * 1024 * 1024) { // 10MB limit
    throw new Error('Image file is too large. Maximum size is 10MB.');
  }

  if (!imageFile.type.startsWith('image/')) {
    throw new Error('Invalid file type. Please upload an image file.');
  }

  try {
    const formData = new FormData();
    formData.append('file', imageFile);

    const response = await fetch(HUGGINGFACE_API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
        'X-Use-Cache': 'true'
      },
      body: imageFile,
    });

    if (!response.ok) {
      if (response.status === 503) {
        throw new Error('The service is currently unavailable. Please try again in a few moments.');
      }
      if (response.status === 429) {
        throw new Error('Too many requests. Please wait a moment before trying again.');
      }
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error || `Server error: ${response.status}`);
    }

    const result = await response.json();
    
    // Validate response format
    if (!Array.isArray(result) || result.length === 0) {
      throw new Error('Unexpected response format from the server');
    }

    const caption = result[0] as HuggingFaceResponse;
    if (!caption?.generated_text) {
      throw new Error('No caption was generated. Please try again.');
    }

    return caption.generated_text;
  } catch (error) {
    if (error instanceof Error) {
      // Enhance generic error messages
      if (error.message.includes('Failed to fetch')) {
        throw new Error('Network error. Please check your connection and try again.');
      }
      throw error;
    }
    throw new Error('An unexpected error occurred. Please try again.');
  }
}
