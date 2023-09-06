import { v4 as uuidv4 } from 'uuid';
import { accesser } from '../../base'
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { Generic, genericGui, genericState, genericObject, genericDisplay, genericController } from '../../base.js'
import { CubeObject,UconfigObject,WallGarageObject, UconfigInvisibleObject, genericGarageObject } from '../base/object'
import { UconfigInvisibleGui,UconfigGui, UconfigDebugGui } from '../base/gui'
import { UconfigController,CubeController, RedCubeController,WallGarageController,groupGenericGarageController,genericGarageController } from '../base/controller'
import { UconfigsController } from '../base/implementation'
 
import { UconfigImplementationWallGui} from './gui'

//Now i would like to add objects to it dynamically
class UconfigsImplementationController extends UconfigsController {
    constructor() {
        super()
        this.setModel(UconfigInvisibleObject)
        this.gui = new UconfigImplementationWallGui();
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
        let object_height = parseFloat(this.state.get('object_height')) || 2.43
        let object_depth = parseFloat(this.state.get('object_depth')) || 2
        let object_color = this.state.get('color') || "#FEFEFE"
     
        let texture_type=""
        let material_type=this.state.get('material_type') || "material_type_1" 
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
            new accesser('name', name + "_fronts"),
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
    generatePassiveObjects(){
            const { accessersWallFront, accessersWallBack, accessersWallLeft, accessersWallRight } = this.determineState();

            let array = [
                { objectOptions: accessersWallFront, classInstance:SimpleController},
                // { objectOptions: accessersWallBack, classInstance: SimpleController  },
                // { objectOptions: accessersWallLeft, classInstance: SimpleController  },
                // { objectOptions: accessersWallRight, classInstance: SimpleController }
                ]
            return array
    }
    buildingStep() {

        this.children=[]
        // let position_x = this.state.get('position_x') || 0
        // let position_y = this.state.get('position_y') || 0
        // let position_z = this.state.get('position_z') || 0

        const passive_accessers=[
            // new accesser('name', 'Menu do debugowania obiektu'),
        ]

        const dynamic_accessers = [
            new accesser('name', 'Menu do debugowania obiektu'),
            new accesser('position_x'),
            new accesser('position_y'),
            new accesser('position_z'),
            new accesser('rotation_y'),
        ]

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


        // const { accessersWallFront, accessersWallBack, accessersWallLeft, accessersWallRight } = this.determineState();
        //      let array = [
        //          { objectOptions: accessersWallFront, classInstance: WallGarageController },
        //          { objectOptions: accessersWallBack, classInstance: WallGarageController },
        //          { objectOptions: accessersWallLeft, classInstance: WallGarageController },
        //          { objectOptions: accessersWallRight, classInstance: WallGarageController }
        //  ]

        // let array = [
        // { objectOptions: accessersWallFront, classInstance:WallController},
        // // { objectOptions: accessersWallBack, classInstance: WallController },
        // // { objectOptions: accessersWallLeft, classInstance: WallController },
        // { objectOptions: accessersWallRight, classInstance: WallController }
        // ]


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
            // external_array[i].handleEvent('buildingStep');
            this.group.add(external_array[i].group)
           
        }
        // const array=[ ...self_array, ...external_array]
        const array=[ ...self_array]
        

        // let array = [
        // { objectOptions: accessersWallFront, classInstance:WallController},
        // // { objectOptions: accessersWallBack, classInstance: WallController },
        // // { objectOptions: accessersWallLeft, classInstance: WallController },
        // { objectOptions: accessersWallRight, classInstance: WallController }
        // ]
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
                const added_object = new classInstance()
                added_object.display.set_scene(outer_scene)
                added_object.set_the_options(added_object, objectOptions)
                added_object.model.create(added_object.state.state)
                this.addChild(added_object)
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
        //const axesHelper = new THREE.AxesHelper(5); // Set the size based on your needs
        //this.group.add(axesHelper);

        let hasControllers = false;
        let currentMediator = this.mediator;

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


        // if(this.external_objects_controllers.length==0){
        // this.display.get_scene().add(this.group)
        // }
        this.basicTransformation()
        //console.log(this.state.state)
        
    }
}
//Now i would like to add objects to it dynamically
// class UconfigsChildImplementationController extends UconfigsImplementationController {
//     constructor() {
//         super()
//         this.setModel(UconfigInvisibleObject)
//         this.gui = new UconfigInvisibleGui();
//         this.gui.set_mediator(this)
//         this.group = new THREE.Group()
//         this.external_objects=[]
//     }
//     generatePassiveObjects(){
//             const { accessersWallFront, accessersWallBack, accessersWallLeft, accessersWallRight } = this.determineState();
//             let array = [
//                 { objectOptions: accessersWallFront, classInstance:SimpleRedController},

//                 ]
//             return array
//     }
 
