import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  twinkle: number;
  type: 'pixel' | 'coin' | 'gem';
  color: string;
}

interface PowerUp {
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: 'health' | 'star' | 'coin';
  rotation: number;
  life: number;
}

export const EnhancedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const powerUpsRef = useRef<PowerUp[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const particles: Particle[] = [];
      const particleCount = Math.min(150, Math.floor((canvas.width * canvas.height) / 6000));
      
      for (let i = 0; i < particleCount; i++) {
        const type = Math.random() > 0.7 ? (Math.random() > 0.5 ? 'coin' : 'gem') : 'pixel';
        let color = '#00FF00'; // Default green pixel
        
        if (type === 'coin') color = '#FFD700';
        else if (type === 'gem') color = Math.random() > 0.5 ? '#FF6B6B' : '#4ECDC4';
        else color = Math.random() > 0.5 ? '#00FF00' : '#FF00FF';
        
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          twinkle: Math.random() * Math.PI * 2,
          type,
          color,
        });
      }
      
      particlesRef.current = particles;
    };

    const createPowerUp = () => {
      if (powerUpsRef.current.length < 4) {
        const types: ('health' | 'star' | 'coin')[] = ['health', 'star', 'coin'];
        powerUpsRef.current.push({
          x: Math.random() * canvas.width,
          y: canvas.height + 50,
          vx: (Math.random() - 0.5) * 1,
          vy: -Math.random() * 2 - 1,
          type: types[Math.floor(Math.random() * types.length)],
          rotation: 0,
          life: 200,
        });
      }
    };

    const drawPixel = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, opacity: number) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.fillRect(x - size/2, y - size/2, size, size);
      
      // Add glow effect
      ctx.shadowColor = color;
      ctx.shadowBlur = size * 2;
      ctx.fillRect(x - size/2, y - size/2, size, size);
      ctx.restore();
    };

    const drawCoin = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      
      // Inner circle
      ctx.fillStyle = '#FFA500';
      ctx.beginPath();
      ctx.arc(x, y, size * 0.6, 0, Math.PI * 2);
      ctx.fill();
      
      // Dollar sign
      ctx.fillStyle = '#FFD700';
      ctx.font = `${size}px Arial`;
      ctx.textAlign = 'center';
      ctx.fillText('$', x, y + size/3);
      ctx.restore();
    };

    const drawGem = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, opacity: number) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.beginPath();
      
      // Diamond shape
      ctx.moveTo(x, y - size);
      ctx.lineTo(x + size * 0.7, y);
      ctx.lineTo(x, y + size);
      ctx.lineTo(x - size * 0.7, y);
      ctx.closePath();
      ctx.fill();
      
      // Add shine
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.beginPath();
      ctx.moveTo(x - size * 0.3, y - size * 0.5);
      ctx.lineTo(x, y - size);
      ctx.lineTo(x + size * 0.3, y - size * 0.5);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const drawPowerUp = (ctx: CanvasRenderingContext2D, powerUp: PowerUp) => {
      ctx.save();
      ctx.translate(powerUp.x, powerUp.y);
      ctx.rotate(powerUp.rotation);
      
      if (powerUp.type === 'health') {
        // Health cross
        ctx.fillStyle = '#FF4444';
        ctx.fillRect(-8, -2, 16, 4);
        ctx.fillRect(-2, -8, 4, 16);
      } else if (powerUp.type === 'star') {
        // Star power-up
        ctx.fillStyle = '#FFD700';
        const spikes = 5;
        const outerRadius = 10;
        const innerRadius = 4;
        
        ctx.beginPath();
        for (let i = 0; i < spikes * 2; i++) {
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          const angle = (i * Math.PI) / spikes;
          const px = Math.cos(angle) * radius;
          const py = Math.sin(angle) * radius;
          
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
      } else if (powerUp.type === 'coin') {
        // Spinning coin
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(0, 0, 8, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#FFA500';
        ctx.beginPath();
        ctx.arc(0, 0, 5, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.twinkle += 0.03;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        const twinkleOpacity = particle.opacity * (0.3 + Math.sin(particle.twinkle) * 0.7);
        
        if (particle.type === 'pixel') {
          drawPixel(ctx, particle.x, particle.y, particle.size, particle.color, twinkleOpacity);
        } else if (particle.type === 'coin') {
          drawCoin(ctx, particle.x, particle.y, particle.size, twinkleOpacity);
        } else if (particle.type === 'gem') {
          drawGem(ctx, particle.x, particle.y, particle.size, particle.color, twinkleOpacity);
        }
      });

      // Update and draw power-ups
      powerUpsRef.current = powerUpsRef.current.filter(powerUp => {
        powerUp.x += powerUp.vx;
        powerUp.y += powerUp.vy;
        powerUp.vy += 0.02; // gravity
        powerUp.rotation += 0.1;
        powerUp.life--;

        drawPowerUp(ctx, powerUp);

        return powerUp.life > 0 && powerUp.y < canvas.height + 100;
      });

      // Randomly create new power-ups
      if (Math.random() < 0.008) {
        createPowerUp();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();
    animate();

    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};