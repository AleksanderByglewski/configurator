import { v4 as uuidv4 } from 'uuid';
import { accesser } from '../../base'
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { Generic, genericGui, genericState, genericObject, genericDisplay, genericController } from '../../base.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { PlanetGui, PlanetObject, Planet, System } from '../introduction.js'
//GOBACKTO
import { global_metal_material, select_texture } from '../../textures/spawn'

const loader = new THREE.TextureLoader();
const global_texture = loader.load('/assets/config/default_1k.jpg');
const gltfLoader = new GLTFLoader();

class SphereObject extends genericObject {
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
        let sheet_depth = (attributes && attributes.sheet_depth) ? parseFloat(attributes.sheet_depth) : 10.25;
        // var material = new THREE.MeshPhysicalMaterial({
        //     map: texture,
        //     color: attributes.color || "#ffffff",
        //     metalness: 0.5,
        //     roughness: 0.1,
        //     clearcoat: 0.8,
        //     clearcoatRoughness: 0.2

        // });

        // let texture=loader.load('/assets/config/default_rotated_1k.jpg');
        let local_texture = global_texture

        let material_type = (attributes && attributes.material_type) ? attributes.material_type : "material_type_1";

        switch (material_type) {
            case "material_type_1":
                // texture=global_texture
                //  color ="#ee2797";
                local_texture = global_texture.clone();
                // local_texture.wrapS=THREE.RepeatWrapping
                // local_texture.wrapT=THREE.RepeatWrapping
                local_texture.repeat.set(width, height / 2);

                break;
            case "material_type_2":
                // color ="#2727ee";
                // local_texture=global_texture_rotated


                local_texture = global_texture_rotated.clone();

                local_texture.repeat.set(width / 2, height);

                break;
            case "material_type_3":
                // local_texture=loader.load('/assets/config/default_1k.jpg');

                // local_texture.repeat.set(width, height);
                local_texture = global_texture.clone();
                local_texture.repeat.set(width, height);

                break;
            case "material_type_4":
                // local_texture=loader.load('/assets/config/default_1k.jpg');
                local_texture = global_texture_rotated.clone();
                local_texture.repeat.set(width, height);


                break;
            case "material_type_5":
                // local_texture=loader.load('/assets/config/default_1k.jpg');


                local_texture = global_texture_testing.clone();
                local_texture.repeat.set(width, height);


                break;
            default:
            // code to be executed if expression doesn't match any cases
        }
        local_texture.wrapS = THREE.RepeatWrapping
        local_texture.wrapT = THREE.RepeatWrapping
        // let texture=global_texture
        let material = new THREE.MeshStandardMaterial({
            map: local_texture,
            color: color,
            // metalness: 0.0,
            // roughness: 0.1,
            // clearcoat: 0.8,
            // clearcoatRoughness: 0.2
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
            width + 0.01,
            height + 0.01,
            depth + 0.01, // Assuming depth is always 1, adjust as needed
        );

        geometry = new RoundedBoxGeometry(
            width,
            height,
            depth, // Assuming depth is always 1, adjust as needed
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
class DoorObject extends genericObject {
    constructor() {
        super();
    }
    create(attributes = {}) {


        let position_x = (attributes && attributes.position_x) ? parseFloat(attributes.position_x) : 0;
        let position_y = (attributes && attributes.position_y) ? parseFloat(attributes.position_y) : 0;
        let position_z = (attributes && attributes.position_z) ? parseFloat(attributes.position_z) : 0;
        let color = (attributes && attributes.color) ? attributes.color : "#CCCCCC";

        let width = (attributes && attributes.door_width) ? parseFloat(attributes.door_width) : 0;
        let depth = (attributes && attributes.depth) ? parseFloat(attributes.depth) : 0;
        let height = (attributes && attributes.height) ? parseFloat(attributes.height) : 0;

        let sheet_depth = (attributes && attributes.sheet_depth) ? parseFloat(attributes.sheet_depth) : 10.25;
        // var material = new THREE.MeshPhysicalMaterial({
        //     map: texture,
        //     color: attributes.color || "#ffffff",
        //     metalness: 0.5,
        //     roughness: 0.1,
        //     clearcoat: 0.8,
        //     clearcoatRoughness: 0.2

        // });

        // let texture=loader.load('/assets/config/default_rotated_1k.jpg');
        let local_texture = global_texture

        let material_type = (attributes && attributes.material_type) ? attributes.material_type : "material_type_1";
        let gate_type = (attributes && attributes.gate_type) ? attributes.gate_type : "gate_type_1";


        


        // local_texture.repeat.set(1, height);
        // let texture=global_texture
        let material = new THREE.MeshStandardMaterial({
            map: local_texture,
            color: color,
            // metalness: 0.0,
            // roughness: 0.1,
            // clearcoat: 0.8,
            // clearcoatRoughness: 0.2
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
            width + 0.01,
            height + 0.01,
            depth + 0.01, // Assuming depth is always 1, adjust as needed
        );

        geometry = new RoundedBoxGeometry(
            width,
            height,
            0.015, // Assuming depth is always 1, adjust as needed
            parseFloat(attributes.segments) || 1,
            parseFloat(attributes.radius) || 0.005
        );
        if(gate_type=="gate_type_3"){
            material_type ="material_type_6"
        }
        

        material = select_texture({ width: 1.2 * width, height: height, color: color, material_type: material_type })

        const mesh = new THREE.Mesh(geometry, material);

        //  position_x = Math.random() * 1-0.5;
        //console.log(position_x);


        mesh.position.set(
            parseFloat(position_x), // Assuming x position is always 0, adjust as needed
            parseFloat(position_y),
            parseFloat(position_z),  // Assuming z position is always 0, adjust as needed
        );






        this.set(mesh);
    }


}

class DoorHandleObject extends genericObject {
    constructor() {
        super();
    }
    create(attributes = {}) {

        let position_x = (attributes && attributes.position_x) ? parseFloat(attributes.position_x) : 0;
        let position_y = (attributes && attributes.position_y) ? parseFloat(attributes.position_y) : 0;
        let position_z = (attributes && attributes.position_z) ? parseFloat(attributes.position_z) : 0;
        let color = (attributes && attributes.color) ? attributes.color : "#CCCCCC";

        let width = (attributes && attributes.door_width) ? parseFloat(attributes.door_width) : 0;
        let depth = (attributes && attributes.depth) ? parseFloat(attributes.depth) : 0;
        let height = (attributes && attributes.height) ? parseFloat(attributes.height) : 0;

        let sheet_depth = (attributes && attributes.sheet_depth) ? parseFloat(attributes.sheet_depth) : 10.25;

        let door = (attributes && attributes.door) ? attributes.door : false;
        let gate_type = (attributes && attributes.gate_type) ? attributes.gate_type : false;
      
        // var material = new THREE.MeshPhysicalMaterial({
        //     map: texture,
        //     color: attributes.color || "#ffffff",
        //     metalness: 0.5,
        //     roughness: 0.1,
        //     clearcoat: 0.8,
        //     clearcoatRoughness: 0.2

        // });

        // let texture=loader.load('/assets/config/default_rotated_1k.jpg');
        let local_texture = global_texture

        let material_type = (attributes && attributes.material_type) ? attributes.material_type : "material_type_1";

        switch (material_type) {
            case "material_type_1":
                // texture=global_texture
                //  color ="#ee2797";
                local_texture = global_texture.clone();
                // local_texture.wrapS=THREE.RepeatWrapping
                // local_texture.wrapT=THREE.RepeatWrapping
                local_texture.repeat.set(width, height / 2);

                break;
            case "material_type_2":
                // color ="#2727ee";
                // local_texture=global_texture_rotated


                local_texture = global_texture.clone();
                local_texture.rotation = Math.PI / 2;
                local_texture.repeat.set(1, height);

                break;
            case "material_type_3":
                // local_texture=loader.load('/assets/config/default_1k.jpg');

                // local_texture.repeat.set(width, height);
                local_texture = global_texture.clone();

                local_texture.repeat.set(1, height);

                break;
            case "material_type_4":
                // local_texture=loader.load('/assets/config/default_1k.jpg');
                local_texture = global_texture.clone();
                local_texture.rotation = Math.PI / 2;
                local_texture.repeat.set(1, height);


                break;
            case "material_type_5":
                // local_texture=loader.load('/assets/config/default_1k.jpg');


                local_texture = global_texture.clone();
                local_texture.repeat.set(1, height);


                break;
            default:
            // code to be executed if expression doesn't match any cases
        }

        // local_texture=global_texture

        local_texture.wrapS = THREE.RepeatWrapping
        local_texture.wrapT = THREE.RepeatWrapping
        // local_texture.repeat.set(1, height);
        // let texture=global_texture
        let material = new THREE.MeshStandardMaterial({
            map: local_texture,
            color: color,
            // metalness: 0.0,
            // roughness: 0.1,
            // clearcoat: 0.8,
            // clearcoatRoughness: 0.2
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
            width + 0.01,
            height + 0.01,
            depth + 0.01, // Assuming depth is always 1, adjust as needed
        );

        geometry = new RoundedBoxGeometry(
            width,
            height,
            0.015, // Assuming depth is always 1, adjust as needed
            parseFloat(attributes.segments) || 1,
            parseFloat(attributes.radius) || 0.005
        );
        //Gobackto
        // material=global_metal_material.clone()
        // material.bumpMap = material.bumpMap.clone();
        // material.normalMap = material.normalMap.clone();
        // material.bumpMap.repeat.set(1.2*width, height);
        // material.normalMap.repeat.set(1.2*width, height);
        // material.bumpMap.offset.set(1.2*width, width);
        // material.normalMap.offset.set(1.2*width, width);
        // material.color=new THREE.Color(color)


        material = select_texture({ width: 1.2 * width, height: height, color: color })
        const invisibleMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0, transparent: true }); // Use your own materia
        const mesh = new THREE.Mesh(geometry, invisibleMaterial);

        //  position_x = Math.random() * 1-0.5;
        //console.log(position_x);


        mesh.position.set(
            parseFloat(position_x), // Assuming x position is always 0, adjust as needed
            parseFloat(position_y),
            parseFloat(position_z),  // Assuming z position is always 0, adjust as needed
        );


        // mesh.rotation.y = 0.70; // Rotate by the given roof angle



        if(door){
            gltfLoader.load('/assets/models/door_handle/scene.gltf', (gltf) => {

               
                const root = gltf.scene;
                let handle=root.children[0]
                handle.position.z = 0.1;
                handle.position.x=0.35*width
                handle.position.y=-0.0*height
                handle.scale.set(0.01,0.01,0.01)
                //   scene_outer.add(root);

                //console.log(dumpObject(root).join('\n'));

                //   let handle1 = root.getObjectByName('root');
                //   handle1.name = "hand111"

                //   let object_height = parseFloat(document.querySelector(".num-selector [name='wall-height']").value)

                //   handle1.scale.y = object_height * 0.95;
                //   //handle1.visible = false;
                //   handle1.translateY(0.97 * (-object_height / 2))

                mesh.add(root.children[0])   
               
            })
        }   
 
        else{
            switch(gate_type) {
                case "gate_type_1":
                    gltfLoader.load('/assets/models/door_handle_pull/scene.gltf', (gltf) => {
                        const root = gltf.scene;
                        let handle = root.children[0]
                        handle.rotateY(Math.PI/2)
                        handle.rotateX(Math.PI/2)
            
                        handle.position.z = -0.09
                        handle.position.x = 0.0 * width
                        handle.position.y = -0.20 * height
                        handle.scale.set(0.005,0.005,0.005)
                        handle.material = new THREE.MeshBasicMaterial({ color: 0xffffff});
            
                        mesh.add(root.children[0])
                    });
                    break;
            
                case "gate_type_2":
                    gltfLoader.load('/assets/models/door_handle/scene.gltf', (gltf) => {

               
                        const root = gltf.scene;
                        let handle=root.children[0]

                        let handle_elem = root.getObjectByName("handle"); // This gets the child with the name "handle"

                        // Rotate the handle around the Z axis by 180 degrees
                        handle_elem.rotation.z = Math.PI; // Math.PI radians is equivalent to 180 degrees
                    
                        handle.position.z = 0.1;
                        handle.position.x=+0.05*width
                        handle.position.y=-0.0*height
                        handle.scale.set(0.01,0.01,0.01)
                        //   scene_outer.add(root);
        
                        //console.log(dumpObject(root).join('\n'));
        
                        //   let handle1 = root.getObjectByName('root');
                        //   handle1.name = "hand111"
        
                        //   let object_height = parseFloat(document.querySelector(".num-selector [name='wall-height']").value)
        
                        //   handle1.scale.y = object_height * 0.95;
                        //   //handle1.visible = false;
                        //   handle1.translateY(0.97 * (-object_height / 2))
        
                        mesh.add(root.children[0])   
                       
                    })
                    break;
                case "gate_type_3":
                        //No need for a handle
                        break;

                default:
                    console.log("Invalid gate type");
            }
        }
        this.set(mesh);
    }

}

class CentralLineObject extends genericObject {
    constructor() {
        super();
    }
    create(attributes = {}) {


        let position_x = (attributes && attributes.position_x) ? parseFloat(attributes.position_x) : 0;
        let position_y = (attributes && attributes.position_y) ? parseFloat(attributes.position_y) : 0;
        let position_z = (attributes && attributes.position_z) ? parseFloat(attributes.position_z) : 0;
        let color = (attributes && attributes.color) ? attributes.color : "#CCCCCC";

        let width = (attributes && attributes.door_width) ? parseFloat(attributes.door_width) : 0;
        let depth = (attributes && attributes.depth) ? parseFloat(attributes.depth) : 0;
        let height = (attributes && attributes.height) ? parseFloat(attributes.height) : 0;

        let sheet_depth = (attributes && attributes.sheet_depth) ? parseFloat(attributes.sheet_depth) : 10.25;
        // var material = new THREE.MeshPhysicalMaterial({
        //     map: texture,
        //     color: attributes.color || "#ffffff",
        //     metalness: 0.5,
        //     roughness: 0.1,
        //     clearcoat: 0.8,
        //     clearcoatRoughness: 0.2

        // });

        // let texture=loader.load('/assets/config/default_rotated_1k.jpg');
        let local_texture = global_texture

        let material_type = (attributes && attributes.material_type) ? attributes.material_type : "material_type_1";
        let gate_type = (attributes && attributes.gate_type) ? attributes.gate_type : "";
        if(gate_type!=="gate_type_2")
        return

        switch (material_type) {
            case "material_type_1":
                // texture=global_texture
                //  color ="#ee2797";
                local_texture = global_texture.clone();
                // local_texture.wrapS=THREE.RepeatWrapping
                // local_texture.wrapT=THREE.RepeatWrapping
                local_texture.repeat.set(width, height / 2);

                break;
            case "material_type_2":
                // color ="#2727ee";
                // local_texture=global_texture_rotated


                local_texture = global_texture.clone();
                local_texture.rotation = Math.PI / 2;
                local_texture.repeat.set(1, height);

                break;
            case "material_type_3":
                // local_texture=loader.load('/assets/config/default_1k.jpg');

                // local_texture.repeat.set(width, height);
                local_texture = global_texture.clone();

                local_texture.repeat.set(1, height);

                break;
            case "material_type_4":
                // local_texture=loader.load('/assets/config/default_1k.jpg');
                local_texture = global_texture.clone();
                local_texture.rotation = Math.PI / 2;
                local_texture.repeat.set(1, height);


                break;
            case "material_type_5":
                // local_texture=loader.load('/assets/config/default_1k.jpg');


                local_texture = global_texture.clone();
                local_texture.repeat.set(1, height);


                break;
            default:
            // code to be executed if expression doesn't match any cases
        }

        // local_texture=global_texture

        local_texture.wrapS = THREE.RepeatWrapping
        local_texture.wrapT = THREE.RepeatWrapping
        // local_texture.repeat.set(1, height);
        // let texture=global_texture
        let material = new THREE.MeshStandardMaterial({
            map: local_texture,
            color: color,
            // metalness: 0.0,
            // roughness: 0.1,
            // clearcoat: 0.8,
            // clearcoatRoughness: 0.2
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
            width + 0.01,
            height + 0.01,
            depth + 0.01, // Assuming depth is always 1, adjust as needed
        );

        geometry = new THREE.BoxGeometry(
            0.025,
            height,
            0.03, // Assuming depth is always 1, adjust as needed
       
        );
        
        // material = select_texture({ width: 1.2 * width, height: height, color: color, material_type: material_type })
         material = new THREE.MeshStandardMaterial({
            color: 0x332335, // This is black color
            metalness: 0.78, // Full metallic effect
            roughness: 0.03 // Smooth surface for shiny metal effect
        });
        const mesh = new THREE.Mesh(geometry, material);

        //  position_x = Math.random() * 1-0.5;
        //console.log(position_x);


        mesh.position.set(
            parseFloat(position_x), // Assuming x position is always 0, adjust as needed
            parseFloat(position_y),
            parseFloat(position_z),  // Assuming z position is always 0, adjust as needed
        );






        this.set(mesh);
    }


}

export { SphereObject, DoorObject, DoorHandleObject, CentralLineObject }


