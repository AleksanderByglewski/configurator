import { v4 as uuidv4 } from 'uuid';
import { accesser } from '../../base'
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { Generic, genericGui, genericState, genericObject, genericDisplay, genericController } from '../../base.js'
import { UconfigInvisibleGui,UconfigGui,UconfigDebugGui} from '../base/gui'
import { DoubleCubeObject,CubeObject,UconfigObject, UconfigInvisibleObject,WallGarageObject, genericGarageObject } from '../base/object'
import {genericGarageController } from '../base/controller'
import { UconfigsController } from '../base/controller'
import { FloorObject } from './object'
class FloorCubeController extends  UconfigsController {
    constructor() {
        super();
        this.setModel(FloorObject)
    }
    handleEvent(event, data) {
        switch (event) {
            case 'removeModel':

                break;
            default:
                super.handleEvent(event, data);
                break;
        }
    }
}
export {FloorCubeController}
// class genericGarageController extends genericController {
//     constructor() {
//         super();

//         this.setModel(genericGarageObject);
//         this.setGui(UconfigDebugGui);
//         this.children = []
//         this.group = new THREE.Group()
//     }
//     setOptions(passedObject, accessers) {
//         for (let i = 0; i < accessers.length; i++) {
//             passedObject.state.update(accessers[i].resource_locator, accessers[i].value);
//         }
//     }
//     object_substraction() {
//         this.removeChild(added_object)
//     }
//     object_addition(objectOptions, classInstance) {
//         const added_object = new classInstance()
//         // added_object.display.set_scene(this.display.get_scene())
//         this.setOptions(added_object, objectOptions)
//         this.addChild(added_object)
//         return added_object
//     }
//     object_addition_existing(added_object) {
//         // added_object.display.set_scene(this.display.get_scene())
//         // this.setOptions(added_object, objectOptions)
//         this.addChild(added_object)

//     }
//     setGui(ObjectClass) {
//         this.gui = new ObjectClass();
//         this.gui.set_mediator(this);
//     }
//     setModel(ObjectClass) {
//         this.model = new ObjectClass();
//         this.model.set_mediator(this);
//     }
//     addChild(child) {
//         if (child instanceof genericGarageController) {
//             this.children.push(child);
//             child.set_mediator(this);
//         } else {
//             console.error("Only instances of genericGarageController can be added.");
//         }
//     }
//     removeChild(child) {
//         const index = this.children.indexOf(child);
//         if (index !== -1) {
//             this.children.splice(index, 1);
//             child.set_mediator(null);
//         }
//     }
//     getChildren() {
//         return this.children;
//     }
//     getChildByName(name) {
//         if (this.name !== undefined && this.name === name) {
//             return this
//         }
//         if (this.children) {
//             this.children.forEach((child) => { child.getChildByName(name) })
//         }
//     }
//     handleEvent(event, data) {
//         switch (event) {
//             case 'guiInputChange':

//             // Object.entries(data).forEach(([name, value]) => {
//             //     this.state.update(name, value);
//             // });
//             // if (typeof this.calculateState === 'function') {
//             //     this.calculateState();
//             // }
//             // //This is dubious at best
//             // this.children.forEach((child) => {
//             //     child.handleEvent('guiInputChange', {})
//             //     if (typeof child.calculateState === 'function') {
//             //         console.log(this.state.state)

//             //     //   child.calculateState();
//             //     }
//             //   });

//             // case 'recreateModel':
//             //     {
//             //         const modelMesh = this.model.get_model();
//             //         const scene = this.display.get_scene();
//             //         scene.remove(modelMesh);

//             //         this.children.forEach((child) => { child.handleEvent('removeModel') });
//             //         this.handleEvent("creationStep")
//             //         this.children.forEach((child) => { child.handleEvent('creationStep') });
//             //         break;
//             //     }
//             case 'recursivelyRemoveModel':

//                 // while (this.children.length > 0) {
//                 //         let child = this.children[0];
//                 //         // debug()
//                 //         child.handleEvent('recursivelyRemoveModel');
//                 //         // child.removeChild(child);
//                 //         this.children.shift()

//                 //     }
//                 this.handleEvent('removeModel');
//                 this.children.forEach(child => {
//                     if (child && typeof child.handleEvent === 'function') {
//                         child.handleEvent('recursivelyRemoveModel');

//                     }
//                 });
//                 // Remove the model of the current instance (parent)
//                 // controller.model = null;


//                 // const modelMesh = this.model.get_model();
//                 // const scene = this.display.get_scene();
//                 // scene.remove(modelMesh);


//                 break;

