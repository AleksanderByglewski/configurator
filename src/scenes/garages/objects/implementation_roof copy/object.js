import { v4 as uuidv4 } from 'uuid';
import { accesser, gui } from '../../base'
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { Generic, genericGui, genericState, genericObject, genericDisplay, genericController } from '../../base.js'
import { PlanetGui, PlanetObject, Planet, System } from '../introduction.js'
import {global_metal_material, select_texture} from '../../textures/spawn'

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';


const loader = new THREE.TextureLoader();
const global_texture = loader.load('/assets/config/default_1k.jpg');
const global_texture_rotated = loader.load('/assets/config/default_rotated_1k.jpg');
const global_texture_testing = loader.load('/assets/config/uv_grid.jpg');

const API = {
    offsetX: 0,
    offsetY: 0,
    repeatX: 1,
    repeatY: 1,
    rotation: 0*Math.PI / 4, // positive is counterclockwise
    centerX: 0.0,
    centerY: 0.0,
    width:10,
    height2:10
};
let already_created=false
function initGui() {
    if(already_created) return;
//     const gui2 = new GUI();

    const folder = gui.addFolder( 'Position' );

    folder.add( API, 'offsetX', 0.0, 1.0 ).name( 'offset.x' )
    folder.add( API, 'offsetY', 0.0, 1.0 ).name( 'offset.y' )
    folder.add( API, 'repeatX', 0.25, 10.0 ).name( 'repeat.x' )
    folder.add( API, 'repeatY', 0.25, 10.0 ).name( 'repeat.y' )
    folder.add( API, 'rotation', - 2.0, 2.0 ).name( 'rotation' )
    folder.add( API, 'centerX', 0.0, 1.0 ).name( 'center.x' )
    folder.add( API, 'centerY', 0.0, 1.0 ).name( 'center.y' )
    folder.add( API, 'width', 0.0, 10.0 ).name( 'width' )
    folder.add( API, 'height2', 0.0, 10.0 ).name( 'height' )

    already_created=true;
}


class SphereObject extends genericObject {
    constructor() {
        super();
    }
    create(attributes={}) {

    
        let position_x= (attributes && attributes.position_x) ? parseFloat(attributes.position_x) : 0;
        let position_y= (attributes && attributes.position_y) ? parseFloat(attributes.position_y) : 0;
        let position_z= (attributes && attributes.position_z) ? parseFloat(attributes.position_z) : 0;
        let color = (attributes && attributes.color) ? attributes.color : "#CCCCCC";
 
        let width= (attributes && attributes.width) ? parseFloat(attributes.width) : 0;
        let depth= (attributes && attributes.depth) ? parseFloat(attributes.depth) : 0;
        let height= (attributes && attributes.height) ? parseFloat(attributes.height) : 0;
        let sheet_depth= (attributes && attributes.sheet_depth) ? parseFloat(attributes.sheet_depth) : 10.25;
        // var material = new THREE.MeshPhysicalMaterial({
        //     map: texture,
        //     color: attributes.color || "#ffffff",
        //     metalness: 0.5,
        //     roughness: 0.1,
        //     clearcoat: 0.8,
        //     clearcoatRoughness: 0.2
            
        // });
     
        // let texture=loader.load('/assets/config/default_rotated_1k.jpg');
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
        let material = select_texture({ width: width, height: height, color: "#c6eaff", material_type:  "material_type_4" })
        material.side = THREE.DoubleSide


        //  material = new THREE.MeshStandardMaterial({
        //     map: local_texture,
        //     color: color,
        //     // metalness: 0.0,
        //     // roughness: 0.1,
        //     // clearcoat: 0.8,
        //     // clearcoatRoughness: 0.2
        // });

        
        

        // let geometry = new RoundedBoxGeometry(
        //     parseFloat(attributes.width) || 5,
        //     parseFloat(attributes.height) || 1,
        //     parseFloat(attributes.depth) || 1, // Assuming depth is always 1, adjust as needed
        //     parseFloat(attributes.segments) || 2,
        //     parseFloat(attributes.radius) || 0.005
        // );
        let geometry;

        geometry = new THREE.BoxGeometry(
            width+0.01,
            height+0.01,
            depth+0.01, // Assuming depth is always 1, adjust as needed
        );

         geometry = new RoundedBoxGeometry(
            width,
            height ,
            depth , // Assuming depth is always 1, adjust as needed
            parseFloat(attributes.segments) || 1,
            parseFloat(attributes.radius) || 0.005
        );

        
        const mesh = new THREE.Mesh(geometry, material);
     
        //  position_x = Math.random() * 1-0.5;
        //console.log(position_x);


        mesh.position.set(
            parseFloat(position_x), // Assuming x position is always 0, adjust as needed
            parseFloat(position_y),
            parseFloat(position_z),  // Assuming z position is always 0, adjust as needed
        );


        // mesh.rotation.y = 0.70; // Rotate by the given roof angle
        this.set(mesh);
    }

