import * as THREE from 'three';
import {setupComposer } from '../postprocessing/composer';
import {setupRenderer } from '../renderer/renderer';
import {setupCamera} from '../renderer/camera'
import {handleResize} from '../renderer/resize'
import {populateScene} from '../scenes/cube/shadows.js'
import {setupAnimation} from '../scenes/cube/animation.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


let scene, camera, renderer, controls;

function init() {
    // Set up scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
    document.body.appendChild(renderer.domElement);

    // Controls for dragging and rotating the scene view
    controls = new OrbitControls(camera, renderer.domElement);

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

    // Handle window resizing
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// function animate() {
//     requestAnimationFrame(animate);
//     renderer.render(scene, camera);
// }

// init();
// animate();

function initScene(){
  //Initialization and population of the scene
  const scene = new THREE.Scene();
  const cube=populateScene(scene)



 
  // Renderer

  //Camera and renderer setup
  const camera=setupCamera()
  var  renderer=setupRenderer()
  // var renderer = new THREE.WebGLRenderer({ antialias: true });
  // renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer.shadowMap.enabled = true;
  // renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
  // document.body.appendChild(renderer.domElement);

  const composer=setupComposer(renderer, scene, camera)

  // camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(5, 5, 5);
  camera.lookAt(0, 0, 0);

  // renderer = new THREE.WebGLRenderer({ antialias: true });
  // renderer.setSize(window.innerWidth, window.innerHeight);
  // // renderer.shadowMap.enabled = true;
  // renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
  // document.body.appendChild(renderer.domElement);
  controls = new OrbitControls(camera, renderer.domElement);

  //Setting up the animation of the scene
  const animate = setupAnimation(composer);
  requestAnimationFrame(animate);



  //Handling of the screen size change
  window.addEventListener('resize', handleResize(camera, renderer, composer));


}
function main() {
  initScene()
}

document.addEventListener("DOMContentLoaded", main);
