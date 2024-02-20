import { v4 as uuidv4 } from 'uuid';
import { accesser, GLOBAL_ORIENTATION, } from '../../base'
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



class UconfigsImplementationWallsController extends UconfigsController {
    constructor() {
        super()
        this.setModel(UconfigInvisibleObject)
         this.gui = new UconfigImplementationWallGui();
        //this.gui = new UconfigDebugGui();
        this.gui.set_mediator(this)
        this.group = new THREE.Group()
        this.group.name="top_level_controller"
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

    request_an_update(){

        let targeted_parent, accessers, accessers_assign


        targeted_parent=this.request_find_element('top_level')
        // At this point, targeted_parent is either the top level object or null/undefined
         
        if(targeted_parent){
        accessers = [
            new accesser('object_height'),
            new accesser('object_width')
        ]
        accessers_assign = [
            new accesser('object_height'),
            new accesser('object_width')
        ]

        let garage_object_height  
        let garage_object_width       
        garage_object_height = targeted_parent.state.get(accessers[0].resource_locator, accessers_assign[0].value)||2.13;
        garage_object_width = targeted_parent.state.get(accessers[1].resource_locator, accessers_assign[1].value)||3;


        

      
            accessers = [
                new accesser('object_height'),
                new accesser('object_width'),
                new accesser('object_depth'),

            ]
            accessers_assign = [
                new accesser('object_height'),
                new accesser('object_width'),
                new accesser('object_depth'),
            ]
        let additonal_vars = new Array(accessers.length);

        for (let i = 0; i < accessers.length; i++) {
            const val = targeted_parent.state.get(accessers[i].resource_locator, accessers_assign[i].value);
            additonal_vars[i] = val;
        }


        let main_object_height=additonal_vars[0]||2.13;
        let main_object_width = additonal_vars[1]||3;
        let main_object_depth = additonal_vars[2]||4;

        //this.request_update_state(targeted_parent ,accessers, accessers_assign)  
   

        //Here is the part with the roof. 
        targeted_parent = targeted_parent.external_objects.find(element => element.status === "main_roof");
        accessers = [
                // new accesser('object_width'),
                // new accesser('object_depth'),
                new accesser('roof_type'),
                // new accesser('wall_color'),
        ]
        
        let main_object_roof_type
        main_object_roof_type = targeted_parent.state.get(accessers[0].resource_locator, accessers_assign[0].value)||"roof_type_1";


            // this.request_update_state(targeted_parent ,accessers, accessers_assign)  
            
          
            //Now prepare the logic for the roof types
            let roof_slant=5.5 * Math.PI / 180
            let roof_height =0.0
            
            switch (main_object_roof_type) {

                case "roof_type_1":{

                    
             
                    roof_height= main_object_depth * Math.sin(roof_slant);
                    
                    // this.state.state['rotation_y'] = 0
                    // console.log("The roof type is flat.");
                    break;
                    }
                case "roof_type_2":{
                       
                        roof_height= 0;
                        // const hold_width = object_width
                        // const hold_depth = object_depth
                        // object_width = hold_depth
                        // object_depth = hold_width
                        
                        break;
                    }
                case "roof_type_3":{
                    
                        roof_height=-(this.state.get("object_depth")||2) * Math.sin(roof_slant);
                        // this.state.state['rotation_y'] = 2 * Math.PI / 2
    
                        break;
                    }
                case "roof_type_4": {
    

              
                    roof_height= 0
                    // this.state.state['rotation_y'] = 3 * Math.PI / 2
    
                    // console.log("The roof type is hipped.");
                    // const hold_width = object_width
                    // const hold_depth = object_depth
                    // object_width = hold_depth
                    // object_depth = hold_width
    
                    // console.log("The roof type is hipped.");
                    break;
                }
                case "roof_type_5": {
                
                    roof_height=-(this.state.get("object_depth")||1) * Math.sin(roof_slant);
              
                    // this.state.state['rotation_y'] = 3 * Math.PI / 2
    
                    // console.log("The roof type is hipped.");
                    // const hold_width = object_width
                    // const hold_depth = object_depth
                    // object_width = hold_depth
                    // object_depth = hold_width
    
                    // console.log("The roof type is hipped.");
                    break;
                }
                case "roof_type_6": {
    
                    roof_height=0;
              
                    // this.state.state['rotation_y'] = 3 * Math.PI / 2
    
                    // console.log("The roof type is hipped.");
                    // const hold_width = object_width
                    // const hold_depth = object_depth
                    // object_width = hold_depth
                    // object_depth = hold_width
    
                    // console.log("The roof type is hipped.");
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
          
            this.state.update('object_height', parseFloat(main_object_height)+parseFloat(roof_height));

            targeted_parent=this.request_find_element('top_level')
            // At this point, targeted_parent is either the top level object or null/undefined
             
            if(targeted_parent){
                accessers = [
                    new accesser('object_height'),
                    new accesser('object_width')
                ]
                accessers_assign = [
                    new accesser('object_height'),
                    new accesser('object_width')
                ]
        
                let garage_object_height  
                let garage_object_width 

                garage_object_height = targeted_parent.state.get(accessers[0].resource_locator, accessers_assign[0].value)||2.13;
                garage_object_width = targeted_parent.state.get(accessers[1].resource_locator, accessers_assign[1].value)||3;
            
                targeted_parent=this.request_find_element('niche_level')
                let niche_object_width
                if(targeted_parent){
                    accessers = [
                        new accesser('object_height'),
                        new accesser('object_width')
                    ]
                    accessers_assign = [
                        new accesser('object_height'),
                        new accesser('object_width')
                    ]
            
                    let main_object_height  
                        
                    main_object_height = targeted_parent.state.get(accessers[0].resource_locator, accessers_assign[0].value)||2.13;
                    niche_object_width = targeted_parent.state.get(accessers[1].resource_locator, accessers_assign[1].value)||0.2;
                 }
                //Now i need to find the width of the canopy


                //Actually a small change i want to change the canopy
               
                let this_width=this.state.get('object_width', 0);
        


                 targeted_parent=this.request_find_element('niche_level')
                 let canopy_object_width
                 if(targeted_parent){
                     accessers = [
                         new accesser('object_height'),
                         new accesser('object_width')
                     ]
                     accessers_assign = [
                         new accesser('object_height'),
                         new accesser('object_width')
                     ]
             
                     let main_object_height  
                         
                     main_object_height = targeted_parent.state.get(accessers[0].resource_locator, accessers_assign[0].value)||2.13;
                     niche_object_width = targeted_parent.state.get(accessers[1].resource_locator, accessers_assign[1].value)||0.2;
                  }

                  let default_width=0.3
                  targeted_parent = this.external_objects.find(element => element.status === "niche_canopy");
                
                  if(targeted_parent){

                    let accessers = [

                        new accesser('object_width')
                    ]
                    let accessers_assign = [

                        new accesser('object_width')
                    ]
             
                    let canopy_niche_object_width = targeted_parent.state.get(accessers[0].resource_locator, accessers_assign[0].value)||0.2;



                    //We need to choose which one we update, probably we should change that
                    //targeted_parent.state.update(accessers[0].resource_locator, 3)||0.2;
                    targeted_parent.state.update(accessers[0].resource_locator, garage_object_width-this_width)||0.2;

                    default_width=garage_object_width-canopy_niche_object_width
                  }
                  
               

                //   let object_width = parseFloat(this.state.get('object_width')) || default_width
                  let object_width = default_width
                  object_width=0.2
                  this.state.update('object_width', object_width);
          
            }
    
            
        
        
    }
    
        



    }

    determineState() {
        this.request_an_update()
        //debugger
        //You can get the current state of the object by using the 
        let name = this.state.get('name') || 'Wall'
        let object_type = this.state.get('object_type') || 'flat'
        let object_width = parseFloat(this.state.get('object_width')) || 3
        let object_height = parseFloat(this.state.get('object_height')) || 2.13
        let object_depth = parseFloat(this.state.get('object_depth')) || 4

        let wall_color = this.state.get('wall_color') || "#F00000"
        

        let object_color = this.state.get('object_color') || "#FEFEFE"
     
        // object_color=wall_color

        let texture_type=""
        let material_type=this.state.get('material_type') || "material_type_1" 
        //Different default
        if(GLOBAL_ORIENTATION=="SIDEWAYS"){
         material_type=this.state.get('material_type') || "material_type_2"
        } 

        //Check your status, if you are a niche move yourself
        if (this.status==="niche_level"){
        this.state.state['position_x']=-5
        
        
        const garage_move_x=(this.external_objects_controllers[0].state.state['object_width']||3)/2
        const garage_move_z=(this.external_objects_controllers[0].state.state['object_depth']||4)/2
        this.state.state['position_z']=garage_move_z+object_depth/2
        this.state.state['position_x']=-garage_move_x+object_width/2
        }
        let position_x = this.state.get('position_x') || -5
        let position_y = this.state.get('position_y') || 0
        let position_z = this.state.get('position_z') || 0

        // let height = this.state.get('height') || 2.13
        // let width = this.state.get('width') || 4.0
        // let depth = this.state.get('depth') || 4.0
        // object_height = height
        // object_width = width
        // object_depth = depth
        //let object_angle=parseFloat(this.state.get('object_angle'))||30
        let sheet_depth = parseFloat(this.state.get('sheet_depth')) || 0.0075

        let additional_y_displacement = this.state.get('additional_y_displacement') || 0.0
        const accessersWallFront = [
            new accesser('name', name + "_fronts"),
            new accesser('width', object_width),
            new accesser('height', object_height+additional_y_displacement),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', 0),
            new accesser('position_y', object_height/2),
            new accesser('position_z', object_depth/2),
            new accesser('color', object_color),
            new accesser('material_type', material_type),
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
            new accesser('position_y', object_height/2),
            new accesser('position_z',-object_depth/2),
            new accesser('color', object_color),
            new accesser('position_relative', 'true'),
            new accesser('material_type', material_type),
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
            new accesser('material_type', material_type),
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
            new accesser('material_type', material_type),
            new accesser('rotation_y', Math.PI/2),

        ]


        const iterate=[accessersWallFront  ]
        iterate.forEach(accessersObject => {  
            const added_accesser = new accesser('material_type', material_type);
            accessersObject.push(added_accesser);
        });



        return { 
    "accessersWallFront": accessersWallFront, 
    "accessersWallBack": accessersWallBack,
    "accessersWallLeft": accessersWallLeft,
    "accessersWallRight": accessersWallRight
    
    }
    }
    generatePassiveObjects(){
            const { accessersWallFront, accessersWallBack, accessersWallLeft } = this.determineState();

            let array = [
                // { objectOptions: accessersWallFront, classInstance:SimpleController},
                // { objectOptions: accessersWallBack, classInstance: SimpleController  },
                // { objectOptions: accessersWallLeft, classInstance: SimpleController  },
                // { objectOptions: accessersWallRight, classInstance: SimpleController }
                ]
            return array
    }   
    buildingStep(){
        //Go over the children and set them in proper places
        //The same code but explicit
        // let { accessersWallFront, accessersWallBack, accessersWallLeft, accessersWallRight }=this.determineState()
   
        // this.setOptions(this.external_objects[0],accessersWallFront)
        // this.setOptions(this.external_objects[1],accessersWallBack)
        // this.setOptions(this.external_objects[2],accessersWallLeft)
        // this.setOptions(this.external_objects[3],accessersWallRight)
        let accessers = this.determineState();
        let accesserKeys = Object.keys(accessers);

        for (let i = 0; i < this.external_objects.length; i++) {
            if(accesserKeys[i]) {
                this.setOptions(this.external_objects[i], accessers[accesserKeys[i]]);
            }
        }
        super.buildingStep()
    }

}
class UconfigsImplementationWallController extends UconfigsController{
    constructor() {
        super()
        this.setModel(UconfigInvisibleObject)
        this.gui = new UconfigDebugGui();
        this.gui.set_mediator(this)
        this.group = new THREE.Group()
        this.group.userData.interactionGroup = true; // This marks the group for collective interaction
        this.group.userData.guiLink = this.gui.id; // This links the group to a specific GUI element
        this.group.userData.selfLink = this.id; // This links the group to a specific GUI element
        this.external_objects=[]
        this.external_objects_controllers=[]
        
    }
    request_an_update(){
        /**
        *We are targeting the parent, that is the entire system,
        */

        let targeted_parent=this.external_objects_controllers[0]
        //SKISSUMMARY
        let main_roof= this.request_find_element('top_level').external_objects.find(obj=>obj.status=="main_roof")
        let received_roof_type = main_roof.state.get('roof_type') || 'roof_type_1'
        if(received_roof_type=='roof_type_1'){
            let roof_slant = 5.5 * Math.PI / 180
            
            let depth=targeted_parent.state.get('object_depth')||5
            this.state.state["modifier_height"]=-depth*Math.sin(roof_slant)
        }
        else{
            this.state.state["modifier_height"]=0.0
        }

        const accessers = [
          
            new accesser('object_width'),
            new accesser('object_depth'),
            new accesser('object_height'),
            
        ]

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

        let modifier_height=this.state.get('modifier_height') || 0.0
        object_height = height+modifier_height


        

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
            new accesser('position_y', modifier_height/2),
            new accesser('position_z', 0),
            new accesser('color', object_color),
            new accesser('position_relative', 'true'),
        ]
       
        const iterate=[accessersWallFront  ]
        iterate.forEach(accessersObject => {  
            const added_accesser = new accesser('material_type', material_type);
            accessersObject.push(added_accesser);
        });



        return { "accessersWallFront": accessersWallFront}
    }
    generatePassiveObjects(){
        const { accessersWallFront} = this.determineState();

        let array = [
            // { objectOptions: accessersWallFront, classInstance:SimpleController},
            { objectOptions: accessersWallFront, classInstance: SimpleController  },
            // { objectOptions: accessersWallLeft, classInstance: SimpleController  },
            // { objectOptions: accessersWallRight, classInstance: SimpleController }
            ]
        return array
}   
}

export {  UconfigsImplementationWallsController, UconfigsImplementationWallController }