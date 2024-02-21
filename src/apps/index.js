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
  let root = populateScene(scene);

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

  initializeRaycaster(scene, camera, root)
  // Handling of the screen size change
  window.addEventListener('resize', handleResize(camera, renderer, composer));
}

function main() {
  initScene();
  draggableUI();
}
function initializeRaycaster(scene, camera, root) {

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  function logAllDescendants(object, prefix = '') {

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

    let intersects = raycaster.intersectObjects(scene.children, true);
    //SB
    //So now we have got the entire traversaln figured out 
    //We will probably need to call the gui calls now instead of coloring the children but that is okay for now
    function findInteractableAncestor(object) {

      while (object !== null && object !== scene) {
          // Safely check if userData exists and has interactionGroup property set to true
          
          if (object.userData?.interactionGroup === true) {
              return object; // Found the interactable group
          }
          object = object.parent; // Move up in the hierarchy
      }
      return null; // No interactable ancestor found
  }
    // Handle intersects (e.g., log intersected object names)
    function updateIntersections() {
      let intersects_proposition = raycaster.intersectObjects(scene.children, true);
      
      intersects=[]
      if (intersects_proposition.length > 0) {
        // Assume the first intersected object is the one we're interested in
        //intersects = [intersects_proposition[0]];
        
        let ans=findInteractableAncestor(intersects_proposition[0].object)
        intersects =ans ? [ans] : [];
      }

      console.log(intersects)
      // New map for currently intersected objects
      for (let uuid of previouslyIntersected.keys()) {
        previouslyIntersected.get(uuid).intersected = false;
      }

      // Handle current intersections
      intersects.forEach((intersect) => {
        const object = intersect;
        object.traverse((child) => {
          if (child.isMesh) {
            if (!previouslyIntersected.has(child.uuid)) {
              // Store original color and mark as intersected
              previouslyIntersected.set(child.uuid, { color: child.material.color.clone(), intersected: true });
            } else {
              previouslyIntersected.get(child.uuid).intersected = true;
            }
            // Change color to red
            child.material.color.set(0xff0000);
          }
        });
      });

      // Revert color of no longer intersected objects
      previouslyIntersected.forEach((value, uuid) => {
        if (!value.intersected) {
          const object = scene.getObjectByProperty('uuid', uuid);
          if (object) {
            object.material.color.copy(value.color);
            previouslyIntersected.delete(uuid); // Optional: remove from map to keep it clean
          }
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
  //We will do it like this we will keep the external uids in the scene object which is easily accessible by everyone 
  //Lets call them config_objects
  //Then in the config objects we will do some things so let's do it

  // Add the event listener for the 'keydown' event
  window.addEventListener('keydown', handleKeyPress);
  // Attach event listener for mouse move or click
  window.addEventListener('mousemove', onMouseEvent);
}
document.addEventListener("DOMContentLoaded", main);