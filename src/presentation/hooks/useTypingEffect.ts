import { useState, useEffect } from 'react';

interface UseTypingEffectOptions {
  text: string;
  speed?: number;
  delay?: number;
  pauseBeforeDelete?: number;
  deleteSpeed?: number;
  pauseBeforeRestart?: number;
  loop?: boolean;
}

export const useTypingEffect = ({ 
  text, 
  speed = 50, 
  delay = 0,
  pauseBeforeDelete = 2000,
  deleteSpeed = 30,
  pauseBeforeRestart = 500,
  loop = true
}: UseTypingEffectOptions) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;
    let currentIndex = 0;

    const startTyping = () => {
      intervalId = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(intervalId);
          setIsComplete(true);
          
          // Si loop está activado, iniciar el proceso de borrado
          if (loop) {
            timeoutId = setTimeout(() => {
              startDeleting();
            }, pauseBeforeDelete);
          }
        }
      }, speed);
    };

    const startDeleting = () => {
      setIsDeleting(true);
      currentIndex = text.length;
      
      intervalId = setInterval(() => {
        if (currentIndex > 1) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex--;
        } else {
          clearInterval(intervalId);
          setDisplayText('\u00A0'); // Espacio no rompible para mantener altura
          setIsDeleting(false);
          setIsComplete(false);
          
          // Reiniciar el ciclo después de una pausa
          timeoutId = setTimeout(() => {
            currentIndex = 0;
            startTyping();
          }, pauseBeforeRestart);
        }
      }, deleteSpeed);
    };

    if (delay > 0) {
      timeoutId = setTimeout(startTyping, delay);
    } else {
      startTyping();
    }

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, speed, delay, pauseBeforeDelete, deleteSpeed, pauseBeforeRestart, loop]);

  return { displayText, isComplete, isDeleting };
};
