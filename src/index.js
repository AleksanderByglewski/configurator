import * as THREE from 'three';
import { setupComposer } from './postprocessing/composer';
import { setupRenderer } from './renderer/renderer';
import {setupCamera} from './renderer/camera'

import {populateScene} from './scenes/cube/scene.js'
import {setupAnimation} from './scenes/cube/animation.js'
// import {setupAnimation} from './scenes/planets/animation.js'


function initScene(){
  const scene = new THREE.Scene();
  const cube=populateScene(scene)



  const camera=setupCamera()
  const renderer=setupRenderer()
  const composer= setupComposer(renderer, scene, camera)


  const animate = setupAnimation(composer, cube);
  requestAnimationFrame(animate);
   
}
function main() {
  window.addEventListener('resize', function() {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
    composer.setSize(newWidth, newHeight);
  });
  initScene()
  // requestAnimationFrame(render);
}

document.addEventListener("DOMContentLoaded", main);
