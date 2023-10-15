import { v4 as uuidv4 } from 'uuid';
import { accesser } from '../../base'
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { Generic, genericGui, genericState, genericObject, genericDisplay, genericController } from '../../base.js'
import { PlanetGui, PlanetObject, Planet, System } from '../introduction.js'
import { CubeObject,UconfigObject,WallGarageObject, UconfigInvisibleObject, genericGarageObject } from './object'
import { UconfigInvisibleGui,UconfigGui, UconfigDebugGui} from './gui'
import {UconfigsController ,DoubleCubeController,UconfigController,CubeController,WallGarageController,groupGenericGarageController,genericGarageController, SimpleController, SimpleRedController} from './controller'

// import { genericGarageController, InvisibleWallGarageObject } from '../generic.js';
// import { metalMaterial, metalMaterial2 } from '../../textures/material_spawn';
// const loader = new THREE.TextureLoader();
// const global_texture = loader.load('/assets/config/default_1k.jpg');

//This is an implementation of the template
// class UconfigsController extends genericGarageController {
//     constructor() {
//         super()
//         this.setModel(UconfigInvisibleObject)
//         this.gui = new UconfigGui();
//         this.gui.set_mediator(this)
//         this.group = new THREE.Group()
    
//         this.hooked_in_objects=[]
//         this.hooked_in_objects_live=[]
//     }

//     hookInObjects(objects){

//         this.hooked_in_objects.push(objects)
//     }

//     determineState() {
//         //You can get the current state of the object by using the 
//         let name = this.state.get('name') || 'Wall'
//         let object_type = this.state.get('object_type') || 'flat'
//         let object_width = parseFloat(this.state.get('object_width')) || 3
//         let object_height = parseFloat(this.state.get('object_height')) || 2.13
//         let object_depth = parseFloat(this.state.get('object_depth')) || 2
//         let object_color = this.state.get('color') || "#272727"

//         let position_x = this.state.get('position_x') || 0
//         let position_y = this.state.get('position_y') || 0
//         let position_z = this.state.get('position_z') || 0

//         let height = this.state.get('height') || 2.13
//         let width = this.state.get('width') || 4.0
//         let depth = this.state.get('depth') || 4.0
//         object_height = height
//         object_width = width
//         object_depth = depth
//         //let object_angle=parseFloat(this.state.get('object_angle'))||30
//         let sheet_depth = parseFloat(this.state.get('sheet_depth')) || 0.0075

//         const accessersWallFront = [
//             new accesser('side', 'front'),
//             new accesser('name', name + "_front"),
//             new accesser('width', object_width),
//             new accesser('height', object_height),
//             new accesser('sheet_depth', sheet_depth),
//             new accesser('segments', 1),
//             new accesser('radius', 0.01),
//             new accesser('position_x', 3.0 + position_x),
//             new accesser('position_y', 10.0 + position_y + height / 2),
//             new accesser('position_z', -0.5 * object_depth + position_z),
//             new accesser('color', "#272797"),
//             new accesser('position_relative', 'true'),

//         ]
//         const accessersWallBack = [
            
//             new accesser('side', 'back'),
//             new accesser('name', name + "_back"),
//             new accesser('width', object_width),
//             new accesser('height', object_height),
//             new accesser('sheet_depth', sheet_depth),
//             new accesser('segments', 1),
//             new accesser('radius', 0.01),
//             new accesser('position_x', 10.0 + position_x),
//             new accesser('position_y', -10 + position_y + height / 2),
//             new accesser('position_z', +0.5 * object_depth + position_z),
//             new accesser('color', object_color),
//             new accesser('position_relative', 'true'),

//         ]
//         const accessersWallLeft = [
            
//             new accesser('side', 'left'),
//             new accesser('name', name + "_left"),
//             new accesser('width', object_depth),
//             new accesser('height', object_height),
//             new accesser('sheet_depth', sheet_depth),
//             new accesser('segments', 1),
//             new accesser('radius', 0.01),
//             new accesser('position_x', 13+-0.5 * object_width + position_x),
//             new accesser('position_y', 0 + position_y + height / 2),
//             new accesser('position_z', 0 + position_z),
//             new accesser('color', "#972797"),
//             new accesser('position_relative', 'true'),
//             new accesser('rotation_y', '90'),

