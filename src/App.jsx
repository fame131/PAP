
import React, { useRef, useEffect } from "react";

const App = ({ text = "PAPPAS" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const gravity = 0.5; 
    const friction = 0.8; 


    const texts = [];
    const numTexts = 5;

    for (let i = 0; i < numTexts; i++) {
      texts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * -500, 
        vy: 0,
        text: text,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgb(255, 255, 255)"; 
      ctx.font = "40px Arial";

      texts.forEach((t) => {
        t.vy += gravity; 
        t.y += t.vy;

        if (t.y + 40 > canvas.height) { 
          t.y = canvas.height - 40;
          t.vy *= -friction;
        }

        ctx.fillText(t.text, t.x, t.y);
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [text]);

  return <canvas ref={canvasRef} style={{ display: "block" }} />;
};

export default App;
