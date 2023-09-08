import { v4 as uuidv4 } from 'uuid';
import { accesser } from '../../base'
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { Generic, genericGui, genericState, genericObject, genericDisplay, genericController } from '../../base.js'
import { UconfigInvisibleGui, UconfigGui, UconfigDebugGui } from './gui'
import { DoubleCubeObject, RedCubeObject, CubeObject, UconfigObject, UconfigInvisibleObject, WallGarageObject, genericGarageObject } from './object'

class genericGarageController extends genericController {
    constructor() {
        super();
        // alert("hello")
        // this.setModel(genericGarageObject);
        // this.setGui(UconfigDebugGui);
        // this.children = []
        // this.group = new THREE.Group()
    }
 

    handleEvent(event, data) {
        switch (event) {
       
            default:
                super.handleEvent(event, data);
                break;
        }
    }

}
class UconfigsController extends genericGarageController {
    setGui(ObjectClass) {
        this.gui = new ObjectClass();
        this.gui.set_mediator(this);
    }
    addChild(child) {
        //Old function that was replaced
        // if (child instanceof genericGarageController) {
        //     this.children.push(child);
        //     child.set_mediator(this);
        // } else {
        //     // console.error("Only instances of genericGarageController can be added.");
        // }
    }
    setModel(ObjectClass) {
        //Replaced
        this.model = new ObjectClass();
        this.model.set_mediator(this);
    }
    set_the_options(passedObject, accessers) {
        for (let i = 0; i < accessers.length; i++) {
            passedObject.state.update(accessers[i].resource_locator, accessers[i].value);
        }
    }

    constructor() {
       super()
        
        //this.setModel(UconfigInvisibleObject)
        this.gui = new UconfigGui();
        this.gui.set_mediator(this)
        this.group = new THREE.Group()
        
        // this.hooked_in_objects = []
        // this.hooked_in_objects_live = []

      
        this.external_objects=[]
        this.external_objects_controllers=[]
        
    }

