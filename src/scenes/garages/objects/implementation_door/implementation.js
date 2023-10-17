import { v4 as uuidv4 } from 'uuid';
import { accesser, GLOBAL_ORIENTATION } from '../../base'
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { Generic, genericGui, genericState, genericObject, genericDisplay, genericController } from '../../base.js'
import { CubeObject, UconfigObject, WallGarageObject, UconfigInvisibleObject, genericGarageObject } from '../base/object'
import { UconfigInvisibleGui, UconfigGui, UconfigDebugGui, UconfigUserGui } from '../base/gui'
import { DedicatedGui } from './gui'

import { UconfigController, CubeController, RedCubeController, WallGarageController, groupGenericGarageController, genericGarageController } from '../base/controller'
import { UconfigsController } from '../base/controller'

import { UconfigImplementationDoorGui } from './gui'
import { SimpleController, DoorController, DoorHandleController } from './controller'
//Now i would like to add objects to it dynamically
class UconfigsImplementationDoorController extends UconfigsController {
    constructor() {
        super()
        this.setModel(UconfigInvisibleObject)
        this.gui = new DedicatedGui();
        this.gui.set_mediator(this)
        this.group = new THREE.Group()
        this.external_objects = []
        this.external_objects_controllers = []

    }
    determineState() {
        //You can get the current state of the object by using the 

        this.request_an_update()

        let name = this.state.get('name') || 'Wall'
        let object_type = this.state.get('object_type') || 'flat'
        let object_width = parseFloat(this.state.get('object_width')) || 1.90
        let object_height = parseFloat(this.state.get('object_height')) || 2.13
        let object_depth = parseFloat(this.state.get('object_depth')) || 2
        let object_color = this.state.get('color') || "#888492"


        let texture_type = ""
        let material_type = this.state.get('material_type') || "material_type_1"
        if (GLOBAL_ORIENTATION == "SIDEWAYS") {
            material_type = this.state.get('material_type') || "material_type_6"
        }
        let position_x = this.state.get('position_x') || 0
        let position_y = this.state.get('position_y') || 0
        let position_z = this.state.get('position_z') || 0.01

        let height = this.state.get('height') || 1.93
        let width = this.state.get('width') || 2.0
        let depth = this.state.get('depth') || 4.0


        let door = this.state.get('door') || false
        let gate_type
        if (door) {

            gate_type = this.state.get('gate_type') || 'door_type_1'
        }
        else {
            gate_type = this.state.get('gate_type') || 'gate_type_1'
        }

        switch(gate_type){
            case "gate_type_1":
                    // object_color =  "#677727"
                    break;
            case "material_type_2":
                    // object_color =  "#972727"
                    break;
            case "material_type_3":
                    // object_color =  "#272727"
                    break;
            case "material_type_4":
                    // object_color =  "#972797"
                    break;
            default:
                // code to be executed if expression doesn't match any cases
        }


        // object_height = height
        // object_width = width
        // object_depth = depth
        //let object_angle=parseFloat(this.state.get('object_angle'))||30
        let sheet_depth = parseFloat(this.state.get('sheet_depth')) || 0.0075

        let door_width = parseFloat(this.state.get('door_width')) || 2.23
        let door_height = parseFloat(this.state.get('door_height')) || 2.03

        let adjust_bottom_height = -0.5 * parseFloat(this.state.get('garage_height')) + 0.5 * door_height + 0.035
        const accessersWallFront = [
            new accesser('name', name + "drzwi"),
            new accesser('width', object_width),

            new accesser('material_type', material_type),
            new accesser('door_width', door_width),
            new accesser('gate_type', gate_type),


            new accesser('door_height', door_height),
            new accesser('height', door_height),
            new accesser('sheet_depth', sheet_depth),




            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', 0),
            new accesser('position_y', adjust_bottom_height),

            new accesser('position_z', position_z),
            new accesser('color', object_color),
            new accesser('position_relative', 'true'),
        ]

        const accessersWallBack = [
            new accesser('name', name + "drzwi"),
            new accesser('width', object_width),


            new accesser('door_width', door_width),
            new accesser('door_height', door_height),
            new accesser('height', door_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('door', door),
            new accesser('gate_type', gate_type),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', 0),
            new accesser('position_y', adjust_bottom_height),

            new accesser('position_z', position_z),
            new accesser('color', object_color),
            new accesser('position_relative', 'true'),

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
            { objectOptions: accessersWallFront, classInstance: DoorController },
            { objectOptions: accessersWallBack, classInstance: DoorHandleController },
            // { objectOptions: accessersWallLeft, classInstance: SimpleController  },
            // { objectOptions: accessersWallRight, classInstance: SimpleController }
        ]
        return array
    }
    generateDynamicAccessers() {
        console.log("This should be overriden")
        const dynamic_accessers = [
            new accesser('name', 'Menu do debugowania obiektu'),
            // new accesser('width'),
            // new accesser('height'),
            // new accesser('color'),
            new accesser('position_x'),
            new accesser('position_y'),
            new accesser('position_z'),
            // new accesser('rotation_y'),
            new accesser('door_width'),
            new accesser('door_height')
        ]
        return dynamic_accessers

    }
    request_an_update() {
        /**
        *We are targeting the parent, that is the entire system,
        */

        let targeted_parent = this.external_objects_controllers[0]

        const accessers = [
            new accesser('height'),
        ]

        const accessers_labels = [
            new accesser('garage_height'),
        ]

        for (let i = 0; i < accessers.length; i++) {
            const val = targeted_parent.state.get(accessers[i].resource_locator, accessers[i].value);
            this.state.update(accessers_labels[i].resource_locator, val);
        }
    }
    adjust_position(garage_height = 2.13, garage_width = 0, garage_depth = 0,) {
        this.state.update('position_y', 0)

    }
}
class UconfigsImplementationSkewedController extends UconfigsController {
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
        // object_height = height
        // object_width = width
        // object_depth = depth
        //let object_angle=parseFloat(this.state.get('object_angle'))||30
        let sheet_depth = parseFloat(this.state.get('sheet_depth')) || 0.0075

        const accessersWallFront = [
            new accesser('name', name + "drzwi frontowe 2"),
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
class UconfigsImplementationSkewedTopController extends UconfigsController {
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

export { UconfigsImplementationDoorController }