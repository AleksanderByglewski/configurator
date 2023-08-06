import * as THREE from 'three';

function main() {

  const canvas = document.querySelector('#app');
  const renderer = new THREE.WebGLRenderer();
  document.querySelector('#app').appendChild(renderer.domElement);
  renderer.setSize(window.innerWidth, window.innerHeight);

  const fov = 75;
  const aspect = window.innerWidth/ window.innerHeight;  // the canvas default
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  const scene = new THREE.Scene();

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });

  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  function render(time) {
    time *= 0.001;  // convert time to seconds

    cube.rotation.x = time;
    cube.rotation.y = time;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}


document.addEventListener("DOMContentLoaded", function(event) {
  // Your code to run after the DOM is fully loaded
  main(); // Calling the main function from your Three.js setup

});
