import * as THREE from 'three';
import {System, Planet } from './implementation'
import { brickMaterial2 } from '../../helpers/material_spawn';



function populateScene(scene) {


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
  const earthAttributes = {
    name:'earth',
    speed_y: 0.02978,
    speed_x: 0.00,
    weight: 5.972 * Math.pow(10, 29),
    size: 0.2,
    position_x: 1.4709,
    position_y: 0,
    acceleration_x: 0,
    acceleration_y: 0,
    color: '#4488aa'
  };
  const marsAttributes = {
    name:'mars',
    speed_y: 0.024077,
    speed_x: 0.00,
    weight: 5.972 * Math.pow(10, 29),
    size: 0.2,
    position_x: 2.0662,
    position_y: 0,
    acceleration_x: 0,
    acceleration_y: 0,
    color: '#ff88aa'
  };
  const sunAttributes = {
    name:'sun',
    speed_y: 0.0,
    speed_x: 0.00,
    weight: 5.972 * Math.pow(10, 31),
    size: 0.2,
    position_x: 0.00,
    position_y: 0.00,
    acceleration_x: 0,
    acceleration_y: 0,
    color: '#ffaa44'
  };
  
// Usage example:
const solarSystem = new System();
const sun = createPlanet(sunAttributes)
// {
// // let sun_model=sun.model.get_model()
// // let material = brickMaterial2();
// // Define your geometry
// // Create a directional light with color white and intensity 1.0
      let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(1, 2.2, 0.4); // set the position of the light
      scene.add(directionalLight); // add the light to the scene

      // Create an ambient light with color white and intensity 0.5
      let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight); // add the light to the scene
      var spotlight = new THREE.SpotLight(0xffffff); // white light
      spotlight.position.set(0, 4, 4); // set position of the light

      var spotLightHelper = new THREE.SpotLightHelper(spotlight);
      scene.add(spotLightHelper);

      var coneGeometry = new THREE.ConeGeometry( 0.71, 5*1.41, 64 );
      // var coneMaterial = new THREE.MeshBasicMaterial( {color: 0xffff00} );
      var coneMaterial = new THREE.MeshBasicMaterial( { 
      color: 0xffff00,
      transparent: true,
      opacity: 0.5 // Adjust this value for desired transparency level
      } );
      var cone = new THREE.Mesh( coneGeometry, coneMaterial );

      // Position the cone at the same position as the spotlight
      cone.position.copy(new THREE.Vector3(1/2*spotlight.position.x,1/2*spotlight.position.y,1/2*spotlight.position.z));

      // Rotate the cone so it points in the same direction as the spotlight
      // cone.lookAt(new THREE.Vector3(0,0,0));

      // Rotate the cone 180 degrees
      cone.rotation.x += Math.PI/4;
      scene.add(cone);

      // Define the direction in which the light shines
      spotlight.target.position.set(0, 0, 0);

      // Adjust the angle, intensity and distance of the light
      spotlight.angle = Math.PI/28; // Angle of the light in radians (cone width)
      spotlight.intensity = 10; // Intensity/brightness of the light
      spotlight.distance = 100; // Maximum distance the light reaches. If 0, then it's infinite.

      scene.add(spotlight);


//       let loader = new THREE.TextureLoader();

//       // Load a texture
//       let texture = loader.load('/assets/config/default_1k.jpg');

//       var material = new THREE.MeshPhysicalMaterial({
//       map:texture,
//       color: 0xffffff,
//       metalness: 0.5,
//       roughness: 0.1,
//       clearcoat: 0.8,
//       clearcoatRoughness: 0.2
//       });
//       let geometry = new THREE.BoxGeometry(1, 1, 1);
//       // Create a mesh with the geometry and material
//       let cube = new THREE.Mesh(geometry, material);
//       // Add the mesh to your scene
//       scene.add(cube);
// }
const earth = createPlanet(earthAttributes)
const mars = createPlanet(marsAttributes)

//Lets grab the sun and set the material to it 


solarSystem.handleEvent('generateInputs');
console.log(solarSystem.getPlanets()); // Outputs: [Planet, Planet]

  
  return {"system":solarSystem,"planet1":earth, "planet2":mars};
}


export {populateScene}