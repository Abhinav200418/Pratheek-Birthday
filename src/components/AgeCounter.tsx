import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Timer } from 'lucide-react';

interface TimeUnit {
  value: number;
  label: string;
  icon: React.ReactNode;
}

export const AgeCounter: React.FC = () => {
  // Birthday: June 28, 2012
  const birthDate = new Date('2012-06-28T00:00:00');
  const [timeUnits, setTimeUnits] = useState<TimeUnit[]>([]);

  useEffect(() => {
    const calculateAge = () => {
      const now = new Date();
      const diffInMs = now.getTime() - birthDate.getTime();

      const years = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365.25));
      const months = Math.floor((diffInMs % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
      const days = Math.floor((diffInMs % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);

      setTimeUnits([
        { value: years, label: 'Years', icon: <Calendar className="w-4 h-4 md:w-5 md:h-5" /> },
        { value: months, label: 'Months', icon: <Calendar className="w-4 h-4 md:w-5 md:h-5" /> },
        { value: days, label: 'Days', icon: <Clock className="w-4 h-4 md:w-5 md:h-5" /> },
        { value: hours, label: 'Hours', icon: <Clock className="w-4 h-4 md:w-5 md:h-5" /> },
        { value: minutes, label: 'Minutes', icon: <Timer className="w-4 h-4 md:w-5 md:h-5" /> },
        { value: seconds, label: 'Seconds', icon: <Timer className="w-4 h-4 md:w-5 md:h-5" /> },
      ]);
    };

    calculateAge();
    const interval = setInterval(calculateAge, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 w-full max-w-6xl mx-auto px-4">
      {timeUnits.map((unit, index) => (
        <div
          key={unit.label}
          className="bg-black/20 backdrop-blur-md rounded-xl md:rounded-2xl p-3 md:p-6 text-center border-2 border-green-400/30 hover:border-green-400/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/25"
          style={{
            animationDelay: `${index * 100}ms`,
            animation: 'slideUp 0.8s ease-out forwards',
            fontFamily: 'monospace',
          }}
        >
          <div className="flex justify-center mb-2 md:mb-3 text-green-300">
            {unit.icon}
          </div>
          <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-400 mb-1 md:mb-2 font-mono">
            {unit.value.toString().padStart(2, '0')}
          </div>
          <div className="text-xs md:text-sm text-green-200 font-medium">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
};