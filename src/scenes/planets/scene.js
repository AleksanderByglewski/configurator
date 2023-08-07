import * as THREE from 'three';
import {System, Planet } from './implementation'



function populateScene(scene) {


// Usage example:
const solarSystem = new System();

const sun = new Planet();
sun.state.update('speed_y', 0.0); // km/s, orbital speed
sun.state.update('speed_x', 0.00); // km/s, orbital speed
sun.state.update('weight', 5.972 * Math.pow(10, 31)); // kg, sun's mass
sun.state.update('size', 0.2); // km, sun's radius
sun.state.update('position_x', 0.00 ); // km, distance from Sun at perihelion
sun.state.update('position_y', 0.00); // Assuming sun is on x-axis in this example
sun.state.update('acceleration_x', 0); // initial acceleration in x-direction
sun.state.update('acceleration_y', 0); // initial acceleration in y-direction
solarSystem.addPlanet(sun);
sun.display.set_scene(scene);
sun.handleEvent('creationStep');

const earth = new Planet();
earth.state.update('speed_y', 0.02978); // km/s, orbital speed
earth.state.update('speed_x', 0.00); // km/s, orbital speed
earth.state.update('weight', 5.972 * Math.pow(10, 29)); // kg, Earth's mass
earth.state.update('size', 0.2); // km, Earth's radius
earth.state.update('position_x', 1.4709 ); // km, distance from Sun at perihelion
earth.state.update('position_y', 0); // Assuming Earth is on x-axis in this example
earth.state.update('acceleration_x', 0); // initial acceleration in x-direction
earth.state.update('acceleration_y', 0); // initial acceleration in y-direction
solarSystem.addPlanet(earth);
earth.display.set_scene(scene);
earth.handleEvent('creationStep');

const mars = new Planet();
mars.state.update('speed_y', 0.024077); // km/s, orbital speed
mars.state.update('speed_x', 0.00); // km/s, orbital speed
mars.state.update('weight', 5.972* Math.pow(10, 29)); // kg, Mars's mass
mars.state.update('size', 0.2); // km, Mars's radius
mars.state.update('position_x', 2.0662); // km, distance from Sun at perihelion
mars.state.update('position_y', 0); // Assuming Mars is on x-axis in this example
mars.state.update('acceleration_x', 0); // initial acceleration in x-direction
mars.state.update('acceleration_y', 0); // initial acceleration in y-direction
solarSystem.addPlanet(mars);
mars.display.set_scene(scene);
mars.handleEvent('creationStep');

console.log(solarSystem.getPlanets()); // Outputs: [Planet, Planet]




  // const boxWidth = 0.0;
  // const boxHeight = 0.0;
  // const boxDepth = 0.0;
  // const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
  // const material = new THREE.MeshBasicMaterial({ color: 0x4488aa });
  // const cube = new THREE.Mesh(geometry, material);
  // scene.add(cube);
  // const cube2= new THREE.Mesh(geometry, material);
  // cube2.position.x=1
  // scene.add(cube2);
  
  
  return {"system":solarSystem,"planet1":earth, "planet2":mars};
}


  export {populateScene}