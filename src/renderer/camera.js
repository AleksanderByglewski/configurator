import * as THREE from 'three';

function setupCamera(){
const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 250;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.x=0;
camera.position.z = 6;
camera.position.y=2.5;
camera.lookAt(new THREE.Vector3(-1,0,0))
return camera
}

export { setupCamera };