//         ]
//         const accessersWallRight = [
            
//             new accesser('side', 'right'),
//             new accesser('name', name + '_right'),
//             new accesser('width', object_depth),
//             new accesser('height', object_height),
//             new accesser('sheet_depth', sheet_depth),
//             new accesser('segments', 1),
//             new accesser('radius', 0.01),
//             new accesser('position_x', 15+0.5 * object_width + position_x),
//             new accesser('position_y', 0 + position_y + height / 2),
//             new accesser('position_z', 0 + position_z),
//             new accesser('color', object_color),
//             new accesser('position_relative', 'true'),
//             new accesser('rotation_y', '90'),

//         ]
//         return { "accessersWallFront": accessersWallFront, "accessersWallBack": accessersWallBack, "accessersWallLeft": accessersWallLeft, "accessersWallRight": accessersWallRight }
//     }
//     calculateState() {
//         //This is a function that updates the values of the children of the system
//         const accessersDict = this.determineState();
//         Object.keys(accessersDict).forEach((key, index) => {
//             if (this.children[index]) {
//                 this.setOptions(this.children[index], accessersDict[key]);
//             }
//         });
//     }
//     buildingStep() {
//         const accessers = [
//             new accesser('name', 'The floor grouping'),
//              new accesser('color','#973737' )

//         ]
//         this.set_mediator(this)
//         this.setOptions(this, accessers)

        

//         const { accessersWallFront, accessersWallBack, accessersWallLeft, accessersWallRight } = this.determineState();

//         //      let array = [
//         //          { objectOptions: accessersWallFront, classInstance: WallGarageController },
//         //          { objectOptions: accessersWallBack, classInstance: WallGarageController },
//         //          { objectOptions: accessersWallLeft, classInstance: WallGarageController },
//         //          { objectOptions: accessersWallRight, classInstance: WallGarageController }
//         //  ]

//         let array = [
//         { objectOptions: accessersWallFront, classInstance:CubeController},
//         // { objectOptions: accessersWallBack, classInstance: CubeController },
//         // { objectOptions: accessersWallLeft, classInstance: CubeController },
//         { objectOptions: accessersWallRight, classInstance: DoubleCubeController }
//         ]
//         // // array=[]

//         // this.children.forEach((child) => {
//         //     child.handleEvent('recursivelyRemoveModel')
//         // });
//         // this.children = []

//         // array.forEach(({ objectOptions, classInstance }) => {
//         //     this.display.set_scene(this.display.get_scene())
//         //     const created_object = this.object_addition.bind(this)(objectOptions, classInstance);
//         //     // console.log(created_object)
//         //     this.group.add(created_object)
//         //     // console.log(t)
//         // });
//         let outer_scene=this.display.get_scene()
//         array.forEach(({ objectOptions, classInstance }) => {

//                 this.display.set_scene(this.display.get_scene())
//                 //const completed_mesh = this.object_addition.bind(this)(objectOptions, classInstance);
//                 //     // console.log(created_object)
//                 //     this.group.add(created_object)
//                 const added_object = new classInstance()
//                 added_object.display.set_scene(outer_scene)
//                 added_object.setOptions(added_object, objectOptions)
//                 added_object.model.create(added_object.state.state)
//                 // added_object.display.set_scene(this.display.get_scene())

//                 this.addChild(added_object)
//                 // added_object.display.set_scene(outer_scene)
//                 // debug()
//                 // const completed_mesh=added_object.model.get_model()
//                 // this.group.position.x += 10; // Move 10 units along X-axis
//                 // this.group.position.y += 20; // Move 20 units along Y-axis
//                 // this.group.position.z += 30; 
               
//                 added_object.handleEvent('buildingStep')
//                 this.group.add(added_object.model.get_model())   
//                 this.group.add(added_object.group)
           
//                 // added_object.group.position.y=4.0
                 
//                 // outer_scene.add(this.group)
               
                
//                 // I would like to rotate this group in three js by at least 45 degrees
//         })


