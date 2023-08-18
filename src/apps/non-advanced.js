import * as THREE from 'three';
import {setupComposer } from '../postprocessing/composer';
import {setupRenderer } from '../renderer/renderer';
import {setupCamera} from '../renderer/camera'
import {handleResize} from '../renderer/resize'
import {populateScene} from '../scenes/cube/scene.js'
import {setupAnimation} from '../scenes/cube/animation.js'



function initScene(){
  //Initialization and population of the scene
  const scene = new THREE.Scene();
  const cube=populateScene(scene)


  //Camera and renderer setup
  const camera=setupCamera()
  const renderer=setupRenderer()
  const composer=setupComposer(renderer, scene, camera)

  //Setting up the animation of the scene
  const animate = setupAnimation(composer, cube);
  requestAnimationFrame(animate);



  //Handling of the screen size change
  window.addEventListener('resize', handleResize(camera, renderer, composer));


}
function main() {
  initScene()
}

document.addEventListener("DOMContentLoaded", main);
