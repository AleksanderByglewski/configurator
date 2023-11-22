import * as THREE from 'three';
import {setupComposer } from '../postprocessing/composer';
import {setupRenderer } from '../renderer/renderer';
import {setupCamera} from '../renderer/camera'
import {setupControls} from '../renderer/controls'
import {handleResize} from '../renderer/resize'
import {populateScene} from '../scenes/garages/scene.js'
import {setupAnimation, setupAnimationRenderer} from '../scenes/garages/animation.js'
import {setupGuiHelper} from '../helpers/quick-gui'
import {draggableUI} from '../markup/draggable-ui'

// Function to enable shadows for all lights and elements
function attach_shadows(scene) {
  scene.traverse((object) => {
      // Skip the floor object
      if (object.name === "floor") {
          return;
      }

      if (object instanceof THREE.Light) {
          object.castShadow = true;
      }
      if (object instanceof THREE.Mesh) {
          object.castShadow = true;
          object.receiveShadow = true;
      }
  });
}

function initScene() {
  // Initialization and population of the scene
  const scene = new THREE.Scene();
  populateScene(scene);

  // Camera and renderer setup
  const camera = setupCamera();
  const renderer = setupRenderer();
  const composer = setupComposer(renderer, scene, camera);
  const controls = setupControls(camera, renderer);

  // Setting up the animation of the scene using Renderer
  const animate = setupAnimation(composer, scene, camera);
  requestAnimationFrame(animate);

  // Create and attach the shadow button to the side menu
  const enableShadowsButton = document.createElement('button');
  enableShadowsButton.innerText = 'Enable Shadows';
  enableShadowsButton.id = 'enableShadowsButton';
  enableShadowsButton.addEventListener('click', () => attach_shadows(scene));
  enableShadowsButton.style.position = 'absolute';
  enableShadowsButton.style.right = '0';
  const sideMenu = document.querySelector('body');
  if (sideMenu) {
      sideMenu.appendChild(enableShadowsButton);
  }

  // Handling of the screen size change
  window.addEventListener('resize', handleResize(camera, renderer, composer));
}

function main() {
  initScene();
  draggableUI();
}

document.addEventListener("DOMContentLoaded", main);