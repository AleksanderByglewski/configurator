import { v4 as uuidv4 } from 'uuid';
import { accesser } from '../../base'
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { Generic, genericGui, genericState, genericObject, genericDisplay, genericController } from '../../base.js'
import { CubeObject,UconfigObject,WallGarageObject, UconfigInvisibleObject, genericGarageObject } from '../base/object'
import { UconfigInvisibleGui,UconfigGui, UconfigDebugGui } from '../base/gui'
import { UconfigController,CubeController, RedCubeController,WallGarageController,groupGenericGarageController,genericGarageController } from '../base/controller'
import { UconfigsController } from '../base/controller'
 
import { UconfigImplementationWallGui} from './gui'
import {SimpleController} from './controller'
//Now i would like to add objects to it dynamically
class UconfigsImplementationCanopyController extends UconfigsController {
    constructor() {
        super()
        this.setModel(UconfigInvisibleObject)
        this.gui = new UconfigDebugGui();
        this.gui.set_mediator(this)
        this.group = new THREE.Group()
        this.external_objects=[]
        this.external_objects_controllers=[]
        
    }

    generateDynamicAccessers() {
        console.log("This should be overriden")
        const dynamic_accessers = [
            new accesser('name', 'Menu do debugowania obiektu'),
            new accesser('position_x'),
            new accesser('position_y'),
            new accesser('position_z'),
            new accesser('rotation_y'),
            new accesser('object_width'),
        ]
        return dynamic_accessers

    }
    request_an_update(){
        /**
        *We are targeting the parent, that is the entire system,
        */

        // let targeted_parent=this.external_objects_controllers[0]

         let targeted_parent = this.external_objects_controllers[0];
      
        // Assuming that each object has a 'parent' property leading to its parent object
        while (targeted_parent && targeted_parent.status !== "top_level") {
            targeted_parent = targeted_parent.external_objects_controllers[0];
        }
        
        // At this point, targeted_parent is either the top level object or null/undefined
        if (targeted_parent) {
            console.log("Found the top level object:", targeted_parent);
        } else {
            console.log("Top level object not found.");
        }

        const accessers = [
          
            new accesser('object_width'),
            new accesser('object_depth'),
            new accesser('object_height'),
            new accesser('wall_color'),
        ]
        

        for (let i = 0; i < accessers.length; i++) {
            const val=targeted_parent.state.get(accessers[i].resource_locator, accessers[i].value);
            this.state.update(accessers[i].resource_locator, val);
        }
    }

