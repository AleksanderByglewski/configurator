import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
function populateScene(scene) {
 // Camera


 // Controls for dragging and rotating the scene view


 // Cube
 const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
 const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
 const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
 cube.position.y = 0.5;
 cube.castShadow = true;
 scene.add(cube);


 
 // Plane
 const planeGeometry = new THREE.PlaneGeometry(10, 10);
 const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
 const plane = new THREE.Mesh(planeGeometry, planeMaterial);
 plane.rotation.x = -Math.PI / 2;
 plane.receiveShadow = true;
 scene.add(plane);

 // Light
 const light = new THREE.DirectionalLight(0xffffff, 1);
 light.position.set(2, 4, 3);
 light.castShadow = true;
 light.shadow.camera.top = 5;
 light.shadow.camera.bottom = -5;
 light.shadow.camera.left = -5;
 light.shadow.camera.right = 5;
 light.shadow.camera.near = 0.1;
 light.shadow.camera.far = 50;
 scene.add(light);

 // Ambient light
 const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
 scene.add(ambientLight);
}


  export {populateScene}