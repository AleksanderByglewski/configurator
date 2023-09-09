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
class UconfigsImplementationRoofsController extends UconfigsController {
    constructor() {
        super()
        this.setModel(UconfigInvisibleObject)
        this.gui = new UconfigDebugGui();
        this.gui.set_mediator(this)
        this.group = new THREE.Group()
        this.external_objects=[]
        this.external_objects_controllers=[]
        
    }
    generateDynamicAccessers(){
        console.log("This should be overriden")
        const dynamic_accessers = [
            new accesser('name', 'Menu do debugowania obiektu'),
            new accesser('position_x'),
            new accesser('position_y'),
            new accesser('position_z'),
            new accesser('rotation_y'),
            new accesser('object_width'),
            new accesser('object_depth'),
            new accesser('object_height'),
            new accesser('object_color')
        ]
        return dynamic_accessers
    }
    determineState() {
        //You can get the current state of the object by using the 
        //Todo
        // this.state.state.position_y=2

        let name = this.state.get('name') || 'Wall'
        let object_type = this.state.get('object_type') || 'flat'
        let object_width = parseFloat(this.state.get('object_width')) || 3
        let object_height = parseFloat(this.state.get('object_height')) || 2.43
        let object_depth = parseFloat(this.state.get('object_depth')) || 4
        let object_color = this.state.get('object_color') || "#FF0000"
      
        let texture_type=""
        let material_type=this.state.get('material_type') || "material_type_1" 
        let position_x = this.state.get('position_x') || 0
        let position_y = this.state.get('position_y') || 2.43
        let position_z = this.state.get('position_z') || 0

        let garage_height = parseFloat(this.state.get('object_height')) || 2.43
        let garage_depth = parseFloat(this.state.get('object_height')) || 4
        let garage_width = parseFloat(this.state.get('object_height')) || 3
        // let height = this.state.get('height') || 2.13
        // let width = this.state.get('width') || 4.0
        // let depth = this.state.get('depth') || 4.0
        // object_height = height
        // object_width = width
        // object_depth = depth
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
            new accesser('position_y', object_height/2),
            new accesser('position_z', object_depth/2),
            new accesser('color', object_color),
            new accesser('position_relative', 'true'),
            new accesser('rotation_y', Math.PI),
        ]
        const accessersWallBack = [
            new accesser('name', name + "_back"),
            new accesser('width', object_width),
            new accesser('height', object_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', 0),
            new accesser('position_y', object_height/2),
            new accesser('position_z',-garage_depth/2),
            new accesser('color', object_color),
            new accesser('position_relative', 'true'),
            new accesser('rotation_y', Math.PI),

        ]
        const accessersWallLeft = [
            new accesser('name', name + "_back"),
            new accesser('width', object_depth),
            new accesser('height', object_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', -object_width/2),
            new accesser('position_y', object_height/2),
            new accesser('position_z',0),
            new accesser('color', object_color),
            new accesser('position_relative', 'true'),
            new accesser('rotation_y', -Math.PI/2),

        ]    
        const accessersWallRight = [
            new accesser('name', name + "_back"),
            new accesser('width', object_depth),
            new accesser('height', object_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', object_width/2),
            new accesser('position_y', object_height/2),
            new accesser('position_z',0),
            new accesser('color', object_color),
            new accesser('position_relative', 'true'),
            new accesser('rotation_y', Math.PI/2),
            

        ]

        let roof_slant=5*Math.PI/180
        let roof_height=object_depth*(1/Math.cos(roof_slant))
        let y_displacement=roof_height*Math.sin(roof_slant)
        const accessersWallTop = [
            new accesser('name', name + "_back"),
            new accesser('width', object_width),
            new accesser('height', roof_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x',0),
            new accesser('position_y', object_height+y_displacement/2),
            new accesser('position_z',0),
            new accesser('color', object_color),
            new accesser('position_relative', 'true'),
            new accesser('rotation_y', 0),
            new accesser('rotation_x', Math.PI/2-roof_slant),
            

        ]



        const iterate=[accessersWallFront  ]
        iterate.forEach(accessersObject => {  
            const added_accesser = new accesser('material_type', material_type);
            accessersObject.push(added_accesser);
        });



        return { 
    "accessersWallFront": accessersWallFront, 
    "accessersWallBack":  accessersWallBack,
    "accessersWallLeft":  accessersWallLeft,
    "accessersWallRight": accessersWallRight,
    "accessersWallTop": accessersWallTop
    }
    }
    generatePassiveObjects(){
            const { accessersWallFront, accessersWallBack, accessersWallLeft,accessersWallRight,accessersWallTop } = this.determineState();

            let array = [
                { objectOptions: accessersWallFront, classInstance:UconfigsImplementationRoofController},
                { objectOptions: accessersWallBack, classInstance: UconfigsImplementationRoofController },
                { objectOptions: accessersWallLeft, classInstance: UconfigsImplementationRoofController  },
                { objectOptions: accessersWallRight, classInstance: UconfigsImplementationRoofController },
                { objectOptions: accessersWallTop, classInstance: UconfigsImplementationRoofController }
                ]
            return array
    }   
    // buildingStep(){
    //     //Go over the children and set them in proper places
    //     let { accessersWallFront, accessersWallBack, accessersWallLeft, accessersWallRight }=this.determineState()
   
    //     this.setOptions(this.external_objects[0],accessersWallFront)
    //     this.setOptions(this.external_objects[1],accessersWallBack)
    //     this.setOptions(this.external_objects[2],accessersWallLeft)
    //     this.setOptions(this.external_objects[3],accessersWallRight)
    //     super.buildingStep()
    // }
}
class UconfigsImplementationRoofController extends UconfigsController{
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


export {  UconfigsImplementationRoofsController, UconfigsImplementationRoofController }