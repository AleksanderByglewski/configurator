import { v4 as uuidv4 } from 'uuid';
import { CANOPIES_AUTOMATIC, accesser } from '../../base'
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { Generic, genericGui, genericState, genericObject, genericDisplay, genericController } from '../../base.js'
import { CubeObject, UconfigObject, WallGarageObject, UconfigInvisibleObject, genericGarageObject } from '../base/object'
import { UconfigInvisibleGui, UconfigGui, UconfigDebugGui, UconfigUserGui } from '../base/gui'
import { UconfigController, CubeController, RedCubeController, WallGarageController, groupGenericGarageController, genericGarageController } from '../base/controller'
import { UconfigsController } from '../base/controller'

import { UconfigImplementationWallGui, UconfigCanopyUserGui } from './gui'
import { SimpleController } from './controller'


//Now i would like to add objects to it dynamically
class UconfigsImplementationCanopyController extends UconfigsController {
    constructor() {
        super()
        this.setModel(UconfigInvisibleObject)
        this.gui = new UconfigUserGui();
        this.gui.set_mediator(this)
        this.group = new THREE.Group()
        this.external_objects = []
        this.external_objects_controllers = []

    }

    generateDynamicAccessers() {
        console.log("This should be overriden")
        const dynamic_accessers = [
            // new accesser('name', 'Menu do debugowania obiektu'),
            // new accesser('position_x'),
            // new accesser('position_y'),
            // new accesser('position_z'),
            // new accesser('rotation_y'),
            new accesser('object_width'),
            new accesser('object_depth')
        ]
        return dynamic_accessers

    }
    request_an_update() {
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

        let accessers = [

            // new accesser('object_width'),
            new accesser('object_depth'),
            new accesser('object_height'),
            // new accesser('wall_color'),
        ]


        for (let i = 0; i < accessers.length; i++) {
            const val = targeted_parent.state.get(accessers[i].resource_locator, accessers[i].value);
            this.state.update(accessers[i].resource_locator, val);
        }


        accessers = [

            new accesser('object_width'),
            new accesser('object_depth'),
            new accesser('object_height'),
            new accesser('wall_color'),
        ]
        let accessers_assign = [

            new accesser('garage_width'),
            new accesser('garage_depth'),
            new accesser('garage_height'),
            new accesser('wall_color'),

        ]


        for (let i = 0; i < accessers.length; i++) {
            const val = targeted_parent.state.get(accessers[i].resource_locator, accessers[i].value);
            this.state.update(accessers_assign[i].resource_locator, val);
        }


        //Now you need to go down to find the roof
        let targeted_elements = targeted_parent.external_objects;

        targeted_parent = targeted_elements.find(element => element.status === "main_roof");
        accessers = [
            new accesser('roof_type'),
        ]
        accessers_assign = [

            new accesser('received_roof_type'),
        ]





        if (targeted_parent) {
            console.log("Found the element with status 'main_roof':", targeted_parent);
            for (let i = 0; i < accessers.length; i++) {
                const val = targeted_parent.state.get(accessers[i].resource_locator, accessers[i].value);
                this.state.update(accessers_assign[i].resource_locator, val);
            }
        } else {
            console.log("Element with status 'main_roof' not found.");
        }


    }

