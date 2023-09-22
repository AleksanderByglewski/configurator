import * as THREE from 'three';
import {accesser} from './base'
import {System, Planet, Garage,  genericGarageController, GarageSystem} from './implementation'
import { brickMaterial2 } from '../../helpers/material_spawn';
import {RoofGarageController} from './objects/roof'
import {WallsGarageController} from './objects/wall'
import {GateGarageController, DoorGarageController} from './objects/gate'
import {Ground, closeGround} from './objects/ground'
function addLights(scene){
  const light = new THREE.DirectionalLight(0xffffff, 51);
  light.position.set(2, 4, 3);
  light.castShadow = true;
  light.shadow.camera.top = 5;
  light.shadow.camera.bottom = -5;
  light.shadow.camera.left = -5;
  light.shadow.camera.right = 5;
  light.shadow.camera.near = 0.1;
  light.shadow.camera.far = 50;
  scene.add(light);
  // Create an ambient light with color white and intensity 0.5
  let ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
  scene.add(ambientLight); // add the light to the scene

  //Create a spotlight
  // var spotlight = new THREE.SpotLight(0xffffff); // white light
  // spotlight.position.set(2, 4, 4); // set position of the light
  // var spotLightHelper = new THREE.SpotLightHelper(spotlight);
  // scene.add(spotLightHelper);
  // spotlight.target.position.set(0, 0, 0);
  // // Adjust the angle, intensity and distance of the light
  // spotlight.angle = Math.PI/28; // Angle of the light in radians (cone width)
  // spotlight.intensity = 10; // Intensity/brightness of the light
  // spotlight.distance = 100; // Maximum distance the light reaches. If 0, then it's infinite.
  // scene.add(spotlight);
}