    determineState() {
        //You can get the current state of the object by using the 
        // let name = this.state.get('name') || 'Wall'
        // let object_type = this.state.get('object_type') || 'flat'
        // let object_width = parseFloat(this.state.get('object_width')) || 3
        // let object_height = parseFloat(this.state.get('object_height')) || 2.43
        // let object_depth = parseFloat(this.state.get('object_depth')) || 2
        // let object_color = this.state.get('color') || "#272727"

        // let position_x = this.state.get('position_x') || 0
        // let position_y = this.state.get('position_y') || 0
        // let position_z = this.state.get('position_z') || 0

        // let height = this.state.get('height') || 2.13
        // let width = this.state.get('width') || 4.0
        // let depth = this.state.get('depth') || 4.0
        // object_height = height
        // object_width = width
        // object_depth = depth
        // //let object_angle=parseFloat(this.state.get('object_angle'))||30
        // let sheet_depth = parseFloat(this.state.get('sheet_depth')) || 0.0075

        // const accessersWallFront = [
        //     new accesser('side', 'front'),
        //     new accesser('name', name + "_front"),
        //     new accesser('width', object_width),
        //     new accesser('height', object_height),
        //     new accesser('sheet_depth', sheet_depth),
        //     new accesser('segments', 1),
        //     new accesser('radius', 0.01),
        //     new accesser('position_x', 3.0 + position_x),
        //     new accesser('position_y', 10.0 + position_y + height / 2),
        //     new accesser('position_z', -0.5 * object_depth + position_z),
        //     new accesser('color', "#272797"),
        //     new accesser('position_relative', 'true'),

        // ]
        // const accessersWallBack = [

        //     new accesser('side', 'back'),
        //     new accesser('name', name + "_back"),
        //     new accesser('width', object_width),
        //     new accesser('height', object_height),
        //     new accesser('sheet_depth', sheet_depth),
        //     new accesser('segments', 1),
        //     new accesser('radius', 0.01),
        //     new accesser('position_x', 10.0 + position_x),
        //     new accesser('position_y', -10 + position_y + height / 2),
        //     new accesser('position_z', +0.5 * object_depth + position_z),
        //     new accesser('color', object_color),
        //     new accesser('position_relative', 'true'),

        // ]
        // const accessersWallLeft = [

        //     new accesser('side', 'left'),
        //     new accesser('name', name + "_left"),
        //     new accesser('width', object_depth),
        //     new accesser('height', object_height),
        //     new accesser('sheet_depth', sheet_depth),
        //     new accesser('segments', 1),
        //     new accesser('radius', 0.01),
        //     new accesser('position_x', 13 + -0.5 * object_width + position_x),
        //     new accesser('position_y', 0 + position_y + height / 2),
        //     new accesser('position_z', 0 + position_z),
        //     new accesser('color', "#972797"),
        //     new accesser('position_relative', 'true'),
        //     new accesser('rotation_y', '90'),

        // ]
        // const accessersWallRight = [

        //     new accesser('side', 'right'),
        //     new accesser('name', name + '_right'),
        //     new accesser('width', object_depth),
        //     new accesser('height', object_height),
        //     new accesser('sheet_depth', sheet_depth),
        //     new accesser('segments', 1),
        //     new accesser('radius', 0.01),
        //     new accesser('position_x', 15 + 0.5 * object_width + position_x),
        //     new accesser('position_y', 0 + position_y + height / 2),
        //     new accesser('position_z', 0 + position_z),
        //     new accesser('color', object_color),
        //     new accesser('position_relative', 'true'),
        //     new accesser('rotation_y', '90'),

        // ]
        // return { "accessersWallFront": accessersWallFront, "accessersWallBack": accessersWallBack, "accessersWallLeft": accessersWallLeft, "accessersWallRight": accessersWallRight }
    }
    calculateState() {
    }
    generatePassiveObjects() {
        console.log("This should be overriden")
        // const { accessersWallFront, accessersWallBack, accessersWallLeft, accessersWallRight } = this.determineState();
 
        let array = [
            // { objectOptions: accessersWallFront, classInstance: UconfigsController },
            // { objectOptions: accessersWallBack, classInstance: SimpleController  },
            // { objectOptions: accessersWallLeft, classInstance: SimpleController  },
            // { objectOptions: accessersWallRight, classInstance: SimpleController }
        ]
        return array
    }
    generateDynamicObjects() {
        console.log("This should be overriden")
        let external_data = []



        for (let i = 0; i < this.external_objects.length; i++) {
            this.external_objects[i].specify_self()

        }
        //Write the code for hooking in of external objects
        //Just pull from the external objects
        return []

    }
    generateDynamicAccessers() {
        
        const dynamic_accessers = [
            new accesser('name', 'Menu do debugowania obiektu'),
            new accesser('position_x'),
            new accesser('position_y'),
            new accesser('position_z'),
            new accesser('rotation_y'),
        ]
        return dynamic_accessers

    }
    buildingStep() {

        this.children=[]
        // let position_x = this.state.get('position_x') || 0
        // let position_y = this.state.get('position_y') || 0
        // let position_z = this.state.get('position_z') || 0

        const passive_accessers=[
            // new accesser('name', 'Menu do debugowania obiektu'),
        ]

        const dynamic_accessers=this.generateDynamicAccessers()

        const accessers=[ ...passive_accessers,...dynamic_accessers]

        let self=this
        function update_accesser_values(accessers){
            accessers.forEach(element=>{
                element.value=self.state.get(element)

            })

        }

        update_accesser_values(dynamic_accessers) 
        // this.set_mediator(this)
        this.set_the_options(this, accessers)
        console.log(this.state.state)


        //This is probably the moment when we should clean the group
        function disposeNode(node){
            if (node instanceof THREE.Mesh) {
                if (node.geometry) {
                    node.geometry.dispose();
                }
        
                if (node.material) {
                   
                        if (node.material.map) node.material.map.dispose();
                        if (node.material.lightMap) node.material.lightMap.dispose();
                        if (node.material.bumpMap) node.material.bumpMap.dispose();
                        if (node.material.normalMap) node.material.normalMap.dispose();
                        if (node.material.specularMap) node.material.specularMap.dispose();
                        if (node.material.envMap) node.material.envMap.dispose();
        
                        node.material.dispose();   // disposes any programs associated with the material
                    
                }
            } 
        }
        
        // Remove and dispose all children
        while(this.group.children.length > 0){ 
            let child = this.group.children[0];
            this.group.remove(child); 
            disposeNode(child);
        }

        let self_array=[]
        self_array=this.generatePassiveObjects()

        let external_array=this.external_objects
        

        for (let i=0;i<external_array.length; i++){
            external_array[i].handleEvent('buildingStep');
            this.group.add(external_array[i].group)
           
        }
        // const array=[ ...self_array, ...external_array]
        const array=[ ...self_array]
        

        // });
        let outer_scene=this.display.get_scene()
        
        array.forEach(({ objectOptions, classInstance }) => {

                this.display.set_scene(this.display.get_scene())
                const added_object = new classInstance()
                added_object.display.set_scene(outer_scene)
                added_object.set_the_options(added_object, objectOptions)
                added_object.model.create(added_object.state.state)
                //this.addChild(added_object)
                added_object.handleEvent('buildingStep')
                this.group.add(added_object.model.get_model())   
                this.group.add(added_object.group)
        })


        // for (let i=0;i<this.external_objects_controllers.length; i++){
        //     for (let j=0;j<this.group.children.length; j++){
        //         this.external_objects_controllers[i].group.add(this.group.children[j])
        //     }
        // }

        //You should probably leave it out
        //const axesHelper = new THREE.AxesHelper(1.5); // Set the size based on your needs
        //this.group.add(axesHelper);
   

        let hasControllers = false;
        let currentMediator = this;

        while (currentMediator) {
       
            if (currentMediator.external_objects_controllers.length > 0) {
                hasControllers = true;
                break;
            }
            if(currentMediator==currentMediator.mediator){
                break;
            }

            currentMediator = currentMediator.mediator;
          

        }
        
        if(!hasControllers){
        this.display.get_scene().add(this.group)
        }
        // else {
        // currentMediator.mediator.group.add(this.group)
        // }
    

        // if(this.external_objects_controllers.length==0){
        // this.display.get_scene().add(this.group)
        // }
        //if(!hasControllers){
        // this.model.update(this.state.state)


        this.basicTransformation()
        //}
        //console.log(this.state.state)
        
    }
    handleEvent(event, data) {
        switch (event) {
            case 'removeModel':
                //I would like to remove the curent model from this scene and current group as well
                this.display.remove_from_scene(this.model.get_model())
                this.display.remove_from_scene(this.group)
                //I would like to kill all objects in a group THREE.js

                while (this.group.children.length > 0) {
                    this.group.remove(this.group.children[0]);
                }

                if (this.group) {
                    if (this.group instanceof THREE.Group) {
                        while (this.group.children.length > 0) {
                            this.remove(object.children[0]);
                        }
                    }
                    //this.group = new THREE.Group();  // Assign a new empty group
                }
                break;
            case 'buildingStep':
                this.handleEvent('recursivelyRemoveModel');
                this.buildingStep()

                break;
            case 'debugBuildingStep':
                this.buildingStep()
                break;
            case 'creationStep':
                {
                    //this.handleEvent('recursivelyRemoveModel')
                    // this.handleEvent('removeModel')
                    // Create the geometry, material, and mesh for the cube
                    // const geometry = new THREE.BoxGeometry(1, 5, 1);  // Cube of size 1x1x1
                    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });  // Green color
                    // const cube = new THREE.Mesh(geometry, material);

                    // // Add the cube to the scene
                    // this.display.add_to_scene(cube);
                    // this.display.remove_from_scene(cube)

                    // if (this.model && typeof this.model.get_model === 'function') {
                    //     const modelInstance = this.model

                    //     if (modelInstance && typeof modelInstance.create === 'function') {
                    //         modelInstance.create(this.state.state);
                    //     }
                    //     if (this.display && typeof this.display.add_to_scene === 'function') {
                    //         this.display.add_to_scene(modelInstance.model);
                    //         this.display.add_to_scene(this.group);
                    //         // this.display.add_to_scene(cube)
                    //         // this.display.remove_from_scene(cube)
                    //     }
                    // }
                    // if (Array.isArray(this.children)) {
                    //     this.children.forEach((child) => {
                    //         if (child && typeof child.handleEvent === 'function') {
                    //             // child.handleEvent('creationStep');
                    //         }
                    //     });
                    // }
                    break
                }
            case 'generateInputs':
                    this.gui.generateInputs(this.state.state)
                    if (this.children) {
                        this.children.forEach(child => {
                            child.gui.generateInputs(child.state.state)
    
                        });
                    }
                    break;
            case 'changeObject':
                // alert(data)
                {
                    const accessers = [
                        new accesser('color', data),
                    ]
                    this.handleEvent('recursivelyRemoveModel');
                    this.set_the_options(this, accessers)
                    this.handleEvent('buildingStep');

                    // this.handleEvent('creationStep');
                    // this.buildingStep()
                }
                break;
            case 'changeFloor':
                // alert(data)
                const accessers = [
                    new accesser('color', data),
                ]
                this.handleEvent('recursivelyRemoveModel');
                this.set_the_options(this, accessers)
                this.handleEvent('buildingStep');

