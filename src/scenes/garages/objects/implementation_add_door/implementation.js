import { v4 as uuidv4 } from 'uuid';
import { accesser, GLOBAL_ORIENTATION } from '../../base'
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { Generic, genericGui, genericState, genericObject, genericDisplay, genericController } from '../../base.js'
import { CubeObject,UconfigObject,WallGarageObject, UconfigInvisibleObject, genericGarageObject } from '../base/object'
import { UconfigInvisibleGui,UconfigGui, UconfigDebugGui } from '../base/gui'
import { UconfigController,CubeController, RedCubeController,WallGarageController,groupGenericGarageController,genericGarageController } from '../base/controller'
import { UconfigsController } from '../base/controller'
 
import { UconfigImplementationGui} from './gui'
import {SimpleController} from './controller'
//Now i would like to add objects to it dynamically
class UconfigsImplementationController extends UconfigsController {
    constructor() {
        super()
        this.setModel(UconfigInvisibleObject)
        this.gui = new UconfigImplementationGui();
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
        let object_color = this.state.get('color') || "#FEFEFE"
     
        let texture_type=""

        let material_type=this.state.get('material_type') || "material_type_1" 
      
        if(GLOBAL_ORIENTATION=="SIDEWAYS"){
            material_type=this.state.get('material_type') || "material_type_6"
        } 
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
            new accesser('position_z', 0),
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
            new accesser('position_z',0),
            new accesser('color', object_color),
            new accesser('position_relative', 'true'),
            new accesser('rotation_y', Math.PI),

        ]
        const iterate=[accessersWallFront  ]
        iterate.forEach(accessersObject => {  
            const added_accesser = new accesser('material_type', material_type);
            accessersObject.push(added_accesser);
        });



        return { "accessersWallFront": accessersWallFront, "accessersWallBack": accessersWallBack,  }
    }
    generatePassiveObjects(){
            const { accessersWallFront, accessersWallBack } = this.determineState();

            let array = [
                // { objectOptions: accessersWallFront, classInstance:SimpleController},
                // { objectOptions: accessersWallFront, classInstance: SimpleController  },
                // { objectOptions: accessersWallLeft, classInstance: SimpleController  },
                // { objectOptions: accessersWallRight, classInstance: SimpleController }
                ]
            return array
    }   
}
class UconfigsImplementationSkewedController extends UconfigsController{
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
            new accesser('position_x', 5),
            new accesser('position_y', 1),
            new accesser('position_z', 0),
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
            new accesser('position_z', 0),
            new accesser('color', object_color),
            new accesser('position_relative', 'true'),
            new accesser('rotation_y', Math.PI),

        ]
        const iterate=[accessersWallFront  ]
        iterate.forEach(accessersObject => {  
            const added_accesser = new accesser('material_type', material_type);
            accessersObject.push(added_accesser);
        });



        return { "accessersWallFront": accessersWallFront, "accessersWallBack": accessersWallBack,  }
    }
    generatePassiveObjects(){
        const { accessersWallFront, accessersWallBack } = this.determineState();

        let array = [
            // { objectOptions: accessersWallFront, classInstance:SimpleController},
            { objectOptions: accessersWallFront, classInstance: SimpleController  },
            // { objectOptions: accessersWallLeft, classInstance: SimpleController  },
            // { objectOptions: accessersWallRight, classInstance: SimpleController }
            ]
        return array
}   
}
class UconfigsImplementationSkewedTopController extends UconfigsController{
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
            new accesser('position_x', 5.5),
            new accesser('position_y', 5),
            new accesser('position_z', 0),
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
            new accesser('position_z', 0),
            new accesser('color', object_color),
            new accesser('position_relative', 'true'),
            new accesser('rotation_y', Math.PI),

        ]
        const iterate=[accessersWallFront  ]
        iterate.forEach(accessersObject => {  
            const added_accesser = new accesser('material_type', material_type);
            accessersObject.push(added_accesser);
        });



        return { "accessersWallFront": accessersWallFront, "accessersWallBack": accessersWallBack,  }
    }
    generatePassiveObjects(){
        const { accessersWallFront, accessersWallBack } = this.determineState();

        let array = [
            // { objectOptions: accessersWallFront, classInstance:SimpleController},
            { objectOptions: accessersWallFront, classInstance: SimpleController  },
            // { objectOptions: accessersWallLeft, classInstance: SimpleController  },
            // { objectOptions: accessersWallRight, classInstance: SimpleController }
            ]
        return array
}   
}

export {  UconfigsImplementationController}