//         const axesHelper = new THREE.AxesHelper(1.5); // Set the size based on your needs
//         this.group.add(axesHelper);
//         // const scene = this.display.scene;
//         // {
//         //     let geometry22 = new THREE.BoxGeometry(1, 1, 1);
//         //     let material22 = new THREE.MeshStandardMaterial({ color: 0x00ff00 });

//         //     // Create the first mesh and position it to the left (-2 on the x axis)
//         //     var mesh1 = new THREE.Mesh(geometry22, material22);
//         //     mesh1.position.set(-2, 0, 0);

//         //     // Create the second mesh and position it to the right (2 on the x axis)
//         //     var mesh2 = new THREE.Mesh(geometry22, material22);
//         //     mesh2.position.set(2, 0, 0);

//         //     // Create a group and add the meshes
//         //     // this.group.add(mesh1);
//         //     // this.group.add(mesh2);

//         // }
        
      
//         // array=[mesh1, mesh2]
//         // array.forEach(({ objectOptions, classInstance }) => {

//         //     let added_object=new classInstance()
//         //     added_object.model.create(this.state.state);
        
           
//         //     this.setOptions(added_object, objectOptions)
//         //     // this.display.set_scene(this.display.get_scene())
//         //     // const created_object = this.object_addition.bind(this)(objectOptions, classInstance);
//         //     // console.log(created_object)
            
//         //     let geometry22 = new THREE.BoxGeometry(1, 1, 1);
//         //     let material22 = new THREE.MeshStandardMaterial({ color: 0x00ff00 });

//         //     // Create the first mesh and position it to the left (-2 on the x axis)
//         //     var mesh1 = new THREE.Mesh(geometry22, material22);
//         //     mesh1.position.set(-2, 0, 0);

//         //     // Create the second mesh and position it to the right (2 on the x axis)
//         //     var mesh2 = new THREE.Mesh(geometry22, material22);
//         //     mesh2.position.set(2, 0, 0);


          

//         //     // debug()
//         //     // var mesh3 = new THREE.Mesh(geometry22, material22);

//         //     // this.group.add(mesh3)
//         //     // console.log(t)
//         // });
//         // let mesh3 = new CubeContr    oller();
//         // mesh3.model.create()
//         // mesh3.model.get_model()
//         // mesh3.model.get_model().position.set(2, 2, 0);
//         // let mesh3_model=mesh3.model.get_model()
    

//         // array=[mesh1, mesh2, mesh3_model]
//         // array.forEach((completed_mesh) => {
//         //     // this.display.set_scene(this.display.get_scene())
//         //     //const created_object = this.object_addition.bind(this)(objectOptions, classInstance);
//         //     // console.log(created_object)
//         //     this.group.add(completed_mesh)
//         // });

    
//         this.display.get_scene().add(this.group)
      
//         // this.handleEvent('stateChange')
        
//         // this.handleEvent('creationStep');
//         // this.group.position.y=-2.0
//         // this.group.position.y=-2.0

        


//         this.group.rotation.y=(Math.PI/2 )
//         // this.group.position.y=this.stat
//         // this.group.rotation.y=4*Math.PI/2
//         // // this.group.position.set(0, -2, 0);
//         this.basicTransformation()
//         //console.log(this.state.state)
        
//     }
//     handleEvent(event, data) {
//         switch (event) {
//             case 'removeModel':
//                 //I would like to remove the curent model from this scene and current group as well
//                 this.display.remove_from_scene(this.model.get_model())
//                 this.display.remove_from_scene(this.group)
//                 //I would like to kill all objects in a group THREE.js

//                 while(this.group.children.length > 0){ 
//                     this.group.remove(this.group.children[0]); 
//                 }
                
//                 if(this.group) {
//                     if(this.group instanceof THREE.Group) {
//                         while(this.group.children.length > 0){ 
//                             this.remove(object.children[0]); 
//                         }
//                     }
//                     //this.group = new THREE.Group();  // Assign a new empty group
//                 }
//                 break;
//             case 'buildingStep':
//                 this.handleEvent('recursivelyRemoveModel');
//                 this.buildingStep()

//                 break;
//             case 'debugBuildingStep':
                    
//                     // this.handleEvent('recursivelyRemoveModel');
                  
//                     this.buildingStep()
                
