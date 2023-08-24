import { v4 as uuidv4 } from 'uuid';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { Generic, genericGui, genericState, genericObject, genericDisplay, genericController } from '../base'
import { PlanetGui, PlanetObject, Planet, System } from './introduction.js'
class genericGarageObject extends genericObject {
    constructor() {
        super();
    }
    recreate(attributes) {
        this.mediator.handleEvent('removeModel')
        this.create(attributes)
    }

    create(attributes) {
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
            parseFloat(attributes.width) || 0,
            parseFloat(attributes.height) || 0,
            parseFloat(attributes.depth) || 0,
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
class genericGarageController extends genericController {
    set_the_options(passedObject, accessers){
        for(let i=0; i<accessers.length; i++) {
            passedObject.state.update(accessers[i].resource_locator, accessers[i].value);
        }
    }
    object_substraction(){
        this.removeChild(added_object)
    }
    object_addition(objectOptions,classInstance){
        const added_object=new classInstance()
        added_object.display.set_scene(this.display.get_scene())
        this.set_the_options(added_object, objectOptions)
        this.addChild(added_object)
    }
    object_addition_existing(added_object){
        added_object.display.set_scene(this.display.get_scene())
        // this.set_the_options(added_object, objectOptions)
        this.addChild(added_object)

    }
    constructor() {
        super();
        this.setModel(genericGarageObject);
        this.setGui(PlanetGui);
        this.children = []
    }

    setGui(ObjectClass) {
        this.gui = new ObjectClass();
        this.gui.set_mediator(this);
    }

    setModel(ObjectClass) {
        this.model = new ObjectClass();
        this.model.set_mediator(this);
    }
    addChild(child) {
        if (child instanceof genericGarageController) {
            this.children.push(child);
            child.set_mediator(this);
        } else {
            console.error("Only instances of genericGarageController can be added.");
        }
    }
    removeChild(child) {
        const index = this.children.indexOf(child);
        if (index !== -1) {
            this.children.splice(index, 1);
            child.set_mediator(null);
        }
    }

    getChildren() {
        return this.children;
    }
    getChildByName(name){
        if(this.name!== undefined &&this.name===name){
        return this    
        }
        if(this.children){
            this.children.forEach((child)=>{child.getChildByName(name)})
        }
    }  
  handleEvent(event, data) {
        switch (event) {
            case 'buildingStep':
                // if (typeof this.buildingStep === 'function') {
                //     this.buildingStep()
                // }
                break;
            case 'guiInputChange':

                // Object.entries(data).forEach(([name, value]) => {
                //     this.state.update(name, value);
                // });
                // if (typeof this.calculateState === 'function') {
                //     this.calculateState();
                // }
                // //This is dubious at best
                // this.children.forEach((child) => {
                //     child.handleEvent('guiInputChange', {})
                //     if (typeof child.calculateState === 'function') {
                //         console.log(this.state.state)
                        
                //     //   child.calculateState();
                //     }
                //   });
                
            // case 'recreateModel':
            //     {
            //         const modelMesh = this.model.get_model();
            //         const scene = this.display.get_scene();
            //         scene.remove(modelMesh);

            //         this.children.forEach((child) => { child.handleEvent('removeModel') });
            //         this.handleEvent("creationStep")
            //         this.children.forEach((child) => { child.handleEvent('creationStep') });
            //         break;
            //     }
            case 'recursivelyRemoveModel':
              
                // while (this.children.length > 0) {
                //         let child = this.children[0];
                //         // debug()
                //         child.handleEvent('recursivelyRemoveModel');
                //         // child.removeChild(child);
                //         this.children.shift()
                        
                //     }
                    this.handleEvent('removeModel');
                    this.children.forEach(child => {
                        if (child && typeof child.handleEvent === 'function') {
                            child.handleEvent('recursivelyRemoveModel');
                            
                        }
                    });
                    // Remove the model of the current instance (parent)
                    // controller.model = null;


                    // const modelMesh = this.model.get_model();
                    // const scene = this.display.get_scene();
                    // scene.remove(modelMesh);
                    

                break;

            case 'removeModel':
                {
                    const modelMesh = this.model.get_model();
                    const scene = this.display.get_scene();
                    scene.remove(modelMesh);
                    break;
                }
            // case 'iterationStep':
            //     this.modifyState()
            //     this.model.update(this.state.state)
            //     break;
            case 'creationStep':
                // const existingModel = this.model.get_model();
                // if (existingModel) {
                //     this.display.get_scene().remove(existingModel);

                //     existingModel.geometry.dispose();
                //     existingModel.material.dispose();
                //     if (existingModel.parent) {
                //         existingModel.parent.remove(existingModel);
                //     }
                // }


                
                this.handleEvent('recursivelyRemoveModel')
                this.model.create(this.state.state);
                const basicMesh = this.model.get_model();

                this.display.add_to_scene(basicMesh);
                this.children.forEach((child) => { child.handleEvent('creationStep') });
                // if (this.state.get('position_relative') !== undefined && this.state.get('position_relative')) {
                //     const parentMesh = this.mediator.model.get_model();
                //     const childMesh = this.model.get_model();
                //     parentMesh.add(childMesh);

                // }
                // else {
                
                // }

                

                break;
            // case 'stateChange':
            //     //Is this the correct way to check if the function exists in the class
            //     // if (typeof this.calculateState === 'function'){
            //     // this.calculateState()}
            //     // this.model.update(this.state.state)
            //     // this.children.forEach((child) => { child.handleEvent('stateChange') });
            //     // break;
            // case 'guiChange':
                // if (this.mediator!==undefined){this.mediator.notify('guiChange')}
                // if (typeof this.calculateState === 'function'){this.calculateState()}

                // this.notify('stateChange')
                // break;
            case 'generateInputs':
                this.gui.generateInputs(this.state.state)
                if (this.children) {
                    this.children.forEach(child => {
                        child.gui.generateInputs(child.state.state)
                    });
                }
                break;
            default:
                super.handleEvent(event, data);
                break;
        }
    }

}
class InvisibleWallGarageObject extends genericObject {
    constructor() {
        super(); 
    }
    create(attributes) {
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Creates a red material

        let geometry = new THREE.BoxGeometry(
             0,0,0
        );
    
        const mesh = new THREE.Mesh(geometry, material);
    
        mesh.position.set(
            parseFloat(attributes.position_x),
            parseFloat(attributes.position_y),
            parseFloat(attributes.position_z), 
        );
        
        this.set(mesh);
    }

    update(attributes){
        if (!this.model) return;
    
        // if (attributes.position_x !== undefined) {
        //     this.model.position.setX(parseFloat(attributes.position_x));
        // }
    
        // if (attributes.position_y !== undefined) {
        //     this.model.position.setY(parseFloat(attributes.position_y));
        // }
    
        // if (attributes.position_z !== undefined) {
        //     this.model.position.setZ(parseFloat(attributes.position_z));
        // }
        
        // // Update rotation if needed
        // if (attributes.rotation_z !== undefined) {
        //     this.model.rotation.z = attributes.rotation_z;
        // }
    }
}

export {genericGarageObject,  genericGarageController ,  InvisibleWallGarageObject }