import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import ImageCropperModal from './ImageCropperModal.jsx';

const CroppedImageUpload = ({ value, onChange, aspect = 16 / 9, label = 'Image' }) => {
  const [tempImageSrc, setTempImageSrc] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setTempImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedBlob) => {
    const croppedFile = new File([croppedBlob], 'cropped-upload.jpg', {
      type: 'image/jpeg',
    });
    onChange(croppedFile);
    setTempImageSrc(null);
  };

  return (
    <div className="flex flex-col">
      <div className="border-2 border-dashed border-gold/25 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 dark:bg-navy-light/10 hover:border-gold transition-colors relative">
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <FaUpload className="text-gold text-2xl mb-2" />
        <p className="text-xs font-semibold text-slate-600 dark:text-gray-300">
          {value ? value.name : `Click or Drag & Drop ${label} here`}
        </p>
        <p className="text-[10px] text-slate-400 mt-1">PNG, JPG, WEBP up to 5MB (Editable Crop)</p>
      </div>

      {tempImageSrc && (
        <ImageCropperModal
          imageSrc={tempImageSrc}
          aspect={aspect}
          onCropComplete={handleCropComplete}
          onCancel={() => setTempImageSrc(null)}
        />
      )}
    </div>
  );
};

export default CroppedImageUpload;
