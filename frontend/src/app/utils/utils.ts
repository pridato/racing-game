import * as THREE from "three";
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';


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