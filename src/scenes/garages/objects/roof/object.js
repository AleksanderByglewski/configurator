import { v4 as uuidv4 } from 'uuid';
import { accesser } from '../../base'
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { Generic, genericGui, genericState, genericObject, genericDisplay, genericController } from '../../base.js'
import { PlanetGui, PlanetObject, Planet, System } from '../introduction.js'


let this_loader = new THREE.TextureLoader();
let texture = this_loader.load('/assets/config/default_1k.jpg');
let global_texture = this_loader.load('/assets/config/default_1k.jpg');


class GarageObjectGable extends genericObject {
    constructor() {
        super(); 
    }
    create(attributes) {
 
        texture=global_texture
        var material = new THREE.MeshPhysicalMaterial({
            map: texture,
            color: attributes.color || "#ffffff",
            metalness: 0.5,
            roughness: 0.1,
            clearcoat: 0.8,
            clearcoatRoughness: 0.2
            
        });

        
        // var material=metalMaterial()
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
        let rotation_y=parseFloat( (attributes.rotation_y || 0));
        roof.rotateY(rotation_y)
        // .Position and rotate using the given roof angle
        roof.position.set(
            parseFloat(attributes.position_x), // Assuming x position is always 0, adjust as needed
            parseFloat(attributes.position_y),
            parseFloat(attributes.position_z),  // Assuming z position is always 0, adjust as needed
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
        // let loader = new THREE.TextureLoader();
        texture=global_texture
        var material = new THREE.MeshPhysicalMaterial({
            map: texture,
            color: attributes.color || "#ffffff",
            metalness: 0.5,
            roughness: 0.1,
            clearcoat: 0.8,
            clearcoatRoughness: 0.2
            
        });
        // var material=metalMaterial()
    
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
        let rotation_y=parseFloat( (attributes.rotation_y || 0));
        triangle.rotateY(rotation_y)
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
        texture=global_texture
        var material = new THREE.MeshPhysicalMaterial({
            map: texture,
            color: attributes.color || "#ffffff",
            metalness: 0.5,
            roughness: 0.1,
            clearcoat: 0.8,
            clearcoatRoughness: 0.2
            
    });
    // var material=metalMaterial()
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
        let rotation_y=parseFloat( (attributes.rotation_y || 0));
        roof.rotateY(rotation_y+Math.PI/2)
        // Position and rotate using the given roof angle
        roof.position.set(
            parseFloat(attributes.width)/2-0.020+parseFloat(attributes.position_x), // Assuming x position is always 0, adjust as needed
            parseFloat(attributes.position_y),
            parseFloat(attributes.position_z),  // Assuming z position is always 0, adjust as needed
        );
        // roof.rotation.y=Math.PI
        //  roof.rotation.y =

      
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



//Non implementation specific
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
        //console.log(position_x);


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


export {DoubleCubeObject, CubeObject,UconfigObject,UconfigInvisibleObject,WallGarageObject,genericGarageObject,GarageObjectGable ,GarageObjectSupport , GarageObjectSupportSquare }