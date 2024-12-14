"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Home() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return; // TypeScript null check
        const ctx = canvas.getContext('2d');
        if (!ctx) return; // TypeScript null check
        let animationFrameId: number;
    
        const colors = ['#a960ee', '#ff333d', '#90e0ff', '#ffcb57'];
    
        // Create a non-linear gradient
        const createGradient = (xOffset: number): CanvasGradient => {
          const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    
          // Apply colors with offsets that shift dynamically
          colors.forEach((color, index) => {
            const baseStop = index / (colors.length - 1);
            const dynamicOffset = 0.2 * Math.sin(xOffset / 500);
            const stop = Math.max(0, Math.min(1, baseStop + dynamicOffset));
            gradient.addColorStop(stop, color);
          });
    
          return gradient;
        };
    
        // Draw sloped 45 degree bottom line
        const drawSlopedBottom = () => {
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(canvas.width, 0);
          ctx.lineTo(canvas.width, canvas.height - canvas.height * 0.35); // 45-degree slope
          ctx.lineTo(0, canvas.height);
          ctx.closePath();
          ctx.fill();
        };
    
        const draw = (xOffset: number) => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
    
          // Create and apply gradient
          ctx.fillStyle = createGradient(xOffset);
          drawSlopedBottom();
    
          animationFrameId = requestAnimationFrame(() => draw(xOffset + 1));
        };
    
        // Set initial canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    
        draw(0); // Start drawing
    
        return () => cancelAnimationFrame(animationFrameId); // Cleanup on unmount
      }, []);

    return (
        <div className="flex flex-col w-screen h-auto">
            <canvas ref={canvasRef} className="absolute w-full top-0 left-0 -z-10 -mt-[400px]" />
            <h1 className="text-8xl font-bold text-darkBlue w-1/2 opacity-75 leading-[110px] tracking-tight">Discover Your Cognitive Potential with Actionable Insights</h1>
            <p className="text-xl w-1/3 mt-10 text-paleBlue font-thin">
                Discover your strengths and challenge your mind with scientifically designed IQ tests. Join thousands who trust CognifyIQ to measure and enhance their cognitive abilities through tailored assessments and insightful results.
            </p>

            <Link className="flex text-xl transition duration-300 ease-in-out hover:bg-darkBlue items-center justify-center mt-10 bg-lightBlue rounded-lg w-1/6 h-14 text-white tracking-widest" href="/FluidTest">Take our Fluid Test</Link>
        </div>
    );
}
