import React, { useEffect, useRef } from 'react';

export const MusicPlayer: React.FC = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    const initAudio = async () => {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        // Start playing after a short delay to ensure page is loaded
        setTimeout(() => {
          startMusic();
        }, 2000);
      } catch (error) {
        console.log('Audio context creation failed:', error);
      }
    };

    const playNote = (frequency: number, duration: number, startTime: number, volume: number = 0.05) => {
      if (!audioContextRef.current) return;
      
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);
      
      oscillator.frequency.setValueAtTime(frequency, startTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    };

    const playHappyBirthday = () => {
      if (!audioContextRef.current || !isPlayingRef.current) return;
      
      const notes = [
        { note: 261.63, duration: 0.5 }, // C4 - Hap-
        { note: 261.63, duration: 0.5 }, // C4 - py
        { note: 293.66, duration: 1.0 }, // D4 - Birth-
        { note: 261.63, duration: 1.0 }, // C4 - day
        { note: 349.23, duration: 1.0 }, // F4 - to
        { note: 329.63, duration: 2.0 }, // E4 - you
        
        { note: 261.63, duration: 0.5 }, // C4 - Hap-
        { note: 261.63, duration: 0.5 }, // C4 - py
        { note: 293.66, duration: 1.0 }, // D4 - Birth-
        { note: 261.63, duration: 1.0 }, // C4 - day
        { note: 392.00, duration: 1.0 }, // G4 - to
        { note: 349.23, duration: 2.0 }, // F4 - you
        
        { note: 261.63, duration: 0.5 }, // C4 - Hap-
        { note: 261.63, duration: 0.5 }, // C4 - py
        { note: 523.25, duration: 1.0 }, // C5 - Birth-
        { note: 440.00, duration: 1.0 }, // A4 - day
        { note: 349.23, duration: 1.0 }, // F4 - dear
        { note: 329.63, duration: 1.0 }, // E4 - Pra-
        { note: 293.66, duration: 2.0 }, // D4 - theek
        
        { note: 466.16, duration: 0.5 }, // Bb4 - Hap-
        { note: 466.16, duration: 0.5 }, // Bb4 - py
        { note: 440.00, duration: 1.0 }, // A4 - Birth-
        { note: 349.23, duration: 1.0 }, // F4 - day
        { note: 392.00, duration: 1.0 }, // G4 - to
        { note: 349.23, duration: 3.0 }, // F4 - you
      ];
      
      let currentTime = audioContextRef.current.currentTime;
      notes.forEach(({ note, duration }) => {
        if (isPlayingRef.current) {
          playNote(note, duration, currentTime);
        }
        currentTime += duration;
      });
      
      // Loop the song after it finishes
      const totalDuration = notes.reduce((sum, note) => sum + note.duration, 0);
      setTimeout(() => {
        if (isPlayingRef.current) {
          playHappyBirthday();
        }
      }, (totalDuration + 2) * 1000); // Add 2 seconds pause between loops
    };

    const startMusic = async () => {
      if (!audioContextRef.current) return;
      
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }
      
      isPlayingRef.current = true;
      playHappyBirthday();
    };

    // Handle user interaction to start audio (required by browsers)
    const handleUserInteraction = () => {
      if (!isPlayingRef.current) {
        startMusic();
      }
    };

    initAudio();

    // Add event listeners for user interaction
    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('keydown', handleUserInteraction, { once: true });
    document.addEventListener('touchstart', handleUserInteraction, { once: true });

    return () => {
      isPlayingRef.current = false;
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  // This component renders nothing - it's invisible
  return null;
};