import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/cropImage.js';
import { FaTimes, FaSearchPlus, FaSearchMinus } from 'react-icons/fa';

const ImageCropperModal = ({ imageSrc, aspect = 16 / 9, onCropComplete, onCancel }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropChange = useCallback((crop) => {
    setCrop(crop);
  }, []);

  const onZoomChange = useCallback((zoom) => {
    setZoom(zoom);
  }, []);

  const onCropAreaComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = async () => {
    try {
      if (!croppedAreaPixels) return;
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      onCropComplete(croppedBlob);
    } catch (e) {
      console.error('Failed to crop image:', e);
      alert('Error cropping image. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-[100] flex flex-col items-center justify-center p-4">
      {/* Modal Card */}
      <div className="bg-white dark:bg-navy w-full max-w-xl rounded-xl shadow-luxury overflow-hidden border border-gold/20 flex flex-col">
        {/* Header */}
        <div className="h-14 border-b border-gray-200 dark:border-gold/15 flex items-center justify-between px-6 bg-gray-50 dark:bg-navy-light/10">
          <h4 className="font-serif font-bold text-navy dark:text-white text-sm">
            Edit & Crop Image
          </h4>
          <button onClick={onCancel} className="text-slate-400 hover:text-gold">
            <FaTimes size={16} />
          </button>
        </div>

        {/* Cropper viewport container */}
        <div className="relative w-full h-80 bg-slate-900">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropAreaComplete}
          />
        </div>

        {/* Zoom & Sliders toolbar */}
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4 justify-between">
            <button
              onClick={() => setZoom((z) => Math.max(1, z - 0.1))}
              className="text-slate-500 hover:text-gold transition-colors"
              title="Zoom Out"
            >
              <FaSearchMinus size={18} />
            </button>
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full accent-gold h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <button
              onClick={() => setZoom((z) => Math.min(3, z + 0.1))}
              className="text-slate-500 hover:text-gold transition-colors"
              title="Zoom In"
            >
              <FaSearchPlus size={18} />
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 dark:border-gold/20 text-xs font-semibold rounded hover:bg-gray-150 dark:hover:bg-navy-light/10 text-slate-700 dark:text-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleCrop}
              className="btn-gold-grad px-5 py-2 rounded text-xs font-bold shadow-sm"
            >
              Apply Crop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCropperModal;
