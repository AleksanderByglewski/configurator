import * as THREE from 'three';
import {System, Planet } from './implementation'




function populateScene(scene) {


  function createPlanet(options) {
    const planet = new Planet();
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
const earth = createPlanet(earthAttributes)
const mars = createPlanet(marsAttributes)


console.log(solarSystem.getPlanets()); // Outputs: [Planet, Planet]

  
  return {"system":solarSystem,"planet1":earth, "planet2":mars};
}


export {populateScene}