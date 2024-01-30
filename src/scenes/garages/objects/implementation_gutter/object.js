import { v4 as uuidv4 } from 'uuid';
import { accesser } from '../../base.js'
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { Generic, genericGui, genericState, genericObject, genericDisplay, genericController } from '../../base.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { PlanetGui, PlanetObject, Planet, System } from '../introduction.js'
//GOBACKTO
import { global_metal_material, select_texture } from '../../textures/spawn.js'

const loader = new THREE.TextureLoader();
const global_texture = loader.load('/assets/config/default_1k.jpg');
const gltfLoader = new GLTFLoader();


class GutterObject extends genericObject {
    constructor() {
        super();
    }
    create(attributes = {}) {
        
        let position_x = (attributes && attributes.position_x) ? parseFloat(attributes.position_x) : 0;
        let position_y = (attributes && attributes.position_y) ? parseFloat(attributes.position_y) : 0;
        let position_z = (attributes && attributes.position_z) ? parseFloat(attributes.position_z) : 0;
        let color = (attributes && attributes.color) ? attributes.color : "#CCCCCC";

        let width = (attributes && attributes.width) ? parseFloat(attributes.width) : 0;
        let depth = (attributes && attributes.depth) ? parseFloat(attributes.depth) : 0;
        let height = (attributes && attributes.height) ? parseFloat(attributes.height) : 0;

     



        const invisibleMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0, transparent: true });
        const debugMaterial = new THREE.MeshBasicMaterial({ color: 0xbfff000, opacity: 1 });
        const geometry = new THREE.BoxGeometry(
            1.01,  // width of the cube
            1.01, // height of the cube
            0.01   // depth of the cube
        );

        
        // Create the geometry for the container mesh
        // const geometry = new RoundedBoxGeometry(
        //     width,
        //     height,
        //     0.015, // Assuming depth is always 1, adjust as needed
        //     parseFloat(attributes.segments) || 1,
        //     parseFloat(attributes.radius) || 0.005
        // );
    
        // Create the container mesh with the invisible material
        //const containerMesh = new THREE.Mesh(geometry, invisibleMaterial);
        const containerMesh = new THREE.Mesh(geometry, debugMaterial);
        containerMesh.position.set(parseFloat(position_x), parseFloat(position_y), parseFloat(position_z));
    
        // Load the GLTF model and add it to the container mesh
        const gltfLoader = new GLTFLoader();
        gltfLoader.load('/assets/models/gutter/scene.gltf', (gltf) => {
            const model = gltf.scene;
    
            // Adjust model transformations as needed
            // For example, model.position.set(), model.scale.set(), etc.
            model.position.setX(0.5*width-0.03)
            model.position.setY(-height-0.25)
            // Add the model to the container mesh
            containerMesh.add(model);
        }, undefined, (error) => {
            console.error('An error happened', error);
        });

        gltfLoader.load('/assets/models/gutter_front/scene.gltf', (gltf) => {
            const model = gltf.scene;
            
            // Adjust model transformations as needed
            // For example, model.position.set(), model.scale.set(), etc.
            model.scale.set(1,0.925*height,1)
            model.position.setX(0.5*width-0.03)
            model.position.setY(-height-0.4)
            // Add the model to the container mesh
            containerMesh.add(model);
        }, undefined, (error) => {
            console.error('An error happened', error);
        });
    


        gltfLoader.load('/assets/models/gutter_top/scene.gltf', (gltf) => {
            const model = gltf.scene;
            
            model.scale.set(1.3*width/2,1,1)
            model.position.setY(-0.3)
            // Adjust model transformations as needed
            // For example, model.position.set(), model.scale.set(), etc.
    
            // Add the model to the container mesh
            containerMesh.add(model);
        }, undefined, (error) => {
            console.error('An error happened', error);
        });
    

        // If you need to add more GLTF models or other elements, repeat the process:
        // gltfLoader.load('path/to/other/model.gltf', (gltf) => { ... });
    
        // Finally, add the container mesh to your scene or object
        this.set(containerMesh);




        containerMesh.position.set(
            parseFloat(position_x), // Assuming x position is always 0, adjust as needed
            parseFloat(position_y),
            parseFloat(position_z),  // Assuming z position is always 0, adjust as needed
        );







        this.set(containerMesh);
    }


}


export {  GutterObject }


