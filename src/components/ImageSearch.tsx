import React, { useState } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';
import type { UnsplashImage } from '../types';

interface Props {
  onImageSelect: (image: UnsplashImage) => void;
}

const UNSPLASH_ACCESS_KEY = "HceyBGpxIEATDiHUZarCQijcdKUwpfWPK8pQfov8D70"; // Replace with your key

export default function ImageSearch({ onImageSelect }: Props) {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

const searchImages = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!query.trim()) return;

  setLoading(true);
  setError("");

  try {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos?query=${query}&per_page=12`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      }
    );
    setImages(response.data.results);
  } catch (err) {
    setError("Failed to fetch images. Please try again.");
    console.error("Error fetching images:", err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <form onSubmit={searchImages} className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            placeholder="Search for images..."
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="relative group cursor-pointer rounded-lg overflow-hidden"
            onClick={() => onImageSelect(image)}
          >
            <img
              src={image.urls.small}
              alt={image.alt_description}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
              <button className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-white text-black rounded-lg transform scale-95 group-hover:scale-100 transition-all">
                Edit Image
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}