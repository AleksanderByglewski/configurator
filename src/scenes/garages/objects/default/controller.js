import { v4 as uuidv4 } from 'uuid';
import { accesser } from '../../base'
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { Generic, genericGui, genericState, genericObject, genericDisplay, genericController } from '../../base.js'
import { PlanetGui, PlanetObject, Planet, System } from '../introduction.js'
import { UconfigInvisibleGui,UconfigGui} from './gui'
import { DoubleCubeObject,CubeObject,UconfigObject, UconfigInvisibleObject,WallGarageObject, genericGarageObject } from '../default/object'

class genericGarageController extends genericController {
    constructor() {
        super();
        // alert("hello")
        this.setModel(genericGarageObject);
        this.setGui(PlanetGui);
        this.children = []
        this.group = new THREE.Group()
    }
    set_the_options(passedObject, accessers) {
        for (let i = 0; i < accessers.length; i++) {
            passedObject.state.update(accessers[i].resource_locator, accessers[i].value);
        }
    }
    object_substraction() {
        this.removeChild(added_object)
    }
    object_addition(objectOptions, classInstance) {
        const added_object = new classInstance()
        // added_object.display.set_scene(this.display.get_scene())
        this.set_the_options(added_object, objectOptions)
        this.addChild(added_object)
        return added_object
    }
    object_addition_existing(added_object) {
        // added_object.display.set_scene(this.display.get_scene())
        // this.set_the_options(added_object, objectOptions)
        this.addChild(added_object)

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
    getChildByName(name) {
        if (this.name !== undefined && this.name === name) {
            return this
        }
        if (this.children) {
            this.children.forEach((child) => { child.getChildByName(name) })
        }
    }
    handleEvent(event, data) {
        switch (event) {
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
                // if(this.state.state.get("position_relative")==true){
                // this.display.add_to_scene(basicMesh);
                // }
                if(this.display.scene) {
                    this.display.add_to_scene(basicMesh);
                } else {
                    console.error("Scene does not exist, you should probably trace this error");
                }
                

                this.children.forEach((child) => { child.handleEvent('creationStep') });
                // if (this.state.get('position_relative') !== undefined && this.state.get('position_relative')) {
                //     const parentMesh = this.mediator.model.get_model();
                //     const childMesh = this.model.get_model();
                //     parentMesh.add(childMesh);

                // }
                // else {

                // }



                break;
            case 'stateChange':
                //Is this the correct way to check if the function exists in the class
                // if (typeof this.calculateState === 'function'){
                // this.calculateState()}
                //this.model.update(this.state.state)
                // this.children.forEach((child) => { child.handleEvent('stateChange') });
                // let keys = Object.keys(data);
                // keys[0]
                // let firstValue = data[keys[0]];
                if (data && typeof data === 'object') {
                    let keys = Object.keys(data);
                    if (keys.length > 0) {
                        this.state.update(keys[0], data[keys[0]]);
                    }
                }
                this.handleEvent("buildingStep")
                break;
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
    basicTransformation(){
        // this.state.get(position_x)
        // this.state.get(position_y)
        // this.state.get(position_z)
        // this.state.get(rotation_x)
        // this.state.get(rotation_y)
        // this.state.get(rotation_z)
        if(this.group!==undefined){
        this.group.position.x=this.state.get('position_x')||0
        this.group.position.y=this.state.get('position_y')||0
        this.group.position.z=this.state.get('position_z')||0
        this.group.rotation.x=this.state.get('rotation_x')||0
        this.group.rotation.y=this.state.get('rotation_y')||0
        this.group.rotation.z=this.state.get('rotation_z')||0
        }
    }
}
class groupGenericGarageController extends genericGarageController {

    addChild(child) {
        if (child instanceof genericGarageController) {
            this.group.add(child.model.get_model()); // Add child's mesh to group
            child.set_mediator(this);
        } else {
            console.error("Only instances of genericGarageController can be added.");
        }
    }
}
class WallGarageController extends genericGarageController {
    constructor() {
        super();
        this.setModel(WallGarageObject)
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
class CubeController extends genericGarageController {
    constructor() {
        super();
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
class UconfigController extends genericGarageController {
    constructor() {
        super();
        this.setModel(UconfigObject)
        this.gui = new UconfigGui();
        this.gui.set_mediator(this)
        this.group = new THREE.Group()
    }
}

//This is a controller with children
class DoubleCubeController extends genericGarageController {
    constructor() {
        super();
        this.setModel(UconfigInvisibleObject)
        this.gui = new UconfigGui();
        this.gui.set_mediator(this)
        //Create a new three.js group
        this.group = new THREE.Group()
    }
    determineState() {
        //You can get the current state of the object by using the 
        let name = this.state.get('name') || 'Wall'
        let object_type = this.state.get('object_type') || 'flat'
        let object_width = parseFloat(this.state.get('object_width')) || 3
        let object_height = parseFloat(this.state.get('object_height')) || 2.43
        let object_depth = parseFloat(this.state.get('object_depth')) || 2
        let object_color = this.state.get('color') || "#276727"

        let position_x = this.state.get('position_x') || 0
        let position_y = this.state.get('position_y') || 0
        let position_z = this.state.get('position_z') || 0

        let height = this.state.get('height') || 2.13
        let width = this.state.get('width') || 4.0
        let depth = this.state.get('depth') || 4.0
        object_height = height
        object_width = width
        object_depth = depth
        //let object_angle=parseFloat(this.state.get('object_angle'))||30
        let sheet_depth = parseFloat(this.state.get('sheet_depth')) || 0.0075

        const accessersWallFront = [
            new accesser('name', name + "_front"),
            new accesser('width', object_width),
            new accesser('height', object_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', 3.0 + position_x),
            new accesser('position_y', 10.0 + position_y + height / 2),
            new accesser('position_z', -0.5 * object_depth + position_z),
            new accesser('color', object_color),
            new accesser('position_relative', 'true'),

        ]
        const accessersWallBack = [
            new accesser('name', name + "_back"),
            new accesser('width', object_width),
            new accesser('height', object_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', 10.0 + position_x),
            new accesser('position_y', -10 + position_y + height / 2),
            new accesser('position_z', +0.5 * object_depth + position_z),
            new accesser('color', object_color),
            new accesser('position_relative', 'true'),

        ]
        const accessersWallLeft = [
            new accesser('name', name + "_left"),
            new accesser('width', object_depth),
            new accesser('height', object_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', 13+-0.5 * object_width + position_x),
            new accesser('position_y', 0 + position_y + height / 2),
            new accesser('position_z', 0 + position_z),
            new accesser('color', object_color),
            new accesser('position_relative', 'true'),
            new accesser('rotation_y', '90'),

        ]
        const accessersWallRight = [
            new accesser('name', name + '_right'),
            new accesser('width', object_depth),
            new accesser('height', object_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', 15+0.5 * object_width + position_x),
            new accesser('position_y', 0 + position_y + height / 2),
            new accesser('position_z', 0 + position_z),
            new accesser('color', object_color),
            new accesser('position_relative', 'true'),
            new accesser('rotation_y', '90'),

        ]
        return { "accessersWallFront": accessersWallFront, "accessersWallBack": accessersWallBack, "accessersWallLeft": accessersWallLeft, "accessersWallRight": accessersWallRight }
    }
    calculateState() {
        //This is a function that updates the values of the children of the system
        const accessersDict = this.determineState();
        Object.keys(accessersDict).forEach((key, index) => {
            if (this.children[index]) {
                this.set_the_options(this.children[index], accessersDict[key]);
            }
        });
    }
    buildingStep() {
        // alert('am i called?')
        const accessers = [
            new accesser('name', 'The floor grouping'),
             new accesser('color','#379737' )

        ]
        this.set_mediator(this)
        this.set_the_options(this, accessers)

        

        const { accessersWallFront, accessersWallBack, accessersWallLeft, accessersWallRight } = this.determineState();

        //      let array = [
        //          { objectOptions: accessersWallFront, classInstance: WallGarageController },
        //          { objectOptions: accessersWallBack, classInstance: WallGarageController },
        //          { objectOptions: accessersWallLeft, classInstance: WallGarageController },
        //          { objectOptions: accessersWallRight, classInstance: WallGarageController }
        //  ]

        let array = [
        { objectOptions: accessersWallFront, classInstance:CubeController},
        { objectOptions: accessersWallBack, classInstance: CubeController },
        
        // { objectOptions: accessersWallLeft, classInstance: CubeController },
        // { objectOptions: accessersWallRight, classInstance: CubeController }
        ]
        // // array=[]

        // this.children.forEach((child) => {
        //     child.handleEvent('recursivelyRemoveModel')
        // });
        // this.children = []

        // array.forEach(({ objectOptions, classInstance }) => {
        //     this.display.set_scene(this.display.get_scene())
        //     const created_object = this.object_addition.bind(this)(objectOptions, classInstance);
        //     // console.log(created_object)
        //     this.group.add(created_object)
        //     // console.log(t)
        // });
        let outer_scene=this.display.get_scene()
        array.forEach(({ objectOptions, classInstance }) => {

                this.display.set_scene(this.display.get_scene())
                //const completed_mesh = this.object_addition.bind(this)(objectOptions, classInstance);
                //     // console.log(created_object)
                //     this.group.add(created_object)
                const added_object = new classInstance()
                added_object.display.set_scene(outer_scene)
                
                // added_object.display.set_scene(this.display.get_scene())
                this.set_the_options(added_object, objectOptions)
            
                added_object.model.create(added_object.state.state)
                this.addChild(added_object)
                // added_object.display.set_scene(outer_scene)
                // debug()
                // const completed_mesh=added_object.model.get_model()
                // this.group.position.x += 10; // Move 10 units along X-axis
                // this.group.position.y += 20; // Move 20 units along Y-axis
                // this.group.position.z += 30; 
               
                // this.group.rotation.y=Math.PI/4
                this.group.add(added_object.model.get_model())   
                this.group.add(added_object.group)
                 
                // outer_scene.add(this.group)
               

                
                // I would like to rotate this group in three js by at least 45 degrees
        })

        // const scene = this.display.scene;
        // {
        //     let geometry22 = new THREE.BoxGeometry(1, 1, 1);
        //     let material22 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

        //     // Create the first mesh and position it to the left (-2 on the x axis)
        //     var mesh1 = new THREE.Mesh(geometry22, material22);
        //     mesh1.position.set(-2, 0, 0);

        //     // Create the second mesh and position it to the right (2 on the x axis)
        //     var mesh2 = new THREE.Mesh(geometry22, material22);
        //     mesh2.position.set(2, 0, 0);

        //     // Create a group and add the meshes
        //     // this.group.add(mesh1);
        //     // this.group.add(mesh2);

        // }
        
      
        // array=[mesh1, mesh2]
        // array.forEach(({ objectOptions, classInstance }) => {

        //     let added_object=new classInstance()
        //     added_object.model.create(this.state.state);
        
           
        //     this.set_the_options(added_object, objectOptions)
        //     // this.display.set_scene(this.display.get_scene())
        //     // const created_object = this.object_addition.bind(this)(objectOptions, classInstance);
        //     // console.log(created_object)
            
        //     let geometry22 = new THREE.BoxGeometry(1, 1, 1);
        //     let material22 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

        //     // Create the first mesh and position it to the left (-2 on the x axis)
        //     var mesh1 = new THREE.Mesh(geometry22, material22);
        //     mesh1.position.set(-2, 0, 0);

        //     // Create the second mesh and position it to the right (2 on the x axis)
        //     var mesh2 = new THREE.Mesh(geometry22, material22);
        //     mesh2.position.set(2, 0, 0);


          

        //     // debug()
        //     // var mesh3 = new THREE.Mesh(geometry22, material22);

        //     // this.group.add(mesh3)
        //     // console.log(t)
        // });
        // let mesh3 = new CubeContr    oller();
        // mesh3.model.create()
        // mesh3.model.get_model()
        // mesh3.model.get_model().position.set(2, 2, 0);
        // let mesh3_model=mesh3.model.get_model()
    

        // array=[mesh1, mesh2, mesh3_model]
        // array.forEach((completed_mesh) => {
        //     // this.display.set_scene(this.display.get_scene())
        //     //const created_object = this.object_addition.bind(this)(objectOptions, classInstance);
        //     // console.log(created_object)
        //     this.group.add(completed_mesh)
        // });
        const axesHelper = new THREE.AxesHelper(5); // Set the size based on your needs
        this.group.add(axesHelper);
    
        this.display.get_scene().add(this.group)
        this.group.position.x=4.0
        this.group.position.z=4.0
        this.group.rotation.y=0.5*Math.PI/2
        // this.handleEvent('stateChange')
        this.handleEvent('creationStep');
    }
    handleEvent(event, data) {
        switch (event) {
            case 'removeModel':
                //I would like to remove the curent model from this scene and current group as well
                this.display.remove_from_scene(this.model.get_model())
                this.display.remove_from_scene(this.group)
                //I would like to kill all objects in a group THREE.js

                while(this.group.children.length > 0){ 
                    this.group.remove(this.group.children[0]); 
                }
                
                if(this.group) {
                    if(this.group instanceof THREE.Group) {
                        while(this.group.children.length > 0){ 
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

                    if (this.model && typeof this.model.get_model === 'function') {
                        const modelInstance = this.model

                        if (modelInstance && typeof modelInstance.create === 'function') {
                            modelInstance.create(this.state.state);
                        }
                        if (this.display && typeof this.display.add_to_scene === 'function') {
                            this.display.add_to_scene(modelInstance.model);
                            this.display.add_to_scene(this.group);
                            // this.display.add_to_scene(cube)
                            // this.display.remove_from_scene(cube)
                        }
                    }
                    if (Array.isArray(this.children)) {
                        this.children.forEach((child) => {
                            if (child && typeof child.handleEvent === 'function') {
                                // child.handleEvent('creationStep');
                            }
                        });
                    }
                    break
                }
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
            default:
                // console.error(event, data)
                super.handleEvent(event, data);
                break;
        }
    }
}

export {UconfigController,DoubleCubeController,CubeController,WallGarageController,groupGenericGarageController,genericGarageController}