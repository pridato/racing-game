import * as THREE from "three";
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { MutableRefObject } from "react";
import { maxWidth, speed } from "../globals/globales";

/**
 * funcion para crear un coche
 * @param color 
 * @param text 
 * @param position 
 * @returns 
 */
export function createCar(color: string, text: string, position: [number, number]) {
  const carGroup = new THREE.Group();
  
  // Crear el círculo del coche
  const carGeometry = new THREE.CircleGeometry(1, 32);
  const carMaterial = new THREE.MeshBasicMaterial({ color });
  const carMesh = new THREE.Mesh(carGeometry, carMaterial);
  const carSize = 0.5;
  carMesh.scale.set(carSize, carSize, 1);
  carMesh.position.set(position[0], position[1], 0);
  carGroup.add(carMesh);

  // Cargar fuente y crear texto
  const fontLoader = new FontLoader();
  fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
    const textGeometry = new TextGeometry(text, {
      font: font,
      size: 0.3,
      height: 0.1,
    });
    textGeometry.center();
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.z = 0.1; // Asegurarse de que el texto esté en frente del círculo
    carGroup.add(textMesh);
  });

  return carGroup;
}

/**
 * Función para crear la pista
 * @returns 
 */
export function createTrack() {
  const trackGeometry = new THREE.PlaneGeometry(40, 20);
  const trackMaterial = new THREE.MeshBasicMaterial({ color: 0xd3d3d3});
  const trackMesh = new THREE.Mesh(trackGeometry, trackMaterial);
  trackMesh.position.z = -0.1;

  // en la mitad de la pista una linea divisoria
  const lineGeometry = new THREE.PlaneGeometry(40, 0.1);
  const lineMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const lineMesh = new THREE.Mesh(lineGeometry, lineMaterial);
  lineMesh.position.z = 0.1;
  trackMesh.add(lineMesh);

  // al final de la pista una linea de meta
  const finishGeometry = new THREE.PlaneGeometry(3, 19);
  const finishMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const finishMesh = new THREE.Mesh(finishGeometry, finishMaterial);
  finishMesh.position.x = 19.5;
  finishMesh.position.z = 0.1;
  trackMesh.add(finishMesh);

  trackMesh.scale.set(1, 0.4, 1);

  return trackMesh;
}

/**
 * TODO Refactorizado de maxWidth al maximo del size de la ventana
 * función para manejar el evento de teclado. Movimiento del coche 1 
 * @param event 
 * @param car1Ref 
 */
export const handleKeyDown = (event: KeyboardEvent, car1Ref: MutableRefObject<THREE.Group<THREE.Object3DEventMap> | null>) => {
  if (car1Ref.current === null) return;
  const car1 = car1Ref.current;

  switch (event.key) {
    case 'ArrowLeft':
    case 'a':
      if (car1.position.x > 0) {
        car1.position.x -= speed;
      }
      break;
    case 'ArrowRight':
    case 'd':
      if (car1.position.x < maxWidth) {
        car1.position.x += speed;
      } 
      break;
  }
}