    determineState() {
        //You can get the current state of the object by using the 
        this.request_an_update()

        let received_roof_type = this.state.get('received_roof_type') || 'roof_type_1'



        //You need to figure the modifiers for the front,back, left and  right 
        //How to do that 
        //Request an update from the parent check the type of canopy added and then modify the height of children walls by some +adjustment

        let garage_width = parseFloat(this.state.get('garage_width')) || 3
        let garage_depth = parseFloat(this.state.get('garage_depth')) || 5


        let name = this.state.get('name') || 'Wall'
        let object_type = this.state.get('object_type') || 'flat'
        let object_width = parseFloat(this.state.get('object_width')) || 3
        let object_height = parseFloat(this.state.get('object_height')) || 2.13
        let object_depth = parseFloat(this.state.get('object_depth')) || 4
        let object_color = this.state.get('wall_color') || "#FEFEFE"



        this.state.update('position_x', garage_width / 2 + object_width / 2 || 1.5 + 1.5)

        let texture_type = ""
        let material_type = this.state.get('material_type') || "material_type_1"
        let position_x = this.state.get('position_x') || 0
        let position_y = this.state.get('position_y') || 0
        let position_z = this.state.get('position_z') || 0

        let height = this.state.get('height') || 2.13
        let width = this.state.get('width') || 2.0
        let depth = this.state.get('depth') || 4.0

        // // object_height = height
        // // object_width = width
        // object_depth = depth
        let debug_x = 0
        let debug_y = object_height / 2
        //let object_angle=parseFloat(this.state.get('object_angle'))||30
        let sheet_depth = parseFloat(this.state.get('sheet_depth')) || 0.0075



        let modifier_left_wall = 0
        let modifier_right_wall = 0
        let modifier_front_wall = 0
        let modifier_back_wall = 0

        let
            modifier_front_pole_left = 0,
            modifier_front_pole_right = 0,
            modifier_back_pole_left = 0,
            modifier_back_pole_right = 0,
            modifier_right_pole_left = 0,
            modifier_right_pole_right = 0,
            modifier_left_pole_left = 0,
            modifier_left_pole_right = 0

        let roof_slant = 5.5 * Math.PI / 180
        //The dimension of the top part of the roof 
        let roof_top_height = object_width * (1 / Math.cos(roof_slant))
        let roof_height = roof_top_height * Math.sin(roof_slant);

        //How high should the roof top extrude
        let garage_roof_top_height = object_width * (1 / Math.cos(roof_slant))
        let garage_roof_height = garage_roof_top_height * Math.sin(roof_slant) - 0.05;

        switch (received_roof_type) {


            case 'roof_type_1':
                break;

            case 'roof_type_2':

                modifier_front_pole_left = roof_height + garage_roof_height
                modifier_front_pole_right = roof_height
                modifier_back_pole_left = roof_height
                modifier_back_pole_right = roof_height + garage_roof_height
                modifier_right_pole_left = roof_height + garage_roof_height
                modifier_right_pole_right = roof_height + garage_roof_height
                modifier_left_pole_left = roof_height
                modifier_left_pole_right = roof_height


                break;

            case 'roof_type_3':
                break;

            case 'roof_type_4':

                modifier_front_pole_left = -roof_height
                modifier_front_pole_right = -roof_height
                modifier_back_pole_left = -roof_height
                modifier_back_pole_right = -roof_height
                modifier_right_pole_left = -roof_height
                modifier_right_pole_right = -roof_height
                modifier_left_pole_left = -roof_height
                modifier_left_pole_right = -roof_height

                break;

            default:
                break;

        }
        //  modifier_left_wall=roof_height
        //  modifier_right_wall=roof_height
        //  modifier_front_wall=roof_height
        //  modifier_back_wall=roof_height


        const accessersWallFront = [
            new accesser('name', name + "_fronts"),
            new accesser('width', object_width),
            new accesser('height', object_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', 0 + debug_x),
            new accesser('position_y', 0 + debug_y),
            new accesser('position_z', object_depth / 2),
            new accesser('color', object_color),
            // new accesser('position_relative', 'true'),
            new accesser('rotation_y', 0 * Math.PI),
            // new accesser('modifier_front', modifier_right_wall),
            // new accesser('modifier_back', modifier_back_wall),
            new accesser('modifier_left_pole', modifier_front_pole_left),
            new accesser('modifier_right_pole', modifier_front_pole_right)
        ]

        const accessersWallBack = [
            new accesser('name', name + "_back"),
            new accesser('width', object_width),
            new accesser('height', object_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', 0 + debug_x),
            new accesser('position_y', 0 + debug_y),
            new accesser('position_z', -object_depth / 2),
            new accesser('color', object_color),
            // new accesser('position_relative', 'true'),
            new accesser('rotation_y', 2 * Math.PI / 2),
            //  new accesser('modifier_front', modifier_right_wall),
            //  new accesser('modifier_back', modifier_back_wall),
            new accesser('modifier_left_pole', modifier_back_pole_left),
            new accesser('modifier_right_pole', modifier_back_pole_right)

        ]
        const accessersWallLeft = [
            new accesser('name', name + "_back"),
            new accesser('width', object_depth),
            new accesser('height', object_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', -object_width / 2 + 0 + debug_x),
            new accesser('position_y', 0 + debug_y),
            new accesser('position_z', -0 * object_depth / 2),
            new accesser('color', object_color),
            // new accesser('position_relative', 'true'),
            new accesser('rotation_y', -1 * Math.PI / 2),
            //  new accesser('modifier_front', modifier_right_wall),
            //  new accesser('modifier_back', modifier_back_wall),
            new accesser('modifier_left_pole', modifier_left_pole_left),
            new accesser('modifier_right_pole', modifier_left_pole_right)

        ]
        const accessersWallRight = [
            new accesser('name', name + "_back"),
            new accesser('width', object_depth),
            new accesser('height', object_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', object_width / 2 + 0 + debug_x),
            new accesser('position_y', 0 + debug_y),
            new accesser('position_z', -0 * object_depth / 2),
            new accesser('color', object_color),
            new accesser('rotation_y', Math.PI / 2),
            // new accesser('modifier_front', modifier_right_wall),
            // new accesser('modifier_back', modifier_back_wall),
            new accesser('modifier_left_pole', modifier_right_pole_left),
            new accesser('modifier_right_pole', modifier_right_pole_right)
            // new accesser('position_relative', 'true'),
            // new accesser('rotation_y',2* Math.PI/2),

        ]
        // const iterate=[accessersWallFront, accessersWallBack, accessersWallLeft, accessersWallRight  ]
        // iterate.forEach(accessersObject => {  
        //     const added_accesser = new accesser('material_type', material_type);
        //     accessersObject.push(added_accesser);
        // });



        return { "accessersWallFront": accessersWallFront, "accessersWallBack": accessersWallBack, "accessersWallLeft": accessersWallLeft, "accessersWallRight": accessersWallRight, }
    }
    generatePassiveObjects() {
        const { accessersWallFront, accessersWallBack, accessersWallLeft, accessersWallRight } = this.determineState();

        let array = [
            { objectOptions: accessersWallFront, classInstance: UconfigsImplementationWallController },
            { objectOptions: accessersWallBack, classInstance: UconfigsImplementationWallController },
            { objectOptions: accessersWallLeft, classInstance: UconfigsImplementationWallController },
            { objectOptions: accessersWallRight, classInstance: UconfigsImplementationLameledWallController }
        ]
        return array
    }
}
class UconfigsImplementationSecondaryCanopyController extends UconfigsController {
    constructor() {
        super()
        this.setModel(UconfigInvisibleObject)
        this.gui = new UconfigCanopyUserGui();
        this.gui.set_mediator(this)
        this.group = new THREE.Group()
        this.external_objects = []
        this.external_objects_controllers = []

    }

    generateDynamicAccessers() {
        console.log("This should be overriden")
        const dynamic_accessers = [
            // new accesser('name', 'Menu do debugowania obiektu'),
            // new accesser('position_x'),
            // new accesser('position_y'),
            // new accesser('position_z'),
            // new accesser('rotation_y'),
            new accesser('object_width'),
            new accesser('object_depth')
        ]
        return dynamic_accessers

    }
    request_an_update() {
        /**
        *We are targeting the parent, that is the entire system,
        */

        // let targeted_parent=this.external_objects_controllers[0]

        let targeted_parent = this.external_objects_controllers[0];

        // Assuming that each object has a 'parent' property leading to its parent object
        while (targeted_parent && targeted_parent.status !== "niche_level" && targeted_parent.status !== "top_level") {
            targeted_parent = targeted_parent.external_objects_controllers[0];
        }

        // At this point, targeted_parent is either the top level object or null/undefined
        if (targeted_parent) {
            console.log("Found the top level object:", targeted_parent);
        } else {
            console.log("Top level object not found.");
        }

        let accessers = [

            // new accesser('object_width'),
            // new accesser('object_depth'),
            new accesser('object_height'),
            // new accesser('wall_color'),
        ]


        for (let i = 0; i < accessers.length; i++) {
            const val = targeted_parent.state.get(accessers[i].resource_locator, accessers[i].value);
            this.state.update(accessers[i].resource_locator, val);
        }


        accessers = [

            new accesser('object_width'),
            new accesser('object_depth'),
            new accesser('object_height'),
            new accesser('wall_color'),
        ]
        let accessers_assign = [

            new accesser('garage_width'),
            new accesser('garage_depth'),
            new accesser('garage_height'),
            new accesser('wall_color'),

        ]


        for (let i = 0; i < accessers.length; i++) {
            const val = targeted_parent.state.get(accessers[i].resource_locator, accessers[i].value);
            this.state.update(accessers_assign[i].resource_locator, val);
        }


        //Now you need to go down to find the roof
        let targeted_elements = targeted_parent.external_objects;
        targeted_parent = targeted_elements.find(element => element.status === "main_roof");
        accessers = [
            new accesser('roof_type'),
        ]
        accessers_assign = [

            new accesser('received_roof_type'),
        ]





        if (targeted_parent) {
            console.log("Found the element with status 'main_roof':", targeted_parent);
            for (let i = 0; i < accessers.length; i++) {
                const val = targeted_parent.state.get(accessers[i].resource_locator, accessers[i].value);
                this.state.update(accessers_assign[i].resource_locator, val);
            }
        } else {
            console.log("Element with status 'main_roof' not found.");
        }


    }

    determineState() {
        //You can get the current state of the object by using the 
        this.request_an_update()

        let received_roof_type = this.state.get('received_roof_type') || 'roof_type_1'



        //You need to figure the modifiers for the front,back, left and  right 
        //How to do that 
        //Request an update from the parent check the type of canopy added and then modify the height of children walls by some +adjustment

        let garage_width = parseFloat(this.state.get('garage_width')) || 3
        let garage_depth = parseFloat(this.state.get('garage_depth')) || 5
        let garage_height = parseFloat(this.state.get('garage_height')) || 2.13

        let name = this.state.get('name') || 'Wall'
        let object_type = this.state.get('object_type') || 'flat'
        let object_width = parseFloat(this.state.get('object_width')) || 3
        let object_height = parseFloat(this.state.get('object_height')) || 2.13
        let object_depth = parseFloat(this.state.get('object_depth')) || 4
        let object_color = this.state.get('wall_color') || "#FEFEFE"

        let debug_x = 0

        let targeted_wall_name = this.state.get('targeted_wall_name') || 'targeted_wall_name'

        let roof_slant = 5.5 * Math.PI / 180
        //The dimension of the top part of the roof 
        let roof_top_height = object_width * (1 / Math.cos(roof_slant))
        let roof_height = roof_top_height * Math.sin(roof_slant);

        //How high should the roof top extrude
        let garage_roof_top_height = object_width * (1 / Math.cos(roof_slant))
        let garage_roof_height = garage_roof_top_height * Math.sin(roof_slant) - 0.00;

        let modifier_front = 0
        let modifier_back = 0
        let modifier_left = 0
        let modifier_right = 0
        let modifier_general = 0

        // if (received_roof_type == "roof_type_1") {
        //     switch (targeted_wall_name) {
        //         case 'front':
        //             roof_top_height = garage_depth * (1 / Math.cos(roof_slant))
        //             roof_height = roof_top_height * Math.sin(roof_slant);
        //             //modify_accesser(state, 'position_y', +roof_height)
        //             modifier_front=roof_height
        //             break;
        //         case 'left':
        //             roof_top_height = (garage_depth - object_depth) * (1 / Math.cos(roof_slant))
        //             roof_height = roof_top_height * Math.sin(roof_slant);
        //             modifier_general=roof_height;
        //             //modify_accesser(state, 'position_y', roof_height / 2)

        //             break;
        //         case 'right':
        //             roof_top_height = (garage_depth - object_depth) * (1 / Math.cos(roof_slant))
        //             roof_height = roof_top_height * Math.sin(roof_slant);
        //             modifier_general=roof_height;
        //             // modify_accesser(state, 'position_y', roof_height / 2)
        //             break;
        //         case 'back':
        //             roof_top_height = object_depth * (1 / Math.cos(roof_slant))
        //             roof_height = roof_top_height * Math.sin(roof_slant);

        //             // modify_accesser(state, 'position_y', -roof_height)
        //             break;
        //     }
        // }
        // if (received_roof_type == "roof_type_3") {
        //     switch (targeted_wall_name) {
        //         case 'front':

        //             roof_top_height = object_depth * (1 / Math.cos(roof_slant))
        //             roof_height = roof_top_height * Math.sin(roof_slant);

        //             modify_accesser(state, 'position_y', -roof_height)


        //             break;
        //         case 'left':

        //             roof_top_height = (garage_depth - object_depth) * (1 / Math.cos(roof_slant))
        //             roof_height = roof_top_height * Math.sin(roof_slant);

        //             modify_accesser(state, 'position_y', roof_height / 2)


        //             break;
        //         case 'right':
        //             roof_top_height = (garage_depth - object_depth) * (1 / Math.cos(roof_slant))
        //             roof_height = roof_top_height * Math.sin(roof_slant);

        //             modify_accesser(state, 'position_y', roof_height / 2)
        //             break;
        //         case 'back':
        //             roof_top_height = garage_depth * (1 / Math.cos(roof_slant))
        //             roof_height = roof_top_height * Math.sin(roof_slant);
        //             modify_accesser(state, 'position_y', +roof_height)
        //             break;
        //     }
        // }
        // if (received_roof_type == "roof_type_2") {
        //     switch (targeted_wall_name) {
        //         case 'front':

        //             roof_top_height = (garage_width - object_width) * (1 / Math.cos(roof_slant))

        //             roof_height = roof_top_height * Math.sin(roof_slant);

        //             modify_accesser(state, 'position_y', -1*roof_height / 2)


        //             break;
        //         case 'left':

        //             roof_top_height = (object_width) * (1 / Math.cos(roof_slant))
        //             roof_height = roof_top_height * Math.sin(roof_slant);

        //             modify_accesser(state, 'position_y', -roof_height)


        //             break;
        //         case 'right':
        //             roof_top_height = (object_width) * (1 / Math.cos(roof_slant))
        //             roof_height = roof_top_height * Math.sin(roof_slant);

        //             modify_accesser(state, 'position_y', roof_height)
        //             break;
        //         case 'back':
        //             roof_top_height = (garage_width - object_width) * (1 / Math.cos(roof_slant))
        //             roof_height = roof_top_height * Math.sin(roof_slant);
        //             modify_accesser(state, 'position_y', +roof_height / 2)
        //             break;
        //     }
        // }
        // if (received_roof_type == "roof_type_4") {
        //     switch (targeted_wall_name) {
        //         case 'front':
        //             roof_top_height = (garage_width - object_width) * (1 / Math.cos(roof_slant))

        //             roof_height = roof_top_height * Math.sin(roof_slant);

        //             modify_accesser(state, 'position_y', +roof_height / 2)


        //             break;
        //         case 'left':

        //             roof_top_height = (garage_width) * (1 / Math.cos(roof_slant))
        //             roof_height = roof_top_height * Math.sin(roof_slant);

        //             modify_accesser(state, 'position_y', +roof_height)


        //             break;
        //         case 'right':
        //             roof_top_height = (object_width) * (1 / Math.cos(roof_slant))
        //             roof_height = roof_top_height * Math.sin(roof_slant);

        //             modify_accesser(state, 'position_y', -roof_height)
        //             break;
        //         case 'back':
        //             roof_top_height = (garage_width - object_width) * (1 / Math.cos(roof_slant))
        //             roof_height = roof_top_height * Math.sin(roof_slant);
        //             modify_accesser(state, 'position_y', +roof_height / 2)
        //             break;
        //     }
        // }

        if (received_roof_type == "roof_type_1") {
            switch (targeted_wall_name) {
                case "front":
                    this.state.update('position_z', +garage_depth / 2 + object_depth / 2 || -1.5 - 1.5)
                    object_width = parseFloat(this.state.get('object_width')) || 3
                    object_depth = parseFloat(this.state.get('object_depth')) || 4
                    roof_top_height = garage_depth * (1 / Math.cos(roof_slant))
                    roof_height = roof_top_height * Math.sin(roof_slant);
                    object_height = object_height + roof_height
                    break;
                case "back":

                    this.state.update('position_z', -garage_depth / 2 - object_depth / 2 || -1.5 - 1.5)
                    object_width = parseFloat(this.state.get('object_width')) || 3
                    object_depth = parseFloat(this.state.get('object_depth')) || 4

                    roof_top_height = object_depth * (1 / Math.cos(roof_slant))
                    roof_height = roof_top_height * Math.sin(roof_slant);





                    object_height = object_height - roof_height
                    break;
                case "left":
                    this.state.update('position_x', -garage_width / 2 - object_width / 2 || -1.5 - 1.5)
                    object_height = object_height + 0

                    roof_top_height = (garage_depth - object_depth) * (1 / Math.cos(roof_slant))
                    roof_height = roof_top_height * Math.sin(roof_slant);
                    object_height = object_height + roof_height / 2
                    // debug_x=-2*garage_width/2-object_width/2
                    break;
                case "right":
                    this.state.update('position_x', garage_width / 2 + object_width / 2 || 1.5 + 1.5)
                    // debug_x=garage_width/2+object_width/2
                    roof_top_height = (garage_depth - object_depth) * (1 / Math.cos(roof_slant))
                    roof_height = roof_top_height * Math.sin(roof_slant);
                    object_height = object_height + roof_height / 2
                    break;
            }

        }
        if (received_roof_type == "roof_type_3") {
            switch (targeted_wall_name) {

                case "front":

                    this.state.update('position_z', +garage_depth / 2 + object_depth / 2 || -1.5 - 1.5)
                    object_width = parseFloat(this.state.get('object_width')) || 3
                    object_depth = parseFloat(this.state.get('object_depth')) || 4
                    roof_top_height = object_depth * (1 / Math.cos(roof_slant))
                    roof_height = roof_top_height * Math.sin(roof_slant);
                    object_height = object_height - roof_height

                    break;

                case "back":
                    this.state.update('position_z', -garage_depth / 2 - object_depth / 2 || -1.5 - 1.5)
                    object_width = parseFloat(this.state.get('object_width')) || 3
                    object_depth = parseFloat(this.state.get('object_depth')) || 4

                    roof_top_height = garage_depth * (1 / Math.cos(roof_slant))
                    roof_height = roof_top_height * Math.sin(roof_slant);
                    object_height = object_height + roof_height
                    break;

                case "left":
                    this.state.update('position_x', -garage_width / 2 - object_width / 2 || -1.5 - 1.5)
                    object_height = object_height + 0

                    roof_top_height = (garage_depth - object_depth) * (1 / Math.cos(roof_slant))
                    roof_height = roof_top_height * Math.sin(roof_slant);
                    object_height = object_height + roof_height / 2
                    // debug_x=-2*garage_width/2-object_width/2
                    break;
                case "right":
                    this.state.update('position_x', garage_width / 2 + object_width / 2 || 1.5 + 1.5)
                    // debug_x=garage_width/2+object_width/2
                    roof_top_height = (garage_depth - object_depth) * (1 / Math.cos(roof_slant))
                    roof_height = roof_top_height * Math.sin(roof_slant);
                    object_height = object_height + roof_height / 2
                    break;
            }



        }


        if (received_roof_type == "roof_type_2") {
            switch (targeted_wall_name) {
                case "front":

                    this.state.update('position_z', +garage_depth / 2 + object_depth / 2 || -1.5 - 1.5)
                    object_width = parseFloat(this.state.get('object_width')) || 3
                    object_depth = parseFloat(this.state.get('object_depth')) || 4
                    roof_top_height = (garage_width - object_width) * (1 / Math.cos(roof_slant))
                    roof_height = roof_top_height * Math.sin(roof_slant);
                    object_height = object_height - roof_height / 2
                    break;
                case "back":

                    this.state.update('position_z', -garage_depth / 2 - object_depth / 2 || -1.5 - 1.5)
                    object_width = parseFloat(this.state.get('object_width')) || 3
                    object_depth = parseFloat(this.state.get('object_depth')) || 4

                    roof_top_height = (garage_width - object_width) * (1 / Math.cos(roof_slant))
                    roof_height = roof_top_height * Math.sin(roof_slant);





                    object_height = object_height - roof_height / 2
                    break;
                case "left":

                    {
                        this.state.update('position_x', -garage_width / 2 - object_width / 2 || -1.5 - 1.5)

                        roof_top_height = (object_width) * (1 / Math.cos(roof_slant))
                        roof_height = roof_top_height * Math.sin(roof_slant);
                        object_height = object_height - 2 * roof_height
                        // debug_x=-2*garage_width/2-object_width/2
                        break;
                    }
                case "right":
                    {
                        this.state.update('position_x', garage_width / 2 + object_width / 2 || 1.5 + 1.5)
                        // debug_x=garage_width/2+object_width/2
                        roof_top_height = (garage_width) * (1 / Math.cos(roof_slant))
                        roof_height = roof_top_height * Math.sin(roof_slant);
                        object_height = object_height + 0 * roof_height
                        break;
                    }
            }
        }

        if (received_roof_type == "roof_type_4") {
            switch (targeted_wall_name) {
                case "front":

                    this.state.update('position_z', +garage_depth / 2 + object_depth / 2 || -1.5 - 1.5)
                    object_width = parseFloat(this.state.get('object_width')) || 3
                    object_depth = parseFloat(this.state.get('object_depth')) || 4
                    roof_top_height = (garage_width - object_width) * (1 / Math.cos(roof_slant))
                    roof_height = roof_top_height * Math.sin(roof_slant);
                    object_height = object_height - roof_height / 2 - garage_roof_height
                    break;
                case "back":
                    {
                        this.state.update('position_z', -garage_depth / 2 - object_depth / 2 || -1.5 - 1.5)
                        object_width = parseFloat(this.state.get('object_width')) || 3
                        object_depth = parseFloat(this.state.get('object_depth')) || 4

                        roof_top_height = (garage_width - object_width) * (1 / Math.cos(roof_slant))
                        roof_height = roof_top_height * Math.sin(roof_slant);





                        object_height = object_height - roof_height / 2 - garage_roof_height
                        break;
                    }
                case "left":

                    {
                        this.state.update('position_x', -garage_width / 2 - object_width / 2 || -1.5 - 1.5)
                        roof_top_height = (garage_width - object_width) * (1 / Math.cos(roof_slant))
                        roof_height = roof_top_height * Math.sin(roof_slant);
                        object_height = object_height + 0 * roof_height / 2 - 0 * garage_roof_height / 2
                        // debug_x=-2*garage_width/2-object_width/2
                        break;
                    }
                case "right":
                    {
                        this.state.update('position_x', garage_width / 2 + object_width / 2 || 1.5 + 1.5)
                        object_width = parseFloat(this.state.get('object_width')) || 3
                        object_depth = parseFloat(this.state.get('object_depth')) || 4

                        roof_top_height = (garage_width + object_width) * (1 / Math.cos(roof_slant))
                        roof_height = roof_top_height * Math.sin(roof_slant);
                        object_height = object_height - 1 * roof_height - 2 * garage_roof_height
                        break;
                    }
            }
        }





        let debug_y = object_height / 2

        let lameled_wall_front = this.state.get('lameled_wall_front') || 'false'

        let lameled_wall_back = this.state.get('lameled_wall_back') || 'false'

        let lameled_wall_left = this.state.get('lameled_wall_left') || 'false'

        let lameled_wall_right = this.state.get('lameled_wall_right') || 'false'

        // this.state.update('position_x', 0 || 1.5+1.5)

        let texture_type = ""
        let material_type = this.state.get('material_type') || "material_type_1"
        let position_x = this.state.get('position_x') || 0
        let position_y = this.state.get('position_y') || 0
        let position_z = this.state.get('position_z') || 0

        let height = this.state.get('height') || 2.13
        let width = this.state.get('width') || 2.0
        let depth = this.state.get('depth') || 4.0

        // // object_height = height
        // // object_width = width
        // object_depth = depth

        //let object_angle=parseFloat(this.state.get('object_angle'))||30
        let sheet_depth = parseFloat(this.state.get('sheet_depth')) || 0.0075



        let modifier_left_wall = 0
        let modifier_right_wall = 0
        let modifier_front_wall = 0
        let modifier_back_wall = 0

        let
            modifier_front_pole_left = 0,
            modifier_front_pole_right = 0,
            modifier_back_pole_left = 0,
            modifier_back_pole_right = 0,
            modifier_right_pole_left = 0,
            modifier_right_pole_right = 0,
            modifier_left_pole_left = 0,
            modifier_left_pole_right = 0


        let orig_object_width = object_width
        let orig_object_depth = object_depth
        if (CANOPIES_AUTOMATIC) {
            switch (targeted_wall_name) {
                case "front":
                    {

                        object_width = garage_width
                        break;
                    }
                case "back":
                    {
                        object_width = garage_width
                        break;
                    }
                case "left":
                    {
                        object_depth = garage_depth
                        break;
                    }
                case "right":
                    {
                        object_depth = garage_depth
                        break;
                    }
            }
        }

        if (CANOPIES_AUTOMATIC) {
            if (received_roof_type == 'roof_type_1') {

                switch (targeted_wall_name) {
                    case "front":
                        {

                          
                            break;
                        }
                    case "back":
                        {
                            
                            break;
                        }
                    case "left":
                        {
                            
                            // modifier_front_pole_left = roof_height + garage_roof_height
                            // modifier_front_pole_right = roof_height
                             modifier_back_pole_left = -roof_height/2
                             modifier_back_pole_right = -roof_height/2
                             modifier_right_pole_left = -roof_height/2
                             //modifier_right_pole_right =-0.5
                            //  modifier_left_pole_left = -0.5
                            modifier_left_pole_right =-roof_height/2

                            break;
                        }
                    case "right":
                        {
                            modifier_back_pole_left = -roof_height/2
                            modifier_back_pole_right = -roof_height/2
                            modifier_right_pole_left = -roof_height/2
                            //modifier_right_pole_right =-0.5
                           //  modifier_left_pole_left = -0.5
                           modifier_left_pole_right =-roof_height/2
                            break;
                        }
                }


            }

            if (received_roof_type == 'roof_type_3') {

                switch (targeted_wall_name) {
                    case "front":
                        {

                          
                            break;
                        }
                    case "back":
                        {
                            
                            break;
                        }
                    case "left":
                        {
                            
                            // modifier_front_pole_left = roof_height + garage_roof_height
                            // modifier_front_pole_right = roof_height
                             modifier_back_pole_left = -roof_height/2
                             modifier_back_pole_right = -roof_height/2
                             modifier_right_pole_left = -roof_height/2
                             //modifier_right_pole_right =-0.5
                            //  modifier_left_pole_left = -0.5
                            modifier_left_pole_right =-roof_height/2

                            break;
                        }
                    case "right":
                        {
                            modifier_back_pole_left = -roof_height/2
                            modifier_back_pole_right = -roof_height/2
                            modifier_right_pole_left = -roof_height/2
                            //modifier_right_pole_right =-0.5
                           //  modifier_left_pole_left = -0.5
                           modifier_left_pole_right =-roof_height/2
                            break;
                        }
                }


            }

            if (received_roof_type == 'roof_type_2') {

                switch (targeted_wall_name) {
                    case "front":
                        {

                          
                            modifier_back_pole_left = roof_height/2
                            modifier_back_pole_right = roof_height/2
                            modifier_right_pole_left = roof_height/2
                      
                           modifier_left_pole_right =roof_height/2

                            modifier_front_pole_left = roof_height/2
                            modifier_front_pole_right =roof_height/2
                            modifier_right_pole_right =roof_height/2
                            modifier_left_pole_left = roof_height/2

                            break;
                        }
                    case "back":
                        {
                               
                            modifier_back_pole_left = roof_height/2
                            modifier_back_pole_right = roof_height/2
                            modifier_right_pole_left = roof_height/2
                      
                           modifier_left_pole_right =roof_height/2

                            modifier_front_pole_left = roof_height/2
                            modifier_front_pole_right =roof_height/2
                            modifier_right_pole_right =roof_height/2
                            modifier_left_pole_left = roof_height/2



                           
                        //    modifier_front_pole_left = -roof_height/2
                        //    modifier_front_pole_right =-roof_height/2
                        //    modifier_right_pole_right =-roof_height/2
                        //    modifier_left_pole_left = -roof_height/2
                            break;
                        }
                    case "left":
                        {
                            modifier_front_pole_left = roof_height
                            modifier_front_pole_right = roof_height,
                            modifier_back_pole_left =roof_height,
                            modifier_back_pole_right =roof_height,
                            modifier_right_pole_left =roof_height,
                            modifier_right_pole_right =roof_height,
                            modifier_left_pole_left =roof_height,
                            modifier_left_pole_right =roof_height
                
             
                            break;
                        }
                    case "right":
                        {
                            modifier_front_pole_left = roof_height
                            modifier_front_pole_right = roof_height,
                            modifier_back_pole_left =roof_height,
                            modifier_back_pole_right =roof_height,
                            modifier_right_pole_left =roof_height,
                            modifier_right_pole_right =roof_height,
                            modifier_left_pole_left =roof_height,
                            modifier_left_pole_right =roof_height
                            break;
                        }
                }


            }

            if (received_roof_type == 'roof_type_4') {

                switch (targeted_wall_name) {
                    case "front":
                        {

                          
                                  
                            modifier_back_pole_left = garage_roof_height+roof_height/2
                            modifier_back_pole_right = garage_roof_height+roof_height/2
                            modifier_right_pole_left = garage_roof_height+roof_height/2
                      
                           modifier_left_pole_right =garage_roof_height+roof_height/2

                            modifier_front_pole_left = garage_roof_height+roof_height/2
                            modifier_front_pole_right =garage_roof_height+roof_height/2
                            modifier_right_pole_right =garage_roof_height+roof_height/2
                            modifier_left_pole_left = garage_roof_height+roof_height/2

                            break;
                        }
                    case "back":
                        {
                                
                              
                            modifier_back_pole_left = garage_roof_height+roof_height/2
                            modifier_back_pole_right = garage_roof_height+roof_height/2
                            modifier_right_pole_left = garage_roof_height+roof_height/2
                      
                           modifier_left_pole_right =garage_roof_height+roof_height/2

                            modifier_front_pole_left = garage_roof_height+roof_height/2
                            modifier_front_pole_right =garage_roof_height+roof_height/2
                            modifier_right_pole_right =garage_roof_height+roof_height/2
                            modifier_left_pole_left = garage_roof_height+roof_height/2


                           
                        //    modifier_front_pole_left = -roof_height/2
                        //    modifier_front_pole_right =-roof_height/2
                        //    modifier_right_pole_right =-roof_height/2
                        //    modifier_left_pole_left = -roof_height/2
                            break;
                        }
                    case "left":
                        {
                            modifier_front_pole_left = garage_roof_height+roof_height
                            modifier_front_pole_right = garage_roof_height+roof_height,
                            modifier_back_pole_left =garage_roof_height+roof_height,
                            modifier_back_pole_right =garage_roof_height+roof_height,
                            modifier_right_pole_left =garage_roof_height+roof_height,
                            modifier_right_pole_right =garage_roof_height+roof_height,
                            modifier_left_pole_left =garage_roof_height+roof_height,
                            modifier_left_pole_right =garage_roof_height+roof_height
                
             
                            break;
                        }
                    case "right":
                        {
                                     modifier_front_pole_left = garage_roof_height+roof_height
                            modifier_front_pole_right = garage_roof_height+roof_height,
                            modifier_back_pole_left =garage_roof_height+roof_height,
                            modifier_back_pole_right =garage_roof_height+roof_height,
                            modifier_right_pole_left =garage_roof_height+roof_height,
                            modifier_right_pole_right =garage_roof_height+roof_height,
                            modifier_left_pole_left =garage_roof_height+roof_height,
                            modifier_left_pole_right =garage_roof_height+roof_height
                            break;
                        }
                }


            }


        }



        switch (received_roof_type) {


            case 'roof_type_1':
                break;

            case 'roof_type_2':
                break;

            case 'roof_type_3':
                break;

            case 'roof_type_4':

                // modifier_front_pole_left = roof_height + garage_roof_height
                // modifier_back_pole_right = roof_height + garage_roof_height
                // modifier_right_pole_left = roof_height + garage_roof_height
                // modifier_right_pole_right = roof_height + garage_roof_height

        
                // modifier_front_pole_right = roof_height + garage_roof_height
                // modifier_back_pole_left = roof_height + garage_roof_height
                // modifier_left_pole_left = roof_height + garage_roof_height
                // modifier_left_pole_right = roof_height + garage_roof_height

                break;

            default:
                break;

        }
        //  modifier_left_wall=roof_height
        //  modifier_right_wall=roof_height
        //  modifier_front_wall=roof_height
        //  modifier_back_wall=roof_height


        //Automatic resizing

        const accessersWallFront = [
            new accesser('name', name + "_fronts"),
            new accesser('width', object_width),
            new accesser('height', object_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', 0 + debug_x),
            new accesser('position_y', 0 + debug_y),
            new accesser('position_z', object_depth / 2),
            new accesser('color', object_color),
            // new accesser('position_relative', 'true'),
            new accesser('rotation_y', 0 * Math.PI),
            // new accesser('modifier_front', modifier_right_wall),
            // new accesser('modifier_back', modifier_back_wall),
            new accesser('modifier_left_pole', modifier_front_pole_left),
            new accesser('modifier_right_pole', modifier_front_pole_right),
            new accesser('lameled', lameled_wall_front)
        ]
        const accessersWallBack = [
            new accesser('name', name + "_back"),
            new accesser('width', object_width),
            new accesser('height', object_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', 0 + debug_x),
            new accesser('position_y', 0 + debug_y),
            new accesser('position_z', -object_depth / 2),
            new accesser('color', object_color),
            // new accesser('position_relative', 'true'),
            new accesser('rotation_y', 2 * Math.PI / 2),
            //  new accesser('modifier_front', modifier_right_wall),
            //  new accesser('modifier_back', modifier_back_wall),
            new accesser('modifier_left_pole', modifier_back_pole_left),
            new accesser('modifier_right_pole', modifier_back_pole_right),
            new accesser('lameled', lameled_wall_back)

        ]
        const accessersWallLeft = [
            new accesser('name', name + "_back"),
            new accesser('width', object_depth),
            new accesser('height', object_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', -object_width / 2 + 0 + debug_x),
            new accesser('position_y', 0 + debug_y),
            new accesser('position_z', -0 * object_depth / 2),
            new accesser('color', object_color),
            // new accesser('position_relative', 'true'),
            new accesser('rotation_y', -1 * Math.PI / 2),
            //  new accesser('modifier_front', modifier_right_wall),
            //  new accesser('modifier_back', modifier_back_wall),
            new accesser('modifier_left_pole', modifier_left_pole_left),
            new accesser('modifier_right_pole', modifier_left_pole_right),
            new accesser('lameled', lameled_wall_left)

        ]
        const accessersWallRight = [
            new accesser('name', name + "_back"),
            new accesser('width', object_depth),
            new accesser('height', object_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', object_width / 2 + 0 + debug_x),
            new accesser('position_y', 0 + debug_y),
            new accesser('position_z', -0 * object_depth / 2),
            new accesser('color', object_color),
            new accesser('rotation_y', Math.PI / 2),
            // new accesser('modifier_front', modifier_right_wall),
            // new accesser('modifier_back', modifier_back_wall),
            new accesser('modifier_left_pole', modifier_right_pole_left),
            new accesser('modifier_right_pole', modifier_right_pole_right),
            new accesser('lameled', lameled_wall_right)
            // new accesser('position_relative', 'true'),
            // new accesser('rotation_y',2* Math.PI/2),

        ]
        // const iterate=[accessersWallFront, accessersWallBack, accessersWallLeft, accessersWallRight  ]
        // iterate.forEach(accessersObject => {  
        //     const added_accesser = new accesser('material_type', material_type);
        //     accessersObject.push(added_accesser);
        // });



        return { "accessersWallFront": accessersWallFront, "accessersWallBack": accessersWallBack, "accessersWallLeft": accessersWallLeft, "accessersWallRight": accessersWallRight, }
    }
    generatePassiveObjects() {
        const { accessersWallFront, accessersWallBack, accessersWallLeft, accessersWallRight } = this.determineState();
        function selected_instance(accessers_wall) {
            const foundAccesser = accessers_wall.find(accesser => accesser.resource_locator === 'lameled');

            // If found, check its resource_locator value
            if (foundAccesser) {
                if (foundAccesser.value === true) { // Assuming resource_locator is a boolean. Adjust accordingly if it's another type.
                    // Do something
                    return UconfigsImplementationLameledWallController
                }
            }
            return UconfigsImplementationWallController



        }

        let array = [
            { objectOptions: accessersWallFront, classInstance: selected_instance(accessersWallFront) },
            { objectOptions: accessersWallBack, classInstance: selected_instance(accessersWallBack) },
            { objectOptions: accessersWallLeft, classInstance: selected_instance(accessersWallLeft) },
            { objectOptions: accessersWallRight, classInstance: selected_instance(accessersWallRight) }
        ]
        return array
    }
}

class UconfigsImplementationWallController extends UconfigsController {
    constructor() {
        super()
        this.setModel(UconfigInvisibleObject)
        this.gui = new UconfigDebugGui();
        this.gui.set_mediator(this)
        this.group = new THREE.Group()
        this.external_objects = []
        this.external_objects_controllers = []

    }
    request_an_update() {



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

        let texture_type = ""
        let material_type = this.state.get('material_type') || "material_type_1"
        let position_x = this.state.get('position_x') || 0
        let position_y = this.state.get('position_y') || 0
        let position_z = this.state.get('position_z') || 0

        let height = this.state.get('height') || 2.13
        let width = this.state.get('width') || 4.0
        let depth = this.state.get('depth') || 4.0


        let mod_left = 1 * this.state.get('modifier_left_pole') || 0.0
        let mod_right = 1 * this.state.get('modifier_right_pole') || 0.0

        object_height = height
        object_width = width
        object_depth = depth
        //let object_angle=parseFloat(this.state.get('object_angle'))||30

        let canopy_support_width = this.state.get('canopy_support_width') || 0.1

        let canopy_support_bottom_height = this.state.get('canopy_support_width') || 0.1

        //let object_angle=parseFloat(this.state.get('object_angle'))||30

        let sheet_depth = parseFloat(this.state.get('sheet_depth')) || 0.0075

        const spacing = parseFloat(this.state.get('spacing')) || 0.23

        const accessersPoleLeft = [
            new accesser('name', name + "_fronts"),
            new accesser('width', canopy_support_width),
            new accesser('height', object_height + mod_left),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', object_width / 2 - canopy_support_width / 2),
            new accesser('position_y', mod_left / 2),
            new accesser('position_z', 0),
            new accesser('color', object_color),
            new accesser('position_relative', 'true'),
        ]
        const accessersPoleRight = [
            new accesser('name', name + "_fronts"),
            new accesser('width', canopy_support_width),
            new accesser('height', object_height + mod_right),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', -object_width / 2 + canopy_support_width / 2),
            new accesser('position_y', mod_right / 2),
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
            new accesser('position_y', -object_height / 2 + canopy_support_bottom_height / 2),
            new accesser('position_z', 0),
            new accesser('color', object_color),
            new accesser('position_relative', 'true'),
        ]


        const iterate = [accessersPoleLeft, accessersPoleRight, accessersPoleBottom]
        iterate.forEach(accessersObject => {
            const added_accesser = new accesser('material_type', material_type);
            accessersObject.push(added_accesser);
        });



        return { "accessersPoleLeft": accessersPoleLeft, "accessersPoleRight": accessersPoleRight, "accessersPoleBottom": accessersPoleBottom }
    }
    generatePassiveObjects() {
        const { accessersPoleLeft, accessersPoleRight, accessersPoleBottom } = this.determineState();

        let array = [
            // { objectOptions: accessersWallFront, classInstance:SimpleController},
            { objectOptions: accessersPoleLeft, classInstance: SimpleController },
            { objectOptions: accessersPoleRight, classInstance: SimpleController },
            { objectOptions: accessersPoleBottom, classInstance: SimpleController },

            // { objectOptions: accessersWallLeft, classInstance: SimpleController  },
            // { objectOptions: accessersWallRight, classInstance: SimpleController }
        ]
        return array
    }
}
class UconfigsImplementationLameledWallController extends UconfigsController {
    constructor() {
        super()
        this.setModel(UconfigInvisibleObject)
        this.gui = new UconfigDebugGui();
        this.gui.set_mediator(this)
        this.group = new THREE.Group()
        this.external_objects = []
        this.external_objects_controllers = []

    }
    request_an_update() {



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

        let texture_type = ""
        let material_type = this.state.get('material_type') || "material_type_1"
        let position_x = this.state.get('position_x') || 0
        let position_y = this.state.get('position_y') || 0
        let position_z = this.state.get('position_z') || 0

        let height = this.state.get('height') || 2.13
        let width = this.state.get('width') || 4.0
        let depth = this.state.get('depth') || 4.0


        let mod_left = 1 * this.state.get('modifier_left_pole') || 0.0
        let mod_right = 1 * this.state.get('modifier_right_pole') || 0.0

        object_height = height
        object_width = width
        object_depth = depth
        //let object_angle=parseFloat(this.state.get('object_angle'))||30

        let canopy_support_width = this.state.get('canopy_support_width') || 0.1

        let canopy_support_bottom_height = this.state.get('canopy_support_width') || 0.23

        //let object_angle=parseFloat(this.state.get('object_angle'))||30
        let sheet_depth = parseFloat(this.state.get('sheet_depth')) || 0.0075

        let spacing = parseFloat(this.state.get('spacing')) || 0.28

        const accessersPoleLeft = [
            new accesser('name', name + "_fronts"),
            new accesser('width', canopy_support_width),
            new accesser('height', object_height + mod_left),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', object_width / 2 - canopy_support_width / 2),
            new accesser('position_y', mod_left / 2),
            new accesser('position_z', 0),
            new accesser('color', object_color),
            new accesser('position_relative', 'true'),
        ]
        const accessersPoleRight = [
            new accesser('name', name + "_fronts"),
            new accesser('width', canopy_support_width),
            new accesser('height', object_height + mod_right),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', -object_width / 2 + canopy_support_width / 2),
            new accesser('position_y', mod_right / 2),
            new accesser('position_z', 0),
            new accesser('color', object_color),
            new accesser('position_relative', 'true'),
        ]

        const accessersPoleBottomTemplate = [
            new accesser('name', name + "_fronts"),
            new accesser('width', object_width),
            new accesser('height', canopy_support_bottom_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', 0),
            new accesser('position_y', -object_height / 2 + canopy_support_bottom_height / 2),
            new accesser('position_z', 0),
            new accesser('color', object_color),
            new accesser('position_relative', 'true'),
        ];

        let accessersPoleBottomArray = [];
        let lowerPart = Math.min(object_height + mod_right, object_height + mod_left)



        let amountOfLamels = Math.floor(lowerPart / (spacing));
        for (let i = 0; i < amountOfLamels; i++) {
            let newPoleBottom = [...accessersPoleBottomTemplate];
            newPoleBottom.push(new accesser('position_y', -object_height / 2 + canopy_support_bottom_height / 2 + spacing * i));
            accessersPoleBottomArray.push(newPoleBottom);
        }


        let spaceOccupied = spacing * amountOfLamels;
        let remainingSpace = lowerPart - spaceOccupied;
        if (remainingSpace > 0) {
            let finalLamel = [...accessersPoleBottomTemplate];
            finalLamel.push(new accesser('position_y', -object_height / 2 + spaceOccupied + remainingSpace / 2));
            finalLamel.push(new accesser('height', remainingSpace));
            accessersPoleBottomArray.push(finalLamel);
        }


        let iterate = [accessersPoleLeft, accessersPoleRight, ...accessersPoleBottomArray];
        iterate.forEach(accessersObject => {
            const added_accesser = new accesser('material_type', material_type);
            accessersObject.push(added_accesser);
        });

        return {
            accessersPoleLeft,
            accessersPoleRight,
            ...accessersPoleBottomArray.reduce((acc, val, index) => ({ ...acc, [`accessersPoleBottom${index + 1}`]: val }), {})
        };
    }

    generatePassiveObjects() {
        const determinedState = this.determineState();
        let n = Object.keys(determinedState).length - 2;
        let array = [
            { objectOptions: determinedState.accessersPoleLeft, classInstance: SimpleController },
            { objectOptions: determinedState.accessersPoleRight, classInstance: SimpleController },
            ...Array.from({ length: n }, (_, i) => ({ objectOptions: determinedState[`accessersPoleBottom${i + 1}`], classInstance: SimpleController }))
        ];

        return array;
    }
}


export { UconfigsImplementationCanopyController, UconfigsImplementationSecondaryCanopyController }