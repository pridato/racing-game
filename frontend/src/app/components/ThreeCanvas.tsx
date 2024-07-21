"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { createCar, createTrack, handleKeyDown } from "../utils/utils";
import { maxWidth } from "../globals/globales";
import confetti from 'canvas-confetti';

const ThreeCanvas = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const car1Ref = useRef<THREE.Group | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (mountRef.current === null) return;

    // Escena
    const scene = new THREE.Scene();

    // Cámara ortográfica
    const aspect = window.innerWidth / window.innerHeight;
    const camera = new THREE.OrthographicCamera(
      -aspect * 10,
      aspect * 10,
      10,
      -10,
      1,
      1000
    );
    camera.position.z = 10; // Colocar la cámara para ver la pista

    // Renderizador
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Crear pista
    const track = createTrack();
    scene.add(track);

    const car1 = createCar("#ff0000", "1", [-17, 2]);
    const car2 = createCar("#0000ff", "2", [-17, -2]);

    car1Ref.current = car1;

    scene.add(car1);
    scene.add(car2);

    // Animación
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Manejo de redimensionamiento
    const handleResize = () => {
      const aspect = window.innerWidth / window.innerHeight;
      camera.left = -aspect * 10;
      camera.right = aspect * 10;
      camera.top = 10;
      camera.bottom = -10;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    window.addEventListener("keydown", (event) => {
      if (car1Ref?.current?.position.x! >= maxWidth) {
        setIsGameOver(true);
        confetti()
      } else {
        handleKeyDown(event, car1Ref);
      }
    });

    const currentMountRef = mountRef.current;

    return () => {
      window.removeEventListener("resize", handleResize);
      if (currentMountRef) {
        currentMountRef.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <>
      {isGameOver && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <h1 className="text-3xl text-white">Game Over</h1>
        </div>
      )}
      <div ref={mountRef} className="relative w-full h-full" />
    </>
  );
};

export default ThreeCanvas;
