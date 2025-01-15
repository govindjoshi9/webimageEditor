import React, { useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import type { UnsplashImage } from "../types";

interface Props {
  onImageSelect: (image: UnsplashImage, caption: string) => void;
}

const UNSPLASH_ACCESS_KEY = "Add your uplace key here"; // Replace with your key

export default function ImageSearch({ onImageSelect }: Props) {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState<UnsplashImage | null>(
    null
  );
  const [caption, setCaption] = useState("");

  const searchImages = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${query}&per_page=4`,
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

  const handleImageSelect = () => {
    if (selectedImage) {
      onImageSelect(selectedImage, caption.trim());
      setSelectedImage(null);
      setCaption("");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <form onSubmit={searchImages} className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(e.target.value)
            }
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
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="border rounded-lg overflow-hidden shadow-lg bg-white"
          >
            <img
              src={image.urls.small}
              alt={image.alt_description}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <p className="text-sm font-medium text-gray-800 truncate">
                {image.alt_description || "No description"}
              </p>
              <button
                onClick={() => setSelectedImage(image)}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full"
              >
                Add Caption
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">Add a Caption</h2>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Enter a caption..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
            />
            <div className="flex gap-4">
              <button
                onClick={handleImageSelect}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Confirm
              </button>
              <button
                onClick={() => setSelectedImage(null)}
                className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
