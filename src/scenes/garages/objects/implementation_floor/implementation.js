import { v4 as uuidv4 } from 'uuid';
import { accesser, GLOBAL_ORIENTATION, CANOPIES_AUTOMATIC } from '../../base'
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { Generic, genericGui, genericState, genericObject, genericDisplay, genericController } from '../../base.js'
import { CubeObject, UconfigObject, WallGarageObject, UconfigInvisibleObject, genericGarageObject, DoubleCubeObject } from '../base/object'
import { UconfigInvisibleGui, UconfigGui, UconfigDebugGui } from '../base/gui'
import {
    UconfigController, CubeController, RedCubeController,
    WallGarageController, groupGenericGarageController, genericGarageController
} from '../base/controller'
import { UconfigsController } from '../base/controller'

//Good reference file

import { UconfigImplementationFloorGui } from './gui'
import { SimpleController, RoofSideLeftController, RoofSideRightController, RoofSideSquareController, RoofTopController,FloorCubeController } from './controller'
//Now i would like to add objects to it dynamically

function set_value_accesser(accesser_array, locator = "position_y", new_value) {
    Object.values(accesser_array).forEach(accessersObject => {

        let targeted_accesser = accessersObject.find(item => item.resource_locator === locator);
        if (targeted_accesser) {
            targeted_accesser.value = new_value;
        }
        //const added_accesser = new accesser('material_type', material_type);
        //accessersObject.push(added_accesser);
    });
}

