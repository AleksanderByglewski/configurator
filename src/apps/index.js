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



async function repaint(system) {
  // Clear the current content
  const content = document.querySelector('#app');

  const object_type=system['template_type']
  if (content) {
      try {
          const response = await fetch(`/assets/templates/${object_type}.html`);
          if (response.ok) {
              const html = await response.text();
              content.innerHTML = html;
          } else {
              console.error(`Failed to load template for object type: ${object_type}`);
          }
      } catch (error) {
          console.error('Error:', error);
      }
  } else {
      console.error("Element with #app not found");
  }
  lightGallery(document.querySelector(".gallery"), {selector:'.gallery-item'})

  // Re-render the new content
  // renderHTML(system);
}

function initScene(){
  //Initialization and population of the scene
  
  const scene = new THREE.Scene();
  const system = populateScene(scene);

  // The scene element should contain an object with the html to be rendered
  repaint(system);
  //Camera and renderer setup
  // const camera=setupCamera()
  // const renderer=setupRenderer()
  // const composer=setupComposer(renderer, scene, camera)
  // const controls=setupControls(camera, renderer);

  // // Setting up the animation of the scene using Renderer
  // const animate=setupAnimationRenderer(renderer, system,scene, camera)
  // // const animate = setupAnimation(composer, system,scene);
  // requestAnimationFrame(animate);

  
  
  

  // setupGuiHelper(scene)
  //Handling of the screen size change
  // window.addEventListener('resize', handleResize(camera, renderer, composer));


}
function main() {
  initScene();
  draggableUI();
}

document.addEventListener("DOMContentLoaded", main);
