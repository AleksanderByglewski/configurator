import { v4 as uuidv4 } from 'uuid';
import { accesser, GLOBAL_ORIENTATION } from '../../base'
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { Generic, genericGui, genericState, genericObject, genericDisplay, genericController } from '../../base.js'
import { CubeObject, UconfigObject, WallGarageObject, UconfigInvisibleObject, genericGarageObject } from '../base/object'
import { UconfigInvisibleGui, UconfigGui, UconfigDebugGui, UconfigUserGui } from '../base/gui'
import { DedicatedDoorGui, DedicatedGateGui } from './gui'

import { UconfigController, CubeController, RedCubeController, WallGarageController, groupGenericGarageController, genericGarageController } from '../base/controller'
import { UconfigsController } from '../base/controller'

import { UconfigImplementationDoorGui } from './gui'
import { SimpleController, GutterController, DoorHandleController, CentralLineController } from './controller'
//Now i would like to add objects to it dynamically
class UconfigsImplementationGutterController extends UconfigsController {
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

        let targeted_parent = this.external_objects_controllers[0]
        debugger
        let accessers = [
            new accesser('height'),
            new accesser('width'),
            new accesser('status'),
        ]

        let accessers_labels = [
            new accesser('object_height'),
            new accesser('object_width'),
            new accesser('parent_status'),
        ]

        for (let i = 0; i < accessers.length; i++) {
            const val = targeted_parent.state.get(accessers[i].resource_locator, accessers[i].value);
            this.state.update(accessers_labels[i].resource_locator, val);
        }





        debugger
        targeted_parent = this.request_find_element('top_level')

        accessers = [
            new accesser('object_depth'),
            new accesser('object_width'),

        ]

        accessers_labels = [
            new accesser('garage_depth'),
            new accesser('garage_width'),

        ]

        for (let i = 0; i < accessers.length; i++) {
            const val = targeted_parent.state.get(accessers[i].resource_locator, accessers[i].value);
            this.state.update(accessers_labels[i].resource_locator, val);
        }

        //Here is the part with the roof. 
        targeted_parent = targeted_parent.external_objects.find(element => element.status === "main_roof");
        accessers = [
            // new accesser('object_width'),
            // new accesser('object_depth'),
            new accesser('roof_type'),
            // new accesser('wall_color'),
        ]