//                     break;
//             case 'creationStep':
//                 {
//                     //this.handleEvent('recursivelyRemoveModel')
//                     // this.handleEvent('removeModel')
//                     // Create the geometry, material, and mesh for the cube
//                     // const geometry = new THREE.BoxGeometry(1, 5, 1);  // Cube of size 1x1x1
//                     // const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });  // Green color
//                     // const cube = new THREE.Mesh(geometry, material);

//                     // // Add the cube to the scene
//                     // this.display.add_to_scene(cube);
//                     // this.display.remove_from_scene(cube)

//                     if (this.model && typeof this.model.get_model === 'function') {
//                         const modelInstance = this.model

//                         if (modelInstance && typeof modelInstance.create === 'function') {
//                             modelInstance.create(this.state.state);
//                         }
//                         if (this.display && typeof this.display.add_to_scene === 'function') {
//                             this.display.add_to_scene(modelInstance.model);
//                             this.display.add_to_scene(this.group);
//                             // this.display.add_to_scene(cube)
//                             // this.display.remove_from_scene(cube)
//                         }
//                     }
//                     if (Array.isArray(this.children)) {
//                         this.children.forEach((child) => {
//                             if (child && typeof child.handleEvent === 'function') {
//                                 // child.handleEvent('creationStep');
//                             }
//                         });
//                     }
//                     break
//                 }
   
//             case 'changeObject':

//                 {
//                     const accessers = [
//                         new accesser('color', data),
//                     ]
//                     this.handleEvent('recursivelyRemoveModel');
//                     this.setOptions(this, accessers)
//                     this.handleEvent('buildingStep');

//                     // this.handleEvent('creationStep');
//                     // this.buildingStep()
//                 }
//                 break;
//             case 'changeFloor':

//                 const accessers = [
//                     new accesser('color', data),
//                 ]
//                 this.handleEvent('recursivelyRemoveModel');
//                 this.setOptions(this, accessers)
//                 this.handleEvent('buildingStep');

//                 // this.handleEvent('creationStep');
//                 // this.buildingStep()

//                 break;
//             default:
//                 // console.error(event, data)
//                 super.handleEvent(event, data);
//                 break;
//         }
//     }
// }