    determineState() {
        //You can get the current state of the object by using the 
        this.request_an_update()
        let name = this.state.get('name') || 'Wall'
        let object_type = this.state.get('object_type') || 'flat'
        let object_width = parseFloat(this.state.get('object_width')) || 3
        let object_height = parseFloat(this.state.get('object_height')) || 2.13
        let object_depth = parseFloat(this.state.get('object_depth')) || 2
        let object_color = this.state.get('wall_color') || "#FEFEFE"
     
        let texture_type=""
        let material_type=this.state.get('material_type') || "material_type_1" 
        let position_x = this.state.get('position_x') || 0
        let position_y = this.state.get('position_y') || 0
        let position_z = this.state.get('position_z') || 0

        let height = this.state.get('height') || 2.13
        let width = this.state.get('width') || 2.0
        let depth = this.state.get('depth') || 4.0
        
        // object_height = height
        // object_width = width
        object_depth = depth
        let debug_x=0
        let debug_y=2.13/2
        //let object_angle=parseFloat(this.state.get('object_angle'))||30
        let sheet_depth = parseFloat(this.state.get('sheet_depth')) || 0.0075

        const accessersWallFront = [
            new accesser('name', name + "_fronts"),
            new accesser('width', object_width),
            new accesser('height', object_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', 0+debug_x),
            new accesser('position_y', 0+debug_y),
            new accesser('position_z', object_depth/2),
            new accesser('color', object_color),
            // new accesser('position_relative', 'true'),
            new accesser('rotation_y', 0*Math.PI),
        ]
       
        const accessersWallBack = [
            new accesser('name', name + "_back"),
            new accesser('width', object_width),
            new accesser('height', object_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x',  0+debug_x),
            new accesser('position_y', 0+debug_y),
            new accesser('position_z',-object_depth/2),
            new accesser('color', object_color),
            // new accesser('position_relative', 'true'),
             new accesser('rotation_y',0* Math.PI/2),

        ]
        const accessersWallLeft = [
            new accesser('name', name + "_back"),
            new accesser('width', object_depth),
            new accesser('height', object_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', -object_width/2 + 0+debug_x),
            new accesser('position_y', 0+debug_y),
            new accesser('position_z',-0*object_depth/2),
            new accesser('color', object_color),
            // new accesser('position_relative', 'true'),
             new accesser('rotation_y',-1* Math.PI/2),

        ]
        const accessersWallRight= [
            new accesser('name', name + "_back"),
            new accesser('width', object_depth),
            new accesser('height', object_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x',object_width/2 + 0+debug_x),
            new accesser('position_y', 0+debug_y),
            new accesser('position_z',-0*object_depth/2),
            new accesser('color', object_color),
            new accesser('rotation_y',Math.PI/2),
            // new accesser('position_relative', 'true'),
            // new accesser('rotation_y',2* Math.PI/2),

        ]
        // const iterate=[accessersWallFront, accessersWallBack, accessersWallLeft, accessersWallRight  ]
        // iterate.forEach(accessersObject => {  
        //     const added_accesser = new accesser('material_type', material_type);
        //     accessersObject.push(added_accesser);
        // });



        return { "accessersWallFront": accessersWallFront, "accessersWallBack": accessersWallBack, "accessersWallLeft": accessersWallLeft, "accessersWallRight": accessersWallRight,  }
    }
    generatePassiveObjects(){
            const { accessersWallFront, accessersWallBack,accessersWallLeft, accessersWallRight } = this.determineState();

            let array = [
                { objectOptions: accessersWallFront, classInstance: UconfigsImplementationWallController},
                { objectOptions: accessersWallBack,  classInstance: UconfigsImplementationWallController },
                { objectOptions: accessersWallLeft,  classInstance: UconfigsImplementationWallController },
                { objectOptions: accessersWallRight, classInstance: UconfigsImplementationWallController }
                ]
            return array
    }   
}
class UconfigsImplementationWallController extends UconfigsController{
    constructor() {
        super()
        this.setModel(UconfigInvisibleObject)
        this.gui = new UconfigDebugGui();
        this.gui.set_mediator(this)
        this.group = new THREE.Group()
        this.external_objects=[]
        this.external_objects_controllers=[]
        
    }
    request_an_update(){



        /**
        *We are targeting the parent, that is the entire system,
        */

        // let targeted_parent=this.external_objects_controllers[0]

        // const accessers = [
          
        //     new accesser('object_width'),
        //     new accesser('object_depth'),
        //     new accesser('object_height'),
            
        // ]

        // for (let i = 0; i < accessers.length; i++) {
        //     const val=targeted_parent.state.get(accessers[i].resource_locator, accessers[i].value);
        //     this.state.update(accessers[i].resource_locator, val);
        // }
    }
    determineState() {

        this.request_an_update()
        //You can get the current state of the object by using the 
        let name = this.state.get('name') || 'Wall'
        let object_type = this.state.get('object_type') || 'flat'
        let object_width = parseFloat(this.state.get('object_width')) || 3
        let object_height = parseFloat(this.state.get('object_height')) || 2.13
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
 
        let canopy_support_width=this.state.get('canopy_support_width') || 0.1

        let  canopy_support_bottom_height=this.state.get('canopy_support_width') || 0.1

        //let object_angle=parseFloat(this.state.get('object_angle'))||30
        let sheet_depth = parseFloat(this.state.get('sheet_depth')) || 0.0075

        const accessersPoleLeft = [
            new accesser('name', name + "_fronts"),
            new accesser('width', canopy_support_width),
            new accesser('height', object_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', object_width/2-canopy_support_width/2),
            new accesser('position_y', 0),
            new accesser('position_z', 0),
            new accesser('color', object_color),
            new accesser('position_relative', 'true'),
        ]
        const accessersPoleRight = [
            new accesser('name', name + "_fronts"),
            new accesser('width', canopy_support_width),
            new accesser('height', object_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', -object_width/2+canopy_support_width/2),
            new accesser('position_y', 0),
            new accesser('position_z', 0),
            new accesser('color', object_color),
            new accesser('position_relative', 'true'),
        ]

        const accessersPoleBottom = [
            new accesser('name', name + "_fronts"),
            new accesser('width', object_width),
            new accesser('height', canopy_support_bottom_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', 0),
            new accesser('position_y', -object_height/2+canopy_support_bottom_height/2),
            new accesser('position_z', 0),
            new accesser('color', object_color),
            new accesser('position_relative', 'true'),
        ]
       
       
        const iterate=[accessersPoleLeft, accessersPoleRight, accessersPoleBottom  ]
        iterate.forEach(accessersObject => {  
            const added_accesser = new accesser('material_type', material_type);
            accessersObject.push(added_accesser);
        });



        return { "accessersPoleLeft": accessersPoleLeft,"accessersPoleRight": accessersPoleRight, "accessersPoleBottom": accessersPoleBottom}
    }
    generatePassiveObjects(){
        const { accessersPoleLeft, accessersPoleRight, accessersPoleBottom} = this.determineState();

        let array = [
            // { objectOptions: accessersWallFront, classInstance:SimpleController},
            { objectOptions: accessersPoleLeft, classInstance: SimpleController  },
            { objectOptions: accessersPoleRight, classInstance: SimpleController  },
            { objectOptions: accessersPoleBottom, classInstance: SimpleController  },
            // { objectOptions: accessersWallLeft, classInstance: SimpleController  },
            // { objectOptions: accessersWallRight, classInstance: SimpleController }
            ]
        return array
}   
}



export {  UconfigsImplementationCanopyController}