    // update(attributes) {
    //     if (!this.model) return;

    //     if (attributes.position_x !== undefined) {
    //         this.model.position.setX(parseFloat(attributes.position_x));
    //     }

    //     if (attributes.position_y !== undefined) {
    //         this.model.position.setY(parseFloat(attributes.position_y));
    //     }

    //     if (attributes.position_z !== undefined) {
    //         this.model.position.setZ(parseFloat(attributes.position_z));
    //     }

    //     // Update rotation if needed
    //     if (attributes.rotation_z !== undefined) {
    //         this.model.rotation.z = attributes.rotation_z;
    //     }
    // }
}
class RoofSideRightObject extends genericObject {
    constructor() {
        super();
        initGui()
        
    }
    create(attributes={}) {
       
        let position_x= (attributes && attributes.position_x) ? parseFloat(attributes.position_x) : 0;
        let position_y= (attributes && attributes.position_y) ? parseFloat(attributes.position_y) : 0;
        let position_z= (attributes && attributes.position_z) ? parseFloat(attributes.position_z) : 0;
        let wall_color = (attributes && attributes.wall_color) ? attributes.wall_color : "#CCCCCC";
 
        let width= (attributes && attributes.width) ? parseFloat(attributes.width) : 0;
        let depth= (attributes && attributes.depth) ? parseFloat(attributes.depth) : 0;
        let height= (attributes && attributes.height) ? parseFloat(attributes.height) : 0;
        let sheet_depth= (attributes && attributes.sheet_depth) ? parseFloat(attributes.sheet_depth) : 10.25;
        let material_type = (attributes && attributes.material_type) ? attributes.material_type : "#FFFFFF";
       
        let texture_offset = (attributes && attributes.texture_offset) ? attributes.texture_offset : 0;
   
        //texture_offset=API.offsetX
        
      
        // texture_offset=1.25
        // texture_offset=0.125
     
        // var material = new THREE.MeshPhysicalMaterial({
        //     map: texture,
        //     color: attributes.color || "#ffffff",
        //     metalness: 0.5,
        //     roughness: 0.1,
        //     clearcoat: 0.8,
        //     clearcoatRoughness: 0.2
            
        // });
        // debug()
        

        // let texture=loader.load('/assets/config/default_rotated_1k.jpg');
        // let local_texture=global_texture
     
        // let material_type=(attributes && attributes.material_type) ? attributes.material_type : "material_type_1";
        
        // switch(material_type){
        //     case "material_type_1":
        //             // texture=global_texture
        //             //  color ="#ee2797";
        //             local_texture=global_texture.clone();
        //             // local_texture.wrapS=THREE.RepeatWrapping
        //             // local_texture.wrapT=THREE.RepeatWrapping
        //             local_texture.repeat.set(width, height/2);
                    
        //             break;
        //         case "material_type_2":
        //             // color ="#2727ee";
        //             // local_texture=global_texture_rotated
        
                    
        //             local_texture=global_texture_rotated.clone();

        //             local_texture.repeat.set(width/2, height);
                    
        //             break;
        //         case "material_type_3":
        //             // local_texture=loader.load('/assets/config/default_1k.jpg');
      
        //             // local_texture.repeat.set(width, height);
        //             local_texture=global_texture.clone();
        //             local_texture.repeat.set(width, height);
                    
        //             break;
        //         case "material_type_4":
        //             // local_texture=loader.load('/assets/config/default_1k.jpg');
        //             local_texture=global_texture_rotated.clone();
        //             local_texture.repeat.set(width, height);
                    
                    
        //             break;
        //         case "material_type_5":
        //             // local_texture=loader.load('/assets/config/default_1k.jpg');
                    
                    
        //             local_texture=global_texture_testing.clone();
        //             local_texture.repeat.set(width, height);
                    
                    
        //             break;
        //     default:
        //         // code to be executed if expression doesn't match any cases
        // }
        // local_texture.wrapS=THREE.RepeatWrapping
        // local_texture.wrapT=THREE.RepeatWrapping
        // // let texture=global_texture
        // let material = new THREE.MeshStandardMaterial({
        //     map: local_texture,
        //     color: color,
        //     // metalness: 0.0,
        //     // roughness: 0.1,
        //     // clearcoat: 0.8,
        //     // clearcoatRoughness: 0.2
        // });

        
        

        // let geometry = new RoundedBoxGeometry(
        //     parseFloat(attributes.width) || 5,
        //     parseFloat(attributes.height) || 1,
        //     parseFloat(attributes.depth) || 1, // Assuming depth is always 1, adjust as needed
        //     parseFloat(attributes.segments) || 2,
        //     parseFloat(attributes.radius) || 0.005
        // );
        let material
        let geometry;

        let shape = new THREE.Shape();
        // shape.moveTo(-width/2,0)
        // shape.lineTo(width/2,0)
        // shape.lineTo(-width/2,height)


        shape.moveTo(-width/2,0)
        shape.lineTo(width/2,0)
        //  shape.lineTo(width/2,height/2)
        shape.lineTo(-width/2,height)

        // shape.moveTo( 0, height );  // Move to the first point
        // shape.lineTo( -1, -1 );  // Draw a line to the second point
        // shape.lineTo( 1, -1 );  // Draw a line to the third point
        shape.closePath();  // Close the path to create a triangle

        var uvs = new Float32Array([
            texture_offset, 0.0,  // Maps the (-1, -1) vertex of the model to the bottom-left of the texture
            texture_offset, 1.0,  // Maps the (1, -1) vertex of the model to the bottom-right of the texture
            1.0+texture_offset, 0.0,  // Maps the (-1, 1) vertex of the model to the top-left of the texture
            ]);


       // shape.moveTo( 0, height );  // Move to the first point
       // shape.lineTo( -1, -1 );  // Draw a line to the second point
       // shape.lineTo( 1, -1 );  // Draw a line to the third point
        shape.closePath();  // Close the path to create a triangle
        
        geometry = new THREE.ShapeGeometry( shape );
        geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
        // Create a material

        // Create a material
        // let local_texture=loader.load('/assets/config/default_1k.jpg');
        // local_texture.wrapS=THREE.RepeatWrapping
        // local_texture.wrapT=THREE.RepeatWrapping
        // local_texture.repeat.set(1, 2*height);
        // // Create a material
        // material = new THREE.MeshStandardMaterial({
        //     map:local_texture,
        //     side:THREE.DoubleSide,
        //     color:wall_color});
        
        
                     //GOBACKTO
       
                    //  material=select_texture({width:1,height:height,color:color})
                     material=select_texture({width:width,height:height,color:wall_color, debug:false, material_type:material_type})
                     material.side= THREE.DoubleSide
        // Create a mesh from the geometry and materia
        

        
        const mesh = new THREE.Mesh(geometry, material);
     
        //  position_x = Math.random() * 1-0.5;
        //console.log(position_x);


        mesh.position.set(
            parseFloat(position_x), // Assuming x position is always 0, adjust as needed
            parseFloat(position_y),
            parseFloat(position_z),  // Assuming z position is always 0, adjust as needed
        );


        // mesh.rotation.y = 0.70; // Rotate by the given roof angle
        this.set(mesh);
    }

