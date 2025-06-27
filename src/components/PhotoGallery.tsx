import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const photos = [
  { src: '/1.jpg', alt: 'Pratheek looking cool with sunglasses' },
  { src: '/2.jpg', alt: 'Pratheek posing confidently' },
  { src: '/3.jpg', alt: 'Pratheek in formal attire' },
];

export const PhotoGallery: React.FC = () => {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextPhoto = () => {
    setCurrentPhoto((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="w-full max-w-4xl mx-auto px-4">
        <h3 
          className="text-2xl md:text-3xl font-semibold text-center text-green-200 mb-6 md:mb-8"
          style={{ 
            animation: 'fadeIn 1s ease-out 2s forwards', 
            animationFillMode: 'both',
            fontFamily: 'monospace'
          }}
        >
          🎮 PLAYER GALLERY 🎮
        </h3>
        
        <div 
          className="relative bg-black/20 backdrop-blur-md rounded-2xl md:rounded-3xl p-4 md:p-6 border-2 border-green-400/30 shadow-lg shadow-green-500/20"
          style={{ animation: 'slideUp 1s ease-out 2.2s forwards', animationFillMode: 'both' }}
        >
          {/* Main Photo Display */}
          <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-xl md:rounded-2xl mb-4">
            <img
              src={photos[currentPhoto].src}
              alt={photos[currentPhoto].alt}
              className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={openModal}
            />
            
            {/* Navigation Arrows */}
            <button
              onClick={prevPhoto}
              className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-green-600/70 text-white p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 border border-green-400/50"
            >
              <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
            </button>
            
            <button
              onClick={nextPhoto}
              className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-green-600/70 text-white p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 border border-green-400/50"
            >
              <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
            </button>
          </div>
          
          {/* Photo Thumbnails */}
          <div className="flex justify-center space-x-2 md:space-x-4">
            {photos.map((photo, index) => (
              <button
                key={index}
                onClick={() => setCurrentPhoto(index)}
                className={`w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  currentPhoto === index 
                    ? 'border-green-400 scale-110 shadow-lg shadow-green-500/50' 
                    : 'border-green-400/30 hover:border-green-400/60'
                }`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Full-Size Photo */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-green-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={photos[currentPhoto].src}
              alt={photos[currentPhoto].alt}
              className="max-w-full max-h-full object-contain rounded-lg border-2 border-green-400/50"
            />
          </div>
        </div>
      )}
    </>
  );
};