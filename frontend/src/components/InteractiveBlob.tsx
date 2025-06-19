import React, { useState, useEffect, useRef } from 'react';

interface Position {
    x: number,
    y: number,
}
const InteractiveBlob : React.FC = () => {
const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 })
const [blobPosition, setBlobPosition] = useState<Position>({ x:0, y:0})
const requestRef = useRef<number>()
const previousTimeRef = useRef<number>()
const [isClicked, setIsClicked] = useState<boolean>(false);


const handleMouseDown = () => setIsClicked(true);
const handleMouseUp = () => setIsClicked(false);
useEffect(() => {
  window.addEventListener('mousedown', handleMouseDown);
  window.addEventListener('mouseup', handleMouseUp);
  return () => {
    window.removeEventListener('mousedown', handleMouseDown);
    window.removeEventListener('mouseup', handleMouseUp);
  };
}, []);


useEffect(()=>{
    const handleMouseMove = (e: MouseEvent) =>{
        setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return()=> window.removeEventListener('mousemove', handleMouseMove);
}, [])
useEffect(()=>{
    const animate = (time : number) =>{
        if(previousTimeRef.current !== undefined){
            const delayTime = time - previousTimeRef.current
            const lerpFactor = Math.min(0.1 * delayTime / 16, 1)

            setBlobPosition(prev => ({
                x : prev.x + (mousePosition.x - prev.x) * lerpFactor,
                y : prev.y + (mousePosition.y - prev.y) * lerpFactor
            }));
        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return()=> {
        if (requestRef.current){
            cancelAnimationFrame(requestRef.current);
        }
    };
}, [mousePosition]);
    return (
    <div
        className=''
        style={{
            position: 'fixed',
            left: `${blobPosition.x}px`,
            top: `${blobPosition.y}px`,
            width: isClicked ? '80px' : '120px',
            height: isClicked ? '80px' : '120px',
            transition: 'width 200ms ease, height 200ms ease, transform 100ms linear',
            borderRadius: '50%',
            background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
            filter: 'blur(30px)',
            opacity: 0.8,
            transform: 'translate(-50%, -50%)',
            zIndex: -1,
            pointerEvents: 'none',
            willChange: 'transform',
        }}
    ></div>
  )
}

export default InteractiveBlob