"use client"
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { createCar } from "../utils/utils";

const ThreeCanvas = () => { 
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mountRef.current === null) return;

    // Escena
    const scene = new THREE.Scene();
    
    // Cámara ortográfica
    const aspect = window.innerWidth / window.innerHeight;
    const camera = new THREE.OrthographicCamera(
      -aspect * 10, aspect * 10, 10, -10, 1, 1000
    );
    camera.position.z = 10; // Colocar la cámara para ver la pista

    // Renderizador
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const car1Group = new THREE.Group();
    const car2Group = new THREE.Group();

    const car1 = createCar("#ff0000", "1", [-17, 2]);
    const car2 = createCar("#0000ff", "2", [-17, 0]);

    car1Group.add(car1);
    car2Group.add(car2);

    // Agregar a la escena
    scene.add(car1Group);
    scene.add(car2Group);

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
    window.addEventListener('resize', handleResize);

    const currentMountRef = mountRef.current;

    return () => {
      window.removeEventListener('resize', handleResize);
      if (currentMountRef) {
        currentMountRef.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} />;
}

export default ThreeCanvas;