import { v4 as uuidv4 } from 'uuid';
import { accesser } from '../../base'
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { Generic, genericGui, genericState, genericObject, genericDisplay, genericController } from '../../base.js'
import { CubeObject,UconfigObject,WallGarageObject, UconfigInvisibleObject, genericGarageObject } from '../base/object'
import { UconfigInvisibleGui,UconfigGui, UconfigDebugGui } from '../base/gui'
import { UconfigController,CubeController, RedCubeController,
    WallGarageController,groupGenericGarageController,genericGarageController 
} from '../base/controller'
import { UconfigsController } from '../base/controller'
 
import { UconfigImplementationRoofGui} from './gui'
import {SimpleController, RoofSideLeftController,RoofSideRightController, RoofSideSquareController, RoofTopController} from './controller'
//Now i would like to add objects to it dynamically
class UconfigsImplementationRoofsController extends UconfigsController {
    constructor() {
        super()
        this.setModel(UconfigInvisibleObject)
        this.gui = new UconfigImplementationRoofGui();
        this.gui.set_mediator(this)
        this.group = new THREE.Group()
        this.external_objects=[]
        this.external_objects_controllers=[]
        
    }
    generateDynamicAccessers(){
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
    determineState() {
        //You can get the current state of the object by using the 
        //Todo
        // this.state.state.position_y=2
      
        this.request_an_update()
        
        this.state.update('position_y', parseFloat(this.state.get('object_height')) || 2.13)
        
        let roof_type=this.state.get('roof_type') || 'roof_type_1'
      

        let name = this.state.get('name') || 'Wall'
        let object_type = this.state.get('object_type') || 'flat'
        let object_width = parseFloat(this.state.get('object_width')) || 3
        let object_height = parseFloat(this.state.get('object_height')) || 2.13
        let object_depth = parseFloat(this.state.get('object_depth')) || 4
        let object_color = this.state.get('object_color') || "#888492"
      
        let texture_type=""
        let material_type=this.state.get('material_type') || "material_type_1" 
        let roof_material_type=this.state.get('roof_material_type') || "material_type_1" 

        let position_x = this.state.get('position_x') || 0
        let position_y = this.state.get('position_y') || 2.13
        let position_z = this.state.get('position_z') || 0

        let garage_height = parseFloat(this.state.get('object_height')) || 2.13
        let garage_depth = parseFloat(this.state.get('object_height')) || 4
        let garage_width = parseFloat(this.state.get('object_height')) || 3
        // let height = this.state.get('height') || 2.13
        // let width = this.state.get('width') || 4.0
        // let depth = this.state.get('depth') || 4.0
        // object_height = height
        // object_width = width
        // object_depth = depth
        //let object_angle=parseFloat(this.state.get('object_angle'))||30

        switch(roof_type){

            case "roof_type_1":
                this.state.state['rotation_y']=0
                console.log("The roof type is flat.");
                break;
            case "roof_type_2":
                {
                this.state.state['rotation_y']=Math.PI/2
                const hold_width=object_width
                const hold_depth=object_depth
                object_width=hold_depth
                object_depth=hold_width
                console.log("The roof type is gabled.");
                break;
                }
            case "roof_type_3":
                {
                this.state.state['rotation_y']=2*Math.PI/2
              
                break;
                }
            case "roof_type_4":{
             
                this.state.state['rotation_y']=3*Math.PI/2
             
                console.log("The roof type is hipped.");
                const hold_width=object_width
                const hold_depth=object_depth
                object_width=hold_depth
                object_depth=hold_width
                
                console.log("The roof type is hipped.");
                break;
            }
            default:
                console.log("Unknown roof type.");

        }
        let sheet_depth = parseFloat(this.state.get('sheet_depth')) || 0.0075

        let roof_slant=5.5*Math.PI/180
        //The dimension of the top part of the roof 
        let roof_top_height=object_depth*(1/Math.cos(roof_slant))
        let y_displacement=roof_top_height*Math.sin(roof_slant)

        //How high should the roof top extrude
        let roof_height=object_depth*Math.sin(roof_slant);
        //TODO add the material type heres
        let wall_color=(this.state.get('wall_color')) || "#FFFFFF";


        const accessersWallFront = [
            new accesser('name', name + "Debug target"),
            new accesser('width', object_width),
            new accesser('height', roof_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', 0),
            new accesser('position_y', 0),
            new accesser('position_z', object_depth/2),
            new accesser('color', object_color),
            new accesser('wall_color', wall_color),
            new accesser('position_relative', 'true'),
            new accesser('rotation_y', 0),
        ]
        const accessersWallBack = [
            new accesser('name', name + "back"),
            new accesser('width', object_width),
            new accesser('height', roof_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', 0),
            new accesser('position_y', 0),
            new accesser('position_z',-garage_depth/2),
            new accesser('color', object_color),
            new accesser('wall_color', wall_color),
            new accesser('position_relative', 'true'),
            new accesser('rotation_y', Math.PI),

        ]
        const accessersWallLeft = [
            new accesser('name', name + "left"),
            new accesser('width', object_depth),
            new accesser('height', roof_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', -object_width/2),
            new accesser('position_y', 0),
            new accesser('position_z',0),
            new accesser('color', object_color),
            new accesser('wall_color', wall_color),
            new accesser('position_relative', 'true'),
            new accesser('rotation_y', -Math.PI/2),

        ]    
        const accessersWallRight = [
            new accesser('name', name + "right"),
            new accesser('wall_color',"#FF0000"),
            new accesser('width', object_depth),
            new accesser('height', roof_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', object_width/2),
            new accesser('position_y', 0),
            new accesser('position_z',0),
            new accesser('right_piece', true),
            new accesser('color', object_color),
            new accesser('wall_color', wall_color),
            new accesser('position_relative', 'true'),
            new accesser('rotation_y', Math.PI/2),
            

        ]
        const accessersWallTop = [
            new accesser('name', name + "_back"),
            new accesser('width', object_width),
            new accesser('height', roof_top_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x',0),
      //      new accesser('position_y', object_height+y_displacement/2),
            new accesser('position_y', y_displacement/2),  
            new accesser('position_z',0),
            new accesser('color', object_color),
            new accesser('position_relative', 'true'),
            new accesser('rotation_y', 0),
            new accesser('roof_material_type', roof_material_type),
            new accesser('rotation_x', -Math.PI/2-roof_slant),
            

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
                { objectOptions: accessersWallFront, classInstance:UconfigsImplementationRoofSupportSideSquareController},
                
                // { objectOptions: accessersWallBack, classInstance: UconfigsImplementationRoofController },
                { objectOptions: accessersWallLeft, classInstance: UconfigsImplementationRoofSupportSideLeftController },
                { objectOptions: accessersWallRight, classInstance: UconfigsImplementationRoofSupportSideRightController },
                { objectOptions: accessersWallTop, classInstance: UconfigsImplementationRoofTopController }
                ]
            return array
    }   
    adjust_position(garage_width=0, garage_depth=0, garage_height=2.13){
        this.state.update('position_y', garage_height)
    
    }
    buildingStep(){
        //Go over the children and set them in proper places
        // let { accessersWallFront, accessersWallBack, accessersWallLeft, accessersWallRight }=this.determineState()
   
        // this.setOptions(this.external_objects[0],accessersWallFront)
        // this.setOptions(this.external_objects[1],accessersWallBack)
        // this.setOptions(this.external_objects[2],accessersWallLeft)
        // this.setOptions(this.external_objects[3],accessersWallRight)

        super.buildingStep()
    }
    request_an_update(){
        /**
        *We are targeting the parent, that is the entire system,
        */

        let targeted_parent=this.external_objects_controllers[0]
        
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
}
class UconfigsImplementationSecondaryRoofsController extends UconfigsImplementationRoofsController {
    constructor() {
        super()
    }
    determineState() {
        //You can get the current state of the object by using the 
        //Todo
        // this.state.state.position_y=2
      
        this.request_an_update()
        
        this.state.update('position_y', parseFloat(this.state.get('object_height')) || 2.13)
        
        let roof_type=this.state.get('roof_type') || 'roof_type_1'
      

        let name = this.state.get('name') || 'Wall'
        let object_type = this.state.get('object_type') || 'flat'
        let object_width = parseFloat(this.state.get('object_width')) || 3
        let object_height = parseFloat(this.state.get('object_height')) || 2.13
        let object_depth = parseFloat(this.state.get('object_depth')) || 4
        let object_color = this.state.get('object_color') || "#888492"
      
        let texture_type=""
        let material_type=this.state.get('material_type') || "material_type_1" 
        let roof_material_type=this.state.get('roof_material_type') || "material_type_1" 

        let position_x = this.state.get('position_x') || 0
        let position_y = this.state.get('position_y') || 2.13
        let position_z = this.state.get('position_z') || 0

        let garage_height = parseFloat(this.state.get('object_height')) || 2.13
        let garage_depth = parseFloat(this.state.get('object_height')) || 4
        let garage_width = parseFloat(this.state.get('object_height')) || 3
        // let height = this.state.get('height') || 2.13
        // let width = this.state.get('width') || 4.0
        // let depth = this.state.get('depth') || 4.0
        // object_height = height
        // object_width = width
        // object_depth = depth
        //let object_angle=parseFloat(this.state.get('object_angle'))||30


        let actual_garage_height = parseFloat(this.state.get('garage_height')) || 2.13
        let actual_garage_depth = parseFloat(this.state.get('garage_depth')) || 4
        let actual_garage_width = parseFloat(this.state.get('garage_widht')) || 3

        switch(roof_type){

            case "roof_type_1":
                this.state.state['rotation_y']=0
                console.log("The roof type is flat.");
                break;
            case "roof_type_2":
                {
                this.state.state['rotation_y']=Math.PI/2
                const hold_width=object_width
                const hold_depth=object_depth
                object_width=hold_depth
                object_depth=hold_width
                console.log("The roof type is gabled.");
                break;
                }
            case "roof_type_3":
                {
                this.state.state['rotation_y']=2*Math.PI/2
              
                break;
                }
            case "roof_type_4":{
             
                this.state.state['rotation_y']=3*Math.PI/2
             
                console.log("The roof type is hipped.");
                const hold_width=object_width
                const hold_depth=object_depth
                object_width=hold_depth
                object_depth=hold_width
                
                console.log("The roof type is hipped.");
                break;
            }
            default:
                console.log("Unknown roof type.");

        }
        let sheet_depth = parseFloat(this.state.get('sheet_depth')) || 0.0075

        let roof_slant=5.5*Math.PI/180
        //The dimension of the top part of the roof 
        let roof_top_height=object_depth*(1/Math.cos(roof_slant))
        let y_displacement=roof_top_height*Math.sin(roof_slant)

        //How high should the roof top extrude
        let roof_height=object_depth*Math.sin(roof_slant);
        //TODO add the material type heres
        let wall_color=(this.state.get('wall_color')) || "#FFFFFF";


        switch(roof_type){

            case "roof_type_1":
                
    
                this.state.update('position_y', parseFloat(this.state.get('garage_height')) || 2.13)
                break;
            case "roof_type_2":
                {
                    
                    this.state.update('position_y', parseFloat(this.state.get('garage_height'))+roof_height || 2.13+roof_height)
                    
                break;
                }
            case "roof_type_3":
                {
                    
                    this.state.update('position_y', parseFloat(this.state.get('garage_height')) || 2.13)
                    
              
                break;
                }
            case "roof_type_4":{
                    
                this.state.update('position_y', parseFloat(this.state.get('garage_height'))-roof_height || 2.13-roof_height)
                
                break;
            }
            default:
                console.log("Unknown roof type.");

        }


        const accessersWallFront = [
            new accesser('name', name + "Debug target"),
            new accesser('width', object_width),
            new accesser('height', roof_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', 0),
            new accesser('position_y',0),
            new accesser('position_z', object_depth/2),
            new accesser('color', object_color),
            new accesser('wall_color', wall_color),
            new accesser('position_relative', 'true'),
            new accesser('rotation_y', 0),
        ]
        const accessersWallBack = [
            new accesser('name', name + "back"),
            new accesser('width', object_width),
            new accesser('height', roof_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', 0),
            new accesser('position_y',0),
            new accesser('position_z',-garage_depth/2),
            new accesser('color', object_color),
            new accesser('wall_color', wall_color),
            new accesser('position_relative', 'true'),
            new accesser('rotation_y', Math.PI),

        ]
        const accessersWallLeft = [
            new accesser('name', name + "left"),
            new accesser('width', object_depth),
            new accesser('height', roof_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', -object_width/2),
            new accesser('position_y',0),
            new accesser('position_z',0),
            new accesser('color', object_color),
            new accesser('wall_color', wall_color),
            new accesser('position_relative', 'true'),
            new accesser('rotation_y', -Math.PI/2),

        ]    
        const accessersWallRight = [
            new accesser('name', name + "right"),
            new accesser('wall_color',"#FF0000"),
            new accesser('width', object_depth),
            new accesser('height', roof_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', object_width/2),
            new accesser('position_y',0),
            new accesser('position_z',0),
            new accesser('right_piece', true),
            new accesser('color', object_color),
            new accesser('wall_color', wall_color),
            new accesser('position_relative', 'true'),
            new accesser('rotation_y', Math.PI/2),
            

        ]


 
        const accessersWallTop = [
            new accesser('name', name + "_back"),
            new accesser('width', object_width),
            new accesser('height', roof_top_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x',0),
      //      new accesser('position_y', object_height+y_displacement/2),
            new accesser('position_y', y_displacement/2),  
            new accesser('position_z',0),
            new accesser('color', object_color),
            new accesser('position_relative', 'true'),
            new accesser('rotation_y', 0),
            new accesser('roof_material_type', roof_material_type),
            new accesser('rotation_x', -Math.PI/2-roof_slant),
            

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
    
        let accessers = [
          
            new accesser('object_width'),
            new accesser('object_depth'),
            new accesser('object_height'),
            new accesser('wall_color'),
        ]
        let accessers_assign=[
          
            new accesser('garage_width'),
            new accesser('garage_depth'),
            new accesser('garage_height'),
            new accesser('wall_color'),
    
        ]
        

        for (let i = 0; i < accessers.length; i++) {
            const val=targeted_parent.state.get(accessers[i].resource_locator, accessers[i].value);
            this.state.update(accessers_assign[i].resource_locator, val);
        }

        //Now you need to go down to find the roof
        let targeted_elements = targeted_parent.external_objects;
    
        targeted_parent = targeted_elements.find(element => element.status === "main_roof");

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
                const val=targeted_parent.state.get(accessers[i].resource_locator, accessers[i].value);
                this.state.update(accessers[i].resource_locator, val);
            }
    
        } else {
            console.log("Element with status 'main_roof' not found.");
        }

        targeted_parent=this.external_objects_controllers[0]
        
        accessers = [
          
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
class UconfigsImplementationRoofSupportSideLeftController extends UconfigsController{
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
            new accesser('wall_color', wall_color ),
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
            { objectOptions: accessersWallFront, classInstance: RoofSideLeftController  },
            // { objectOptions: accessersWallLeft, classInstance: SimpleController  },
            // { objectOptions: accessersWallRight, classInstance: SimpleController }
            ]
        return array
}   
}
class UconfigsImplementationRoofSupportSideRightController extends UconfigsController{
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
        let wall_color= this.state.get('wall_color') || "#FF0000"
        const accessersWallFront = [
            new accesser('name', name + "sciana frontowa"),
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
            { objectOptions: accessersWallFront, classInstance: RoofSideRightController  },
            // { objectOptions: accessersWallLeft, classInstance: SimpleController  },
            // { objectOptions: accessersWallRight, classInstance: SimpleController }
            ]
        return array
}   
}
class UconfigsImplementationRoofTopController extends UconfigsController{
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

        let roof_material_type=this.state.get('roof_material_type') || "material_type_1" 

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
            { objectOptions: accessersWallFront, classInstance: RoofTopController  },
            // { objectOptions: accessersWallLeft, classInstance: SimpleController  },
            // { objectOptions: accessersWallRight, classInstance: SimpleController }
            ]
        return array
}   
}
class UconfigsImplementationRoofSupportSideSquareController extends UconfigsController{
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
        let wall_color= this.state.get('wall_color') || "#FF0000"
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
        const iterate=[accessersWallFront  ]
        iterate.forEach(accessersObject => {  
            const added_accesser = new accesser('material_type', material_type);
            accessersObject.push(added_accesser);
        });



        return { "accessersWallFront": accessersWallFront }
    }
    generatePassiveObjects(){
        const { accessersWallFront } = this.determineState();

        let array = [
            // { objectOptions: accessersWallFront, classInstance:SimpleController},
            { objectOptions: accessersWallFront, classInstance: RoofSideSquareController  },
            // { objectOptions: accessersWallLeft, classInstance: SimpleController  },
            // { objectOptions: accessersWallRight, classInstance: SimpleController }
            ]
        return array
}   
}


export {  UconfigsImplementationRoofsController, UconfigsImplementationRoofController, UconfigsImplementationSecondaryRoofsController}