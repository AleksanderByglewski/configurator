import * as THREE from 'three';
import {accesser} from './base'
import {Ground, closeGround} from './objects/ground'
import {WallsControllableBasicSystem} from './objects/walls/implementation'
import {RoofControllableBasicSystem} from './objects/roof/implementation'  
import {AdditionalControllableBasicSystem } from './objects/doors/implementation'  


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
function attach_ground(scene){
  let ground = new Ground()
  ground.attach(scene)
  let ground2 = new closeGround()
  ground2.attach(scene)
  }
function attach_fog(scene){
  const fogColor = new THREE.Color(0xe7e7e9);  // White color
  const fogDensity = 0.015;  // Adjust this value to control how quickly the fog density increases with distance
  scene.fog = new THREE.Fog(fogColor, 20,70);
  scene.fog = new THREE.FogExp2(fogColor, fogDensity);


}

function populateScene(scene) {
  addLights2(scene)
  addLights(scene)
  // attach_ground(scene)
  // attach_fog(scene)
  scene.background = new THREE.Color(0xcce7f0);




  
  const geometry = new THREE.PlaneGeometry(10, 10);
  const material = new THREE.MeshBasicMaterial({ color: 0xcecece, side: THREE.DoubleSide });
  const floor = new THREE.Mesh(geometry, material);
  floor.rotation.x = Math.PI / 2;
  scene.add(floor);

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

  const emptySystem=[
    // new accesser('name', ' System'),

    // new accesser('position_x', 0.0),
    // new accesser('position_y', 0.0),
    // new accesser('position_z',0.0),
  ]

  function roof_test(){
    
    let GroupGarageSystem=createGarageObject(emptySystem,RoofControllableBasicSystem);
    // GroupGarageSystem.state.update('identifier',"my walls")
    GroupGarageSystem.handleEvent('buildingStep');
    GroupGarageSystem.handleEvent('generateInputs');
   
  }
  roof_test()

  function walls_test(){
    let GroupGarageSystem=createGarageObject(emptySystem,WallsControllableBasicSystem);

    GroupGarageSystem.handleEvent('buildingStep');
    GroupGarageSystem.handleEvent('generateInputs');
  }
  walls_test()

  function door_test(){
    let GroupGarageSystem=createGarageObject(emptySystem,AdditionalControllableBasicSystem);
    GroupGarageSystem.handleEvent('buildingStep');
    GroupGarageSystem.handleEvent('generateInputs');

  }
   door_test()


  return {}
  
  
}


export {populateScene}