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
import { stateMachine } from '../components/state.js';
import { repaint } from '../scenes/garages/objects/base/controller.js';
 
// async function repaint(system) {
//   // Clear the current content
//   const content = document.querySelector('#app');
//   let object_type="start/start"
//   if(system){
//    object_type=system['template_type']|| "start/start" 
//   }
//   if (content) {
//       try {
//           const response = await fetch(`/assets/templates/${object_type}.html`);
//           if (response.ok) {
//               const html = await response.text();
//               content.innerHTML = html;
//           } else {
//               console.error(`Failed to load template for object type: ${object_type}`);
//           }
//       } catch (error) {
//           console.error('Error:', error);
//       }
//   } else {
//       console.error("Element with #app not found");
//   }
//   lightGallery(document.querySelector(".gallery"), {selector:'.gallery-item'})

//   // Re-render the new content
//   // renderHTML(system);
// }


// GUI triggers
// guiElement.onTypeSelected = () => stateMachine.transition("UserSelectsType");
// guiElement.onHeightInput = () => stateMachine.transition("UserInputsHeight");
// guiElement.onWidthInput = () => stateMachine.transition("UserInputsWidth");
// guiElement.onValidationError = () => stateMachine.transition("ValidationError");



function initScene(){
  //Initialization and population of the scene
  repaint(undefined)
  const scene = new THREE.Scene();
  const system = populateScene(scene);

  // The scene element should contain an object with the html to be rendered
  //repaint(system);
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