    // update(attributes) {
    //     if (!this.model) return;

    //     if (attributes.position_x !== undefined) {
    //         this.model.position.setX(parseFloat(attributes.position_x));
    //     }

    //     if (attributes.position_y !== undefined) {
    //         this.model.position.setY(parseFloat(attributes.position_y));
    //     }

    //     if (attributes.position_z !== undefined) {
    //         this.model.position.setZ(parseFloat(attributes.position_z));
    //     }

    //     // Update rotation if needed
    //     if (attributes.rotation_z !== undefined) {
    //         this.model.rotation.z = attributes.rotation_z;
    //     }
    // }
}
class RoofSideLeftObject extends genericObject {
    constructor() {
        super();
    }
    create(attributes={}) {

    
        let position_x= (attributes && attributes.position_x) ? parseFloat(attributes.position_x) : 0;
        let position_y= (attributes && attributes.position_y) ? parseFloat(attributes.position_y) : 0;
        let position_z= (attributes && attributes.position_z) ? parseFloat(attributes.position_z) : 0;
        let wall_color = (attributes && attributes.wall_color) ? attributes.wall_color : "#FFFFFF";
       

       
        let width= (attributes && attributes.width) ? parseFloat(attributes.width) : 0;
        let depth= (attributes && attributes.depth) ? parseFloat(attributes.depth) : 0;
        let height= (attributes && attributes.height) ? parseFloat(attributes.height) : 0;
        let sheet_depth= (attributes && attributes.sheet_depth) ? parseFloat(attributes.sheet_depth) : 10.25;


        let material_type = (attributes && attributes.material_type) ? attributes.material_type : "#FFFFFF";
        // var material = new THREE.MeshPhysicalMaterial({
        //     map: texture,
        //     color: attributes.color || "#ffffff",
        //     metalness: 0.5,
        //     roughness: 0.1,
        //     clearcoat: 0.8,
        //     clearcoatRoughness: 0.2
            
        // });
        // debug()
        

        // let texture=loader.load('/assets/config/default_rotated_1k.jpg');
        // let local_texture=global_texture
     
        // let material_type=(attributes && attributes.material_type) ? attributes.material_type : "material_type_1";
        
        // switch(material_type){
        //     case "material_type_1":
        //             // texture=global_texture
        //             //  color ="#ee2797";
        //             local_texture=global_texture.clone();
        //             // local_texture.wrapS=THREE.RepeatWrapping
        //             // local_texture.wrapT=THREE.RepeatWrapping
        //             local_texture.repeat.set(width, height/2);
                    
        //             break;
        //         case "material_type_2":
        //             // color ="#2727ee";
        //             // local_texture=global_texture_rotated
        
                    
        //             local_texture=global_texture_rotated.clone();

        //             local_texture.repeat.set(width/2, height);
                    
        //             break;
        //         case "material_type_3":
        //             // local_texture=loader.load('/assets/config/default_1k.jpg');
      
        //             // local_texture.repeat.set(width, height);
        //             local_texture=global_texture.clone();
        //             local_texture.repeat.set(width, height);
                    
        //             break;
        //         case "material_type_4":
        //             // local_texture=loader.load('/assets/config/default_1k.jpg');
        //             local_texture=global_texture_rotated.clone();
        //             local_texture.repeat.set(width, height);
                    
                    
        //             break;
        //         case "material_type_5":
        //             // local_texture=loader.load('/assets/config/default_1k.jpg');
                    
                    
        //             local_texture=global_texture_testing.clone();
        //             local_texture.repeat.set(width, height);
                    
                    
        //             break;
        //     default:
        //         // code to be executed if expression doesn't match any cases
        // }
        // local_texture.wrapS=THREE.RepeatWrapping
        // local_texture.wrapT=THREE.RepeatWrapping
        // // let texture=global_texture
        // let material = new THREE.MeshStandardMaterial({
        //     map: local_texture,
        //     color: color,
        //     // metalness: 0.0,
        //     // roughness: 0.1,
        //     // clearcoat: 0.8,
        //     // clearcoatRoughness: 0.2
        // });

        
        

        // let geometry = new RoundedBoxGeometry(
        //     parseFloat(attributes.width) || 5,
        //     parseFloat(attributes.height) || 1,
        //     parseFloat(attributes.depth) || 1, // Assuming depth is always 1, adjust as needed
        //     parseFloat(attributes.segments) || 2,
        //     parseFloat(attributes.radius) || 0.005
        // );
        let material
        let geometry;

        // let shape = new THREE.Shape();
        // shape.moveTo(-width/2,0)
        // shape.lineTo(width/2,0)
        // shape.lineTo(width/2,height)


		var shape = new THREE.Shape();
                // shape.moveTo(-width/2,0)
                // shape.lineTo(width/2,0)
                // shape.lineTo(width/2,height)
        
				shape.moveTo(-width/2,0)
				shape.lineTo(width/2,0)
			    //  shape.lineTo(width/2,height/2)
				shape.lineTo(width/2,height)
				// shape.moveTo( 0, height );  // Move to the first point
				// shape.lineTo( -1, -1 );  // Draw a line to the second point
				// shape.lineTo( 1, -1 );  // Draw a line to the third point
				shape.closePath();  // Close the path to create a triangle

				var uvs = new Float32Array([
                    0.0, 0.0,  // Maps the (-width/2, 0) vertex of the model to the bottom-left of the texture
                    1.0, 1.0,  // Maps the (width/2, 0) vertex of the model to the bottom-right of the texture
                    1.0, 0.0,  // Maps the (width/2, height) vertex of the model to the top-right of the texture
                    ]);

        shape.closePath();  // Close the path to create a triangle
        
        geometry = new THREE.ShapeGeometry( shape );
		geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));


        // Create a material
        let local_texture=loader.load('/assets/config/default_1k.jpg');
        local_texture.repeat.set(1, 2*height);
        // Create a material
        material = new THREE.MeshStandardMaterial({
            map:local_texture,
            side:THREE.DoubleSide,
            color: wall_color });
        
                //GOBACKTO
                // material=global_metal_material.clone()
                // material.bumpMap = material.bumpMap.clone();
                // material.normalMap = material.normalMap.clone();
                // material.bumpMap.repeat.set(1, height/2);
                // material.normalMap.repeat.set(1, height/2);
                // material.color=new THREE.Color(wall_color)

                // material=select_texture({width:width,height:height,color:wall_color})
                material=select_texture({width:width,height:height,color:wall_color, debug:false, material_type:material_type})
                 // material=select_texture({width:1,height:1,color:wall_color, debug:true})
                material.side= THREE.DoubleSide
        // Create a mesh from the geometry and materia
        

        
        const mesh = new THREE.Mesh(geometry, material);
     
        //  position_x = Math.random() * 1-0.5;
        //console.log(position_x);


        mesh.position.set(
            parseFloat(position_x), // Assuming x position is always 0, adjust as needed
            parseFloat(position_y),
            parseFloat(position_z),  // Assuming z position is always 0, adjust as needed
        );


        // mesh.rotation.y = 0.70; // Rotate by the given roof angle
        this.set(mesh);
    }

    // update(attributes) {
    //     if (!this.model) return;

    //     if (attributes.position_x !== undefined) {
    //         this.model.position.setX(parseFloat(attributes.position_x));
    //     }

    //     if (attributes.position_y !== undefined) {
    //         this.model.position.setY(parseFloat(attributes.position_y));
    //     }

    //     if (attributes.position_z !== undefined) {
    //         this.model.position.setZ(parseFloat(attributes.position_z));
    //     }

    //     // Update rotation if needed
    //     if (attributes.rotation_z !== undefined) {
    //         this.model.rotation.z = attributes.rotation_z;
    //     }
    // }
}
class RoofSideSquareObject extends genericObject {
    constructor() {
        super();
    }
    create(attributes={}) {

    
        let position_x= (attributes && attributes.position_x) ? parseFloat(attributes.position_x) : 0;
        let position_y= (attributes && attributes.position_y) ? parseFloat(attributes.position_y) : 0;
        let position_z= (attributes && attributes.position_z) ? parseFloat(attributes.position_z) : 0;
        let color = (attributes && attributes.wall_color) ? attributes.wall_color : "#CCCCCC";

        let width= (attributes && attributes.width) ? parseFloat(attributes.width) : 0;
        let depth= (attributes && attributes.depth) ? parseFloat(attributes.depth) : 0;
        let height= (attributes && attributes.height) ? parseFloat(attributes.height) : 0;
        let sheet_depth= (attributes && attributes.sheet_depth) ? parseFloat(attributes.sheet_depth) : 10.25;
        let material_type = (attributes && attributes.material_type) ? attributes.material_type : "#FFFFFF";
        // var material = new THREE.MeshPhysicalMaterial({
        //     map: texture,
        //     color: attributes.color || "#ffffff",
        //     metalness: 0.5,
        //     roughness: 0.1,
        //     clearcoat: 0.8,
        //     clearcoatRoughness: 0.2
            
        // });
     
        // let texture=loader.load('/assets/config/default_rotated_1k.jpg');
        // let local_texture=global_texture
     
        // let material_type=(attributes && attributes.material_type) ? attributes.material_type : "material_type_1";
        
        // switch(material_type){
        //     case "material_type_1":
        //             // texture=global_texture
        //             //  color ="#ee2797";
        //             local_texture=global_texture.clone();
        //             // local_texture.wrapS=THREE.RepeatWrapping
        //             // local_texture.wrapT=THREE.RepeatWrapping
        //             local_texture.repeat.set(width, height/2);
                    
        //             break;
        //         case "material_type_2":
        //             // color ="#2727ee";
        //             // local_texture=global_texture_rotated
        
                    
        //             local_texture=global_texture_rotated.clone();

        //             local_texture.repeat.set(width/2, height);
                    
        //             break;
        //         case "material_type_3":
        //             // local_texture=loader.load('/assets/config/default_1k.jpg');
      
        //             // local_texture.repeat.set(width, height);
        //             local_texture=global_texture.clone();
        //             local_texture.repeat.set(width, height);
                    
        //             break;
        //         case "material_type_4":
        //             // local_texture=loader.load('/assets/config/default_1k.jpg');
        //             local_texture=global_texture_rotated.clone();
        //             local_texture.repeat.set(width, height);
                    
                    
        //             break;
        //         case "material_type_5":
        //             // local_texture=loader.load('/assets/config/default_1k.jpg');
                    
                    
        //             local_texture=global_texture_testing.clone();
        //             local_texture.repeat.set(width, height);
                    
                    
        //             break;
        //     default:
        //         // code to be executed if expression doesn't match any cases
        // }
        // local_texture.wrapS=THREE.RepeatWrapping
        // local_texture.wrapT=THREE.RepeatWrapping
        // // let texture=global_texture
        // let material = new THREE.MeshStandardMaterial({
        //     map: local_texture,
        //     color: color,
        //     // metalness: 0.0,
        //     // roughness: 0.1,
        //     // clearcoat: 0.8,
        //     // clearcoatRoughness: 0.2
        // });

        
        

        // let geometry = new RoundedBoxGeometry(
        //     parseFloat(attributes.width) || 5,
        //     parseFloat(attributes.height) || 1,
        //     parseFloat(attributes.depth) || 1, // Assuming depth is always 1, adjust as needed
        //     parseFloat(attributes.segments) || 2,
        //     parseFloat(attributes.radius) || 0.005
        // );
        let material
        let geometry;

        let shape = new THREE.Shape();
        // shape.moveTo(-width/2,0)
        // shape.lineTo(width/2,0)
        // shape.lineTo(width/2,height)
        // shape.lineTo(-width/2,height)

		shape.moveTo(-width/2, 0);
			shape.lineTo(width/2, 0);
			shape.lineTo(width/2, height);
			shape.lineTo(-width/2, height);
			shape.closePath();

			let shapeGeometry = new THREE.ShapeGeometry(shape);

			let uvs = new Float32Array([
				0, 0,
				0, 1,
				1, 1,
				1, 0
			]);

       // shape.moveTo( 0, height );  // Move to the first point
       // shape.lineTo( -1, -1 );  // Draw a line to the second point
       // shape.lineTo( 1, -1 );  // Draw a line to the third point
        shape.closePath();  // Close the path to create a triangle
        
        geometry = new THREE.ShapeGeometry( shape );

        geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
        
                      
                        

        let local_texture=loader.load('/assets/config/default_1k.jpg');

    
       

        local_texture.repeat.set(1, 1);
        local_texture.wrapS=THREE.RepeatWrapping
        local_texture.wrapT=THREE.RepeatWrapping
        // Create a material
        material = new THREE.MeshStandardMaterial({
            map:local_texture,
            side:THREE.DoubleSide,
            color: color });
        
        // Create a mesh from the geometry and materia
                //GOBACKTO
                // material=global_metal_material.clone()
                // material.bumpMap = material.bumpMap.clone();
                // material.normalMap = material.normalMap.clone();
                // material.bumpMap.repeat.set(1, height);
                // material.normalMap.repeat.set(1, height);
                // material.bumpMap.offset.set(width/6, width/6);
                // material.normalMap.offset.set(width/6, width/6);
                // material.color=new THREE.Color(color)

        material=select_texture({width:width,height:height,color:color, material_type:material_type})
                
        material.side= THREE.DoubleSide
              
                
                // Now you can safely modify the repeat values without affecting other materials
        
        
        const mesh = new THREE.Mesh(geometry, material);
     
        //  position_x = Math.random() * 1-0.5;
        //console.log(position_x);


        mesh.position.set(
            parseFloat(position_x), // Assuming x position is always 0, adjust as needed
            parseFloat(position_y),
            parseFloat(position_z),  // Assuming z position is always 0, adjust as needed
        );


        // mesh.rotation.y = 0.70; // Rotate by the given roof angle
        this.set(mesh);
    }

