import { v4 as uuidv4 } from 'uuid';
import { accesser, GLOBAL_ORIENTATION, CANOPIES_AUTOMATIC } from '../../base.js'
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { Generic, genericGui, genericState, genericObject, genericDisplay, genericController } from '../../base.js'
import { CubeObject, UconfigObject, WallGarageObject, UconfigInvisibleObject, genericGarageObject, DoubleCubeObject } from '../base/object.js'
import { UconfigInvisibleGui, UconfigGui, UconfigDebugGui } from '../base/gui.js'
import {
    UconfigController, CubeController, RedCubeController,
    WallGarageController, groupGenericGarageController, genericGarageController
} from '../base/controller.js'
import { UconfigsController } from '../base/controller.js'

//Good reference file

import { UconfigImplementationRoofGui } from './gui.js'
import { SimpleController, RoofSideLeftController, RoofSideRightController, RoofSideSquareController, RoofTopController } from './controller.js'
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

class UconfigsImplementationRoofsController extends UconfigsController {
    constructor() {
        super()
        this.setModel(UconfigInvisibleObject)
        this.gui = new UconfigImplementationRoofGui();
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
    }

    determineState() {
        //You can get the current state of the object by using the 
        //Todo
        // this.state.state.position_y=2

        this.request_an_update()


        this.state.update('position_y', parseFloat(this.state.get('object_height')) || 2.13)

        let roof_type = this.state.get('roof_type') || 'roof_type_1'
        //Different default


        let name = this.state.get('name') || 'Wall'
        let object_type = this.state.get('object_type') || 'flat'
        let object_width = parseFloat(this.state.get('object_width')) || 3
        let object_height = parseFloat(this.state.get('object_height')) || 2.13
        let object_depth = parseFloat(this.state.get('object_depth')) || 4
        let object_color = this.state.get('object_color') || "#888492"

        let texture_type = ""

        let material_type = this.state.get('material_type') || "material_type_1"
        if (GLOBAL_ORIENTATION == "SIDEWAYS") {
            material_type = this.state.get('material_type') || "material_type_2"
        }


        let roof_material_type = this.state.get('roof_material_type') || "material_type_1"
        if (GLOBAL_ORIENTATION == "SIDEWAYS") {
            roof_material_type = this.state.get('roof_material_type') || "material_type_7"
        }

        let position_x = this.state.get('position_x') || 0
        let position_y = this.state.get('position_y') || 2.13
        let position_z = this.state.get('position_z') || 0

        let garage_height = parseFloat(this.state.get('object_height')) || 2.13
        let garage_depth = parseFloat(this.state.get('object_height')) || 4
        let garage_width = parseFloat(this.state.get('object_height')) || 3

        let targeted_wall_name = this.state.get('targeted_wall_name') || undefined
        if (CANOPIES_AUTOMATIC) {
                switch (targeted_wall_name) {
                    case "front":
                        {
                            object_width = parseFloat(this.state.get('garage_width')) || 3
                            break;
                        }
                    case "back":
                        {
                            object_width = parseFloat(this.state.get('garage_width')) || 3
                            break;
                        }
                    case "left":
                        {
                            object_depth = parseFloat(this.state.get('garage_depth')) || 3
                            break;
                        }
                    case "right":
                        {
                            object_depth = parseFloat(this.state.get('garage_depth')) || 3
                            break;
                        }
                    default:
                        break;
                }
        }

        // let height = this.state.get('height') || 2.13
        // let width = this.state.get('width') || 4.0
        // let depth = this.state.get('depth') || 4.0
        // object_height = height
        // object_width = width
        // object_depth = depth
        //let object_angle=parseFloat(this.state.get('object_angle'))||30

        switch (roof_type) {

            case "roof_type_1":
                this.state.state['rotation_y'] = 0
                console.log("The roof type is flat.");
                break;
            case "roof_type_2":
                {
                    this.state.state['rotation_y'] = Math.PI / 2
                    const hold_width = object_width
                    const hold_depth = object_depth
                    object_width = hold_depth
                    object_depth = hold_width
                    console.log("The roof type is gabled.");
                    break;
                }
            case "roof_type_3":
                {
                    this.state.state['rotation_y'] = 2 * Math.PI / 2

                    break;
                }
            case "roof_type_4": {

                this.state.state['rotation_y'] = 3 * Math.PI / 2

                console.log("The roof type is hipped.");
                const hold_width = object_width
                const hold_depth = object_depth
                object_width = hold_depth
                object_depth = hold_width

                console.log("The roof type is hipped.");
                break;
            }
            // case "roof_type_5": {

            //     this.state.state['rotation_y'] = 3 * Math.PI / 2

            //     console.log("The roof type is slanted.");
            //     const hold_width = object_width
            //     const hold_depth = object_depth
            //     object_width = hold_depth
            //     object_depth = hold_width

            //     console.log("The roof type is slanted");
            //     break;
            // }
            // case "roof_type_6": {

            //     this.state.state['rotation_y'] = 2 * Math.PI / 2

            //     console.log("The roof type is slanted");
            //     const hold_width = object_width
            //     const hold_depth = object_depth
            //     object_width = hold_depth
            //     object_depth = hold_width

            //     console.log("The roof type is hipped.");
            //     break;
            // }
            default:
                console.log("Unknown roof type.");

        }
        let sheet_depth = parseFloat(this.state.get('sheet_depth')) || 0.0075

        let roof_slant = 5.5 * Math.PI / 180
        //The dimension of the top part of the roof 
        let roof_top_height = object_depth * (1 / Math.cos(roof_slant))
        let y_displacement = roof_top_height * Math.sin(roof_slant)

        //How high should the roof top extrude
        let roof_height = object_depth * Math.sin(roof_slant);
        //TODO add the material type heres
        let wall_color = (this.state.get('wall_color')) || "#FFFFFF";


 



        let accessersWallFront = [
            new accesser('name', name + "Debug target"),
            new accesser('width', object_width),
            new accesser('height', roof_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', 0),
            new accesser('position_y', 0),
            new accesser('position_z', object_depth / 2),
            new accesser('color', object_color),
            new accesser('wall_color', wall_color),
            new accesser('position_relative', 'true'),
            new accesser('rotation_y', 0),
        ]
        let accessersWallBack = [
            new accesser('name', name + "back"),
            new accesser('width', object_width),
            new accesser('height', roof_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', 0),
            new accesser('position_y', 0),
            new accesser('position_z', -garage_depth / 2),
            new accesser('color', object_color),
            new accesser('wall_color', wall_color),
            new accesser('position_relative', 'true'),
            new accesser('rotation_y', Math.PI),

        ]
        let accessersWallLeft = [
            new accesser('name', name + "left"),
            new accesser('width', object_depth),
            new accesser('height', roof_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', -object_width / 2),
            new accesser('position_y', 0),
            new accesser('position_z', 0),
            new accesser('color', object_color),
            new accesser('wall_color', wall_color),
            new accesser('position_relative', 'true'),
            new accesser('rotation_y', -Math.PI / 2),

        ]
        let accessersWallRight = [
            new accesser('name', name + "right"),
            new accesser('wall_color', "#FF0000"),
            new accesser('width', object_depth),
            new accesser('height', roof_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', object_width / 2),
            new accesser('position_y', 0),
            new accesser('position_z', 0),
            new accesser('right_piece', true),
            new accesser('color', object_color),
            new accesser('wall_color', wall_color),
            new accesser('position_relative', 'true'),
            new accesser('rotation_y', Math.PI / 2),


        ]
        let accessersWallTop = [
            new accesser('name', name + "_back"),
            new accesser('width', object_width),
            new accesser('height', roof_top_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', 0),
            //      new accesser('position_y', object_height+y_displacement/2),
            new accesser('position_y', y_displacement / 2),
            new accesser('position_z', 0),
            new accesser('color', object_color),
            new accesser('position_relative', 'true'),
            new accesser('rotation_y', 0),
            new accesser('roof_material_type', roof_material_type),
            new accesser('rotation_x', -Math.PI / 2 - roof_slant),


        ]
        let accessersWallLeft2 = [
            new accesser('name', name + "left"),
            new accesser('width', 0.001),
            new accesser('height', 0.0001),

            new accesser('position_y', - 10),


        ]
        let accessersWallRight2 = [
            new accesser('name', name + "left"),
            new accesser('width', 0.001),
            new accesser('height', 0.0001),

            new accesser('position_y', - 10),


        ]
        let accessersWallTop2 = [
            new accesser('name', name + "left"),
            new accesser('width', 0.001),
            new accesser('height', 0.0001),
            new accesser('position_y', - 10),


        ]



        switch (roof_type) {
            case "roof_type_5": {
                // object_depth=object_depth/2
                let roof_object_depth = object_depth / 2
                y_displacement = roof_top_height * Math.sin(roof_slant) / 2
                this.state.state['rotation_y'] = 0 * Math.PI / 2
                var GOBACKTO_variable = 1
                accessersWallLeft = [
                    new accesser('name', name + "left"),
                    new accesser('width', roof_object_depth),
                    new accesser('height', roof_height / 2),
                    new accesser('sheet_depth', sheet_depth),
                    new accesser('segments', 1),
                    new accesser('radius', 0.01),
                    new accesser('position_x', -object_width / 2),
                    new accesser('position_y', 0),
                    new accesser('position_z', -roof_object_depth / 2),
                    new accesser('texture_offset', GOBACKTO_variable),
                    new accesser('color', object_color),
                    new accesser('wall_color', wall_color),
                    new accesser('position_relative', 'true'),
                    new accesser('rotation_y', -Math.PI / 2),

                ]
                accessersWallRight = [
                    new accesser('name', name + "right"),
                    new accesser('wall_color', "#FF0000"),
                    new accesser('width', roof_object_depth),
                    new accesser('height', roof_height / 2),
                    new accesser('sheet_depth', sheet_depth),
                    new accesser('segments', 1),
                    new accesser('radius', 0.01),
                    new accesser('position_x', object_width / 2),
                    new accesser('position_y', 0),
                    new accesser('position_z', -roof_object_depth / 2),
                    new accesser('texture_offset', GOBACKTO_variable),
                    new accesser('right_piece', true),
                    new accesser('color', object_color),
                    new accesser('wall_color', wall_color),
                    new accesser('position_relative', 'true'),
                    new accesser('rotation_y', Math.PI / 2),


                ]

                accessersWallTop = [
                    new accesser('name', name + "_back"),
                    new accesser('width', object_width),
                    new accesser('height', roof_top_height / 2),
                    new accesser('sheet_depth', sheet_depth),
                    new accesser('segments', 1),
                    new accesser('radius', 0.01),
                    new accesser('position_x', 0),

                    new accesser('position_y', y_displacement / 2),
                    new accesser('position_z', -roof_object_depth / 2),
                    new accesser('color', object_color),
                    new accesser('position_relative', 'true'),
                    new accesser('rotation_y', 0),
                    new accesser('roof_material_type', roof_material_type),
                    new accesser('rotation_x', -Math.PI / 2 - roof_slant),


                ]

                accessersWallTop2 = [
                    new accesser('name', name + "_back"),
                    new accesser('width', object_width),
                    new accesser('height', roof_top_height / 2),
                    new accesser('sheet_depth', sheet_depth),
                    new accesser('segments', 1),
                    new accesser('radius', 0.01),
                    new accesser('position_x', 0),
                    //      new accesser('position_y', object_height+y_displacement/2),
                    new accesser('position_y', y_displacement / 2),
                    new accesser('position_z', roof_object_depth / 2),
                    new accesser('color', object_color),
                    new accesser('position_relative', 'true'),
                    new accesser('rotation_y', 0),
                    new accesser('roof_material_type', roof_material_type),
                    new accesser('rotation_x', -Math.PI / 2 + roof_slant),


                ]
                accessersWallLeft2 = [
                    new accesser('name', name + "left"),
                    new accesser('width', roof_object_depth),
                    new accesser('height', roof_height / 2),
                    new accesser('sheet_depth', sheet_depth),
                    new accesser('segments', 1),
                    new accesser('radius', 0.01),
                    new accesser('position_x', -object_width / 2),
                    new accesser('position_y', 0),
                    new accesser('position_z', roof_object_depth / 2),
                    new accesser('color', object_color),
                    new accesser('wall_color', wall_color),
                    new accesser('position_relative', 'true'),
                    new accesser('rotation_y', -Math.PI / 2),

                ]
                accessersWallRight2 = [
                    new accesser('name', name + "right"),
                    new accesser('wall_color', "#FF0000"),
                    new accesser('width', roof_object_depth),
                    new accesser('height', roof_height / 2),
                    new accesser('sheet_depth', sheet_depth),
                    new accesser('segments', 1),
                    new accesser('radius', 0.01),
                    new accesser('position_x', object_width / 2),
                    new accesser('position_y', 0),
                    new accesser('position_z', roof_object_depth / 2),
                    new accesser('right_piece', true),
                    new accesser('color', object_color),
                    new accesser('wall_color', wall_color),
                    new accesser('position_relative', 'true'),
                    new accesser('rotation_y', Math.PI / 2),


                ]
                accessersWallFront = [
                    new accesser('name', name + "_back"),
                    new accesser('width', 0.0001),
                    new accesser('height', 0.0001),
                    new accesser('sheet_depth', sheet_depth),
                    new accesser('segments', 1),
                    new accesser('radius', 0.01),
                    new accesser('position_x', 0),
                    //      new accesser('position_y', object_height+y_displacement/2),
                    new accesser('position_y', -10),
                    new accesser('position_z', -5.0),
                    new accesser('color', object_color),
                    new accesser('position_relative', 'true'),
                    new accesser('rotation_y', 0),
                    new accesser('roof_material_type', roof_material_type),
                    new accesser('rotation_x', -Math.PI / 2 - roof_slant),


                ]
                break;
            }
            case "roof_type_6":
                {

                    this.state.state['rotation_y'] = 1 * Math.PI / 2

                    console.log("The roof type is hipped.");
                    const hold_width = object_width
                    const hold_depth = object_depth
                    object_width = hold_depth
                    object_depth = hold_width

                    // object_depth=object_depth/2
                    let roof_object_depth = object_depth / 2

                    let roof_height = object_depth * Math.sin(roof_slant);
                    let roof_top_height = object_depth * (1 / Math.cos(roof_slant))
                    y_displacement = roof_top_height * Math.sin(roof_slant) / 2

                    accessersWallLeft = [
                        new accesser('name', name + "left"),
                        new accesser('width', roof_object_depth),
                        new accesser('height', roof_height / 2),
                        new accesser('sheet_depth', sheet_depth),
                        new accesser('segments', 1),
                        new accesser('radius', 0.01),
                        new accesser('position_x', -object_width / 2),
                        new accesser('position_y', 0),
                        new accesser('position_z', -roof_object_depth / 2),
                        new accesser('color', object_color),
                        new accesser('wall_color', wall_color),
                        new accesser('position_relative', 'true'),
                        new accesser('rotation_y', -Math.PI / 2),

                    ]
                    var GOBACKTO_variable = 1
                    accessersWallRight = [
                        new accesser('name', name + "right"),
                        new accesser('wall_color', "#FF0000"),
                        new accesser('width', roof_object_depth),
                        new accesser('height', roof_height / 2),
                        new accesser('sheet_depth', sheet_depth),
                        new accesser('segments', 1),
                        new accesser('radius', 0.01),
                        new accesser('position_x', object_width / 2),
                        new accesser('position_y', 0),
                        new accesser('position_z', -roof_object_depth / 2),
                        new accesser('texture_offset', GOBACKTO_variable),
                        new accesser('right_piece', true),
                        new accesser('color', object_color),
                        new accesser('wall_color', wall_color),
                        new accesser('position_relative', 'true'),
                        new accesser('rotation_y', Math.PI / 2),


                    ]

                    accessersWallTop = [
                        new accesser('name', name + "_back"),
                        new accesser('width', object_width),
                        new accesser('height', roof_top_height / 2),
                        new accesser('sheet_depth', sheet_depth),
                        new accesser('segments', 1),
                        new accesser('radius', 0.01),
                        new accesser('position_x', 0),

                        new accesser('position_y', y_displacement / 2),
                        new accesser('position_z', -roof_object_depth / 2),
                        new accesser('color', object_color),
                        new accesser('position_relative', 'true'),
                        new accesser('rotation_y', 0),
                        new accesser('roof_material_type', roof_material_type),
                        new accesser('rotation_x', -Math.PI / 2 - roof_slant),


                    ]

                    accessersWallTop2 = [
                        new accesser('name', name + "_back"),
                        new accesser('width', object_width),
                        new accesser('height', roof_top_height / 2),
                        new accesser('sheet_depth', sheet_depth),
                        new accesser('segments', 1),
                        new accesser('radius', 0.01),
                        new accesser('position_x', 0),
                        //      new accesser('position_y', object_height+y_displacement/2),
                        new accesser('position_y', y_displacement / 2),
                        new accesser('position_z', roof_object_depth / 2),
                        new accesser('color', object_color),
                        new accesser('position_relative', 'true'),
                        new accesser('rotation_y', 0),
                        new accesser('roof_material_type', roof_material_type),
                        new accesser('rotation_x', -Math.PI / 2 + roof_slant),


                    ]

                    accessersWallLeft2 = [
                        new accesser('name', name + "left"),
                        new accesser('width', roof_object_depth),
                        new accesser('height', roof_height / 2),
                        new accesser('sheet_depth', sheet_depth),
                        new accesser('segments', 1),
                        new accesser('radius', 0.01),
                        new accesser('position_x', -object_width / 2),
                        new accesser('position_y', 0),
                        new accesser('position_z', roof_object_depth / 2),
                        new accesser('color', object_color),
                        new accesser('wall_color', wall_color),
                        new accesser('texture_offset', GOBACKTO_variable),
                        new accesser('position_relative', 'true'),
                        new accesser('rotation_y', -Math.PI / 2),

                    ]
                    accessersWallRight2 = [
                        new accesser('name', name + "right"),
                        new accesser('wall_color', "#FF0000"),
                        new accesser('width', roof_object_depth),
                        new accesser('height', roof_height / 2),
                        new accesser('sheet_depth', sheet_depth),
                        new accesser('segments', 1),
                        new accesser('radius', 0.01),
                        new accesser('position_x', object_width / 2),
                        new accesser('position_y', 0),
                        new accesser('position_z', roof_object_depth / 2),
                        new accesser('right_piece', true),
                        new accesser('color', object_color),
                        new accesser('wall_color', wall_color),
                        new accesser('position_relative', 'true'),
                        new accesser('rotation_y', Math.PI / 2),


                    ]
                    accessersWallFront = [
                        new accesser('name', name + "_back"),
                        new accesser('width', 0.0001),
                        new accesser('height', 0.0001),
                        new accesser('sheet_depth', sheet_depth),
                        new accesser('segments', 1),
                        new accesser('radius', 0.01),
                        new accesser('position_x', 0),
                        //      new accesser('position_y', object_height+y_displacement/2),
                        new accesser('position_y', -10),
                        new accesser('position_z', -5.0),
                        new accesser('color', object_color),
                        new accesser('position_relative', 'true'),
                        new accesser('rotation_y', 0),
                        new accesser('roof_material_type', roof_material_type),
                        new accesser('rotation_x', -Math.PI / 2 - roof_slant),


                    ]
                    break
                }

        }




        const iterate = [
            accessersWallFront,
            accessersWallBack,
            accessersWallLeft,
            accessersWallLeft2,
            accessersWallRight,
            accessersWallRight2
        ]
        iterate.forEach(accessersObject => {
            const added_accesser = new accesser('material_type', material_type);
            accessersObject.push(added_accesser);
        });



        return {
            "accessersWallFront": accessersWallFront,
            "accessersWallBack": accessersWallBack,
            "accessersWallLeft": accessersWallLeft,
            "accessersWallRight": accessersWallRight,
            "accessersWallTop": accessersWallTop,
            "accessersWallTop2": accessersWallTop2,
            "accessersWallLeft2": accessersWallLeft2,
            "accessersWallRight2": accessersWallRight2
        }
    }
    generatePassiveObjects() {
        let { accessersWallFront, accessersWallBack, accessersWallLeft, accessersWallRight, accessersWallTop, accessersWallTop2, accessersWallLeft2, accessersWallRight2 } = this.determineState();

        if (!accessersWallTop2) {

            accessersWallLeft2 = [
                new accesser('name', name + "left"),
                new accesser('width', 0.001),
                new accesser('height', 0.0001),

                new accesser('position_y', - 10),


            ]

            accessersWallRight2 = [
                new accesser('name', name + "left"),
                new accesser('width', 0.001),
                new accesser('height', 0.0001),

                new accesser('position_y', - 10),



            ]
            accessersWallTop2 = [
                new accesser('name', name + "left"),
                new accesser('width', 0.001),
                new accesser('height', 0.0001),
                new accesser('position_y', - 10),


            ]
        }

        let array = [
            { objectOptions: accessersWallFront, classInstance: UconfigsImplementationRoofSupportSideSquareController },
            { objectOptions: accessersWallLeft, classInstance: UconfigsImplementationRoofSupportSideLeftController },
            { objectOptions: accessersWallRight, classInstance: UconfigsImplementationRoofSupportSideRightController },
            { objectOptions: accessersWallTop, classInstance: UconfigsImplementationRoofTopController },
            { objectOptions: accessersWallTop2, classInstance: UconfigsImplementationRoofTopController },
            { objectOptions: accessersWallRight2, classInstance: UconfigsImplementationRoofSupportSideLeftController },
            { objectOptions: accessersWallLeft2, classInstance: UconfigsImplementationRoofSupportSideRightController },
        ]


        // const accessersWallTop2 = [...accessersWallTop]

        // accessersWallTop2.push(new accesser('rotation_x', 1.6667894356545847 ))
        // accessersWallTop2.push( new accesser('position_z',1.5))


        return array
    }
    adjust_position(garage_width = 0, garage_depth = 0, garage_height = 2.13) {
        this.state.update('position_y', garage_height)

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
class UconfigsImplementationSecondaryRoofsController extends UconfigsImplementationRoofsController {
    constructor() {
        super()
    }

    request_an_update() {
        /**
        *We are targeting the parent, that is the entire system,
        */
        let targeted_parent, accessers, accessers_assign



        targeted_parent = this.request_find_element('top_level')
        // At this point, targeted_parent is either the top level object or null/undefined
        accessers = [
            new accesser('object_width'),
            new accesser('object_depth'),
            new accesser('object_height'),
            new accesser('wall_color'),
            new accesser('material_type')
        ]

        accessers_assign = [
            new accesser('garage_width'),
            new accesser('garage_depth'),
            new accesser('garage_height'),
            new accesser('wall_color'),
            new accesser('material_type')
        ]

        this.request_update_state(targeted_parent, accessers, accessers_assign)

        //Dont copy this part into different implementations


        //Now you need to go down to find the roof
        let targeted_elements = targeted_parent.external_objects;

        if (targeted_parent.status === "niche_level") {

            targeted_parent = targeted_elements.find(element => element.status === "niche_roof");
        }
        else {
            targeted_parent = targeted_elements.find(element => element.status === "niche_roof");
        }

        accessers = [

            // new accesser('object_width'),
            // new accesser('object_depth'),
            // new accesser('object_height'),
            new accesser('wall_color'),
            new accesser('object_color'),
            new accesser('roof_type'),
            new accesser('roof_material_type')
        ]

        if (targeted_parent) {
            console.log("Found the element with status 'main_roof':", targeted_parent);
            for (let i = 0; i < accessers.length; i++) {
                const val = targeted_parent.state.get(accessers[i].resource_locator, accessers[i].value);
                this.state.update(accessers[i].resource_locator, val);
            }

        } else {
            console.log("Element with status 'main_roof' not found.");
        }

        targeted_parent = this.external_objects_controllers[0]

        accessers = [

            new accesser('object_width'),
            new accesser('object_depth'),
            new accesser('object_height'),
            new accesser('wall_color'),
            new accesser('targeted_wall_name')
        ]


        for (let i = 0; i < accessers.length; i++) {
            const val = targeted_parent.state.get(accessers[i].resource_locator, accessers[i].value);
            this.state.update(accessers[i].resource_locator, val);
        }







        targeted_parent = this.request_find_element('top_level')
        targeted_parent = targeted_parent.external_objects.find(element => element.status === "main_roof");
        // At this point, targeted_parent is either the top level object or null/undefined
      
        accessers = [

            new accesser('roof_type'),
            new accesser('roof_material_type'),
            new accesser('object_color')
        ]

        accessers_assign = [
            new accesser('roof_type'),
            new accesser('roof_material_type'),
            new accesser('object_color')
        ]

        this.request_update_state(targeted_parent, accessers, accessers_assign)


    }

    determineState() {
        const state = super.determineState();
        function modify_accesser(accesser_array, locator = "position_y", modification = 3) {
            Object.values(accesser_array).forEach(accessersObject => {

                let targeted_accesser = accessersObject.find(item => item.resource_locator === locator);
                if (targeted_accesser) {
                    targeted_accesser.value = (targeted_accesser.value || 0) + modification;
                }
                //const added_accesser = new accesser('material_type', material_type);
                //accessersObject.push(added_accesser);
            });
        }



        let roof_slant = 5.5 * Math.PI / 180
        let garage_width = parseFloat(this.state.get('garage_width')) || 3
        let garage_depth = parseFloat(this.state.get('garage_depth')) || 5
        let garage_height = parseFloat(this.state.get('garage_height')) || 2.13

        let roof_top_height = garage_depth * (1 / Math.cos(roof_slant))
        let roof_height = roof_top_height * Math.sin(roof_slant);

        let object_depth = this.state.get('object_depth') || 4.0
        let object_width = this.state.get('object_width') || 3.0
        let targeted_wall_name = this.state.get('targeted_wall_name') || 4.0
        //Case where the roof falls back

        let received_roof_type = this.state.get('roof_type') || 'roof_type_1'
        //debugger


        let received_material_type = this.state.get('material_type') || 'material_type_1'

        
        set_value_accesser(state, 'material_type', received_material_type)
        let molly=CANOPIES_AUTOMATIC ? 0 : 1;

        if (received_roof_type == "roof_type_1") {
            switch (targeted_wall_name) {
                case 'front':
                    roof_top_height = garage_depth * (1 / Math.cos(roof_slant))
                    roof_height = roof_top_height * Math.sin(roof_slant);
                    modify_accesser(state, 'position_y', +roof_height)
                    break;
                case 'left':
                    roof_top_height = (garage_depth - object_depth) * (1 / Math.cos(roof_slant))
                    roof_height = roof_top_height * Math.sin(roof_slant);

                    modify_accesser(state, 'position_y', molly*roof_height / 2)

                    break;
                case 'right':
                    roof_top_height = (garage_depth - object_depth) * (1 / Math.cos(roof_slant))
                    roof_height = roof_top_height * Math.sin(roof_slant);

                    modify_accesser(state, 'position_y', molly*roof_height / 2)
                    break;
                case 'back':
                    roof_top_height = object_depth * (1 / Math.cos(roof_slant))
                    roof_height = roof_top_height * Math.sin(roof_slant);

                    modify_accesser(state, 'position_y', -roof_height)
                    break;
            }
        }
        if (received_roof_type == "roof_type_3") {
            switch (targeted_wall_name) {
                case 'front':

                    roof_top_height = object_depth * (1 / Math.cos(roof_slant))
                    roof_height = roof_top_height * Math.sin(roof_slant);

                    modify_accesser(state, 'position_y', -roof_height)


                    break;
                case 'left':

                    roof_top_height = (garage_depth - object_depth) * (1 / Math.cos(roof_slant))
                    roof_height = roof_top_height * Math.sin(roof_slant);

                    modify_accesser(state, 'position_y', molly*roof_height / 2)


                    break;
                case 'right':
                    roof_top_height = (garage_depth - object_depth) * (1 / Math.cos(roof_slant))
                    roof_height = roof_top_height * Math.sin(roof_slant);

                    modify_accesser(state, 'position_y', molly*roof_height / 2)
                    break;
                case 'back':
                    roof_top_height = garage_depth * (1 / Math.cos(roof_slant))
                    roof_height = roof_top_height * Math.sin(roof_slant);
                    modify_accesser(state, 'position_y', +roof_height)
                    break;
            }
        }
        if (received_roof_type == "roof_type_2") {
            switch (targeted_wall_name) {
                case 'front':

                    roof_top_height = (garage_width - object_width) * (1 / Math.cos(roof_slant))

                    roof_height = roof_top_height * Math.sin(roof_slant);

                    modify_accesser(state, 'position_y', molly * roof_height / 2)


                    break;
                case 'left':

                    roof_top_height = (object_width) * (1 / Math.cos(roof_slant))
                    roof_height = roof_top_height * Math.sin(roof_slant);

                    modify_accesser(state, 'position_y', -roof_height)


                    break;
                case 'right':
                    roof_top_height = (garage_width) * (1 / Math.cos(roof_slant))
                    roof_height = roof_top_height * Math.sin(roof_slant);

                    modify_accesser(state, 'position_y', roof_height)
                    break;
                case 'back':
                    roof_top_height = (garage_width - object_width) * (1 / Math.cos(roof_slant))
                    roof_height = roof_top_height * Math.sin(roof_slant);
                    modify_accesser(state, 'position_y', molly*roof_height / 2)
                    break;
            }
        }
        if (received_roof_type == "roof_type_4") {
            switch (targeted_wall_name) {
                case 'front':
                    roof_top_height = (garage_width - object_width) * (1 / Math.cos(roof_slant))

                    roof_height = roof_top_height * Math.sin(roof_slant);

                    modify_accesser(state, 'position_y', molly*roof_height / 2)


                    break;
                case 'left':

                    roof_top_height = (garage_width) * (1 / Math.cos(roof_slant))
                    roof_height = roof_top_height * Math.sin(roof_slant);

                    modify_accesser(state, 'position_y', +roof_height)


                    break;
                case 'right':
                    roof_top_height = (object_width) * (1 / Math.cos(roof_slant))
                    roof_height = roof_top_height * Math.sin(roof_slant);

                    modify_accesser(state, 'position_y', -roof_height)
                    break;
                case 'back':
                    roof_top_height = (garage_width - object_width) * (1 / Math.cos(roof_slant))
                    roof_height = roof_top_height * Math.sin(roof_slant);
                    modify_accesser(state, 'position_y', molly*roof_height / 2)
                    break;
            }
        }

        


        // let accessersWallFront = [
        //     new accesser('width', object_width),
        // ]
        // let accessersWallBack = [

        //     new accesser('width', object_width),
        // ]

        // let accessersWallTop = [

        //     new accesser('width', object_width),
        // ]
        // let accessersWallLeft = [

        //     new accesser('width', object_depth),
        // ]
        // let accessersWallRight = [

        //     new accesser('width', object_depth),
        // ]



        return state

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


export { UconfigsImplementationRoofsController, UconfigsImplementationRoofController, UconfigsImplementationSecondaryRoofsController }