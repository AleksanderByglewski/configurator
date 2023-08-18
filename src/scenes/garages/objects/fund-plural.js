import { v4 as uuidv4 } from 'uuid';
import {accesser} from '../base'
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import {Generic,genericGui,genericState,genericObject,genericDisplay, genericController } from '../base.js'
import {PlanetGui, PlanetObject, Planet, System} from './introduction.js'
import { genericGarageController, InvisibleWallGarageObject  } from './generic.js';
import { metalMaterial } from '../textures/material_spawn';

class FundGarageObject extends genericObject {
    constructor() {
        super(); 
    }
    create(attributes) {
        let loader = new THREE.TextureLoader();
        let texture = loader.load('/assets/config/default_1k.jpg');
        var material = new THREE.MeshPhysicalMaterial({
            map: texture,
            color:  attributes.color || "#ffffff" ,
            metalness: 0.5,
            roughness: 0.1,
            clearcoat: 0.8,
            clearcoatRoughness: 0.2
        });
        material=metalMaterial()
        // Use BoxGeometry for the roof with adjusted width
        
        let width=parseFloat(attributes.width)
        let height=parseFloat(attributes.height)
       
        
        const rotation_y = (attributes.rotation_y || 0) * (Math.PI / 180); // Convert to radians
        // let garage_width=parseFloat(attributes.garage_width)
        // let garage_height=parseFloat(attributes.garage_height)

        let geometry = new RoundedBoxGeometry(
            parseFloat(attributes.width),
            parseFloat(attributes.height) || 1,
            parseFloat(attributes.sheet_depth) || 1, // Assuming depth is always 1, adjust as needed
            parseFloat(attributes.segments) || 1,
            parseFloat(attributes.radius) || 0.005
        );
        // let geometry = new THREE.BoxGeometry(
        //     parseFloat(attributes.width),
        //     parseFloat(attributes.height) || 1,
        //     parseFloat(attributes.height), // Assuming depth is always 1, adjust as needed
        // );
    
        const mesh = new THREE.Mesh(geometry, material);
       
        // Position and rotate using the given roof angle
        mesh.position.set(
            parseFloat(attributes.position_x), // Assuming x position is always 0, adjust as needed
            parseFloat(attributes.position_y),
            parseFloat(attributes.position_z),  // Assuming z position is always 0, adjust as needed
        );
        mesh.rotation.y = rotation_y; // Rotate by the given roof angle
        this.set(mesh);
    }

    update(attributes){
        if (!this.model) return;
    
        if (attributes.position_x !== undefined) {
            this.model.position.setX(parseFloat(attributes.position_x));
        }
    
        if (attributes.position_y !== undefined) {
            this.model.position.setY(parseFloat(attributes.position_y));
        }
    
        if (attributes.position_z !== undefined) {
            this.model.position.setZ(parseFloat(attributes.position_z));
        }
        
        // Update rotation if needed
        if (attributes.rotation_z !== undefined) {
            this.model.rotation.z = attributes.rotation_z;
        }
    }
}
class FundGarageController extends genericGarageController{
    constructor() {
        super(); 
        this.setModel(FundGarageObject)
    }
  

}
class FundsGarageController extends genericGarageController {
    constructor(){
     super()
     this.setModel( InvisibleWallGarageObject)
    }

