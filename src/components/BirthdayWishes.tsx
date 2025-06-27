import React, { useState, useEffect } from 'react';
import { Send, MessageCircle, Heart } from 'lucide-react';

interface Wish {
  id: string;
  name: string;
  message: string;
  timestamp: Date;
}

export const BirthdayWishes: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load wishes from localStorage on component mount
  useEffect(() => {
    const savedWishes = localStorage.getItem('pratheek-birthday-wishes');
    if (savedWishes) {
      const parsedWishes = JSON.parse(savedWishes).map((wish: any) => ({
        ...wish,
        timestamp: new Date(wish.timestamp)
      }));
      setWishes(parsedWishes);
    }
  }, []);

  // Save wishes to localStorage whenever wishes change
  useEffect(() => {
    if (wishes.length > 0) {
      localStorage.setItem('pratheek-birthday-wishes', JSON.stringify(wishes));
    }
  }, [wishes]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);

    const newWish: Wish = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      timestamp: new Date(),
    };

    setWishes(prev => [newWish, ...prev]);
    setName('');
    setMessage('');
    setIsSubmitting(false);

    // Show success message
    const successDiv = document.createElement('div');
    successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce';
    successDiv.textContent = 'Message sent! 🎮';
    document.body.appendChild(successDiv);
    setTimeout(() => document.body.removeChild(successDiv), 3000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <h3 
        className="text-2xl md:text-3xl font-semibold text-center text-green-200 mb-6 md:mb-8"
        style={{ 
          animation: 'fadeIn 1s ease-out 2.4s forwards', 
          animationFillMode: 'both',
          fontFamily: 'monospace'
        }}
      >
        🎮 PLAYER MESSAGES FOR PRATHEEK 🎮
      </h3>

      {/* Wish Form */}
      <div 
        className="bg-black/20 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 border-2 border-green-400/30 mb-6 md:mb-8 shadow-lg shadow-green-500/20"
        style={{ animation: 'slideUp 1s ease-out 2.6s forwards', animationFillMode: 'both' }}
      >
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm md:text-base font-medium text-green-200 mb-2" style={{ fontFamily: 'monospace' }}>
              PLAYER NAME
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-black/30 border-2 border-green-400/50 rounded-xl text-green-100 placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300"
              placeholder="Enter your gamer tag..."
              required
              style={{ fontFamily: 'monospace' }}
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm md:text-base font-medium text-green-200 mb-2" style={{ fontFamily: 'monospace' }}>
              BIRTHDAY MESSAGE
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-black/30 border-2 border-green-400/50 rounded-xl text-green-100 placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300 resize-none"
              placeholder="Send your birthday wishes to Pratheek..."
              required
              style={{ fontFamily: 'monospace' }}
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting || !name.trim() || !message.trim()}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-3 md:py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed border-2 border-green-400/50"
            style={{ fontFamily: 'monospace' }}
          >
            <Send className="w-4 h-4 md:w-5 md:h-5" />
            <span>{isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}</span>
          </button>
        </form>
      </div>

      {/* Wishes Display */}
      {wishes.length > 0 && (
        <div 
          className="bg-black/20 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 border-2 border-green-400/30 shadow-lg shadow-green-500/20"
          style={{ animation: 'slideUp 1s ease-out 2.8s forwards', animationFillMode: 'both' }}
        >
          <div className="flex items-center justify-center space-x-2 mb-6">
            <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-green-300" />
            <h4 className="text-lg md:text-xl font-semibold text-green-200" style={{ fontFamily: 'monospace' }}>
              MESSAGES ({wishes.length})
            </h4>
            <Heart className="w-5 h-5 md:w-6 md:h-6 text-pink-400" />
          </div>
          
          <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
            {wishes.map((wish, index) => (
              <div
                key={wish.id}
                className="bg-black/10 rounded-xl p-4 md:p-6 border border-green-400/20 hover:border-green-400/40 transition-all duration-300"
                style={{
                  animation: `slideUp 0.5s ease-out ${index * 0.1}s forwards`,
                }}
              >
                <div className="flex justify-between items-start mb-3">
                  <h5 className="font-semibold text-green-200 text-sm md:text-base" style={{ fontFamily: 'monospace' }}>
                    {wish.name}
                  </h5>
                  <span className="text-xs text-green-300 opacity-70" style={{ fontFamily: 'monospace' }}>
                    {wish.timestamp.toLocaleDateString()}
                  </span>
                </div>
                <p className="text-green-100 text-sm md:text-base leading-relaxed">
                  {wish.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};