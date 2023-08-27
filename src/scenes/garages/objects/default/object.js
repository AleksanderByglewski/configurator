import { v4 as uuidv4 } from 'uuid';
import { accesser } from '../../base'
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { Generic, genericGui, genericState, genericObject, genericDisplay, genericController } from '../../base.js'
import { PlanetGui, PlanetObject, Planet, System } from '../introduction.js'


const loader = new THREE.TextureLoader();
const global_texture = loader.load('/assets/config/default_1k.jpg');


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
class CubeObject extends genericObject {
    constructor() {
        super();
    }
    create(attributes={}) {

    
        let position_x= (attributes && attributes.position_x) ? parseFloat(attributes.position_x) : -4;
        let color = (attributes && attributes.color) ? attributes.color : "#372727";
     
        var material = new THREE.MeshPhysicalMaterial({
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
            1,
            1,
            1, // Assuming depth is always 1, adjust as needed
        );

        const mesh = new THREE.Mesh(geometry, material);
     
         position_x = Math.random() * 1-0.5;
        console.log(position_x);


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
class DoubleCubeObject extends genericObject {
    constructor() {
        super();
    }
    create(attributes={}) {

    
        let position_x= (attributes && attributes.position_x) ? parseFloat(attributes.position_x) : -4;
        let color = (attributes && attributes.color) ? attributes.color : "#972727";
        var material = new THREE.MeshPhysicalMaterial({
            color: "#972727",
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
        console.log(position_x);


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


export {DoubleCubeObject, CubeObject,UconfigObject,UconfigInvisibleObject,WallGarageObject,genericGarageObject }