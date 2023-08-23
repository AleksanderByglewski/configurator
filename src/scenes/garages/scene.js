import * as THREE from 'three';
import {accesser} from './base'
import {System, Planet, Garage,  genericGarageController, GarageSystem} from './implementation'
import {brickMaterial2} from '../../helpers/material_spawn';
import {RoofGarageController} from './objects/roof'
import {WallsGarageController} from './objects/wall'
import {GateGarageController, DoorGarageController} from './objects/gate'
import {Ground, closeGround} from './objects/ground'
import {FundGarageController} from './objects/fund-singular'
import {FundsGarageController} from './objects/fund-plural'

import {FoundationGarageController} from './objects/foundation'
import {FoundationsGarageController} from './objects/foundations'
import {CanopiesGarageController} from './objects/canopies'





import {BasicSystem} from './objects/fund-singular' 
import {CanopySystem} from './objects/canopySystem' 
import {ControllableBasicSystem} from './objects/templates/basic-controllable' 
 
import {FloorsControllableBasicSystem} from './objects/floors/basic-controllable'  
import {GarageControllableBasicSystem} from './objects/garage/basic-controllable'  
// import {FoundationGarageController, FoundationsGarageController} from './objects/foundation'
function addLights(scene){
  let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 2.2, 0.4); // set the position of the light
  scene.add(directionalLight); // add the light to the scene
  // Create an ambient light with color white and intensity 0.5
  let ambientLight = new THREE.AmbientLight(0xffffff, 20);
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
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );
  scene.add(particleLight);

  particleLight.add(new THREE.PointLight(0xffffff, 0.3));

  particleLight.position.x = 10;
  particleLight.position.y = 3;
  particleLight.position.z = 0;



  let particleLight2 = new THREE.Mesh(
    new THREE.SphereGeometry(0, 24, 24),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
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
  addLights2(scene)
  addLights(scene)
  scene.background = new THREE.Color(0xcce7f0);


  const fogColor = new THREE.Color(0xe7e7e9);  // White color
  const fogDensity = 0.015;  // Adjust this value to control how quickly the fog density increases with distance
  
  // scene.fog = new THREE.FogExp2(fogColor, fogDensity);
  scene.fog = new THREE.Fog(fogColor, 20,70);


  function attach_ground(){
  let ground = new Ground()
  ground.attach(scene)
  let ground2 = new closeGround()
  ground2.attach(scene)
  }
  // attach_ground()
  
  const geometry = new THREE.PlaneGeometry(10, 10);
  const material = new THREE.MeshBasicMaterial({ color: 0xcecece, side: THREE.DoubleSide });
  const floor = new THREE.Mesh(geometry, material);
  floor.rotation.x = Math.PI / 2;
  scene.add(floor);


  // const solarSystem = new System();
  // const sun = createPlanet(sunAttributes)
  // const earth = createPlanet(earthAttributes)
  // const mars = createPlanet(marsAttributes)

  //Hi chat i would like to add two additional parameters here namely position x and position y
  function set_the_options(passedObject, accessers){
    for(let i=0; i<accessers.length; i++) {
        passedObject.state.update(accessers[i].resource_locator, accessers[i].value);
    }

}

function createGarageObject(accessers, ObjectClass){
    const passedObject = new ObjectClass();
    set_the_options(passedObject, accessers)
    passedObject.display.set_scene(scene)
    return passedObject
}

const childGarageAccessers = [
    new accesser('name', 'Child garage'),
    new accesser('width', 2.5),
    new accesser('height', 0.8),
    new accesser('depth', 1.6),
    new accesser('segments', 1),
    new accesser('radius', 0.004),
    new accesser('position_x', 0),
    new accesser('position_y', 0),
    new accesser('position_z', 0.1),
    new accesser('color', '#aa88aa'),
    // new accesser('position_relative', 'true'),
    
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
    // new accesser('position_relative', 'true'),
  
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
const canopySystemAccessers=[
  new accesser('name', ' System'),
  // new accesser('width', 0.0001),
  // new accesser('height', 0.00001),
  // new accesser('depth', 0.00001),
  new accesser('wall_height', 1.30),
  new accesser('wall_depth', 3.5),
  new accesser('wall_width',3.5),
  // new accesser('segments', 1),
  // new accesser('radius', 0),
  new accesser('position_x', 0.0),
  new accesser('position_y', 0.0),
  new accesser('position_z',0.0),
  // new accesser('color', '#272727'),
]
  


  function create_the_canopy(){
    const garageSystem=createGarageObject(canopySystemAccessers,CanopySystem);
    garageSystem.handleEvent('buildingStep');
    garageSystem.handleEvent('creationStep');
    garageSystem.handleEvent('stateChange');
    // garageSystem.handleEvent('generateInputs');
    garageSystem.handleEvent('guiInputChange', {});
  
  
   const walls=new WallsGarageController()
   walls.display.set_scene(scene)
   walls.handleEvent('buildingStep');
   walls.handleEvent('creationStep');
   walls.handleEvent('stateChange');
  //  walls.handleEvent('generateInputs');
     garageSystem.addChild(walls)
  
   const roof=new RoofGarageController()
   roof.display.set_scene(scene)
   roof.handleEvent('buildingStep');
   roof.handleEvent('creationStep');
   roof.handleEvent('stateChange');
  //  roof.handleEvent('generateInputs');
    garageSystem.addChild(roof)
  
  const foundations=new FoundationsGarageController()
  foundations.display.set_scene(scene)
  foundations.handleEvent('buildingStep');
  foundations.handleEvent('creationStep');
  foundations.handleEvent('stateChange');
  // foundations.handleEvent('generateInputs');
  garageSystem.addChild(foundations)
  
   garageSystem.handleEvent('buildingStep');
   garageSystem.handleEvent('creationStep');
   garageSystem.handleEvent('stateChange');
   garageSystem.handleEvent('generateInputs');
   garageSystem.handleEvent('guiInputChange', {});
  
  

   garageSystem.handleEvent('buildingStep');
   garageSystem.handleEvent('creationStep');
   garageSystem.handleEvent('stateChange');
  }
  //create_the_canopy()

  let building;
  function create_the_rest(){
        const garageSystem=createGarageObject(garageSystemAccessers,GarageSystem);
        building=garageSystem
        garageSystem.handleEvent('buildingStep');
        garageSystem.handleEvent('creationStep');
        garageSystem.handleEvent('stateChange');


      const walls=new WallsGarageController()
      walls.display.set_scene(scene)
      walls.handleEvent('buildingStep');
      walls.handleEvent('creationStep');
      walls.handleEvent('stateChange');
      //  walls.handleEvent('generateInputs');
        garageSystem.addChild(walls)

      const roof=new RoofGarageController()
      roof.display.set_scene(scene)
      roof.handleEvent('buildingStep');
      roof.handleEvent('creationStep');
      roof.handleEvent('stateChange');
      //  roof.handleEvent('generateInputs');
        garageSystem.addChild(roof)

      




      const door=new DoorGarageController()
      door.display.set_scene(scene)
      door.handleEvent('buildingStep');
      door.handleEvent('creationStep');
      door.handleEvent('stateChange');
      //  door.handleEvent('generateInputs');
      walls.children[1].addChild(door)
      //adding examples
      const gate=new GateGarageController()
      gate.display.set_scene(scene)
      gate.handleEvent('buildingStep');
      gate.handleEvent('creationStep');
      gate.handleEvent('stateChange');
      // gate.handleEvent('generateInputs');
      walls.children[1].addChild(gate)




      const foundation=createGarageObject(canopySystemAccessers,FloorsControllableBasicSystem);
      garageSystem.handleEvent('buildingStep');
      garageSystem.handleEvent('creationStep');
      garageSystem.handleEvent('stateChange');
      garageSystem.handleEvent('generateInputs');
      garageSystem.addChild(foundation)





      const foundations=new FoundationsGarageController()
      foundations.display.set_scene(scene)
      foundations.handleEvent('buildingStep');
      foundations.handleEvent('creationStep');
      foundations.handleEvent('stateChange');
      foundations.handleEvent('generateInputs');
      garageSystem.addChild(foundations)



      garageSystem.handleEvent('buildingStep');
      garageSystem.handleEvent('creationStep');
      garageSystem.handleEvent('stateChange');
      garageSystem.handleEvent('generateInputs');
      garageSystem.handleEvent('guiInputChange', {});
  }
  // create_the_rest()

  function dummy_nodes(){
    //This is the basic example of creating a system that with one child
    const garageSystem=createGarageObject(canopySystemAccessers,BasicSystem);

    garageSystem.state.
    garageSystem.handleEvent('buildingStep');
    garageSystem.handleEvent('creationStep');
    garageSystem.handleEvent('stateChange');
    garageSystem.handleEvent('generateInputs');
    
  }
  // dummy_nodes()

  let floorgarageSystem;
  function controlable_dummy_nodes(){
    //This is the basic example of creating a system that with one child
    floorgarageSystem=createGarageObject(canopySystemAccessers,FloorsControllableBasicSystem);
    floorgarageSystem.state.update('identifier',"my floor")
    // floorgarageSystem.handleEvent('buildingStep');
    // floorgarageSystem.handleEvent('creationStep');
    // floorgarageSystem.handleEvent('stateChange');
    floorgarageSystem.handleEvent('generateInputs');
    floorgarageSystem.handleEvent('changeFloor', {})

  }
  //So this is the basic dummy node i would like to make sure that i can attach additonal children to it 
   controlable_dummy_nodes()
  
   let generalGarageSystem;
   function controllable_garage_node(){
    //This is the basic example of creating a system that with one child
    generalGarageSystem=createGarageObject(canopySystemAccessers,GarageControllableBasicSystem);

    generalGarageSystem.setCloseFriend(floorgarageSystem)

    generalGarageSystem.state.update('identifier','my control system')
    // generalGarageSystem.state.update('position_y',0)
    // generalGarageSystem.handleEvent('buildingStep');
    // generalGarageSystem.handleEvent('stateChange');
    generalGarageSystem.handleEvent('generateInputs');
    

   }
   controllable_garage_node()
   
  //  generalGarageSystem.addChild(floorgarageSystem)

  function controllable_dummy_nodes_with_children(){

    
  }

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