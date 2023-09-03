import { v4 as uuidv4 } from 'uuid';
import { accesser } from '../../base'
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { Generic, genericGui, genericState, genericObject, genericDisplay, genericController } from '../../base.js'
import { PlanetGui, PlanetObject, Planet, System } from '../introduction.js'


const loader = new THREE.TextureLoader();
const global_texture = loader.load('/assets/config/default_1k.jpg');
const global_texture_rotated = loader.load('/assets/config/default_rotated_1k.jpg');
const global_texture_testing = loader.load('/assets/config/uv_grid.jpg');
class genericGarageObject extends genericObject {
    constructor() {
        super();
    }
    recreate(attributes) {
        this.mediator.handleEvent('removeModel')
        this.create(attributes)
    }
    create(attributes={}) {
        let loader = new THREE.TextureLoader();
        let texture = loader.load('/assets/config/default_1k.jpg');
        var material = new THREE.MeshPhysicalMaterial({
            map: texture,
            color: attributes.color || "#ffffff",
            metalness: 0.5,
            roughness: 0.1,
            clearcoat: 0.8,
            clearcoatRoughness: 0.2
        });

        let geometry = new RoundedBoxGeometry(
            parseFloat(attributes.width) || 1,
            parseFloat(attributes.height) || 1,
            parseFloat(attributes.depth) || 1,
            1 || 1,
            attributes.radius || 0.005
        );

        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(
            parseFloat(attributes.position_x) || 0,
            parseFloat(attributes.position_y) || 0,
            parseFloat(attributes.position_z) || 0
        );
        // if(attributes.invisible_controller=="true"){
        //     sphere.visible=false
        // }
        this.set(sphere);
        return
    }
    update(attributes) {
        if (!this.model) return;

        if (attributes.position_x !== undefined) {
            this.model.position.setX(attributes.position_x);
        }

        if (attributes.position_y !== undefined) {
            this.model.position.setY(attributes.position_y);
        }

        if (attributes.position_z !== undefined) {
            this.model.position.setZ(attributes.position_z);
        }

        if (attributes.color !== undefined) {
            this.model.material.color = new THREE.Color(attributes.color)
        }

        if (attributes.width !== undefined || attributes.depth !== undefined || attributes.height !== undefined) {
            this.mediator.handleEvent('recreateModel')
        }
    }
}
class WallGarageObject extends genericObject {
    constructor() {
        super();
    }
    create(attributes={}) {
        let loader = new THREE.TextureLoader();
        let texture = global_texture
        let color=attributes.color || "#272727"
        var material = new THREE.MeshPhysicalMaterial({
            map: texture,
            color: color || "#272727",
            metalness: 0.5,
            roughness: 0.1,
            clearcoat: 0.8,
            clearcoatRoughness: 0.2
        });
        // Use BoxGeometry for the roof with adjusted width
        let width = parseFloat(attributes.width)
        let height = parseFloat(attributes.height)
        const rotation_y = (attributes.rotation_y || 0) * (Math.PI / 180);
        let geometry = new THREE.BoxGeometry(
            2,
            2,
            2, // Assuming depth is always 1, adjust as needed
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
    update(attributes) {
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

class  UconfigInvisibleObject extends genericObject {
    constructor() {
        super();

    }
    update() { }
    create(attributes={}) {

        // const material_color=(attributes.colored).replace('#','0x')

        // let width = parseFloat(attributes.width) || 5
        // let height = parseFloat(attributes.height) || 5


        // const texture_value = attributes.material ? `${attributes.material}` : '/assets/config/default_1k.jpg'



        // let texture = loader.load(texture_value);
        // texture.repeat.set(width, height);
        // texture.wrapS = THREE.RepeatWrapping;
        // texture.wrapT = THREE.RepeatWrapping;
        // let material= new THREE.MeshPhysicalMaterial({

        //     metalness: 0.0,
        //     roughness: 0.1,
        //     clearcoat: 0.8,
        //     clearcoatRoughness: 0.2,
        //     color:  "#"+attributes.color,

        //   })

        const material = new THREE.MeshBasicMaterial({color: 0x00ff00});  // Green color
        let geometry = new RoundedBoxGeometry(
            parseFloat(attributes.width) || 1,
            parseFloat(attributes.height) || 1,
            parseFloat(attributes.depth) || 1, // Assuming depth is always 1, adjust as needed
            parseFloat(attributes.segments) || 2,
            parseFloat(attributes.radius) || 0.005
        );


        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(
            parseFloat(attributes.position_x), // Assuming x position is always 0, adjust as needed
            parseFloat(attributes.position_y),
            parseFloat(attributes.position_z),  // Assuming z position is always 0, adjust as needed
        );


        mesh.rotateX(attributes.position_rotation_x)
        // mesh.visible = attributes.visibility || true
        this.set(mesh);
    }
}

class UconfigObject extends genericObject {
    constructor() {
        super();

    }
    update() { }
    create(attributes={}) {

        // const material_color=(attributes.colored).replace('#','0x')

        let width = parseFloat(attributes.width) || 5
        let height = parseFloat(attributes.height) || 5


        const texture_value = attributes.material ? `${attributes.material}` : '/assets/config/default_1k.jpg'



        let texture = loader.load(texture_value);
        texture.repeat.set(width, height);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        // let material= new THREE.MeshPhysicalMaterial({

        //     metalness: 0.0,
        //     roughness: 0.1,
        //     clearcoat: 0.8,
        //     clearcoatRoughness: 0.2,
        //     color:  "#"+attributes.color,

        //   })

        let color=attributes.color || "#272727"
        const material = new THREE.MeshPhysicalMaterial({
            metalness: 0.0,
            roughness: 0.95,
            clearcoat: 0.0,
            clearcoatRoughness: 0.0,
            color: color ? `#${attributes.color}` : '#272727',
            opacity: attributes.visibility || 0,
            map: texture
        });

        let geometry = new RoundedBoxGeometry(
            parseFloat(attributes.width) || 5,
            parseFloat(attributes.height) || 1,
            parseFloat(attributes.depth) || 1, // Assuming depth is always 1, adjust as needed
            parseFloat(attributes.segments) || 2,
            parseFloat(attributes.radius) || 0.005
        );


        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(
            parseFloat(attributes.position_x), // Assuming x position is always 0, adjust as needed
            parseFloat(attributes.position_y),
            parseFloat(attributes.position_z),  // Assuming z position is always 0, adjust as needed
        );


        mesh.rotateX(attributes.position_rotation_x)
        mesh.visible = attributes.visibility || true
        this.set(mesh);
    }
}
class AdditionalObject extends genericObject {
    constructor() {
        super();
    }
    create(attributes={}) {

    
        let position_x= (attributes && attributes.position_x) ? parseFloat(attributes.position_x) : 0;
        let position_y= (attributes && attributes.position_y) ? parseFloat(attributes.position_y) : 0;
        let position_z= (attributes && attributes.position_z) ? parseFloat(attributes.position_z) : 0;
        let color = (attributes && attributes.color) ? attributes.color : "#372727";
        //debug()
        let width= (attributes && attributes.width) ? parseFloat(attributes.width) : 0;
        let depth= (attributes && attributes.depth) ? parseFloat(attributes.depth) : 0;
        let height= (attributes && attributes.height) ? parseFloat(attributes.height) : 0;
        let sheet_depth= (attributes && attributes.sheet_depth) ? parseFloat(attributes.sheet_depth) : 0.025;
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
            color: "#272727",
            metalness: 0.5,
            roughness: 0.1,
            clearcoat: 0.8,
            clearcoatRoughness: 0.2
        });
        

        // let geometry = new RoundedBoxGeometry(
        //     parseFloat(attributes.width) || 5,
        //     parseFloat(attributes.height) || 1,
        //     parseFloat(attributes.depth) || 1, // Assuming depth is always 1, adjust as needed
        //     parseFloat(attributes.segments) || 2,
        //     parseFloat(attributes.radius) || 0.005
        // );
        let geometry;

        geometry = new THREE.BoxGeometry(
            width,
            height,
            depth+sheet_depth, // Assuming depth is always 1, adjust as needed
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

    update(attributes) {
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

class CubeObject extends genericObject {
    constructor() {
        super();
    }
    create(attributes={}) {

    
        let position_x= (attributes && attributes.position_x) ? parseFloat(attributes.position_x) : 0;
        let position_y= (attributes && attributes.position_y) ? parseFloat(attributes.position_y) : 0;
        let position_z= (attributes && attributes.position_z) ? parseFloat(attributes.position_z) : 0;
        let color = (attributes && attributes.color) ? attributes.color : "#372727";
        //debug()
        let width= (attributes && attributes.width) ? parseFloat(attributes.width) : 0;
        let depth= (attributes && attributes.depth) ? parseFloat(attributes.depth) : 0;
        let height= (attributes && attributes.height) ? parseFloat(attributes.height) : 0;
        let sheet_depth= (attributes && attributes.sheet_depth) ? parseFloat(attributes.sheet_depth) : 0.5;
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
        

        // let geometry = new RoundedBoxGeometry(
        //     parseFloat(attributes.width) || 5,
        //     parseFloat(attributes.height) || 1,
        //     parseFloat(attributes.depth) || 1, // Assuming depth is always 1, adjust as needed
        //     parseFloat(attributes.segments) || 2,
        //     parseFloat(attributes.radius) || 0.005
        // );
        let geometry;

        geometry = new THREE.BoxGeometry(
            width,
            height,
            depth, // Assuming depth is always 1, adjust as needed
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

    update(attributes) {
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
class RedCubeObject extends genericObject {
    constructor() {
        super();
    }
    create(attributes={}) {

    
        let position_x= (attributes && attributes.position_x) ? parseFloat(attributes.position_x) : 0;
        let position_y= (attributes && attributes.position_y) ? parseFloat(attributes.position_y) : 0;
        let position_z= (attributes && attributes.position_z) ? parseFloat(attributes.position_z) : 0;
        let color = (attributes && attributes.color) ? attributes.color : "#872797";
        //debug()
        let width= (attributes && attributes.width) ? parseFloat(attributes.width) : 0;
        let depth= (attributes && attributes.depth) ? parseFloat(attributes.depth) : 0;
        let height= (attributes && attributes.height) ? parseFloat(attributes.height) : 0;
        let sheet_depth= (attributes && attributes.sheet_depth) ? parseFloat(attributes.sheet_depth) : 0.5;
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
            color: "#cc1111",
            metalness: 0.5,
            roughness: 0.1,
            clearcoat: 0.8,
            clearcoatRoughness: 0.2
        });
        

        // let geometry = new RoundedBoxGeometry(
        //     parseFloat(attributes.width) || 5,
        //     parseFloat(attributes.height) || 1,
        //     parseFloat(attributes.depth) || 1, // Assuming depth is always 1, adjust as needed
        //     parseFloat(attributes.segments) || 2,
        //     parseFloat(attributes.radius) || 0.005
        // );
        let geometry;

        geometry = new THREE.BoxGeometry(
            width+5,
            height,
            depth, // Assuming depth is always 1, adjust as needed
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

    update(attributes) {
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
class DoubleCubeObject extends genericObject {
    constructor() {
        super();
    }
    create(attributes={}) {

    
        let position_x= (attributes && attributes.position_x) ? parseFloat(attributes.position_x) : -4;
        let color = (attributes && attributes.color) ? attributes.color : "#972727";
        var material = new THREE.MeshPhysicalMaterial({
            color: "#372727",
            metalness: 0.5,
            roughness: 0.1,
            clearcoat: 0.8,
            clearcoatRoughness: 0.2
        });
    

        // let geometry = new RoundedBoxGeometry(
        //     parseFloat(attributes.width) || 5,
        //     parseFloat(attributes.height) || 1,
        //     parseFloat(attributes.depth) || 1, // Assuming depth is always 1, adjust as needed
        //     parseFloat(attributes.segments) || 2,
        //     parseFloat(attributes.radius) || 0.005
        // );
        let geometry;

        geometry = new THREE.BoxGeometry(
            1,
            1,
            1, // Assuming depth is always 1, adjust as needed
        );

        const mesh = new THREE.Mesh(geometry, material);
     
        position_x = Math.random() * 1-0.5;
        // console.log(position_x);


        mesh.position.set(
            parseFloat(position_x), // Assuming x position is always 0, adjust as needed
            parseFloat(0),
            parseFloat(0),  // Assuming z position is always 0, adjust as needed
        );
        // mesh.rotation.y = 0.70; // Rotate by the given roof angle
        this.set(mesh);
    }

    update(attributes) {
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


export {AdditionalObject,DoubleCubeObject,RedCubeObject, CubeObject,UconfigObject,UconfigInvisibleObject,WallGarageObject,genericGarageObject }