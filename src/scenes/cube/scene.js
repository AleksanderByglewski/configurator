import * as THREE from 'three';
function populateScene(scene) {
  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
  const material = new THREE.MeshBasicMaterial({ color: 0x4488aa });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  
  return cube;
}


  export {populateScene}