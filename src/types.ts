export interface UnsplashImage {
  id: string;
  urls: {
    regular: string;
    small: string;
  };
  alt_description: string;
}

export interface CanvasLayer {
  type: 'text' | 'shape';
  properties: {
    type?: 'circle' | 'rectangle' | 'triangle' | 'polygon';
    text?: string;
    position: { x: number; y: number };
    size?: { width: number; height: number };
    color?: string;
  };
}