import { v4 as uuidv4 } from 'uuid';
import {accesser} from '../base'
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import {Generic,genericGui,genericState,genericObject,genericDisplay, genericController } from '../base.js'
import {PlanetGui, PlanetObject, Planet, System} from './introduction.js'
import { genericGarageController, InvisibleWallGarageObject } from './generic.js';
import { metalMaterial,metalMaterial2 } from '../textures/material_spawn';


class GateGarageObject extends genericObject {
    constructor() {
        super(); 
    }
    create(attributes) {
        // let loader = new THREE.TextureLoader();
        // let texture = loader.load('/assets/config/default_1k.jpg');
        // var material = new THREE.MeshPhysicalMaterial({
        //     map: texture,
        //     color:  attributes.color || "#ffffff" ,
        //     metalness: 0.5,
        //     roughness: 0.1,
        //     clearcoat: 0.8,
        //     clearcoatRoughness: 0.2
        // });
        
        let material=metalMaterial2();
        material.color.set(attributes.color);
        // material.map.repeat.set(19 ,19); // Replace xValue and yValue with desired repeat values
        // material.map.needsUpdate = true;
        // Use BoxGeometry for the roof with adjusted width
        
        let width=parseFloat(attributes.width)
        let height=parseFloat(attributes.height)
       
        
        const rotation_y = (attributes.rotation_y || 0) * (Math.PI / 180); // Convert to radians
        // let garage_width=parseFloat(attributes.garage_width)
        // let garage_height=parseFloat(attributes.garage_height)


        // let geometry = new THREE.BoxGeometry(
        //     1.2,
        //     1.2,
        //     1.2,
        // );
        let geometry = new RoundedBoxGeometry(
            parseFloat(attributes.width),
            parseFloat(attributes.height) || 1,
            parseFloat(attributes.sheet_depth) || 1, // Assuming depth is always 1, adjust as needed
            parseFloat(attributes.segments) || 1,
            parseFloat(attributes.radius) || 0.005
        );
  
    
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
        if (attributes.color!== undefined && this.get_model()!==undefined) {
            this.get_model().material.color.set(attributes.color);
        }
       
            // this.get_model().material.map.repeat.set(1,5);
            
            // this.get_model().material.map.needsUpdate = true;
    
    }
}
class ObjectGarageController extends genericGarageController{
    constructor() {
        super(); 
        this.setModel(GateGarageObject)
    }
  

}
class DoorGarageController extends genericGarageController {
    constructor(){
     super()
     this.setModel( InvisibleWallGarageObject)
    }
    determineState(){
       //You can get the current state of the object by using the 
       let name=this.state.get('name')||'Gate'
       let object_type=this.state.get('object_type')||'flat'
       let object_width=parseFloat(this.state.get('object_width'))||3
       let object_height=parseFloat(this.state.get('object_height'))||0.4
       let object_depth=parseFloat(this.state.get('object_depth'))||2
       let object_color=this.state.get('color')||"#272727"
       let sheet_depth=parseFloat(this.state.get('sheet_depth'))||0.0075
       let wall_height=parseFloat(this.mediator.state.state.height) || (parseFloat(this.state.get('object_height'))||0.4)
       
    const accessersWallFront=[
        new accesser('name', name+"object"),
        new accesser('width', object_width),
        new accesser('height', object_height),
        new accesser('sheet_depth', sheet_depth),
        new accesser('segments', 1),
        new accesser('radius', 0.01),
        new accesser('position_x', 0.0),
        new accesser('position_y', -1/2*(wall_height-object_height)+0.025),
        new accesser('position_z',-0.0*object_depth),
        new accesser('color', object_color),
        new accesser('position_relative', 'true'),
        new accesser('radius', '0.002'),
      
    ]
    // const accessersWallBack=[
    //     new accesser('name', name+"_back"),
    //     new accesser('width', object_width),
    //     new accesser('height', object_height),
    //     new accesser('sheet_depth', sheet_depth),
    //     new accesser('segments', 1),
    //     new accesser('radius', 0.01),
    //     new accesser('position_x', 0.0),
    //     new accesser('position_y', 0),
    //     new accesser('position_z',+0.5*object_depth),
    //     new accesser('color', object_color),
    //     new accesser('position_relative', 'true'),
      
    // ]
    // const accessersWallLeft=[
    //     new accesser('name', name+"_left"),
    //     new accesser('width', object_depth),
    //     new accesser('height', object_height),
    //     new accesser('sheet_depth', sheet_depth),
    //     new accesser('segments', 1),
    //     new accesser('radius', 0.01),
    //     new accesser('position_x', -0.5*object_width),
    //     new accesser('position_y', 0),
    //     new accesser('position_z',0),
    //     new accesser('color', object_color),
    //     new accesser('position_relative', 'true'),
    //     new accesser('rotation_y', '90'),
      
    // ]
    // const accessersWallRight=[
    //     new accesser('name', name+'_right'),
    //     new accesser('width', object_depth),
    //     new accesser('height', object_height),
    //     new accesser('sheet_depth', sheet_depth),
    //     new accesser('segments', 1),
    //     new accesser('radius', 0.01),
    //     new accesser('position_x', 0.5*object_width),
    //     new accesser('position_y', 0),
    //     new accesser('position_z',0),
    //     new accesser('color', object_color),
    //     new accesser('position_relative', 'true'),
    //     new accesser('rotation_y', '90'),
      
    // ]
    return {"accessersWallFront":accessersWallFront}
    }
    calculateState(){
        
        const accessersDict = this.determineState();
        Object.keys(accessersDict).forEach((key, index) => {
            if (this.children[index]) {
                this.setOptions(this.children[index], accessersDict[key]);
            }
        });
    }
    buildingStep(){
        const accessers=[
            new accesser('name', 'Check controller'),
        
        ]  
        this.set_mediator(this)
        this.setOptions(this,accessers)

        const {  accessersWallFront, accessersWallBack,accessersWallLeft, accessersWallRight } = this.determineState();
     
    
        let array = [
            {objectOptions:accessersWallFront, classInstance: ObjectGarageController},
            // {objectOptions:accessersWallBack, classInstance: WallGarageController},
            // {objectOptions:accessersWallLeft, classInstance: WallGarageController},
            // {objectOptions:accessersWallRight, classInstance: WallGarageController}
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

class UconfigObject extends genericObject{
    constructor() {
        super(); 
    }
    update(){}
    create(attributes) {
        
        // const material_color=(attributes.colored).replace('#','0x')

        let material= new THREE.MeshPhysicalMaterial({
   
            metalness: 0.0,
            roughness: 0.1,
            clearcoat: 0.8,
            clearcoatRoughness: 0.2,
            color:  0x272727,
            
          })
        let geometry = new RoundedBoxGeometry(
            parseFloat(attributes.width) || 5,
            parseFloat(attributes.height) || 1,
            parseFloat(attributes.sheet_depth) || 1, // Assuming depth is always 1, adjust as needed
            parseFloat(attributes.segments) || 2,
            parseFloat(attributes.radius) || 0.005
        );
  
    
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(
            parseFloat(attributes.position_x), // Assuming x position is always 0, adjust as needed
            parseFloat(attributes.position_y),
            parseFloat(attributes.position_z),  // Assuming z position is always 0, adjust as needed
        );
        this.set(mesh);
    }
}
class UconfigController extends genericGarageController{
    constructor() {
        super(); 
        this.setModel(UconfigObject)
    }
}
class UconfigsController extends genericGarageController {
    constructor(){
     super()
     this.setModel(InvisibleWallGarageObject)
    }
    determineState(){
       //This is the function that determines the values of the children
       let name=this.state.get('name')||'Gate'
       let object_type=this.state.get('object_type')||'flat'
       let object_width=parseFloat(this.state.get('object_width'))||3
       let object_height=parseFloat(this.state.get('object_height'))||0.4
       let object_depth=parseFloat(this.state.get('object_depth'))||2
       let object_color=this.state.get('color')||"#272727"
       //It returns an array for children from which the children may be created or updated
    const accessersWallFront=[
        new accesser('name', name+"object"),
        new accesser('width', object_width),
        new accesser('height', object_height),
        new accesser('position_x', 0.0),
        new accesser('position_y', 0.025),
        new accesser('position_z',0.0),
        new accesser('color', object_color),
        new accesser('position_relative', 'true')
    ]
    return {"accessersWallFront":accessersWallFront}
    }
    calculateState(){
        //This is a function that updates the values of the children of the system
        const accessersDict = this.determineState();
        Object.keys(accessersDict).forEach((key, index) => {
            if (this.children[index]) {
                this.setOptions(this.children[index], accessersDict[key]);
            }
        });
    }
    buildingStep(){
        const accessers=[
            new accesser('name', 'Check controller'),
        ]  
        this.set_mediator(this)
        this.setOptions(this,accessers)

        const {  accessersWallFront} = this.determineState();
     
    
        let array = [
            {objectOptions:accessersWallFront, classInstance: UconfigController},
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

export {DoorGarageController as FundGarageController, UconfigsController as BasicSystem}
