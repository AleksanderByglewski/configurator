import * as THREE from 'three';
import {setupComposer } from '../postprocessing/composer';
import {setupRenderer } from '../renderer/renderer';
import {setupCamera} from '../renderer/camera'
import {setupControls} from '../renderer/controls'
import {handleResize} from '../renderer/resize'
import {populateScene} from '../scenes/garages/scene.js'
import {setupAnimation} from '../scenes/garages/animation.js'
import {setupGuiHelper} from '../helpers/quick-gui'
import {draggableUI} from '../markup/draggable-ui'



function initScene(){
  //Initialization and population of the scene
  const scene = new THREE.Scene();
  const {system}=populateScene(scene)
  //Camera and renderer setup
  const camera=setupCamera()
  const renderer=setupRenderer()
  const composer=setupComposer(renderer, scene, camera)
  const controls = setupControls(camera, renderer);

  //Setting up the animation of the scene
  const animate = setupAnimation(composer, system,scene);
  requestAnimationFrame(animate);

  
  
  

  // setupGuiHelper(scene)
  //Handling of the screen size change
  window.addEventListener('resize', handleResize(camera, renderer, composer));


}
function main() {
  initScene();
  draggableUI();
}

document.addEventListener("DOMContentLoaded", main);