class UconfigsImplementationFloorsController extends UconfigsController {
    constructor() {
        super()
        this.setModel(UconfigInvisibleObject)
        this.gui = new UconfigImplementationFloorGui();
        this.gui.set_mediator(this)
        this.group = new THREE.Group()
        this.external_objects = []
        this.external_objects_controllers = []

    }
    generateDynamicAccessers() {
        console.log("This should be overriden")
        const dynamic_accessers = [
            new accesser('name', 'Kontroler dachu'),
            new accesser('roof', 'Menu do debugowania obiektu'),
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
    request_an_update() {
        /**
        *We are targeting the parent, that is the entire system,
        */

        let targeted_parent = this.external_objects_controllers[0]

        let accessers = [

            new accesser('object_width'),
            new accesser('object_depth'),
            new accesser('object_height'),
            new accesser('wall_color'),
            new accesser('material_type'),
            new accesser('targeted_wall_name')
        ]
        


        for (let i = 0; i < accessers.length; i++) {
            const val = targeted_parent.state.get(accessers[i].resource_locator, accessers[i].value);
            this.state.update(accessers[i].resource_locator, val);
        }


 
        targeted_parent = this.request_find_element('top_level')
        // At this point, targeted_parent is either the top level object or null/undefined
        accessers = [
            new accesser('object_width'),
            new accesser('object_depth'),
            new accesser('object_height'),
      
        ]

        let accessers_assign = [
            new accesser('garage_width'),
            new accesser('garage_depth'),
            new accesser('garage_height'),
         
        ]

        this.request_update_state(targeted_parent, accessers, accessers_assign)

        
        targeted_parent = this.request_find_element('top_level').external_objects.find(obj=>obj.status=="main_floor")
        // At this point, targeted_parent is either the top level object or null/undefined
        accessers = [
            new accesser('material_type')
      
        ]

        accessers_assign = [
            new accesser('material_type')
        ]

        this.request_update_state(targeted_parent, accessers, accessers_assign)

    }

    determineState() {
        //You can get the current state of the object by using the 
        //Todo
        // this.state.state.position_y=2
        
        this.request_an_update()
        

        // this.state.update('position_y', parseFloat(this.state.get('object_height')) || 2.13)

        let roof_type = this.state.get('roof_type') || 'roof_type_1'
        //Different default


        let name = this.state.get('name') || 'Wall'
        let object_type = this.state.get('object_type') || 'flat'
        let object_width = parseFloat(this.state.get('object_width')) || 3
        let object_height = parseFloat(this.state.get('object_height')) || 2.13
        let object_depth = parseFloat(this.state.get('object_depth')) || 4
        let object_color = this.state.get('object_color') || "#888492"

        let texture_type = ""

  

        let garage_depth = parseFloat(this.state.get('garage_depth')) || 4
        let garage_width = parseFloat(this.state.get('garage_width')) || 4
        let material_type= this.state.get('material_type') || "floor_type_1"
        let targeted_wall_name = this.state.get('targeted_wall_name') || "targeted_wall_name"
        let final_depth=0
        let final_width=0
        switch (targeted_wall_name) {

            case "front":
                final_depth=object_depth+1
                final_width=garage_width+1
            

                break;

            case "back":
                final_depth=object_depth+1
                final_width=garage_width+1
                break;

            case "left":
                final_depth=garage_depth+1
                final_width=object_width+1
            
                // debug_x=-2*garage_width/2-object_width/2
                break;
            case "right":
                final_depth=garage_depth+1
                final_width=object_width+1
            
                break;
        }

        let accessersWallFront = [
            new accesser('name', name + "Debug target"),
            new accesser('width', final_width),
            new accesser('height', 0.05),
            new accesser('depth', final_depth),
            new accesser('sheet_depth', 10),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', 0),
            new accesser('position_y', 0),
            new accesser('position_z',0),
            
            new accesser('wall_color', "#cecece"),
            new accesser('position_relative', 'true'),
            new accesser('rotation_y', 0),
            new accesser('material_type', material_type),
        ]
 


        return {
            "accessersWallFront": accessersWallFront,

        }
    }
    generatePassiveObjects() {
        let { accessersWallFront} = this.determineState();

      

        let array = [
            { objectOptions: accessersWallFront, classInstance: FloorCubeController },
       ]


        // const accessersWallTop2 = [...accessersWallTop]

        // accessersWallTop2.push(new accesser('rotation_x', 1.6667894356545847 ))
        // accessersWallTop2.push( new accesser('position_z',1.5))


        return array
    }
    adjust_position(garage_width = 0, garage_depth = 0, garage_height = 2.13) {
        //this.state.update('position_y', garage_height)

    }
    buildingStep() {
        //Go over the children and set them in proper places
        // let { accessersWallFront, accessersWallBack, accessersWallLeft, accessersWallRight }=this.determineState()

        // this.setOptions(this.external_objects[0],accessersWallFront)
        // this.setOptions(this.external_objects[1],accessersWallBack)
        // this.setOptions(this.external_objects[2],accessersWallLeft)
        // this.setOptions(this.external_objects[3],accessersWallRight)

        super.buildingStep()
    }

}



class UconfigsImplementationRoofController extends UconfigsController {
    constructor() {
        super()
        this.setModel(UconfigInvisibleObject)
        this.gui = new UconfigDebugGui();
        this.gui.set_mediator(this)
        this.group = new THREE.Group()
        this.external_objects = []
        this.external_objects_controllers = []

    }
    determineState() {
        //You can get the current state of the object by using the 
        let name = this.state.get('name') || 'Wall'
        let object_type = this.state.get('object_type') || 'flat'
        let object_width = parseFloat(this.state.get('object_width')) || 3
        let object_height = parseFloat(this.state.get('object_height')) || 2.13
        let object_depth = parseFloat(this.state.get('object_depth')) || 2
        let object_color = this.state.get('color') || "#FEFEFE"

        let texture_type = ""
        let material_type = this.state.get('material_type') || "material_type_1"
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
            new accesser('name', name + "sciana frontowa 1"),
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
        const iterate = [accessersWallFront]
        iterate.forEach(accessersObject => {
            const added_accesser = new accesser('material_type', material_type);
            accessersObject.push(added_accesser);
        });



        return { "accessersWallFront": accessersWallFront, "accessersWallBack": accessersWallBack, }
    }
    generatePassiveObjects() {
        const { accessersWallFront, accessersWallBack } = this.determineState();

        let array = [
            // { objectOptions: accessersWallFront, classInstance:SimpleController},
            { objectOptions: accessersWallFront, classInstance: SimpleController },
            // { objectOptions: accessersWallLeft, classInstance: SimpleController  },
            // { objectOptions: accessersWallRight, classInstance: SimpleController }
        ]
        return array
    }
}
class UconfigsImplementationRoofSupportSideLeftController extends UconfigsController {
    constructor() {
        super()
        this.setModel(UconfigInvisibleObject)
        this.gui = new UconfigDebugGui();
        this.gui.set_mediator(this)
        this.group = new THREE.Group()
        this.external_objects = []
        this.external_objects_controllers = []

    }
    determineState() {
        //You can get the current state of the object by using the 
        let name = this.state.get('name') || 'Wall'
        let object_type = this.state.get('object_type') || 'flat'
        let object_width = parseFloat(this.state.get('object_width')) || 3
        let object_height = parseFloat(this.state.get('object_height')) || 2.13
        let object_depth = parseFloat(this.state.get('object_depth')) || 2
        let object_color = this.state.get('color') || "#FEFEFE"

        let texture_type = ""
        let material_type = this.state.get('material_type') || "material_type_1"
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

        let wall_color = this.state.get('wall_color') || "#FF00FF"
        const accessersWallFront = [
            new accesser('name', name + "_test"),
            new accesser('width', object_width),
            new accesser('height', object_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', 0),
            new accesser('position_y', 0),
            new accesser('position_z', 0),
            new accesser('color', object_color),
            new accesser('wall_color', wall_color),
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
        const iterate = [accessersWallFront]
        iterate.forEach(accessersObject => {
            const added_accesser = new accesser('material_type', material_type);
            accessersObject.push(added_accesser);
        });



        return { "accessersWallFront": accessersWallFront, "accessersWallBack": accessersWallBack, }
    }
    generatePassiveObjects() {
        const { accessersWallFront, accessersWallBack } = this.determineState();

        let array = [
            // { objectOptions: accessersWallFront, classInstance:SimpleController},
            { objectOptions: accessersWallFront, classInstance: RoofSideLeftController },
            // { objectOptions: accessersWallLeft, classInstance: SimpleController  },
            // { objectOptions: accessersWallRight, classInstance: SimpleController }
        ]
        return array
    }
}
class UconfigsImplementationRoofSupportSideRightController extends UconfigsController {
    constructor() {
        super()
        this.setModel(UconfigInvisibleObject)
        this.gui = new UconfigDebugGui();
        this.gui.set_mediator(this)
        this.group = new THREE.Group()
        this.external_objects = []
        this.external_objects_controllers = []

    }
    determineState() {
        //You can get the current state of the object by using the 
        let name = this.state.get('name') || 'Wall'
        let object_type = this.state.get('object_type') || 'flat'
        let object_width = parseFloat(this.state.get('object_width')) || 3
        let object_height = parseFloat(this.state.get('object_height')) || 2.13
        let object_depth = parseFloat(this.state.get('object_depth')) || 2
        let object_color = this.state.get('color') || "#FEFEFE"

        let texture_type = ""
        let material_type = this.state.get('material_type') || "material_type_1"
        let position_x = this.state.get('position_x') || 0
        let position_y = this.state.get('position_y') || 0
        let position_z = this.state.get('position_z') || 0

        let height = this.state.get('height') || 2.13
        let width = this.state.get('width') || 4.0
        let depth = this.state.get('depth') || 4.0
        object_height = height
        object_width = width
        object_depth = depth
        let texture_offset = this.state.get('texture_offset') || 0
        //let object_angle=parseFloat(this.state.get('object_angle'))||30
        let sheet_depth = parseFloat(this.state.get('sheet_depth')) || 0.0075
        let wall_color = this.state.get('wall_color') || "#FF0000"
        const accessersWallFront = [
            new accesser('name', name + "sciana frontowa"),
            new accesser('texture_offset', texture_offset),
            new accesser('width', object_width),
            new accesser('height', object_height),
            new accesser('sheet_depth', sheet_depth),

            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', 0),
            new accesser('position_y', 0),
            new accesser('position_z', 0),
            new accesser('color', object_color),
            new accesser('wall_color', wall_color),
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
        const iterate = [accessersWallFront]
        iterate.forEach(accessersObject => {
            const added_accesser = new accesser('material_type', material_type);
            accessersObject.push(added_accesser);
        });



        return { "accessersWallFront": accessersWallFront, "accessersWallBack": accessersWallBack, }
    }
    generatePassiveObjects() {
        const { accessersWallFront, accessersWallBack } = this.determineState();

        let array = [
            // { objectOptions: accessersWallFront, classInstance:SimpleController},
            { objectOptions: accessersWallFront, classInstance: RoofSideRightController },
            // { objectOptions: accessersWallLeft, classInstance: SimpleController  },
            // { objectOptions: accessersWallRight, classInstance: SimpleController }
        ]
        return array
    }
}
class UconfigsImplementationRoofTopController extends UconfigsController {
    constructor() {
        super()
        this.setModel(UconfigInvisibleObject)
        this.gui = new UconfigDebugGui();
        this.gui.set_mediator(this)
        this.group = new THREE.Group()
        this.external_objects = []
        this.external_objects_controllers = []

    }
    determineState() {
        //You can get the current state of the object by using the 
        let name = this.state.get('name') || 'Wall'
        let object_type = this.state.get('object_type') || 'flat'
        let object_width = parseFloat(this.state.get('object_width')) || 3
        let object_height = parseFloat(this.state.get('object_height')) || 2.13
        let object_depth = parseFloat(this.state.get('object_depth')) || 2
        let object_color = this.state.get('color') || "#FEFEFE"

        let texture_type = ""
        let material_type = this.state.get('material_type') || "material_type_1"
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

        let roof_material_type = this.state.get('roof_material_type') || "material_type_1"

        let sheet_depth = parseFloat(this.state.get('sheet_depth')) || 0.0075

        const accessersWallFront = [
            new accesser('name', name + "_sciana_fronts"),
            new accesser('width', object_width),
            new accesser('height', object_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', 0),
            new accesser('position_y', 0),
            new accesser('position_z', 0),
            new accesser('color', object_color),
            new accesser('roof_material_type', roof_material_type),


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
        const iterate = [accessersWallFront]
        iterate.forEach(accessersObject => {
            const added_accesser = new accesser('material_type', material_type);
            accessersObject.push(added_accesser);
        });



        return { "accessersWallFront": accessersWallFront, "accessersWallBack": accessersWallBack, }
    }
    generatePassiveObjects() {
        const { accessersWallFront, accessersWallBack } = this.determineState();

        let array = [
            // { objectOptions: accessersWallFront, classInstance:SimpleController},
            { objectOptions: accessersWallFront, classInstance: RoofTopController },
            // { objectOptions: accessersWallLeft, classInstance: SimpleController  },
            // { objectOptions: accessersWallRight, classInstance: SimpleController }
        ]
        return array
    }
}
class UconfigsImplementationRoofSupportSideSquareController extends UconfigsController {
    constructor() {
        super()
        this.setModel(UconfigInvisibleObject)
        this.gui = new UconfigDebugGui();
        this.gui.set_mediator(this)
        this.group = new THREE.Group()
        this.external_objects = []
        this.external_objects_controllers = []

    }
    determineState() {
        //You can get the current state of the object by using the 
        let name = this.state.get('name') || 'Wall'
        let object_type = this.state.get('object_type') || 'flat'
        let object_width = parseFloat(this.state.get('object_width')) || 3
        let object_height = parseFloat(this.state.get('object_height')) || 2.13
        let object_depth = parseFloat(this.state.get('object_depth')) || 2


        let texture_type = ""
        let material_type = this.state.get('material_type') || "material_type_1"
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
        let wall_color = this.state.get('wall_color') || "#FF0000"
        const accessersWallFront = [
            new accesser('name', name + "pass_data"),
            new accesser('width', object_width),
            new accesser('height', object_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', 0),
            new accesser('position_y', 0),
            new accesser('position_z', 0),
            new accesser('color', wall_color),
            new accesser('wall_color', wall_color),
            new accesser('position_relative', 'true'),
        ]

        // const accessersWallBack = [
        //     new accesser('name', name + "_back"),
        //     new accesser('width', object_width),
        //     new accesser('height', object_height),
        //     new accesser('sheet_depth', sheet_depth),
        //     new accesser('segments', 1),
        //     new accesser('radius', 0.01),
        //     new accesser('position_x', 0),
        //     new accesser('position_y', 0),
        //     new accesser('position_z', 0),
        //     new accesser('color', object_color),
        //     new accesser('position_relative', 'true'),
        //     new accesser('rotation_y', Math.PI),

        // ]
        const iterate = [accessersWallFront]
        iterate.forEach(accessersObject => {
            const added_accesser = new accesser('material_type', material_type);
            accessersObject.push(added_accesser);
        });



        return { "accessersWallFront": accessersWallFront }
    }
    generatePassiveObjects() {
        const { accessersWallFront } = this.determineState();

        let array = [
            // { objectOptions: accessersWallFront, classInstance:SimpleController},
            { objectOptions: accessersWallFront, classInstance: RoofSideSquareController },
            // { objectOptions: accessersWallLeft, classInstance: SimpleController  },
            // { objectOptions: accessersWallRight, classInstance: SimpleController }
        ]
        return array
    }
}


export { UconfigsImplementationFloorsController, UconfigsImplementationRoofController }