    // update(attributes) {
    //     if (!this.model) return;

    //     if (attributes.position_x !== undefined) {
    //         this.model.position.setX(parseFloat(attributes.position_x));
    //     }

    //     if (attributes.position_y !== undefined) {
    //         this.model.position.setY(parseFloat(attributes.position_y));
    //     }

    //     if (attributes.position_z !== undefined) {
    //         this.model.position.setZ(parseFloat(attributes.position_z));
    //     }

    //     // Update rotation if needed
    //     if (attributes.rotation_z !== undefined) {
    //         this.model.rotation.z = attributes.rotation_z;
    //     }
    // }
}
class RoofTopObject extends genericObject {
    constructor() {
        super();
    }
    create(attributes={}) {

        let roof_material_type=(attributes && attributes.roof_material_type) ? attributes.roof_material_type : "material_type_1";
        
        let position_x= (attributes && attributes.position_x) ? parseFloat(attributes.position_x) : 0;
        let position_y= (attributes && attributes.position_y) ? parseFloat(attributes.position_y) : 0;
        let position_z= (attributes && attributes.position_z) ? parseFloat(attributes.position_z) : 0;
        let color = (attributes && attributes.color) ? attributes.color : "#CCCCCC";
 
        let width= (attributes && attributes.width) ? parseFloat(attributes.width) : 0;
        let depth= (attributes && attributes.depth) ? parseFloat(attributes.depth) : 0;
        let height= (attributes && attributes.height) ? parseFloat(attributes.height) : 0;
        let sheet_depth= (attributes && attributes.sheet_depth) ? parseFloat(attributes.sheet_depth) : 10.25;

        // var material = new THREE.MeshPhysicalMaterial({
        //     map: texture,
        //     color: attributes.color || "#ffffff",
        //     metalness: 0.5,
        //     roughness: 0.1,
        //     clearcoat: 0.8,
        //     clearcoatRoughness: 0.2
            
        // });
     
        // let texture=loader.load('/assets/config/default_rotated_1k.jpg');
        // let local_texture=global_texture
     
        // let material_type=(attributes && attributes.material_type) ? attributes.material_type : "material_type_1";
        
        // switch(material_type){
        //     case "material_type_1":
        //             // texture=global_texture
        //             //  color ="#ee2797";
        //             local_texture=global_texture.clone();
        //             // local_texture.wrapS=THREE.RepeatWrapping
        //             // local_texture.wrapT=THREE.RepeatWrapping
        //             local_texture.repeat.set(width, height/2);
                    
        //             break;
        //         case "material_type_2":
        //             // color ="#2727ee";
        //             // local_texture=global_texture_rotated
        
                    
        //             local_texture=global_texture_rotated.clone();

        //             local_texture.repeat.set(width/2, height);
                    
        //             break;
        //         case "material_type_3":
        //             // local_texture=loader.load('/assets/config/default_1k.jpg');
      
        //             // local_texture.repeat.set(width, height);
        //             local_texture=global_texture.clone();
        //             local_texture.repeat.set(width, height);
                    
        //             break;
        //         case "material_type_4":
        //             // local_texture=loader.load('/assets/config/default_1k.jpg');
        //             local_texture=global_texture_rotated.clone();
        //             local_texture.repeat.set(width, height);
                    
                    
        //             break;
        //         case "material_type_5":
        //             // local_texture=loader.load('/assets/config/default_1k.jpg');
                    
                    
        //             local_texture=global_texture_testing.clone();
        //             local_texture.repeat.set(width, height);
                    
                    
        //             break;
        //     default:
        //         // code to be executed if expression doesn't match any cases
        // }
        // local_texture.wrapS=THREE.RepeatWrapping
        // local_texture.wrapT=THREE.RepeatWrapping
        // // let texture=global_texture
        // let material = new THREE.MeshStandardMaterial({
        //     map: local_texture,
        //     color: color,
        //     // metalness: 0.0,
        //     // roughness: 0.1,
        //     // clearcoat: 0.8,
        //     // clearcoatRoughness: 0.2
        // });

        
        

        // let geometry = new RoundedBoxGeometry(
        //     parseFloat(attributes.width) || 5,
        //     parseFloat(attributes.height) || 1,
        //     parseFloat(attributes.depth) || 1, // Assuming depth is always 1, adjust as needed
        //     parseFloat(attributes.segments) || 2,
        //     parseFloat(attributes.radius) || 0.005
        // );
        let material
        let geometry;

        let shape = new THREE.Shape();
        // shape.moveTo(-width/2,-2.05)
        // shape.lineTo(width/2,-2.05)
        // shape.lineTo(width/2,2.05)
        // shape.lineTo(-width/2,2.05)
        let recLength=width
        let recHeight=height
        shape.moveTo( -recLength/2, -recHeight/2 )
        shape.lineTo( -recLength/2, recHeight/2 )
        shape.lineTo( recLength/2, recHeight/2 )
        shape.lineTo( recLength/2, -recHeight/2 )
        shape.lineTo( -recLength/2, -recHeight/2 );

       // shape.moveTo( 0, height );  // Move to the first point
       // shape.lineTo( -1, -1 );  // Draw a line to the second point
       // shape.lineTo( 1, -1 );  // Draw a line to the third point
        shape.closePath();  // Close the path to create a triangle
        


        geometry = new THREE.ShapeGeometry( shape );
        //EXPLANTION
        geometry.setAttribute('uv', new THREE.Float32BufferAttribute([
            0, 0, // first vertex UV
            0, 1, // second vertex UV
            1, 1, // third vertex UV
            1, 0  // fourth vertex UV
          ], 2));

        let local_texture=global_texture;

        local_texture.repeat.set(1, recHeight/2);
        local_texture.wrapS=THREE.RepeatWrapping
        local_texture.wrapT=THREE.RepeatWrapping
                    

      
        switch(roof_material_type){
                case "material_type_1":
                    // texture=global_texture
                    //  color ="#ee2797";
                    local_texture=global_texture.clone();
                    // local_texture.wrapS=THREE.RepeatWrapping
                    // local_texture.wrapT=THREE.RepeatWrapping
                    local_texture.repeat.set(1, recHeight/2);
                    
                    break;
                case "material_type_2":
                    // color ="#2727ee";
                    // local_texture=global_texture_rotated
                    
                    
                    local_texture=global_texture.clone();
                    local_texture.rotation = Math.PI / 2;

                    local_texture.repeat.set(1, recHeight/2);
                    
                    break;
                case "material_type_3":
                    // local_texture=loader.load('/assets/config/default_1k.jpg');
      
                    // local_texture.repeat.set(width, height);
                    local_texture=global_texture.clone();
                    local_texture.repeat.set(1, recHeight);
                    
                    break;
                case "material_type_4":
                    // local_texture=loader.load('/assets/config/default_1k.jpg');
                    local_texture=global_texture.clone();
                    local_texture.rotation = Math.PI / 2;

                    local_texture.repeat.set(1, recHeight);
                 
                    
                    
                    break;
                case "material_type_5":
                    // local_texture=loader.load('/assets/config/default_1k.jpg');
                    
                    
                    local_texture=global_texture_testing.clone();
                    local_texture.repeat.set(width, height);
                    
                    
                    break;
            default:
                // code to be executed if expression doesn't match any cases
        }

        // Create a material
        material = new THREE.MeshStandardMaterial({
            map:local_texture,
            
            color: "#fff" ,
        
            side:THREE.DoubleSide
        });
        
        // Create a mesh from the geometry and materia
        
        //GOBACKTO
        // material=global_metal_material.clone()
        // material.bumpMap = material.bumpMap.clone();
        // material.normalMap = material.normalMap.clone();
        // material.bumpMap.repeat.set(width, height/2);
        // material.normalMap.repeat.set(width, height/2);
        // material.color=new THREE.Color(color)
        // material=select_texture({width:width, height:height, color:c6eaff, material_type:roof_material_type})
        material.side= THREE.DoubleSide
        
        const mesh = new THREE.Mesh(geometry, material);
     
        //  position_x = Math.random() * 1-0.5;
        //console.log(position_x);


        mesh.position.set(
            parseFloat(position_x), // Assuming x position is always 0, adjust as needed
            parseFloat(position_y),
            parseFloat(position_z),  // Assuming z position is always 0, adjust as needed
        );


        // mesh.rotation.y = 0.70; // Rotate by the given roof angle
        this.set(mesh);
    }

    // update(attributes) {
    //     if (!this.model) return;

    //     if (attributes.position_x !== undefined) {
    //         this.model.position.setX(parseFloat(attributes.position_x));
    //     }

    //     if (attributes.position_y !== undefined) {
    //         this.model.position.setY(parseFloat(attributes.position_y));
    //     }

    //     if (attributes.position_z !== undefined) {
    //         this.model.position.setZ(parseFloat(attributes.position_z));
    //     }

    //     // Update rotation if needed
    //     if (attributes.rotation_z !== undefined) {
    //         this.model.rotation.z = attributes.rotation_z;
    //     }
    // }
}



export {SphereObject, RoofSideLeftObject, RoofSideRightObject,RoofSideSquareObject, RoofTopObject}


