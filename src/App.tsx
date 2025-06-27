import React from 'react';
import { EnhancedBackground } from './components/EnhancedBackground';
import { BirthdayMessage } from './components/BirthdayMessage';
import { AgeCounter } from './components/AgeCounter';
import { PhotoGallery } from './components/PhotoGallery';
import { BirthdayWishes } from './components/BirthdayWishes';
import { MusicPlayer } from './components/MusicPlayer';

function App() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Gaming Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-green-900 to-blue-900" />
      
      {/* Secondary Gaming Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-green-900/20" />
      
      {/* Enhanced Background with Gaming Elements */}
      <EnhancedBackground />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4 py-8 md:py-16 space-y-12 md:space-y-16">
        {/* Birthday Message */}
        <BirthdayMessage />
        
        {/* Age Counter */}
        <div className="w-full">
          <h3 
            className="text-xl md:text-2xl lg:text-3xl font-semibold text-center text-green-200 mb-6 md:mb-8"
            style={{ 
              animation: 'fadeIn 1s ease-out 1.8s forwards', 
              animationFillMode: 'both',
              fontFamily: 'monospace'
            }}
          >
            GAME STATS: Time Played
          </h3>
          <AgeCounter />
        </div>
        
        {/* Photo Gallery */}
        <PhotoGallery />
        
        {/* Birthday Wishes Section */}
        <BirthdayWishes />
        
        {/* Footer */}
        <div 
          className="text-center text-green-300/60 text-sm md:text-base"
          style={{ 
            animation: 'fadeIn 1s ease-out 3s forwards', 
            animationFillMode: 'both',
            fontFamily: 'monospace'
          }}
        >
          <p>Made with ❤️ for Pratheek's epic birthday</p>
          <p className="text-xs md:text-sm mt-2 opacity-70">
            🎮 Level 12 Unlocked! 🎮
          </p>
        </div>
      </div>
      
      {/* Invisible Music Player */}
      <MusicPlayer />
    </div>
  );
}

export default App;