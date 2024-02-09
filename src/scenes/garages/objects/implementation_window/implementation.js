import { v4 as uuidv4 } from 'uuid';
import { accesser, GLOBAL_ORIENTATION } from '../../base'
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { Generic, genericGui, genericState, genericObject, genericDisplay, genericController } from '../../base.js'
import { CubeObject, UconfigObject, WallGarageObject, UconfigInvisibleObject, genericGarageObject } from '../base/object'
import { UconfigInvisibleGui, UconfigGui, UconfigDebugGui, UconfigUserGui } from '../base/gui'
import { DedicatedDoorGui , DedicatedGateGui } from './gui'

import { UconfigController, CubeController, RedCubeController, WallGarageController, groupGenericGarageController, genericGarageController } from '../base/controller'
import { UconfigsController } from '../base/controller'

import { UconfigImplementationDoorGui } from './gui'
import { SimpleController, WindowController, DoorHandleController, CentralLineController, LineController } from './controller'
//Now i would like to add objects to it dynamically
class UconfigsImplementationWindowController extends UconfigsController {
    constructor() {
        super()
        this.setModel(UconfigInvisibleObject)
        this.gui = new DedicatedGateGui();
        this.gui.set_mediator(this)
        this.group = new THREE.Group()
        this.external_objects = []
        this.external_objects_controllers = []

    }
    request_an_update() {
        /**
        *We are targeting the parent, that is the entire system,
        */
        //debugger
        let targeted_parent = this.external_objects_controllers[0]

        const accessers = [
            new accesser('height'),
            new accesser('color')
        ]

        const accessers_labels = [
            new accesser('garage_height'),
            new accesser('garage_color'),
        ]

        for (let i = 0; i < accessers.length; i++) {
            const val = targeted_parent.state.get(accessers[i].resource_locator, accessers[i].value);
            this.state.update(accessers_labels[i].resource_locator, val);
        }
    }
    determineState() {
        //You can get the current state of the object by using the 

        this.request_an_update()

        let name = this.state.get('name') || 'Wall'
        let object_type = this.state.get('object_type') || 'flat'
        let object_width = parseFloat(this.state.get('object_width')) || 1.90
        let stilt_width = parseFloat(this.state.get('stilt_width')) || 0.02
        let stilt_depth = parseFloat(this.state.get('stilt_depth')) || 0.5
        let object_height = parseFloat(this.state.get('object_height')) || 2.13
        let object_depth = parseFloat(this.state.get('object_depth')) || 2
        //debugger
        let object_color = this.state.get('color') || "#A5A3A5"
        if(object_color.toUpperCase()=="#A5A3A5")
        {
            object_color = this.state.get('garage_color')||"#ED972A"
            //object color is automatic

        }

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
        let door_type = this.state.get('door_type') || 'door_type_1'
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
        let window_depth = parseFloat(this.state.get('window_depth')) || 1.03
        let adjust_bottom_height = -0.5 * parseFloat(this.state.get('garage_height')) + 0.5 * door_height + 0.035
        const accessersWallFront = [
            new accesser('name', name + "drzwi"),
            new accesser('width', object_width),

            new accesser('material_type', "material_glass"),
            new accesser('door_width', door_width),
            new accesser('window_depth', window_depth),
            new accesser('stilt_depth', stilt_depth),
            new accesser('gate_type', gate_type),
            new accesser('door_type', door_type),

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
            new accesser('stilt_depth', stilt_depth),

            new accesser('door_width', door_width),
            new accesser('door_height', door_height),
            new accesser('height', door_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('door', door),
            new accesser('gate_type', gate_type),
            new accesser('door_type', door_type),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', 0),
            new accesser('position_y', adjust_bottom_height),

            new accesser('position_z', position_z),
            new accesser('color', object_color),
            new accesser('position_relative', 'true'),

        ]

        
        const accessersCentralLine = [
            new accesser('name', name + "drzwi"),
            new accesser('width', object_width),
            new accesser('stilt_width',stilt_width),
            new accesser('material_type', material_type),
            new accesser('door_width', door_width),
            new accesser('gate_type', gate_type),
            new accesser('door_type', door_type),

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

        // const iterate = [accessersWallFront]
        // iterate.forEach(accessersObject => {
        //     const added_accesser = new accesser('material_type', material_type);
        //     accessersObject.push(added_accesser);
        // });



        return { 
        "accessersWallFront": accessersWallFront, 
        "accessersWallBack": accessersWallBack, 
        "accessersCentralLine": accessersCentralLine, 
        }
    }
    generatePassiveObjects() {
        const { accessersWallFront, accessersWallBack, accessersCentralLine } = this.determineState();

        let array = [
            // { objectOptions: accessersWallFront, classInstance:SimpleController},
            { objectOptions: accessersWallFront, classInstance: WindowController },
            // { objectOptions: accessersWallBack, classInstance: DoorHandleController },
            { objectOptions: accessersCentralLine, classInstance: LineController },
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

    adjust_position(garage_height = 2.13, garage_width = 0, garage_depth = 0,) {
        this.state.update('position_y', 0)

    }
}


export { UconfigsImplementationWindowController, }