//             case 'removeModel':
//                 {
//                     const modelMesh = this.model.get_model();
//                     const scene = this.display.get_scene();
//                     scene.remove(modelMesh);
//                     break;
//                 }
//             // case 'iterationStep':
//             //     this.modifyState()
//             //     this.model.update(this.state.state)
//             //     break;
//             case 'creationStep':
//                 // const existingModel = this.model.get_model();
//                 // if (existingModel) {
//                 //     this.display.get_scene().remove(existingModel);

//                 //     existingModel.geometry.dispose();
//                 //     existingModel.material.dispose();
//                 //     if (existingModel.parent) {
//                 //         existingModel.parent.remove(existingModel);
//                 //     }
//                 // }



//                 this.handleEvent('recursivelyRemoveModel')
//                 this.model.create(this.state.state);
//                 const basicMesh = this.model.get_model();
//                 // if(this.state.state.get("position_relative")==true){
//                 // this.display.add_to_scene(basicMesh);
//                 // }
//                 if(this.display.scene) {
//                     this.display.add_to_scene(basicMesh);
//                 } else {
//                     console.error("Scene does not exist, you should probably trace this error");
//                 }
                

//                 this.children.forEach((child) => { child.handleEvent('creationStep') });
//                 // if (this.state.get('position_relative') !== undefined && this.state.get('position_relative')) {
//                 //     const parentMesh = this.mediator.model.get_model();
//                 //     const childMesh = this.model.get_model();
//                 //     parentMesh.add(childMesh);

//                 // }
//                 // else {

//                 // }



//                 break;
//             case 'stateChange':
//                 //Is this the correct way to check if the function exists in the class
//                 // if (typeof this.calculateState === 'function'){
//                 // this.calculateState()}
//                 //this.model.update(this.state.state)
//                 // this.children.forEach((child) => { child.handleEvent('stateChange') });
//                 // let keys = Object.keys(data);
//                 // keys[0]
//                 // let firstValue = data[keys[0]];
//                 if (data && typeof data === 'object') {
//                     let keys = Object.keys(data);
//                     if (keys.length > 0) {
//                         this.state.update(keys[0], data[keys[0]]);
//                     }
//                 }
//                 this.handleEvent("buildingStep")
//                 break;
//             // case 'guiChange':
//             // if (this.mediator!==undefined){this.mediator.notify('guiChange')}
//             // if (typeof this.calculateState === 'function'){this.calculateState()}

//             // this.notify('stateChange')
//             // break;
//             case 'generateInputs':
//                 this.gui.generateInputs(this.state.state)
//                 if (this.children) {
//                     this.children.forEach(child => {
//                         child.gui.generateInputs(child.state.state)
//                     });
//                 }
//                 break;
//             default:
//                 super.handleEvent(event, data);
//                 break;
//         }
//     }
//     basicTransformation(){
//         // this.state.get(position_x)
//         // this.state.get(position_y)
//         // this.state.get(position_z)
//         // this.state.get(rotation_x)
//         // this.state.get(rotation_y)
//         // this.state.get(rotation_z)
//         if(this.group!==undefined){
//         this.group.position.x=this.state.get('position_x')||0
//         this.group.position.y=this.state.get('position_y')||0
//         this.group.position.z=this.state.get('position_z')||0
//         this.group.rotation.x=this.state.get('rotation_x')||0
//         this.group.rotation.y=this.state.get('rotation_y')||0
//         this.group.rotation.z=this.state.get('rotation_z')||0
//         }
//     }
// }
// class groupGenericGarageController extends genericGarageController {

//     addChild(child) {
//         if (child instanceof genericGarageController) {
//             this.group.add(child.model.get_model()); // Add child's mesh to group
//             child.set_mediator(this);
//         } else {
//             console.error("Only instances of genericGarageController can be added.");
//         }
//     }
// }
// class WallGarageController extends genericGarageController {
//     constructor() {
//         super();
//         this.setModel(WallGarageObject)
//     }
//     handleEvent(event, data) {
//         switch (event) {
//             case 'removeModel':

//                 break;
//             default:
//                 super.handleEvent(event, data);
//                 break;
//         }
//     }
// }
// class CubeController extends genericGarageController {
//     constructor() {
//         super();
//         this.setModel(CubeObject)
//     }
//     handleEvent(event, data) {
//         switch (event) {
//             case 'removeModel':

//                 break;
//             default:
//                 super.handleEvent(event, data);
//                 break;
//         }
//     }
// }
// class UconfigController extends genericGarageController {
//     constructor() {
//         super();
//         this.setModel(UconfigObject)
//         this.gui = new UconfigGui();
//         this.gui.set_mediator(this)
//         this.group = new THREE.Group()
//     }
// }

// //This is a controller with children


// export {UconfigController,CubeController,WallGarageController,groupGenericGarageController,genericGarageController}