        let main_object_roof_type
        main_object_roof_type = targeted_parent.state.get(accessers[0].resource_locator, accessers[0].value) || "roof_type_1";
        this.state.update('roof_type', main_object_roof_type);


    }

    determineState() {
        //You can get the current state of the object by using the 


        this.request_an_update()
        debugger
        let name = this.state.get('name') || 'Wall'
        let object_type = this.state.get('object_type') || 'flat'
        let object_width = parseFloat(this.state.get('object_width')) || 1.90
        let object_height = parseFloat(this.state.get('object_height')) || 2.13
        let object_depth = parseFloat(this.state.get('object_depth')) || 2
        let object_color = this.state.get('color') || "#888492"


        let garage_depth = parseFloat(this.state.get('garage_depth')) || 5
        let garage_width = parseFloat(this.state.get('garage_width')) || 3

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

        switch (gate_type) {
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
        let door_type = this.state.get('door_type') || "door_type_1"

        let adjust_bottom_height = -0.5 * parseFloat(this.state.get('garage_height')) + 0.5 * door_height + 0.035

        //Based on the roof type do certain things
        //GOBACKTO
        let roof_type = this.state.get('roof_type') || "roof_type_1"
        let status = this.state.get('parent_status') || "front"
        let modifier_y = 0
        let modifier_y_gutter_front = 0
        let modifier_position_y = 0
        let roof_slant = 5.5 * Math.PI / 180
        let visibility = true
        debugger
        switch (roof_type) {
            case "roof_type_1":
                switch (status) {
                    case "front":


                        break;
                    case "back":

                        let roof_top_height = (garage_depth) * (1 / Math.cos(roof_slant))
                        let roof_height = roof_top_height * Math.sin(roof_slant);
                        modifier_y = -roof_height
                        modifier_position_y = -roof_height / 2
                        modifier_y_gutter_front = 0
                        break;
                    case "left":
                        visibility = false
                        break;
                    case "right":
                        visibility = false
                        break;
                }
                break;
            case "roof_type_2":
                switch (status) {
                    case "front":
                        visibility = false
                        break;
                    case "back":
                        visibility = false
                        break;
                    case "left":
                        visibility = true
                        break;
                    case "right":
                        debugger
                        visibility = true
                        let roof_top_height = (garage_width) * (1 / Math.cos(roof_slant))
                        let roof_height = roof_top_height * Math.sin(roof_slant);
                        modifier_y = +1 * roof_height
                        modifier_position_y = 0.5 * roof_height
                        break;
                }
                break;

            case "roof_type_3":
                switch (status) {
                    case "front":
                        visibility = true
                        break;
                    case "back":
                        visibility = true
                        let roof_top_height = (garage_depth) * (1 / Math.cos(roof_slant))
                        let roof_height = roof_top_height * Math.sin(roof_slant);
                        modifier_y = +1 * roof_height
                        modifier_position_y = 0.5 * roof_height
                        break;
                    case "left":
                        visibility = false
                        break;
                    case "right":
                        visibility = false
                        break;
                }
                break;

            case "roof_type_4":
                switch (status) {
                    case "front":
                        visibility = false
                        break;
                    case "back":
                        visibility = false
                        break;
                    case "left":
                        visibility = true
                        debugger
                        let roof_top_height = (garage_width) * (1 / Math.cos(roof_slant))
                        let roof_height = roof_top_height * Math.sin(roof_slant);
                        modifier_y = +1 * roof_height
                        modifier_position_y = 0.5 * roof_height
                        break;
                    case "right":
                        visibility = true
                        break;
                }
                break;

            case "roof_type_5":
                switch (status) {
                    case "front":
                        visibility = true
                        break;
                    case "back":
                        visibility = true
                        break;
                    case "left":
                        visibility = false

                        break;
                    case "right":
                        visibility = false
                        break;
                }
                break;

            case "roof_type_6":
                switch (status) {
                    case "front":
                        visibility = false
                        break;
                    case "back":
                        visibility = false
                        break;
                    case "left":
                        visibility = true

                        break;
                    case "right":
                        visibility = true
                        break;
                }
                break;




        }


        const accessersWallFront = [
            new accesser('name', name + "gutter"),
            // new accesser('modifier_y', ),
            new accesser('width', object_width),
            new accesser('height', object_height + modifier_y),
            new accesser('position_x', 0),
            new accesser('position_y', 0 + modifier_position_y),
            new accesser('modifier_y_gutter_front', modifier_y_gutter_front),
            new accesser('position_z', position_z),
            new accesser('visibility', visibility),
            new accesser('color', object_color),
            new accesser('position_relative', 'true'),
        ]

        const accessersWallBack = []
        const accessersWallLeft = []
        const accessersWallRight = []
        const accessersCentralLine = []

        const iterate = [accessersWallFront]
        iterate.forEach(accessersObject => {
            const added_accesser = new accesser('material_type', material_type);
            accessersObject.push(added_accesser);
        });



        return {
            "accessersWallFront": accessersWallFront,
            "accessersWallBack": accessersWallBack,
            "accessersWallLeft": accessersWallLeft,
            "accessersWallRight": accessersWallRight,
            "accessersCentralLine": accessersCentralLine,
        }
    }
    generatePassiveObjects() {
        const { accessersWallFront, accessersWallBack, accessersWallLeft, accessersWallRight, accessersCentralLine } = this.determineState();

        let array = [
            // { objectOptions: accessersWallFront, classInstance:SimpleController},
            { objectOptions: accessersWallFront, classInstance: GutterController },
            // { objectOptions: accessersWallBack, classInstance: GutterController },
            // { objectOptions: accessersWallRight, classInstance: GutterController },
            // { objectOptions: accessersWallLeft, classInstance: GutterController },
            // { objectOptions: accessersCentralLine, classInstance: GutterController },
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
class UconfigsImplementationGateController extends UconfigsImplementationGutterController {
    constructor() {
        super()
        this.setModel(UconfigInvisibleObject)
        this.gui = new DedicatedDoorGui();
        this.gui.set_mediator(this)
        this.group = new THREE.Group()
        this.external_objects = []
        this.external_objects_controllers = []
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

export { UconfigsImplementationGutterController as UconfigsImplementationGutterController, UconfigsImplementationGateController }