                // this.handleEvent('creationStep');
                // this.buildingStep()

                break;
            case 'stateChange':
            case 'debugStateChange':
                    //Is this the correct way to check if the function exists in the class
                    // if (typeof this.calculateState === 'function'){
                    // this.calculateState()}
                    //this.model.update(this.state.state)
                    // this.children.forEach((child) => { child.handleEvent('stateChange') });
                    // let keys = Object.keys(data);
                    // keys[0]
                    // let firstValue = data[keys[0]];
                    // alert("hello")
                    if (data && typeof data === 'object') {
                        let keys = Object.keys(data);
                        if (keys.length > 0) {
                            this.state.update(keys[0], data[keys[0]]);
                        }
                    }
    
                    this.handleEvent("debugBuildingStep")
    
                    break;
               
                default:
                // console.error(event, data)
                super.handleEvent(event, data);
                break;
        }
    }
    basicTransformation() {
        // this.state.get(position_x)
        // this.state.get(position_y)
        // this.state.get(position_z)
        // this.state.get(rotation_x)
        // this.state.get(rotation_y)
        // this.state.get(rotation_z)
        if (this.group !== undefined) {
            this.group.position.x = this.state.get('position_x') || 0
            this.group.position.y = this.state.get('position_y') || 0
            this.group.position.z = this.state.get('position_z') || 0
            this.group.rotation.x = this.state.get('rotation_x') || 0
            this.group.rotation.y = this.state.get('rotation_y') || 0
            this.group.rotation.z = this.state.get('rotation_z') || 0
        }
    }
}
class CubeController extends UconfigsController {
    constructor() {
        super();
        this.setModel(CubeObject)
        this.gui.set_mediator(this)
        this.gui = new UconfigInvisibleGui();
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
class RedCubeController extends UconfigsController {
    constructor() {
        super();
        this.setModel(RedCubeObject)
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
class DebugController extends UconfigsController {
    constructor() {
        super();
        this.gui = new UconfigDebugGui();
        this.gui.set_mediator(this)
        this.setModel(CubeObject)
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



export { UconfigsController, CubeController, RedCubeController, DebugController,  genericGarageController, }