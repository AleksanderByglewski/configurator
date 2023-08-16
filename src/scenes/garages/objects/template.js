import { v4 as uuidv4 } from 'uuid';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import {Generic,genericGui,genericState,genericObject,genericDisplay, genericController } from '../base.js'
import {PlanetGui, PlanetObject, Planet, System} from './introduction.js'
import { genericGarageController } from './generic.js';

class GarageObjectGable extends genericObject {
    constructor() {
        super(); 
    }
    create(attributes) {
        


        // For simplicity, creating a basic sphere
        let loader = new THREE.TextureLoader();
        let texture = loader.load('/assets/config/default_1k.jpg');
        var material = new THREE.MeshPhysicalMaterial({
            map:texture,
            color: attributes.color || "#ffffff",
            metalness: 0.5,
            roughness: 0.1,
            clearcoat: 0.8,
            clearcoatRoughness: 0.2
            });
        
        let geometry = new RoundedBoxGeometry(
                attributes.width || 2,
                attributes.height || 1,
                attributes.depth || 1.5,
                attributes.segments || 1,
                attributes.radius || 0.005
            );

        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(
            attributes.position_x || 0,
            attributes.position_y || 0,
            attributes.position_z || 0
        );
        
        this.set(sphere); // Save the mesh into the model using the parent class method
        // this.model.material.color.set(0x4488aa)
        return

       
    }
    update(attributes){
        if (!this.model) return; 

        if (attributes.position_x !== undefined) {
            this.model.position.setX(attributes.position_x);
        }
        

        if (attributes.position_y !== undefined) {
            this.model.position.setY(attributes.position_y);
        }
        
    }
}

class GarageObjectSupport extends genericObject {
    constructor() {
        super(); 
    }
    create(attributes) {
        


        // For simplicity, creating a basic sphere
        let loader = new THREE.TextureLoader();
        let texture = loader.load('/assets/config/default_1k.jpg');
        var material = new THREE.MeshPhysicalMaterial({
            map:texture,
            color: attributes.color || "#ffffff",
            metalness: 0.5,
            roughness: 0.1,
            clearcoat: 0.8,
            clearcoatRoughness: 0.2
            });
        
        let geometry = new RoundedBoxGeometry(
                attributes.width || 2,
                attributes.height || 1,
                attributes.depth || 1.5,
                attributes.segments || 1,
                attributes.radius || 0.005
            );

        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(
            attributes.position_x || 0,
            attributes.position_y || 0,
            attributes.position_z || 0
        );
        
        this.set(sphere); // Save the mesh into the model using the parent class method
        // this.model.material.color.set(0x4488aa)
        return

       
    }
    update(attributes){
        if (!this.model) return; 

        if (attributes.position_x !== undefined) {
            this.model.position.setX(attributes.position_x);
        }
        

        if (attributes.position_y !== undefined) {
            this.model.position.setY(attributes.position_y);
        }
        
    }
}

class RoofGarageController extends genericGarageController {

//So basically the only thing you need to do is ot write the notify function for the creation of proper elements and
//Write the proper function that will transform the input data into attributes for the children
model_update(){
    //implement me here
}

}