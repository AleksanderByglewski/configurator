import { parse, v4 as uuidv4 } from 'uuid';
import {accesser} from '../base'
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import {Generic,genericGui,genericState,genericObject,genericDisplay, genericController } from '../base.js'
import {PlanetGui, PlanetObject, Planet, System} from './introduction.js'
import { genericGarageController } from './generic.js';

import { metalMaterial } from '../textures/material_spawn';

const loader = new THREE.TextureLoader();
const global_texture = loader.load('/assets/config/default_1k.jpg');
const global_texture_rotated = loader.load('/assets/config/default_rotated_1k.jpg');
const global_texture_testing = loader.load('/assets/config/uv_grid.jpg');

class GarageObjectGable extends genericObject {
    constructor() {
        super(); 
    }
    create(attributes) {
         let loader = new THREE.TextureLoader();
         debug()
        // let texture = loader.load('/assets/config/default_1k.jpg');
        //  texture = loader.load('assets/config//testing/uv_grid.jpg');
        // var material = new THREE.MeshPhysicalMaterial({
        //     map: texture,
        //     color:  attributes.color || "#ffffff" ,
        //     metalness: 0.5,
        //     roughness: 0.1,
        //     clearcoat: 0.8,
        //     clearcoatRoughness: 0.2
        // });
        //var material=metalMaterial()


        let local_texture=global_texture
     
        let material_type=(attributes && attributes.material_type) ? attributes.material_type : "material_type_1";
        
        switch(material_type){
            case "material_type_1":
                    // texture=global_texture
                    //  color ="#ee2797";
                    local_texture=global_texture.clone();
                    // local_texture.wrapS=THREE.RepeatWrapping
                    // local_texture.wrapT=THREE.RepeatWrapping
                    local_texture.repeat.set(width, height/2);
                    
                    break;
                case "material_type_2":
                    // color ="#2727ee";
                    // local_texture=global_texture_rotated
                    // alert("hello")
                    
                    local_texture=global_texture_rotated.clone();

                    local_texture.repeat.set(width/2, height);
                    
                    break;
                case "material_type_3":
                    // local_texture=loader.load('/assets/config/default_1k.jpg');
      
                    // local_texture.repeat.set(width, height);
                    local_texture=global_texture.clone();
                    local_texture.repeat.set(width, height);
                    
                    break;
                case "material_type_4":
                    // local_texture=loader.load('/assets/config/default_1k.jpg');
                    local_texture=global_texture_rotated.clone();
                    local_texture.repeat.set(width, height);
                    
                    
                    break;
                case "material_type_5":
                    // local_texture=loader.load('/assets/config/default_1k.jpg');
                    
                    
                    local_texture=global_texture_testing.clone();
                    local_texture.repeat.set(width, height);
                    
                    
                    break;
            default:
                // code to be executed if expression doesn't match any cases
        }
        local_texture.wrapS=THREE.RepeatWrapping
        local_texture.wrapT=THREE.RepeatWrapping
        // let texture=global_texture
        let material = new THREE.MeshPhysicalMaterial({
            map: local_texture,
            color: color,
            metalness: 0.5,
            roughness: 0.1,
            clearcoat: 0.8,
            clearcoatRoughness: 0.2
        });



        // material.color="white"
        // Convert roof_angle to radians and compute adjusted width
        const alpha = (attributes.roof_angle || 0) * (Math.PI / 180); // Convert to radians
        let width_adjusted = (attributes.width || 1) * (1 / Math.cos(alpha));
        let height_displacement=width_adjusted*Math.sin(alpha)

        // Use BoxGeometry for the roof with adjusted width
        
        let geometry = new RoundedBoxGeometry(
            parseFloat(width_adjusted),
            parseFloat(attributes.sheet_depth) || 1,
            parseFloat(attributes.depth) || 1, // Assuming depth is always 1, adjust as needed
            parseFloat(attributes.segments) || 1,
            parseFloat(attributes.radius) || 0.005
        );
        // let geometry = new THREE.BoxGeometry(
        //     width_adjusted,
        //     attributes.height || 1,
        //     attributes.depth || 1 // Assuming depth is always 1, adjust as needed
        // );
    
        const roof = new THREE.Mesh(geometry, material);
       
        // .Position and rotate using the given roof angle
        roof.position.set(
            0, // Assuming x position is always 0, adjust as needed
            parseFloat(attributes.position_y),
            0  // Assuming z position is always 0, adjust as needed
        );

        roof.name="We got you gable!"
        roof.rotation.z = alpha; // Rotate by the given roof angle
        
        this.set(roof);
    }
    