//Now i would like to add objects to it dynamically
class UconfigsImplementationController extends UconfigsController {
    constructor() {
        super()
        
        this.setModel(UconfigInvisibleObject)
        this.gui = new UconfigDebugGui();
        this.gui.set_mediator(this)
        this.group = new THREE.Group()
        this.external_objects=[]
        this.external_objects_controllers=[]
    }
    determineState() {
        //You can get the current state of the object by using the 
        let name = this.state.get('name') || 'Wall'
        let object_type = this.state.get('object_type') || 'flat'
        let object_width = parseFloat(this.state.get('object_width')) || 3
        let object_height = parseFloat(this.state.get('object_height')) || 2.13
        let object_depth = parseFloat(this.state.get('object_depth')) || 2
        let object_color = this.state.get('color') || "#772727"
     
        let texture_type=""
        let material_type=this.state.get('material_type') || "material_type_1" 
        // switch(material_type){
        //     case "material_type_1":
        //             // object_color =  "#677727"
        //             break;
        //         case "material_type_2":
        //             // object_color =  "#972727"
        //             break;
        //         case "material_type_3":
        //             // object_color =  "#272727"
        //             break;
        //         case "material_type_4":
        //             // object_color =  "#972797"
        //             break;
        //     default:
        //         // code to be executed if expression doesn't match any cases
        // }
        // let parent_color = this.mediator.state.get('color') || "#972727"

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
            new accesser('position_x', 0),
            new accesser('position_y', 0),
            new accesser('position_z', object_depth/2),
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
            new accesser('position_x', 0),
            new accesser('position_y', 0),
            new accesser('position_z', -object_depth/2),
            new accesser('color', object_color),
            new accesser('position_relative', 'true'),
            new accesser('rotation_y', Math.PI),

        ]
        const accessersWallLeft = [
            new accesser('name', name + "_left"),
            new accesser('width', object_depth),
            new accesser('height', object_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', -object_width/2),
            new accesser('position_y', 0),
            new accesser('position_z',0),
            new accesser('color', object_color),
            new accesser('position_relative', 'true'),
            new accesser('rotation_y', -Math.PI/2),

        ]
        const accessersWallRight = [
            new accesser('name', name + '_right'),
            new accesser('width', object_depth),
            new accesser('height', object_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', object_width/2),
            new accesser('position_y', 0),
            new accesser('position_z', 0),
            new accesser('color', object_color),
            new accesser('position_relative', 'true'),
            new accesser('rotation_y', Math.PI/2),

        ]


        const iterate=[accessersWallFront ,accessersWallLeft ,accessersWallBack ,accessersWallRight ]
        iterate.forEach(accessersObject => {  
            const added_accesser = new accesser('material_type', material_type);
            accessersObject.push(added_accesser);
        });



        return { "accessersWallFront": accessersWallFront, "accessersWallBack": accessersWallBack, "accessersWallLeft": accessersWallLeft, "accessersWallRight": accessersWallRight }
    }
    calculateState() {
        //This is a function that updates the values of the children of the system
        // const accessersDict = this.determineState();
        // Object.keys(accessersDict).forEach((key, index) => {
        //     if (this.children[index]) {
        //         this.setOptions(this.children[index], accessersDict[key]);
        //     }
        // });
    }
    generatePassiveObjects(){
            const { accessersWallFront, accessersWallBack, accessersWallLeft, accessersWallRight } = this.determineState();
            //  let array = [
            //      { objectOptions: accessersWallFront, classInstance: WallGarageController },
            //      { objectOptions: accessersWallBack, classInstance: WallGarageController },
            //      { objectOptions: accessersWallLeft, classInstance: WallGarageController },
            //      { objectOptions: accessersWallRight, classInstance: WallGarageController }
            //     ]   
            // let array = [
            // { objectOptions: accessersWallFront, classInstance:WallController},
            // // { objectOptions: accessersWallBack, classInstance: WallController },
            // // { objectOptions: accessersWallLeft, classInstance: WallController },
            // { objectOptions: accessersWallRight, classInstance: WallController }
            // ]

            let array = [
                // { objectOptions: accessersWallFront, classInstance:UconfigsController},
                // { objectOptions: accessersWallBack, classInstance: SimpleController  },
                // { objectOptions: accessersWallLeft, classInstance: SimpleController  },
                // { objectOptions: accessersWallRight, classInstance: SimpleController }
                ]
            return array
    }
    generateDynamicObjects(){

        let external_data=[]



        for (let i=0;i<this.external_objects.length; i++){
                this.external_objects[i].specify_self()

        }
        //Write the code for hooking in of external objects
        //Just pull from the external objects
        return []
        
    }
    generateDynamicAccessers(){

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
        this.setOptions(this, accessers)



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
                added_object.setOptions(added_object, objectOptions)
                added_object.model.create(added_object.state.state)
                //this.addChild(added_object)
                added_object.handleEvent('buildingStep')
                this.group.add(added_object.model.get_model())   
                this.group.add(added_object.group)
        })


        for (let i=0;i<this.external_objects_controllers.length; i++){
            for (let j=0;j<this.group.children.length; j++){
                this.external_objects_controllers[i].group.add(this.group.children[j])
            }
        }

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
        else {
        currentMediator.mediator.group.add(this.group)
        }
    

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
                    // const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });  // Green color
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
            case 'genericChangeObject':
                {
                    // const accessers = [
                    //     new accesser('color', data),
                    // ]
                    //It requires accesser as passed data
                    
                    this.handleEvent('recursivelyRemoveModel');
                    this.setOptions(this, data)
                    this.handleEvent('buildingStep');

                    // this.handleEvent('creationStep');
                    // this.buildingStep()
                }
                break;

            case 'changeObject':
                
                {
                    const accessers = [
                        new accesser('color', data),
                    ]
                    this.handleEvent('recursivelyRemoveModel');
                    this.setOptions(this, accessers)
                    this.handleEvent('buildingStep');

                    // this.handleEvent('creationStep');
                    // this.buildingStep()
                }
                break;
            case 'changeFloor':
                
                const accessers = [
                    new accesser('color', data),
                ]
                this.handleEvent('recursivelyRemoveModel');
                this.setOptions(this, accessers)
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

export { UconfigsImplementationController  as UconfigsImplementationController, UconfigsController }