function addLights2(scene){
  let particleLight;
  particleLight = new THREE.Mesh(
    new THREE.SphereGeometry(0, 24, 24),
    new THREE.MeshStandardMaterial({ color: 0xffffff })
  );
  scene.add(particleLight);

  particleLight.add(new THREE.PointLight(0xffffff, 0.3));

  particleLight.position.x = 10;
  particleLight.position.y = 3;
  particleLight.position.z = 0;



  let particleLight2 = new THREE.Mesh(
    new THREE.SphereGeometry(0, 24, 24),
    new THREE.MeshStandardMaterial({ color: 0xffffff })
  );
  particleLight2.add(new THREE.PointLight(0xffffff, 0.3));


  particleLight2.position.x = 0;
  particleLight2.position.y = 3;
  particleLight2.position.z = Math.cos(0) * 10;

  scene.add(particleLight2);


  const lightPos = new THREE.Vector3(20, 20, -100);
  const pointLight = new THREE.PointLight(0xffffff, 1, 500);
  pointLight.castShadow = true;
  pointLight.shadow.bias = 0.0001;
  pointLight.shadow.mapSize.width = 1024;
  pointLight.shadow.mapSize.height = 1024;
  pointLight.shadow.autoUpdate = true;
  pointLight.shadow.camera.near = 0.1;
  pointLight.shadow.camera.far = 400;
  pointLight.shadow.camera.updateProjectionMatrix();
  pointLight.position.copy(lightPos);
  pointLight.intensity = 0.5
  scene.add(pointLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
  scene.add(ambientLight);

}

function populateScene(scene) {
  // addLights2(scene)
  addLights(scene)
  function createPlanet(options) {
    const planet = new Planet();
    planet.state.update('name', options.name || 'Undefined object');
    planet.state.update('speed_y', options.speed_y || 0);
    planet.state.update('speed_x', options.speed_x || 0);
    planet.state.update('weight', options.weight || 0);
    planet.state.update('size', options.size || 0);
    planet.state.update('position_x', options.position_x || 0);
    planet.state.update('position_y', options.position_y || 0);
    planet.state.update('acceleration_x', options.acceleration_x || 0);
    planet.state.update('acceleration_y', options.acceleration_y || 0);
    planet.state.update('color', options.color || '#FFFFFF'); // Default to white color
    solarSystem.addPlanet(planet);
    planet.display.set_scene(scene);
    planet.handleEvent('creationStep');
    planet.handleEvent('stateChange');

    return planet;
  }

  scene.background = new THREE.Color(0xcce7f0);


  const fogColor = new THREE.Color(0xe7e7e9);  // White color
  const fogDensity = 0.015;  // Adjust this value to control how quickly the fog density increases with distance
  
  scene.fog = new THREE.FogExp2(fogColor, fogDensity);

  let ground = new Ground()
  ground.attach(scene)
  let ground2 = new closeGround()
  ground2.attach(scene)
  // const solarSystem = new System();
  // const sun = createPlanet(sunAttributes)
  // const earth = createPlanet(earthAttributes)
  // const mars = createPlanet(marsAttributes)

  //Hi chat i would like to add two additional parameters here namely position x and position y
  function setOptions(passedObject, accessers){
    for(let i=0; i<accessers.length; i++) {
        passedObject.state.update(accessers[i].resource_locator, accessers[i].value);
    }

}

function createGarageObject(accessers, ObjectClass){
    const passedObject = new ObjectClass();
    setOptions(passedObject, accessers)
    passedObject.display.set_scene(scene)
    return passedObject
}

const childGarageAccessers = [
    new accesser('name', 'Child garage'),
    new accesser('width', 1.5),
    new accesser('height', 0.8),
    new accesser('depth', 1.6),
    new accesser('segments', 1),
    new accesser('radius', 0.004),
    new accesser('position_x', 0),
    new accesser('position_y', 0),
    new accesser('position_z', 0.1),
    new accesser('color', '#aa88aa'),
    new accesser('position_relative', 'true'),
    
];
const childGarage = createGarageObject(childGarageAccessers,genericGarageController);

const garageAccessers = [
    new accesser('name', 'Main garage'),
    new accesser('width', 2),
    new accesser('height', 1),
    new accesser('depth', 1.5),
    new accesser('segments', 1),
    new accesser('radius', 0.005),
    new accesser('position_x', 1),
    new accesser('position_y', 0),
    new accesser('position_z', 0.0),
    new accesser('color', '#aa88aa'),
    new accesser('position_relative', 'true'),
  
];
const garageSystemAccessers=[
  new accesser('name', ' System'),
  // new accesser('width', 0.0001),
  // new accesser('height', 0.00001),
  // new accesser('depth', 0.00001),
  new accesser('wall_height', 1.93),
  new accesser('wall_depth', 3.5),
  new accesser('wall_width',3.5),
  // new accesser('segments', 1),
  // new accesser('radius', 0),
  new accesser('position_x', 0.0),
  new accesser('position_y', 0.0),
  new accesser('position_z',0.0),
  // new accesser('color', '#272727'),
]
  

  const garageSystem=createGarageObject(garageSystemAccessers,GarageSystem);
  garageSystem.handleEvent('buildingStep');
  garageSystem.handleEvent('creationStep');
  garageSystem.handleEvent('stateChange');
  garageSystem.handleEvent('generateInputs');


  // const garage = createGarageObject(garageAccessers,genericGarageController);
  // garageSystem.addChild(garage)

 

  // Add the childGarage to the main garage
  // garage.addChild(childGarage);
  // garage.handleEvent('creationStep');
  // garage.handleEvent('stateChange');
  // garage.handleEvent('generateInputs');
 

  // childGarage.handleEvent('creationStep');
  // childGarage.handleEvent('stateChange');



 const roof=new RoofGarageController()
 roof.display.set_scene(scene)
 roof.handleEvent('buildingStep');
 roof.handleEvent('creationStep');
 roof.handleEvent('stateChange');
 roof.handleEvent('generateInputs');

 const walls=new WallsGarageController()
 walls.display.set_scene(scene)
 walls.handleEvent('buildingStep');
 walls.handleEvent('creationStep');
 walls.handleEvent('stateChange');
 walls.handleEvent('generateInputs');





 garageSystem.addChild(walls)
 garageSystem.addChild(roof)


 const door=new DoorGarageController()
 door.display.set_scene(scene)
 door.handleEvent('buildingStep');
 door.handleEvent('creationStep');
 door.handleEvent('stateChange');
 door.handleEvent('generateInputs');

 walls.children[1].addChild(door)


//adding examples
const gate=new GateGarageController()
gate.display.set_scene(scene)
gate.handleEvent('buildingStep');
gate.handleEvent('creationStep');
gate.handleEvent('stateChange');
gate.handleEvent('generateInputs');

walls.children[1].addChild(gate)





 garageSystem.handleEvent('buildingStep');
 garageSystem.handleEvent('creationStep');
 garageSystem.handleEvent('stateChange');
 garageSystem.handleEvent('generateInputs');
 garageSystem.handleEvent('guiInputChange', {});




 scene.traverse((node) => {
  if (node.isMesh) {
    node.castShadow = true;
    node.receiveShadow = true;
  }
});



  // ... existing code ...




 // Cube
//  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
//  const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
//  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
//  cube.position.y = 0.5;
//  cube.castShadow = true;
//  scene.add(cube);


 
 // Plane
 const planeGeometry = new THREE.PlaneGeometry(10, 10);
 const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
 const plane = new THREE.Mesh(planeGeometry, planeMaterial);
 plane.rotation.x = -Math.PI / 2;
 plane.position.y =0.1;
 plane.receiveShadow = true;
 scene.add(plane);

 // Light


 // Ambient light
 const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
 scene.add(ambientLight);

  // ... rest of the code ...

  // solarSystem.handleEvent('generateInputs');
  // console.log(solarSystem.getPlanets()); // Outputs: [Planet, Planet]

//   const light = new THREE.DirectionalLight(0xffffff, 100);
// light.castShadow = true;
//   scene.traverse((node) => {
//     if (node.isMesh) {
//         node.castShadow = true;
//     }
// });
// scene.traverse((node) => {
//   if (node.isMesh) {
//       node.castShadow = true;
//       node.receiveShadow = true;
//   }
// });

  return {}
  
  // return {"system":solarSystem,"planet1":earth, "planet2":mars};
}


export {populateScene}