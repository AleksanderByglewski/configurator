import * as THREE from 'three';
import { setupComposer } from '../postprocessing/composer';
import { setupRenderer } from '../renderer/renderer';
import { setupCamera } from '../renderer/camera'
import { setupControls } from '../renderer/controls'
import { handleResize } from '../renderer/resize'
import { populateScene } from '../scenes/garages/scene.js'
import { setupAnimation, setupAnimationRenderer } from '../scenes/garages/animation.js'
import { setupGuiHelper } from '../helpers/quick-gui'
import { draggableUI } from '../markup/draggable-ui'

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

  initializeRaycaster(scene, camera)
  // Handling of the screen size change
  window.addEventListener('resize', handleResize(camera, renderer, composer));
}

function main() {
  initScene();
  draggableUI();
}
function initializeRaycaster(scene, camera) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  function logAllDescendants(object, prefix = '') {
    if (object.children.length === 9) {

      console.log("hi")
      //debugger;
    }
    object.children.forEach((child) => {
      console.log(`${prefix}${child.name} - Type: ${child.type}`);
      logAllDescendants(child, prefix + '  ');
    });
  }
  function getAllDescendants(scene, objectsList = []) {
    scene.children.forEach((child) => {
      objectsList.push(child);
      // Recursively get all descendants
      if (child.children.length) {
        getAllDescendants(child, objectsList);
      }
    });
    return objectsList;
  }


  let previouslyIntersected = new Map();

  function onMouseEvent(event) {



    // Use this function to list all descendants of the scene

    // Convert mouse position to NDC
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the raycaster with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Calculate objects intersected by the ray
    //const allObjects = getAllDescendants(scene);

    const intersects = raycaster.intersectObjects(scene.children, true);
    //SB
    //This only intersects the direct children of the scene most likely we would like it to intersect all of the descendants in this scene
    //  debugger
    //  const intersects = raycaster.intersectObjects(allObjects, true);


    // Handle intersects (e.g., log intersected object names)
    function updateIntersections() {
      const intersects = raycaster.intersectObjects(scene.children, true);
    
      // New map for currently intersected objects
      let currentlyIntersected = new Map();
    
      // Change color of newly intersected objects and store their original colors
      intersects.forEach((intersect) => {
        console.log(intersect.object.uuid);
        intersect.object.traverse((child) => {
          if (child.material && !previouslyIntersected.has(child.uuid)) {
            // Store the original color
            previouslyIntersected.set(child.uuid, child.material.color.clone());
            // Change the material color to red
            child.material.color.set(0xff0000);
          }
        });
        // Mark it as currently intersected
        currentlyIntersected.set(intersect.object.uuid, true);
      });
    
      // Revert color of objects that are no longer intersected
      previouslyIntersected.forEach((originalColor, uuid) => {
        if (!currentlyIntersected.has(uuid)) {
          const object = scene.getObjectByProperty('uuid', uuid);
          if (object && object.material) {
            object.material.color.copy(originalColor);
            object.material.needsUpdate = true;
          }
          // Remove from map after reverting color
          previouslyIntersected.delete(uuid);
        }
      });
    }
    updateIntersections();



  }
  function handleKeyPress(event) {
    //debugger
    // Check if the 'S' key was pressed
    if (event.key === "s" || event.key === "S") {
      // The 'S' key was pressed, perform your action here
      console.log("The 'S' key was pressed.");
      logAllDescendants(scene);

      // Your code to be executed when the 'S' key is pressed
    }
  }

  // Add the event listener for the 'keydown' event
  window.addEventListener('keydown', handleKeyPress);
  // Attach event listener for mouse move or click
  window.addEventListener('mousemove', onMouseEvent);
}
document.addEventListener("DOMContentLoaded", main);