    update(attributes){
        if (!this.model) return;
    
        if (attributes.position_x !== undefined) {
            this.model.position.setX(parseFloat(attributes.position_x)+parseFloat(attributes.height)*0);
        }
    
        if (attributes.position_y !== undefined) {
            this.model.position.setY(parseFloat(attributes.position_y) +parseFloat(attributes.height)*0.0);
        }
    
        if (attributes.position_z !== undefined) {
            this.model.position.setZ(attributes.position_z);
        }
        
        // Update rotation if needed
        if (attributes.rotation_z !== undefined) {
            this.model.rotation.z = attributes.rotation_z;
        }
    }
}

class GarageObjectSupport extends genericObject {
    constructor() {
        super(); 
    }
    create(attributes) {
        debug()
        let loader = new THREE.TextureLoader();
        let texture = loader.load('/assets/config/default_1k.jpg');
        // texture = loader.load('assets/config//testing/uv_grid.jpg');
        // var material = new THREE.MeshPhysicalMaterial({
        //     map: texture,
        //     color: attributes.color || "#ffffff",
        //     metalness: 0.5,
        //     roughness: 0.1,
        //     clearcoat: 0.8,
        //     clearcoatRoughness: 0.2
            
        // });
        var material=metalMaterial()
    
        // Create a right-angled triangle using Shape and ExtrudeGeometry for depth
        const alpha =parseFloat( (attributes.roof_angle || 0) * (Math.PI / 180)); // Convert to radians
        const adjusted_width=parseFloat(attributes.width*1/Math.cos(alpha));
        const adjusted_height=parseFloat(adjusted_width*Math.sin(alpha));
        let shape = new THREE.Shape();
        shape.moveTo(0, -0.5*parseFloat(adjusted_height));
        shape.lineTo(-parseFloat(attributes.width) || 1, -0.5*parseFloat(adjusted_height)|| 1);
        shape.lineTo(0, 0.5*parseFloat(adjusted_height)|| 1);
        shape.lineTo(0, 0);
    
        material.map.wrapS = texture.wrapT = THREE.RepeatWrapping;
        material.map.repeat.set( 1, 1);
        // shape.moveTo(0, 0);
        // shape.lineTo(-1, 0);
        // shape.lineTo(0, 1);
        // shape.lineTo(0, 0);
        // Define extrusion settings
        let extrudeSettings = {
            steps: 2,
            depth: parseFloat(attributes.sheet_depth) || 0.1,  // Depth of the extrusion
            bevelEnabled: true,
            bevelSize:0.0005,
            bevelThickness:0.001

        };
    
        let geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    
        // let geometry = new THREE.ShapeGeometry( shape );

        const triangle = new THREE.Mesh(geometry, material);
    
        // Position triangle
        triangle.position.set(
            parseFloat(attributes.position_x)+parseFloat(attributes.width/2) || 0,
            parseFloat(attributes.position_y)|| 0,
            parseFloat(attributes.position_z)+parseFloat((attributes.roof_depth/2||1)) || 0
        );
    
        this.set(triangle);
    }
    update(attributes){
        if (!this.model) return;
    
        if (attributes.position_x !== undefined) {
            this.model.position.setX(parseFloat(attributes.position_x)+parseFloat(attributes.width/2));
        }
    
        if (attributes.position_y !== undefined) {
            const alpha = (attributes.roof_angle || 0) * (Math.PI / 180); // Convert to radians
            let width_adjusted = (attributes.width || 1) * (1 / Math.cos(alpha));
            let height_displacement=width_adjusted*Math.sin(alpha)
            this.model.position.setY(attributes.position_y - (0*height_displacement/2 ));
        }
    
        if (attributes.position_z !== undefined) {
            this.model.position.setZ( parseFloat(attributes.position_z)+parseFloat((attributes.roof_depth/2||1)));
        }
        
        // // Update rotation if needed
        // if (attributes.rotation_z !== undefined) {
        //     this.model.rotation.z = attributes.rotation_z;
        // }
    }
}

