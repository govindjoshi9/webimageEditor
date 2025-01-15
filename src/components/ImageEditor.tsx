import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import {
  Circle,
  Square,
  Triangle,
  Type,
  Download,
  Hexagon,
  X,
} from "lucide-react";
import type { UnsplashImage, CanvasLayer } from "../types";

interface Props {
  image: UnsplashImage;
  caption?: string; 
  onClose: () => void;
}

export default function ImageEditor({ image, caption, onClose }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [layers, setLayers] = useState<CanvasLayer[]>([]);

  useEffect(() => {
    if (canvasRef.current) {
      const fabricCanvas = new fabric.Canvas(canvasRef.current, {
        width: 800,
        height: 600,
        backgroundColor: "#f0f0f0",
      });

      // Load the image with crossOrigin set to "anonymous"
      fabric.Image.fromURL(
        image.urls.regular,
        (img) => {
          img.scaleToWidth(800); // Scale the image to fit the canvas width
          img.lockMovementX = true;
          img.lockMovementY = true;
          img.lockScalingX = true;
          img.lockScalingY = true;
          img.lockRotation = true;
          img.selectable = false; // Make the background image unselectable
          fabricCanvas.add(img);
          fabricCanvas.sendToBack(img);

          // Add a caption below the image if provided
          if (caption) {
            const captionText = new fabric.Text(caption, {
              left: 400,
              top: 550,
              fontSize: 20,
              fill: "#000000",
              originX: "center",
            });
            fabricCanvas.add(captionText);
          }

          fabricCanvas.renderAll();
        },
        {
          crossOrigin: "anonymous", // Set crossOrigin to allow CORS
        }
      );

      setCanvas(fabricCanvas);

      return () => {
        fabricCanvas.dispose();
      };
    }
  }, [image, caption]);


  const addShape = (type: "circle" | "rectangle" | "triangle" | "polygon") => {
    if (!canvas) return;

    let shape: fabric.Object;

    switch (type) {
      case "circle":
        shape = new fabric.Circle({
          radius: 50,
          fill: "#ff0000",
          left: 150,
          top: 150,
        });
        break;
      case "rectangle":
        shape = new fabric.Rect({
          width: 100,
          height: 100,
          fill: "#00ff00",
          left: 150,
          top: 150,
        });
        break;
      case "triangle":
        shape = new fabric.Triangle({
          width: 100,
          height: 100,
          fill: "#0000ff",
          left: 150,
          top: 150,
        });
        break;
      case "polygon":
        shape = new fabric.Polygon(
          [
            { x: 0, y: 50 },
            { x: 25, y: 0 },
            { x: 75, y: 0 },
            { x: 100, y: 50 },
            { x: 75, y: 100 },
            { x: 25, y: 100 },
          ],
          {
            fill: "#ffff00",
            left: 150,
            top: 150,
          }
        );
        break;
    }

    canvas.add(shape);
    canvas.setActiveObject(shape);
    canvas.renderAll();



    setLayers([
      ...layers,
      {
        type: "shape",
        properties: {
          type,
          position: { x: 150, y: 150 },
          size: { width: 100, height: 100 },
        },
      },
    ]);
  };

  const addText = () => {
    if (!canvas) return;

    const text = new fabric.IText("Double-click to edit", {
      left: 200,
      top: 200,
      fontSize: 24,
      fill: "#000000",
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();

    // Update layers
    setLayers([
      ...layers,
      {
        type: "text",
        properties: {
          text: "Double-click to edit",
          position: { x: 200, y: 200 },
        },
      },
    ]);
  };
  useEffect(() => {
    if (canvas) {
      fabric.Image.fromURL(
        `https://cors-anywhere.herokuapp.com/${image.urls.regular}`,
        (img) => {
          img.scaleToWidth(800);
          canvas.add(img);
          canvas.renderAll();
        },
        {
          crossOrigin: "anonymous",
        }
      );
    }
  }, [canvas]);


const downloadImage = () => {
  if (!canvas) return;

  const dataURL = canvas.toDataURL({
    format: "png",
    quality: 1.0,
  });

  const link = document.createElement("a");
  link.href = dataURL;
  link.download = "edited-image.png";
  link.click();
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-5xl w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Image Editor</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => addShape("circle")}
              className="p-2 hover:bg-gray-100 rounded-lg flex items-center gap-2"
            >
              <Circle size={24} /> Circle
            </button>
            <button
              onClick={() => addShape("rectangle")}
              className="p-2 hover:bg-gray-100 rounded-lg flex items-center gap-2"
            >
              <Square size={24} /> Rectangle
            </button>
            <button
              onClick={() => addShape("triangle")}
              className="p-2 hover:bg-gray-100 rounded-lg flex items-center gap-2"
            >
              <Triangle size={24} /> Triangle
            </button>
            <button
              onClick={() => addShape("polygon")}
              className="p-2 hover:bg-gray-100 rounded-lg flex items-center gap-2"
            >
              <Hexagon size={24} /> Polygon
            </button>
            <button
              onClick={addText}
              className="p-2 hover:bg-gray-100 rounded-lg flex items-center gap-2"
            >
              <Type size={24} /> Add Text
            </button>
            <button
              onClick={downloadImage}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download size={20} /> Download
            </button>
          </div>

          <div className="flex-1 bg-gray-100 rounded-lg p-4">
            <canvas
              ref={canvasRef}
              className="border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        {/* <div className="mt-4">
          <h3 className="font-semibold mb-2">Layers:</h3>
          <pre className="bg-gray-100 p-2 rounded-lg text-sm">
            {JSON.stringify(layers, null, 2)}
          </pre>
        </div> */}
      </div>
    </div>
  );
}