// }
// //This is an example of passive object 
// //A passive object gets recreated each time the parent gets changed, think of it 
// //like an essential building block of the parent element
// class SimpleController extends UconfigsImplementationController{
//     constructor() {
//         super()
//         // this.setModel(UconfigInvisibleObject)
//         this.gui = new UconfigInvisibleGui();
//         this.gui.set_mediator(this)
//         // this.group = new THREE.Group()
//     }
//     determineState() {
//         //You can get the current state of the object by using the 
//         let name = this.state.get('name') || 'Wall'
//         let object_type = this.state.get('object_type') || 'flat'
//         let object_width = parseFloat(this.state.get('object_width')) || 3
//         let object_height = parseFloat(this.state.get('object_height')) || 2.43
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
//         let material_type = this.state.get('material_type') || "material_type_3"

//         const accessersWallFront = [
//             new accesser('passivness', "This is a passive object"),
//             new accesser('name', name + "_frontt"),
//             new accesser('width', object_width),
//             new accesser('height', object_height),
//             new accesser('sheet_depth', sheet_depth),
//             new accesser('segments', 1),
//             new accesser('radius', 0.01),
//             new accesser('position_x', 0.0 ),
//             new accesser('position_y', 0.0 + position_y + height / 2),
//             new accesser('position_z', 0),
//             new accesser('color', object_color),
//             new accesser('position_relative', 'true'),
//             new accesser('material_type', material_type),
//         ]


//         // ]
//         return { "accessersWallFront": accessersWallFront}
//         //  "accessersWallBack": accessersWallBack, "accessersWallLeft": accessersWallLeft, "accessersWallRight": accessersWallRight 
        
//     }
//     generatePassiveObjects(){
//         const { accessersWallFront} = this.determineState();

//         let array = [
//         { objectOptions: accessersWallFront, classInstance:CubeController},
//         // { objectOptions: accessersWallBack, classInstance: CubeController },
        
//         // { objectOptions: accessersWallLeft, classInstance: CubeController },
//         // { objectOptions: accessersWallRight, classInstance: CubeController }
//         ]
//         return array
// }

// }

// //This is an example of dynamic  object 
// //A dynamic object doesn't  get recreated each time the parent gets changed but it has persistent state, think of it 
// //like an additional decoration that is independent from the parent element
// class SimpleRedController extends UconfigsImplementationController{
//     constructor() {
//         super()
//         // this.setModel(UconfigInvisibleObject)
//         this.gui = new UconfigInvisibleGui();
//         this.gui.set_mediator(this)
//         // this.group = new THREE.Group()
//     }
  
//     specifySelf(){
//         const accessersWallFront = [
//             new accesser('name', name + "_frontt"),
//             new accesser('width', object_width),
//             new accesser('height', object_height),
//             new accesser('sheet_depth', sheet_depth),
//             new accesser('segments', 1),
//             new accesser('radius', 0.01),
//             new accesser('position_x', 0),
//             new accesser('position_y', 0),
//             new accesser('position_z', object_depth/2),
//             new accesser('color', object_color),
//             new accesser('position_relative', 'true'),
//         ]
//         return [{ "accessersWallFront": accessersWallFront}]
//     }
//     determineState() {
//         //You can get the current state of the object by using the 
//         let name = 'Door'
//         let object_type = this.state.get('object_type') || 'flat'
//         let object_width = parseFloat(this.state.get('object_width')) || 3
//         let object_height = parseFloat(this.state.get('object_height')) || 2.43
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
//         let material_type = this.state.get('material_type') || "material_type_3"

//         const accessersWallFront = [
//             new accesser('passivness', "This is a passive object"),
//             new accesser('name', name + "_fronsst"),
//             new accesser('width', object_width),
//             new accesser('height', object_height),
//             new accesser('sheet_depth', sheet_depth),
//             new accesser('segments', 1),
//             new accesser('radius', 0.01),
//             new accesser('position_x', 0.0 ),
//             new accesser('position_y', 0.0 + position_y + height / 2),
//             new accesser('position_z', 0),
//             new accesser('color', object_color),
//             new accesser('position_relative', 'true'),
//             new accesser('material_type', material_type),
//         ]
 
//         // ]
//         return { "accessersWallFront": accessersWallFront}
//         //  "accessersWallBack": accessersWallBack, "accessersWallLeft": accessersWallLeft, "accessersWallRight": accessersWallRight 
        
//     }
//     generatePassiveObjects(){
//         const { accessersWallFront} = this.determineState();

//         let array = [
//         { objectOptions: accessersWallFront, classInstance:RedCubeController},
//         // { objectOptions: accessersWallBack, classInstance: CubeController },
        
//         // { objectOptions: accessersWallLeft, classInstance: CubeController },
//         // { objectOptions: accessersWallRight, classInstance: CubeController }
//         ]
//         return array
// }
    
// }


export { UconfigsImplementationController as UconfigsImplementationController,
    // UconfigsChildImplementationController as UconfigsChildImplementationController  
}