class GarageObjectSupportSquare extends genericObject {
    constructor() {
        super(); 
    }
    create(attributes) {
        let loader = new THREE.TextureLoader();
        let texture = loader.load('/assets/config/default_1k.jpg');

        
        // var material = new THREE.MeshPhysicalMaterial({
        //     map: texture,
        //     color:  attributes.color || "#ffffff" ,
        //     metalness: 0.5,
        //     roughness: 0.1,
        //     clearcoat: 0.8,
        //     clearcoatRoughness: 0.2
        // });
        var material=metalMaterial()
        // Convert roof_angle to radians and compute adjusted width
        const alpha = (parseFloat(attributes.roof_angle) || 0) * (Math.PI / 180); // Convert to radians
        let width_adjusted = (parseFloat(attributes.width) || 1) * (1 / Math.cos(alpha));
        let height_adjusted=parseFloat(width_adjusted)* Math.sin(alpha)
        let height_displacement=parseFloat(width_adjusted)*Math.sin(alpha)


        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 1, height_adjusted);
        // Use BoxGeometry for the roof with adjusted width
        
        let geometry = new RoundedBoxGeometry(
            parseFloat(attributes.roof_depth),
            parseFloat(height_adjusted) || 1,
            parseFloat(attributes.sheet_depth) || 1, // Assuming depth is always 1, adjust as needed
            parseFloat(attributes.segments) || 1,
            parseFloat(attributes.radius) || 0.005
        );
        // let geometry = new THREE.BoxGeometry(
        //     width_adjusted,
        //     height_adjusted,
        //     parseFloat(attributes.depth) || 1 // Assuming depth is always 1, adjust as needed
        // );
        
        const roof = new THREE.Mesh(geometry, material);
       
        // Position and rotate using the given roof angle
        roof.position.set(
            parseFloat(attributes.width)/2-0.005, // Assuming x position is always 0, adjust as needed
            parseFloat(attributes.position_y),
            0  // Assuming z position is always 0, adjust as needed
        );
         roof.rotation.y = Math.PI/2;
        // roof.rotation.z = alpha; // Rotate by the given roof angle
        
        this.set(roof);
    }

    update(attributes){
        if (!this.model) return;
    
        if (attributes.position_x !== undefined) {
            this.model.position.setX(parseFloat(attributes.width)/2-0.005);
        }
    
        if (attributes.position_y !== undefined) {
           
            this.model.position.setY(parseFloat(attributes.position_y) );
        }
    
        // if (attributes.position_z !== undefined) {
        //     this.model.position.setZ( parseFloat(attributes.position_z)+parseFloat((attributes.roof_depth/2||1)));
        // }
        
        // // Update rotation if needed
        // if (attributes.rotation_z !== undefined) {
        //     this.model.rotation.z = attributes.rotation_z;
        // }
    }
}

class SupportSquareGarageController extends genericGarageController{
    constructor() {
        super(); 
        this.setModel(GarageObjectSupportSquare)
    }
  

}

