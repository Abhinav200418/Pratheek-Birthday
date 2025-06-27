import React from 'react';
import { Gift, Heart, Gamepad2, Trophy } from 'lucide-react';

export const BirthdayMessage: React.FC = () => {
  return (
    <div className="text-center space-y-6 md:space-y-8 max-w-4xl mx-auto px-4">
      {/* Main Title */}
      <div className="relative">
        <h1 
          className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight"
          style={{
            animation: 'fadeInScale 1.2s ease-out forwards',
            textShadow: '0 0 30px rgba(34, 197, 94, 0.5)',
            fontFamily: 'monospace',
          }}
        >
          LEVEL UP!
        </h1>
        <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 text-yellow-400 animate-bounce">
          <Trophy className="w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12" />
        </div>
      </div>

      <h2 
        className="text-3xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-pink-400 via-red-400 to-orange-400 bg-clip-text text-transparent"
        style={{
          animation: 'fadeInScale 1.2s ease-out 0.3s forwards',
          animationFillMode: 'both',
          fontFamily: 'monospace',
        }}
      >
        Happy Birthday Pratheek!
      </h2>

      {/* Age Badge */}
      <div 
        className="inline-block bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg text-2xl md:text-3xl font-bold shadow-lg border-2 border-green-300"
        style={{
          animation: 'bounceIn 1s ease-out 0.5s forwards',
          animationFillMode: 'both',
          fontFamily: 'monospace',
        }}
      >
        🎮 AGE: 12 🎮
      </div>

      {/* Gaming Icons */}
      <div className="flex justify-center items-center space-x-6 md:space-x-8">
        <div 
          className="text-green-400 hover:scale-125 transition-transform duration-300 cursor-pointer"
          style={{ animation: 'bounceIn 1s ease-out 0.6s forwards', animationFillMode: 'both' }}
        >
          <Gamepad2 className="w-12 h-12 md:w-16 md:h-16" />
        </div>
        <div 
          className="text-red-400 hover:scale-125 transition-transform duration-300 cursor-pointer"
          style={{ animation: 'bounceIn 1s ease-out 0.8s forwards', animationFillMode: 'both' }}
        >
          <Heart className="w-12 h-12 md:w-16 md:h-16" />
        </div>
        <div 
          className="text-yellow-400 hover:scale-125 transition-transform duration-300 cursor-pointer"
          style={{ animation: 'bounceIn 1s ease-out 1s forwards', animationFillMode: 'both' }}
        >
          <Gift className="w-12 h-12 md:w-16 md:h-16" />
        </div>
      </div>

      {/* Birthday Message */}
      <div 
        className="bg-black/20 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 border-2 border-green-400/30 hover:border-green-400/50 transition-all duration-500 shadow-lg shadow-green-500/20"
        style={{ animation: 'slideUp 1s ease-out 1.2s forwards', animationFillMode: 'both' }}
      >
        <p className="text-lg md:text-xl lg:text-2xl text-green-100 leading-relaxed font-light">
          🎉 ACHIEVEMENT UNLOCKED: 12 Years of Awesome! 
          May your birthday be filled with epic wins, legendary loot, and unlimited fun! 
          Ready for another year of gaming adventures? Let's GO! ⚡
        </p>
      </div>

      {/* Gaming Quote */}
      <div 
        className="text-base md:text-lg lg:text-xl text-green-200 italic font-light opacity-80"
        style={{ 
          animation: 'fadeIn 1s ease-out 1.5s forwards', 
          animationFillMode: 'both',
          fontFamily: 'monospace'
        }}
      >
        "GG! Another year, another level completed!" 🏆
      </div>
    </div>
  );
};