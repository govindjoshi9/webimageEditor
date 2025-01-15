import React, { useState } from 'react';
import { Search, Camera } from 'lucide-react';
import ImageSearchComponent from './components/ImageSearch';
import ImageEditor from './components/ImageEditor';
import type { UnsplashImage } from './types';

function App() {
  const [selectedImage, setSelectedImage] = useState<UnsplashImage | null>(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Camera className="text-blue-600" size={32} />
              <h1 className="text-xl font-bold text-gray-900">Image Editor Pro</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {!selectedImage ? (
          <div className="text-center mb-8">
            <Search className="mx-auto h-12 w-12 text-gray-400" />
            <h2 className="mt-2 text-lg font-medium text-gray-900">
              Search for images to edit
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Find the perfect image and add your creative touch
            </p>
          </div>
        ) : null}

        <ImageSearchComponent onImageSelect={setSelectedImage} />

        {selectedImage && (
          <ImageEditor
            image={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </main>
    </div>
  );
}

export default App;