class SupportGarageController extends genericGarageController{
    constructor(){
        super()
        this.setModel(GarageObjectSupport)
    }
}

class GableGarageController extends genericGarageController{    
    constructor(){
        super()
        this.setModel(GarageObjectGable)
    }
}

class RoofGarageController extends genericGarageController {

constructor(){
 super()
}
set_the_options(passedObject, accessers){
    for(let i=0; i<accessers.length; i++) {
        passedObject.state.update(accessers[i].resource_locator, accessers[i].value);
    }
}
object_addition(objectOptions,classInstance){
    const added_object=new classInstance()
    added_object.display.set_scene(this.display.get_scene())
    this.set_the_options(added_object, objectOptions)
    this.addChild(added_object)
}

//Okay so i need some help with writing this piece of code i would my roof to be responsible for controlling the states that are being 
//produced and based on those i update the states of my children like this    this.handleEvent('stateChange');
//in which i call calculateState() and then  this.model.update(this.state.state) for all of the children children

//I would like you to ask you for advice, where should i define my functions responsible for the calculation of the proper accessers and their
//Values should it be the responsibility of the parent to provide the proper accessers which would be computed based on it's attributes?

determineState(){
   //You can get the current state of the object by using the 
   let name=this.state.get('name')||'Roof'
   let roof_type=this.state.get('roof_type')||'flat'
   let roof_width=parseFloat(this.state.get('roof_width'))||1
   let roof_depth=parseFloat(this.state.get('roof_depth'))||1
   let roof_height=parseFloat(this.state.get('roof_height'))||2
   let roof_color=this.state.get('color')||"#272727"
   let roof_angle=parseFloat(this.state.get('roof_angle'))||30
   let sheet_depth=parseFloat(this.state.get('sheet_depth'))||0.1
   
    // roof_depth=1.5

   let displacement_y=0
//    displacement_y=1/8*Math.sin(Math.PI*parseFloat(roof_angle)/180)*parseFloat(this.state.get('roof_width'))
    displacement_y=roof_width*(1/2*Math.sin(Math.PI*parseFloat(roof_angle)/180))
    
//    this.state.update( new accesser('position_y',find_displacement))
   

//    this.state.state['position_y']=0.2+1*Math.sin(180*roof_angle/Math.PI)
   const accessersGable=[
    new accesser('name', 'Rooftop'),
    new accesser('width', roof_width),
    new accesser('height', 0.05),
    new accesser('sheet_depth', sheet_depth),
    new accesser('depth', roof_depth),
    new accesser('segments', 0),
    new accesser('radius', 0),
    new accesser('position_x', 0.0),
    new accesser('position_y',displacement_y),
    new accesser('position_z',0),
    new accesser('color', roof_color),
    new accesser('position_relative', 'true'),
    new accesser('roof_angle', roof_angle)
    
  
]
const accessersSupport1=[
    new accesser('name', 'Roof left'),
    new accesser('width', roof_width),
    new accesser('height', roof_height),
    new accesser('sheet_depth', sheet_depth),
    new accesser('depth', 0.05),
    new accesser('roof_depth', roof_depth),
    new accesser('segments', 0),
    new accesser('radius', 0),
    new accesser('position_x', 0.0),
    new accesser('position_y', displacement_y),
    new accesser('position_z',-sheet_depth),
    new accesser('color', roof_color),
    new accesser('position_relative', 'true'),
    new accesser('roof_angle', roof_angle)
  
]
const accessersSupport2=[
    new accesser('name', 'Roof right'),
    new accesser('width', roof_width),
    new accesser('height', roof_height),
    new accesser('sheet_depth', sheet_depth),
    new accesser('depth', 0.05),
    new accesser('roof_depth', roof_depth),
    new accesser('segments', 1),
    new accesser('radius', 1),
    new accesser('position_x', 0.0),
    new accesser('position_y', displacement_y),
    new accesser('position_z',-roof_depth),
    new accesser('color', roof_color),
    new accesser('position_relative', 'true'),
    new accesser('roof_angle', roof_angle)
  
]
const accessersSupport3=[
    new accesser('name', 'Roof back'),
    new accesser('width', roof_width),
    new accesser('height', 1),
    new accesser('sheet_depth', sheet_depth),
    new accesser('depth', 0.05),
    new accesser('roof_depth', roof_depth),
    new accesser('segments', 1),
    new accesser('radius', 0),
    new accesser('position_x', 0.0),
    new accesser('position_y', displacement_y),
    new accesser('position_z',-0.5*roof_width),
    new accesser('color', roof_color),
    new accesser('position_relative', 'true'),
    new accesser('roof_angle', roof_angle)
  
]
return {"accessersGable":accessersGable,"accessersSupport1":accessersSupport1, "accessersSupport2":accessersSupport2,"accessersSupport3":accessersSupport3}
}
calculateState(){
    
    const accessersDict = this.determineState();
    this.set_the_options(this.children[0], accessersDict.accessersGable);
    this.set_the_options(this.children[1], accessersDict.accessersSupport1);
    this.set_the_options(this.children[2], accessersDict.accessersSupport2);
    this.set_the_options(this.children[3], accessersDict.accessersSupport3);
}
buildingStep(){
    const accessers=[
        new accesser('name', 'Roof'),
        new accesser('roof_type', 'flat'),
        new accesser('roof_angle', '10'),
        new accesser('roof_width', '1.5'),
        new accesser('roof_height', '2'),
        new accesser('roof_depth', '2'),
        new accesser('sheet_width', '0.1'),
        new accesser('sheet_depth', '0.015'),
        new accesser('segments', 1),
        new accesser('radius', 0),
        new accesser('position_x', 1),
        
        new accesser('base_position_y', 1),
        new accesser('displacement_y', 0.135),
        new accesser('position_y', 1),
       
        new accesser('position_z',0),
        new accesser('color', '#272727'),
        new accesser('invisible_controller', true),
        new accesser('position_relative', true),
    ]

  
    this.set_mediator(this)
    this.set_the_options(this,accessers)

    let name=this.state['name']||'roof'
    let roof_type=this.state['roof_type']||'flat'
    let roof_width=parseFloat(this.state['roof_width'])||1
    let roof_height=parseFloat(this.state['roof_height'])||1
    let roof_color=this.state['color']||"#272727"
    let roof_angle=parseFloat(this.state['roof_angle'])||30
   
     name='Roof'
     roof_type='flat'
     roof_width=0
     roof_height=0
     roof_color="#272727"
     roof_angle=30
 



    const { accessersGable, accessersSupport1, accessersSupport2, accessersSupport3 } = this.determineState();
    // for(let i=0; i<accessers.length; i++) {
    //     this.state.update(accessers[i].resource_locator, accessers[i].value);
    // }

    let array = [
        {objectOptions: accessersGable, classInstance: GableGarageController},
        {objectOptions: accessersSupport1, classInstance: SupportGarageController},
        {objectOptions: accessersSupport2, classInstance: SupportGarageController},
        {objectOptions: accessersSupport3, classInstance: SupportSquareGarageController}
    ]
    
    array.forEach(({ objectOptions, classInstance }) => {
        this.object_addition.bind(this)(objectOptions, classInstance);
    });
    this.handleEvent('stateChange')
    this.handleEvent('creationStep');
   //OKay now you need to create proper create functions in the garageObjectGHabe and garageObjectSupport
}


handleEvent(event, data) {
    switch (event) {
        case 'buildingStep':
            this.buildingStep()
            //Create children objects get their properties based on 

            break;
        // case 'guiChange':
          
        //     Object.entries(data).forEach(([name, value]) => {
        //         this.state.update(name, value);
        //     });
        default:
            super.handleEvent(event, data);
            break;
    }


}
}


export {RoofGarageController}