    determineState(){
       //You can get the current state of the object by using the 
       let name=this.state.get('name')||'Wall'
       let object_type=this.state.get('object_type')||'flat'
       let object_width=parseFloat(this.state.get('object_width'))||3
       let object_height=parseFloat(this.state.get('object_height'))||1
       let object_depth=parseFloat(this.state.get('object_depth'))||2
       let object_color=this.state.get('color')||"#272727"
       //let object_angle=parseFloat(this.state.get('object_angle'))||30
       let sheet_depth=parseFloat(this.state.get('sheet_depth'))||0.0075

    const accessersWallFront=[
        new accesser('name', name+"_front"),
        new accesser('width', object_width),
        new accesser('height', object_height),
        new accesser('sheet_depth', sheet_depth),
        new accesser('segments', 1),
        new accesser('radius', 0.01),
        new accesser('position_x', 0.0),
        new accesser('position_y', 0),
        new accesser('position_z',-0.5*object_depth),
        new accesser('color', object_color),
        new accesser('position_relative', 'true'),
      
    ]
    const accessersWallBack=[
        new accesser('name', name+"_back"),
        new accesser('width', object_width),
        new accesser('height', object_height),
        new accesser('sheet_depth', sheet_depth),
        new accesser('segments', 1),
        new accesser('radius', 0.01),
        new accesser('position_x', 0.0),
        new accesser('position_y', 0),
        new accesser('position_z',+0.5*object_depth),
        new accesser('color', object_color),
        new accesser('position_relative', 'true'),
      
    ]
    const accessersWallLeft=[
        new accesser('name', name+"_left"),
        new accesser('width', object_depth),
        new accesser('height', object_height),
        new accesser('sheet_depth', sheet_depth),
        new accesser('segments', 1),
        new accesser('radius', 0.01),
        new accesser('position_x', -0.5*object_width),
        new accesser('position_y', 0),
        new accesser('position_z',0),
        new accesser('color', object_color),
        new accesser('position_relative', 'true'),
        new accesser('rotation_y', '90'),
      
    ]
    const accessersWallRight=[
        new accesser('name', name+'_right'),
        new accesser('width', object_depth),
        new accesser('height', object_height),
        new accesser('sheet_depth', sheet_depth),
        new accesser('segments', 1),
        new accesser('radius', 0.01),
        new accesser('position_x', 0.5*object_width),
        new accesser('position_y', 0),
        new accesser('position_z',0),
        new accesser('color', object_color),
        new accesser('position_relative', 'true'),
        new accesser('rotation_y', '90'),
      
    ]
    return {"accessersWallFront":accessersWallFront,"accessersWallBack": accessersWallBack, "accessersWallLeft":accessersWallLeft,"accessersWallRight":accessersWallRight}
    }
    calculateState(){
        
        const accessersDict = this.determineState();
        Object.keys(accessersDict).forEach((key, index) => {
            if (this.children[index]) {
                this.set_the_options(this.children[index], accessersDict[key]);
            }
        });
    }
    buildingStep(){
        const accessers=[
            new accesser('name', 'Funds'),
            new accesser('object_type', 'flat'),
            new accesser('object_angle', '30'),
            new accesser('object_width', '1.5'),
            new accesser('object_height', '1'),
            new accesser('object_depth', '1.5'),
            new accesser('sheet_depth', '0.0075'),
            new accesser('segments', 1),
            new accesser('radius', 0),
            new accesser('position_x', 1),
            new accesser('position_y', 0.5),
            new accesser('position_z',0),
            new accesser('color', '#272727'),
            new accesser('invisible_controller', true),
            new accesser('position_relative', true),
        ]
    
      
        this.set_mediator(this)
        this.set_the_options(this,accessers)

        const {  accessersWallFront, accessersWallBack,accessersWallLeft, accessersWallRight } = this.determineState();
     
    
        let array = [
            {objectOptions:accessersWallFront, classInstance: FundGarageController},
            {objectOptions:accessersWallBack, classInstance: FundGarageController},
            {objectOptions:accessersWallLeft, classInstance: FundGarageController},
            {objectOptions:accessersWallRight, classInstance: FundGarageController}
        ]
        
        array.forEach(({ objectOptions, classInstance }) => {
            this.object_addition.bind(this)(objectOptions, classInstance);
        });
        this.handleEvent('stateChange')
        this.handleEvent('creationStep');
    }
    handleEvent(event, data) {
        switch (event) {
            case 'buildingStep':
                this.buildingStep()
                break;
            default:
                super.handleEvent(event, data);
                break;
        }
    }
}
export {FundsGarageController as FundsGarageController}
