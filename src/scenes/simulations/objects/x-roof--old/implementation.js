import { v4 as uuidv4 } from 'uuid';
import { accesser } from '../../base'
import * as THREE from 'three';
import {GarageObjectGable,GarageObjectSupport,GarageObjectSupportSquare } from './object'
import {UconfigGui} from './gui'
import {CubeController,genericGarageController} from '../base/controller'
import {UconfigsController } from '../base/implementation'
import {UconfigInvisibleObject } from '../base/object'
import {UconfigInvisibleGui, UconfigDebugGui} from '../base/gui'


class SupportSquareGarageController extends genericGarageController{
    constructor() {
        super(); 
        this.setModel(GarageObjectSupportSquare)
    }
  

}

class SupportGarageController extends genericGarageController{
    constructor(){
        super()
        this.setModel(GarageObjectSupport)
    }
}

class GableGarageController extends genericGarageController{    
    constructor(){
        super()
        this.setModel(GarageObjectGable)
    }
}

class UconfigsImplementationController extends UconfigsController {
    constructor() {
        super()
        this.setModel(UconfigInvisibleObject)
        this.gui = new UconfigGui();
        this.gui.set_mediator(this)
        this.group = new THREE.Group()
    }
    determineStateOld() {
        //You can get the current state of the object by using the 
        let name = this.state.get('name') || 'Wall'
        let object_type = this.state.get('object_type') || 'flat'
        let object_width = parseFloat(this.state.get('object_width')) || 3
        let object_height = parseFloat(this.state.get('object_height')) || 2.43
        let object_depth = parseFloat(this.state.get('object_depth')) || 2
        let object_color = this.state.get('color') || "#FEFEFE"

     
        let texture_type=""
        let material_type=this.state.get('material_type') || "material_type_1" 
        // switch(material_type){
        //     case "material_type_1":
        //             // object_color =  "#677727"
        //             break;
        //         case "material_type_2":
        //             // object_color =  "#872727"
        //             break;
        //         case "material_type_3":
        //             // object_color =  "#272727"
        //             break;
        //         case "material_type_4":
        //             // object_color =  "#972797"
        //             break;
        //     default:
        //         // code to be executed if expression doesn't match any cases
        // }
        // let parent_color = this.mediator.state.get('color') || "#872727"

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
            new accesser('name', name + "_front"),
            new accesser('width', object_width),
            new accesser('height', object_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', 0),
            new accesser('position_y', 0),
            new accesser('position_z', object_depth/2),
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
            new accesser('position_z', -object_depth/2),
            new accesser('color', object_color),
            new accesser('position_relative', 'true'),
            new accesser('rotation_y', Math.PI),

        ]
        const accessersWallLeft = [
            new accesser('name', name + "_left"),
            new accesser('width', object_depth),
            new accesser('height', object_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', -object_width/2),
            new accesser('position_y', 0),
            new accesser('position_z',0),
            new accesser('color', object_color),
            new accesser('position_relative', 'true'),
            new accesser('rotation_y', -Math.PI/2),

        ]
        const accessersWallRight = [
            new accesser('name', name + '_right'),
            new accesser('width', object_depth),
            new accesser('height', object_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', object_width/2),
            new accesser('position_y', 0),
            new accesser('position_z', 0),
            new accesser('color', object_color),
            new accesser('position_relative', 'true'),
            new accesser('rotation_y', Math.PI/2),

        ]


        const iterate=[accessersWallFront ,accessersWallLeft ,accessersWallBack ,accessersWallRight ]
        iterate.forEach(accessersObject => {  
            const added_accesser = new accesser('material_type', material_type);
            accessersObject.push(added_accesser);
        });



        return { "accessersWallFront": accessersWallFront, "accessersWallBack": accessersWallBack, "accessersWallLeft": accessersWallLeft, "accessersWallRight": accessersWallRight }
    }

    determineState(){
        //You can get the current state of the object by using the 
        let name=this.state.get('name')||'Roof'
   
        let width=parseFloat(this.state.get('width'))||4.0
        let height=parseFloat(this.state.get('height'))||2.13
        let depth=parseFloat(this.state.get('depth'))||4.0
   
   
        let roof_type=this.state.get('roof_type')||'flat'
        let calculated_roof_width=parseFloat(this.state.get('roof_width'))||4.0
        let roof_depth=parseFloat(this.state.get('roof_depth'))||4.0
        let roof_height=parseFloat(this.state.get('roof_height'))||2
        //UCONFIG CRITICAL
        let roof_color=this.state.get('color')||"#FEFEFE"

        let roof_color_top=this.state.get('roof_color_top')||"#56535A"
        let roof_angle=parseFloat(this.state.get('roof_angle'))||5
        let sheet_depth=parseFloat(this.state.get('sheet_depth'))||0.05
        let building_height=parseFloat(this.state.get('height'))||2.13
         // roof_depth=1.5
   
 
        
         calculated_roof_width=width
         building_height=height
         roof_depth=depth
   
        let position_x=this.state.get('position_x')||0
        let position_y=this.state.get('position_y')||0
        let position_z=this.state.get('position_z')||0
     
        let displacement_y=0
     //    displacement_y=1/8*Math.sin(Math.PI*parseFloat(roof_angle)/180)*parseFloat(this.state.get('roof_width'))
          displacement_y=calculated_roof_width*(1/2*Math.sin(Math.PI*parseFloat(roof_angle)/180))
         
     //    this.state.update( new accesser('position_y',find_displacement))

     let overhang_width=parseFloat(this.state.get('overhang_width'))||0.0

     let object_type = this.state.get('object_type') || 'slope_left';
     let rotation_y=0
     let second_displacement=0
     let second_rotation=0
    //  alert(object_type)
     switch (object_type) {
       case 'slope_left':
          rotation_y=0
          calculated_roof_width=overhang_width+width
           break;
       case 'slope_right':
            rotation_y=2*Math.PI/2
            calculated_roof_width=overhang_width+width
           break;
       case 'slope_back':
           rotation_y=3*Math.PI/2
           calculated_roof_width=overhang_width+width
           break;
           
       case 'slope_front':
           rotation_y=Math.PI/2
           calculated_roof_width=overhang_width+width
   
           break;
       
       case 'gable_side':
           rotation_y=0
           second_displacement=overhang_width/2+width/4
           second_rotation=Math.PI
           calculated_roof_width=overhang_width+width/2
           break;
       case 'gable_front':
           rotation_y=-Math.PI/2
            second_displacement=overhang_width/2+width/4
            second_rotation=Math.PI
            calculated_roof_width=overhang_width+width/2
           break;
       
       default: 
           break;
       
   }
    this.state.update('rotation_y', rotation_y)
   
   
     
     //    this.state.state['position_y']=0.2+1*Math.sin(180*roof_angle/Math.PI)
    const accessersGable=[
         new accesser('name', 'Rooftop'),
         new accesser('width', calculated_roof_width),
        //  new accesser('height', 0.05),
        //  new accesser('sheet_depth', sheet_depth),
        //  new accesser('depth', roof_depth),
        //  new accesser('segments', 0),
        //  new accesser('radius', 0),
        //  new accesser('position_x', position_x),
        //  new accesser('position_z',position_z),
        new accesser('color', roof_color),
        //  new accesser('position_y',displacement_y+building_height+position_y),
         new accesser('roof_color_top', roof_color_top),
         
         new accesser('position_x', second_displacement),
         new accesser('rotation_y',second_rotation),
        //  new accesser('position_relative', 'true'),
        //  new accesser('roof_angle', roof_angle),
        //  new accesser('roof_color', roof_color),
        //  new accesser('rotation_y', rotation_y)
         
       
     ]
     const accessersSupport1=[
         new accesser('name', 'Roof left'),
         new accesser('width', calculated_roof_width),
        //  new accesser('height', roof_height),
        //  new accesser('sheet_depth', sheet_depth),
        //  new accesser('depth', 0.05),
        //  new accesser('roof_depth', roof_depth),
        //  new accesser('segments', 0),
        //  new accesser('radius', 0),
        new accesser('color_external', roof_color_top),
         
         new accesser('position_x',-second_displacement),
        //  new accesser('position_y', displacement_y+building_height+position_y),
        //  new accesser('position_z',-sheet_depth+position_z),
         new accesser('color', roof_color),
        //  new accesser('position_relative', 'true'),
        //  new accesser('roof_angle', roof_angle),
        //  new accesser('roof_color', roof_color),
        //  new accesser('rotation_y', rotation_y)
       
     ]
     const accessersSupport2=[
         new accesser('name', 'Roof right'),
         new accesser('width', calculated_roof_width),
         new accesser('height', roof_height),
         new accesser('sheet_depth', sheet_depth),
         new accesser('depth', 0.05),
         new accesser('roof_depth', roof_depth),
         new accesser('segments', 1),
         new accesser('radius', 1),
         new accesser('position_x', position_x),
         new accesser('position_y', displacement_y+building_height+position_y),
         new accesser('position_z',-roof_depth+position_z),
         new accesser('color', roof_color),
         new accesser('position_relative', 'true'),
         new accesser('roof_angle', roof_angle),
         new accesser('roof_color', roof_color),
         new accesser('rotation_y', rotation_y)
     ]
     const accessersSupport3=[
         new accesser('name', 'Roof back'),
         new accesser('width', calculated_roof_width),
         new accesser('height', 1),
         new accesser('sheet_depth', sheet_depth),
         new accesser('depth', 0.05),
         new accesser('roof_depth', roof_depth),
         new accesser('segments', 1),
         new accesser('radius', 0),
         new accesser('position_x',position_x),
         new accesser('position_y', displacement_y+building_height+position_y),
         new accesser('position_z',position_z),
         new accesser('color', roof_color),
         new accesser('position_relative', 'true'),
         new accesser('roof_angle', roof_angle),
         new accesser('roof_color', roof_color),
         new accesser('rotation_y', rotation_y)
       
     ]
       return {
        "empty_accessers":accessersGable,
        "empty_accessers2":accessersSupport1, 
    //    "accessersSupport2":accessersSupport2,
    //    "accessersSupport3":accessersSupport3
         }
       }
   
    calculateState() {
        //This is a function that updates the values of the children of the system
        const accessersDict = this.determineState();
        Object.keys(accessersDict).forEach((key, index) => {
            if (this.children[index]) {
                this.set_the_options(this.children[index], accessersDict[key]);
            }
        });
    }
    buildingStep() {
        const accessers = [
            new accesser('name', 'Opcje dachu'),
            // new accesser('color','#973737' )

        ]
        this.set_mediator(this)
        this.set_the_options(this, accessers)

        

        // const { accessersWallFront, accessersWallBack, accessersWallLeft, accessersWallRight } = this.determineState();
        // const { accessersGable, accessersSupport1, accessersSupport2, accessersSupport3 } = this.determineState();
        const {empty_accessers, empty_accessers2}=this.determineState();
        //      let array = [
        //          { objectOptions: accessersWallFront, classInstance: WallGarageController },
        //          { objectOptions: accessersWallBack, classInstance: WallGarageController },
        //          { objectOptions: accessersWallLeft, classInstance: WallGarageController },
        //          { objectOptions: accessersWallRight, classInstance: WallGarageController }
        //  ]

        // let array = [
        // { objectOptions: accessersWallFront, classInstance:WallController},
        // { objectOptions: accessersWallBack, classInstance: WallController },
        // { objectOptions: accessersWallLeft, classInstance: WallController },
        // { objectOptions: accessersWallRight, classInstance: WallController }
        // ]



        // array = [
        //     {objectOptions: accessersGable, classInstance: GableGarageController},
        //     {objectOptions: accessersSupport1, classInstance: SupportGarageController},
        //     {objectOptions: accessersSupport2, classInstance: SupportGarageController},
        //     {objectOptions: accessersSupport3, classInstance: SupportSquareGarageController}
        // ]

        let array=[]
        
        // const empty_accessers=[
        //     new accesser('name', 'Rooftop1'),
        //     // new accesser('width', roof_width),
        //     // new accesser('height', 1),
        //     // new accesser('sheet_depth', sheet_depth),
        //     // new accesser('depth', 0.05),
        //     // new accesser('roof_depth', roof_depth),
        //     // new accesser('segments', 1),
        //     // new accesser('radius', 0),
        //     // new accesser('position_x',position_x),
        //     // new accesser('position_y', displacement_y+building_height+position_y),
        //     // new accesser('position_z',position_z),
        //     // new accesser('color', roof_color),
        //     // new accesser('position_relative', 'true'),
        //     // new accesser('roof_angle', roof_angle),
        //     // new accesser('roof_color', roof_color),
        //     // new accesser('rotation_y', rotation_y),
        //     // new accesser('roof_width', rotation_y)
          
        // ]
      
        // const empty_accessers2=[
        //     new accesser('name', 'Rooftop2'),          
        //     new accesser('position_x', -2),  
        //     // new accesser('visibility', false)        
        // ]

        if (this.state.get('object_type')=="gable_front"||this.state.get('object_type')=="gable_side"){
            array = [
                {objectOptions: empty_accessers, classInstance: RoofSideController},
                {objectOptions: empty_accessers2, classInstance: RoofSideController},
                // {objectOptions: accessersSupport2, classInstance: SupportGarageController},
                // {objectOptions: accessersSupport3, classInstance: SupportSquareGarageController}
            ]
    
        }
        else{
            array = [
                {objectOptions: empty_accessers, classInstance: RoofSideController},
                
                // {objectOptions: accessersSupport2, classInstance: SupportGarageController},
                // {objectOptions: accessersSupport3, classInstance: SupportSquareGarageController}
            ]
    
        }
 

        // // array=[]

        // this.children.forEach((child) => {
        //     child.handleEvent('recursivelyRemoveModel')
        // });
        // this.children = []

        // array.forEach(({ objectOptions, classInstance }) => {
        //     this.display.set_scene(this.display.get_scene())
        //     const created_object = this.object_addition.bind(this)(objectOptions, classInstance);
        //     // console.log(created_object)
        //     this.group.add(created_object)
        //     // console.log(t)
        // });
        let outer_scene=this.display.get_scene()
        array.forEach(({ objectOptions, classInstance }) => {

                this.display.set_scene(this.display.get_scene())
                //const completed_mesh = this.object_addition.bind(this)(objectOptions, classInstance);
                //     // console.log(created_object)
                //     this.group.add(created_object)
                const added_object = new classInstance()
                added_object.display.set_scene(outer_scene)
                added_object.set_the_options(added_object, objectOptions)
                added_object.model.create(added_object.state.state)
                // added_object.display.set_scene(this.display.get_scene())

                this.addChild(added_object)
                // added_object.display.set_scene(outer_scene)
                // debug()
                // const completed_mesh=added_object.model.get_model()
                // this.group.position.x += 10; // Move 10 units along X-axis
                // this.group.position.y += 20; // Move 20 units along Y-axis
                // this.group.position.z += 30; 
               
                added_object.handleEvent('buildingStep')
                this.group.add(added_object.model.get_model())   
                this.group.add(added_object.group)
           
                // added_object.group.position.y=4.0
                 
                // outer_scene.add(this.group)
               
                
                // I would like to rotate this group in three js by at least 45 degrees
        })


        const axesHelper = new THREE.AxesHelper(5); // Set the size based on your needs
        this.group.add(axesHelper);
        // const scene = this.display.scene;
        // {
        //     let geometry22 = new THREE.BoxGeometry(1, 1, 1);
        //     let material22 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

        //     // Create the first mesh and position it to the left (-2 on the x axis)
        //     var mesh1 = new THREE.Mesh(geometry22, material22);
        //     mesh1.position.set(-2, 0, 0);

        //     // Create the second mesh and position it to the right (2 on the x axis)
        //     var mesh2 = new THREE.Mesh(geometry22, material22);
        //     mesh2.position.set(2, 0, 0);

        //     // Create a group and add the meshes
        //     // this.group.add(mesh1);
        //     // this.group.add(mesh2);

        // }
        
      
        // array=[mesh1, mesh2]
        // array.forEach(({ objectOptions, classInstance }) => {

        //     let added_object=new classInstance()
        //     added_object.model.create(this.state.state);
        
           
        //     this.set_the_options(added_object, objectOptions)
        //     // this.display.set_scene(this.display.get_scene())
        //     // const created_object = this.object_addition.bind(this)(objectOptions, classInstance);
        //     // console.log(created_object)
            
        //     let geometry22 = new THREE.BoxGeometry(1, 1, 1);
        //     let material22 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

        //     // Create the first mesh and position it to the left (-2 on the x axis)
        //     var mesh1 = new THREE.Mesh(geometry22, material22);
        //     mesh1.position.set(-2, 0, 0);

        //     // Create the second mesh and position it to the right (2 on the x axis)
        //     var mesh2 = new THREE.Mesh(geometry22, material22);
        //     mesh2.position.set(2, 0, 0);


          

        //     // debug()
        //     // var mesh3 = new THREE.Mesh(geometry22, material22);

        //     // this.group.add(mesh3)
        //     // console.log(t)
        // });
        // let mesh3 = new CubeContr    oller();
        // mesh3.model.create()
        // mesh3.model.get_model()
        // mesh3.model.get_model().position.set(2, 2, 0);
        // let mesh3_model=mesh3.model.get_model()
    

        // array=[mesh1, mesh2, mesh3_model]
        // array.forEach((completed_mesh) => {
        //     // this.display.set_scene(this.display.get_scene())
        //     //const created_object = this.object_addition.bind(this)(objectOptions, classInstance);
        //     // console.log(created_object)
        //     this.group.add(completed_mesh)
        // });

    
        this.display.get_scene().add(this.group)
      
        // this.handleEvent('stateChange')
        
        // this.handleEvent('creationStep');
        // this.group.position.y=-2.0
        // this.group.position.y=-2.0

        


        // this.group.rotation.y=(Math.PI/2 )
        // this.group.position.y=this.stat
        // this.group.rotation.y=4*Math.PI/2
        // // this.group.position.set(0, -2, 0);
        this.basicTransformation()
        //console.log(this.state.state)
        
    }
    handleEvent(event, data) {
        switch (event) {
            case 'removeModel':
                //I would like to remove the curent model from this scene and current group as well
                this.display.remove_from_scene(this.model.get_model())
                this.display.remove_from_scene(this.group)
                //I would like to kill all objects in a group THREE.js

                while(this.group.children.length > 0){ 
                    this.group.remove(this.group.children[0]); 
                }
                
                if(this.group) {
                    if(this.group instanceof THREE.Group) {
                        while(this.group.children.length > 0){ 
                            this.remove(object.children[0]); 
                        }
                    }
                    //this.group = new THREE.Group();  // Assign a new empty group
                }
                break;
            case 'buildingStep':
                this.handleEvent('recursivelyRemoveModel');
                this.buildingStep()

                break;
            case 'creationStep':
                {
                    //this.handleEvent('recursivelyRemoveModel')
                    // this.handleEvent('removeModel')
                    // Create the geometry, material, and mesh for the cube
                    // const geometry = new THREE.BoxGeometry(1, 5, 1);  // Cube of size 1x1x1
                    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });  // Green color
                    // const cube = new THREE.Mesh(geometry, material);

                    // // Add the cube to the scene
                    // this.display.add_to_scene(cube);
                    // this.display.remove_from_scene(cube)

                    if (this.model && typeof this.model.get_model === 'function') {
                        const modelInstance = this.model

                        if (modelInstance && typeof modelInstance.create === 'function') {
                            modelInstance.create(this.state.state);
                        }
                        if (this.display && typeof this.display.add_to_scene === 'function') {
                            this.display.add_to_scene(modelInstance.model);
                            this.display.add_to_scene(this.group);
                            // this.display.add_to_scene(cube)
                            // this.display.remove_from_scene(cube)
                        }
                    }
                    if (Array.isArray(this.children)) {
                        this.children.forEach((child) => {
                            if (child && typeof child.handleEvent === 'function') {
                                // child.handleEvent('creationStep');
                            }
                        });
                    }
                    break
                }
            case 'genericChangeObject':
                {
                    // const accessers = [
                    //     new accesser('color', data),
                    // ]
                    //It requires accesser as passed data
                    
                    this.handleEvent('recursivelyRemoveModel');
                    this.set_the_options(this, data)
                    this.handleEvent('buildingStep');

                    // this.handleEvent('creationStep');
                    // this.buildingStep()
                }
                break;

            case 'changeObject':
                // alert(data)
                {
               
                    const accessers = [
                        new accesser('roof_color_top', data),
                        new accesser('color', data),
                    ]
                    this.handleEvent('recursivelyRemoveModel');
                    this.set_the_options(this, accessers)
                    this.handleEvent('buildingStep');

                    // this.handleEvent('creationStep');
                    // this.buildingStep()
                }
                break;
            case 'changeFloor':
                // alert(data)
                const accessers = [
                    new accesser('color', data),
                    new accesser('roof_color_top', data),
                ]
                this.handleEvent('recursivelyRemoveModel');
                this.set_the_options(this, accessers)
                this.handleEvent('buildingStep');

                // this.handleEvent('creationStep');
                // this.buildingStep()

                break;
            default:
                // console.error(event, data)
                super.handleEvent(event, data);
                break;
        }
    }
}

class RoofSideController extends UconfigsController {
    constructor() {
        super()
        this.setModel(UconfigInvisibleObject)
        this.gui = new UconfigInvisibleGui();
        this.gui.set_mediator(this)
        this.group = new THREE.Group()
    }
    determineStateOld() {
        //You can get the current state of the object by using the 
        let name = this.state.get('name') || 'Wall'
        let object_type = this.state.get('object_type') || 'flat'
        let object_width = parseFloat(this.state.get('object_width')) || 3
        let object_height = parseFloat(this.state.get('object_height')) || 2.43
        let object_depth = parseFloat(this.state.get('object_depth')) || 2
        let object_color = this.state.get('color') || "#272727"
     
        let texture_type=""
        let material_type=this.state.get('material_type') || "material_type_1" 
        // switch(material_type){
        //     case "material_type_1":
        //             // object_color =  "#677727"
        //             break;
        //         case "material_type_2":
        //             // object_color =  "#872727"
        //             break;
        //         case "material_type_3":
        //             // object_color =  "#272727"
        //             break;
        //         case "material_type_4":
        //             // object_color =  "#972797"
        //             break;
        //     default:
        //         // code to be executed if expression doesn't match any cases
        // }
        // let parent_color = this.mediator.state.get('color') || "#872727"

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
            new accesser('name', name + "_front"),
            new accesser('width', object_width),
            new accesser('height', object_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', 0),
            new accesser('position_y', 0),
            new accesser('position_z', object_depth/2),
            new accesser('color', object_color),
            new accesser('color_external', object_color),
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
            new accesser('position_z', -object_depth/2),
            new accesser('color', object_color),
            new accesser('color_external', object_color),
            new accesser('position_relative', 'true'),
            new accesser('rotation_y', Math.PI),

        ]
        const accessersWallLeft = [
            new accesser('name', name + "_left"),
            new accesser('width', object_depth),
            new accesser('height', object_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', -object_width/2),
            new accesser('position_y', 0),
            new accesser('position_z',0),
            new accesser('color', object_color),
            new accesser('color_external', object_color),
            new accesser('position_relative', 'true'),
            new accesser('rotation_y', -Math.PI/2),

        ]
        const accessersWallRight = [
            new accesser('name', name + '_right'),
            new accesser('width', object_depth),
            new accesser('height', object_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', object_width/2),
            new accesser('position_y', 0),
            new accesser('position_z', 0),
            new accesser('color', object_color),
            new accesser('color_external', "#FF0000"),
            new accesser('position_relative', 'true'),
            new accesser('rotation_y', Math.PI/2),

        ]


        const iterate=[accessersWallFront ,accessersWallLeft ,accessersWallBack ,accessersWallRight ]
        iterate.forEach(accessersObject => {  
            const added_accesser = new accesser('material_type', material_type);
            accessersObject.push(added_accesser);
        });



        return { "accessersWallFront": accessersWallFront, "accessersWallBack": accessersWallBack, "accessersWallLeft": accessersWallLeft, "accessersWallRight": accessersWallRight }
    }
    determineState(){
        //You can get the current state of the object by using the 
        let name=this.state.get('name')||'Roof'
   
        let width=parseFloat(this.state.get('width'))||4.0
        let height=parseFloat(this.state.get('height'))||2.13
        let depth=parseFloat(this.state.get('depth'))||4.0
   
   
        let roof_type=this.state.get('roof_type')||'flat'
        let roof_width=parseFloat(this.state.get('roof_width'))||4.0
        let roof_depth=parseFloat(this.state.get('roof_depth'))||4.0
        let roof_height=parseFloat(this.state.get('roof_height'))||2
        let roof_color=this.state.get('color')||"#FEFEFE"
        let color_external=this.state.get('color_external')||"#FEFEFE"
        let roof_color_top=this.state.get('color')||"#787878"
        let roof_angle=parseFloat(this.state.get('roof_angle'))||5
        let sheet_depth=parseFloat(this.state.get('sheet_depth'))||0.05
        let building_height=parseFloat(this.state.get('height'))||2.13
         // roof_depth=1.5
   
        let object_type = this.state.get('object_type') || 'left';
   
         roof_width=width
         building_height=height
         roof_depth=depth
   
         let position_x=this.state.get('position_x')||0
         let position_y=this.state.get('position_y')||0
         let position_z=this.state.get('position_z')||0
     
        let displacement_y=0
     //    displacement_y=1/8*Math.sin(Math.PI*parseFloat(roof_angle)/180)*parseFloat(this.state.get('roof_width'))
          displacement_y=roof_width*(1/2*Math.sin(Math.PI*parseFloat(roof_angle)/180))
         
     //    this.state.update( new accesser('position_y',find_displacement))
        let rotation_y=0
   //   switch (object_type) {
   //     case 'left':
   //        rotation_y=0
   //         break;
   //     case 'right':
   //          rotation_y=Math.PI/2
   
   //         break;
   //     case 'back':
   //         rotation_y=Math.PI
   //         break;
           
   //     case 'front':
   //         rotation_y=-Math.PI/2
   
   //         break;
       
   //     case 'sideways':
   //         rotation_y=-Math.PI/2
   //         break;
   //     case 'sideways_front':
   //         rotation_y=-Math.PI/2
   //         break;
       
   //     default: 
   //         break;
       
   // }
   
   
   
     
     //    this.state.state['position_y']=0.2+1*Math.sin(180*roof_angle/Math.PI)
        const accessersGable=[
         new accesser('name', 'Rooftop'),
         new accesser('width', roof_width),
         new accesser('height', 0.05),
         new accesser('sheet_depth', sheet_depth),
         new accesser('depth', roof_depth),
         new accesser('segments', 0),
         new accesser('radius', 0),
         new accesser('position_x', 0),
         new accesser('position_y',displacement_y+building_height+position_y),
         new accesser('position_z',0),
         new accesser('color', roof_color),
         new accesser('roof_color_top', roof_color_top),
         new accesser('position_relative', 'true'),
         new accesser('roof_angle', roof_angle),
         new accesser('roof_color', roof_color),
         new accesser('color_external', color_external),
         new accesser('rotation_y', rotation_y)
         
       
     ]
     const accessersSupport1=[
         new accesser('name', 'Roof left'),
         new accesser('width', roof_width),
         new accesser('height', roof_height),
         new accesser('sheet_depth', sheet_depth),
         new accesser('depth', 0.05),
         new accesser('roof_depth', roof_depth),
         new accesser('segments', 0),
         new accesser('radius', 0),
         new accesser('position_x', 0),
         new accesser('position_y', displacement_y+building_height+position_y),
         new accesser('position_z',-sheet_depth+0),
         new accesser('color', roof_color),
         new accesser('position_relative', 'true'),
         new accesser('roof_angle', roof_angle),
         new accesser('roof_color', roof_color),
         new accesser('color_external', color_external),
         new accesser('rotation_y', rotation_y)
       
     ]
     const accessersSupport2=[
         new accesser('name', 'Roof right'),
         new accesser('width', roof_width),
         new accesser('height', roof_height),
         new accesser('sheet_depth', sheet_depth),
         new accesser('depth', 0.05),
         new accesser('roof_depth', roof_depth),
         new accesser('segments', 1),
         new accesser('radius', 1),
         new accesser('position_x', 0),
         new accesser('position_y', displacement_y+building_height+position_y),
         new accesser('position_z',-roof_depth+0),
         new accesser('color', roof_color),
         new accesser('position_relative', 'true'),
         new accesser('roof_angle', roof_angle),
         new accesser('roof_color', roof_color),
         new accesser('color_external', color_external),
         new accesser('rotation_y', rotation_y)
     ]
     const accessersSupport3=[
         new accesser('name', 'Roof back'),
         new accesser('width', roof_width),
         new accesser('height', 1),
         new accesser('sheet_depth', sheet_depth),
         new accesser('depth', 0.05),
         new accesser('roof_depth', roof_depth),
         new accesser('segments', 1),
         new accesser('radius', 0),
         new accesser('position_x',0),
         new accesser('position_y', displacement_y+building_height+position_y),
         new accesser('position_z',0),
         new accesser('color', roof_color),
         new accesser('position_relative', 'true'),
         new accesser('roof_angle', roof_angle),
         new accesser('roof_color', roof_color),
         new accesser('color_external', "#FF0000"),
         new accesser('rotation_y', rotation_y),
         new accesser('color_external', color_external),
       
     ]
       return {"accessersGable":accessersGable,"accessersSupport1":accessersSupport1, "accessersSupport2":accessersSupport2,"accessersSupport3":accessersSupport3}
    }
    calculateState() {
        //This is a function that updates the values of the children of the system
        const accessersDict = this.determineState();
        Object.keys(accessersDict).forEach((key, index) => {
            if (this.children[index]) {
                this.set_the_options(this.children[index], accessersDict[key]);
            }
        });
    }
    buildingStep() {

    
        let roof_name=this.state.get('name')||"just a no name"
        // debug()
        const accessers = [
            new accesser('name', roof_name),
            // new accesser('color','#973737' )

        ]
        this.set_mediator(this)
        this.set_the_options(this, accessers)

        

        //const { accessersWallFront, accessersWallBack, accessersWallLeft, accessersWallRight } = this.determineState();
        const { accessersGable, accessersSupport1, accessersSupport2, accessersSupport3 } = this.determineState();
        //      let array = [
        //          { objectOptions: accessersWallFront, classInstance: WallGarageController },
        //          { objectOptions: accessersWallBack, classInstance: WallGarageController },
        //          { objectOptions: accessersWallLeft, classInstance: WallGarageController },
        //          { objectOptions: accessersWallRight, classInstance: WallGarageController }
        //  ]

        // let array = [
        // { objectOptions: accessersWallFront, classInstance:WallController},
        // { objectOptions: accessersWallBack, classInstance: WallController },
        // { objectOptions: accessersWallLeft, classInstance: WallController },
        // { objectOptions: accessersWallRight, classInstance: WallController }
        // ]
        
        let array = [
            {objectOptions: accessersGable, classInstance: GableGarageController},
            {objectOptions: accessersSupport1, classInstance: SupportGarageController},
            {objectOptions: accessersSupport2, classInstance: SupportGarageController},
            {objectOptions: accessersSupport3, classInstance: SupportSquareGarageController}
        ]


        // // array=[]

        // this.children.forEach((child) => {
        //     child.handleEvent('recursivelyRemoveModel')
        // });
        // this.children = []

        // array.forEach(({ objectOptions, classInstance }) => {
        //     this.display.set_scene(this.display.get_scene())
        //     const created_object = this.object_addition.bind(this)(objectOptions, classInstance);
        //     // console.log(created_object)
        //     this.group.add(created_object)
        //     // console.log(t)
        // });
        let outer_scene=this.display.get_scene()
        array.forEach(({ objectOptions, classInstance }) => {

                this.display.set_scene(this.display.get_scene())
                //const completed_mesh = this.object_addition.bind(this)(objectOptions, classInstance);
                //     // console.log(created_object)
                //     this.group.add(created_object)
                const added_object = new classInstance()
                added_object.display.set_scene(outer_scene)
                added_object.set_the_options(added_object, objectOptions)
                added_object.model.create(added_object.state.state)
                // added_object.display.set_scene(this.display.get_scene())

                this.addChild(added_object)
                // added_object.display.set_scene(outer_scene)
                // debug()
                // const completed_mesh=added_object.model.get_model()
                // this.group.position.x += 10; // Move 10 units along X-axis
                // this.group.position.y += 20; // Move 20 units along Y-axis
                // this.group.position.z += 30; 
               
                added_object.handleEvent('buildingStep')
                this.group.add(added_object.model.get_model())   
                this.group.add(added_object.group)
           
                // added_object.group.position.y=4.0
                 
                // outer_scene.add(this.group)
               
                
                // I would like to rotate this group in three js by at least 45 degrees
        })


        const axesHelper = new THREE.AxesHelper(5); // Set the size based on your needs
        this.group.add(axesHelper);
        // const scene = this.display.scene;
        // {
        //     let geometry22 = new THREE.BoxGeometry(1, 1, 1);
        //     let material22 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

        //     // Create the first mesh and position it to the left (-2 on the x axis)
        //     var mesh1 = new THREE.Mesh(geometry22, material22);
        //     mesh1.position.set(-2, 0, 0);

        //     // Create the second mesh and position it to the right (2 on the x axis)
        //     var mesh2 = new THREE.Mesh(geometry22, material22);
        //     mesh2.position.set(2, 0, 0);

        //     // Create a group and add the meshes
        //     // this.group.add(mesh1);
        //     // this.group.add(mesh2);

        // }
        
      
        // array=[mesh1, mesh2]
        // array.forEach(({ objectOptions, classInstance }) => {

        //     let added_object=new classInstance()
        //     added_object.model.create(this.state.state);
        
           
        //     this.set_the_options(added_object, objectOptions)
        //     // this.display.set_scene(this.display.get_scene())
        //     // const created_object = this.object_addition.bind(this)(objectOptions, classInstance);
        //     // console.log(created_object)
            
        //     let geometry22 = new THREE.BoxGeometry(1, 1, 1);
        //     let material22 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

        //     // Create the first mesh and position it to the left (-2 on the x axis)
        //     var mesh1 = new THREE.Mesh(geometry22, material22);
        //     mesh1.position.set(-2, 0, 0);

        //     // Create the second mesh and position it to the right (2 on the x axis)
        //     var mesh2 = new THREE.Mesh(geometry22, material22);
        //     mesh2.position.set(2, 0, 0);


          

        //     // debug()
        //     // var mesh3 = new THREE.Mesh(geometry22, material22);

        //     // this.group.add(mesh3)
        //     // console.log(t)
        // });
        // let mesh3 = new CubeContr    oller();
        // mesh3.model.create()
        // mesh3.model.get_model()
        // mesh3.model.get_model().position.set(2, 2, 0);
        // let mesh3_model=mesh3.model.get_model()
    

        // array=[mesh1, mesh2, mesh3_model]
        // array.forEach((completed_mesh) => {
        //     // this.display.set_scene(this.display.get_scene())
        //     //const created_object = this.object_addition.bind(this)(objectOptions, classInstance);
        //     // console.log(created_object)
        //     this.group.add(completed_mesh)
        // });

    
        this.display.get_scene().add(this.group)
      
        // this.handleEvent('stateChange')
        
        // this.handleEvent('creationStep');
        // this.group.position.y=-2.0
        // this.group.position.y=-2.0

        


        // this.group.rotation.y=(Math.PI/2 )
        // this.group.position.y=this.stat
        // this.group.rotation.y=4*Math.PI/2
        // // this.group.position.set(0, -2, 0);
        this.basicTransformation()
        //console.log(this.state.state)
        
    }
    handleEvent(event, data) {
        switch (event) {
            case 'removeModel':
                //I would like to remove the curent model from this scene and current group as well
                this.display.remove_from_scene(this.model.get_model())
                this.display.remove_from_scene(this.group)
                //I would like to kill all objects in a group THREE.js

                while(this.group.children.length > 0){ 
                    this.group.remove(this.group.children[0]); 
                }
                
                if(this.group) {
                    if(this.group instanceof THREE.Group) {
                        while(this.group.children.length > 0){ 
                            this.remove(object.children[0]); 
                        }
                    }
                    //this.group = new THREE.Group();  // Assign a new empty group
                }
                break;
            case 'buildingStep':
                this.handleEvent('recursivelyRemoveModel');
                this.buildingStep()

                break;
            case 'creationStep':
                {
                    //this.handleEvent('recursivelyRemoveModel')
                    // this.handleEvent('removeModel')
                    // Create the geometry, material, and mesh for the cube
                    // const geometry = new THREE.BoxGeometry(1, 5, 1);  // Cube of size 1x1x1
                    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });  // Green color
                    // const cube = new THREE.Mesh(geometry, material);

                    // // Add the cube to the scene
                    // this.display.add_to_scene(cube);
                    // this.display.remove_from_scene(cube)

                    if (this.model && typeof this.model.get_model === 'function') {
                        const modelInstance = this.model

                        if (modelInstance && typeof modelInstance.create === 'function') {
                            modelInstance.create(this.state.state);
                        }
                        if (this.display && typeof this.display.add_to_scene === 'function') {
                            this.display.add_to_scene(modelInstance.model);
                            this.display.add_to_scene(this.group);
                            // this.display.add_to_scene(cube)
                            // this.display.remove_from_scene(cube)
                        }
                    }
                    if (Array.isArray(this.children)) {
                        this.children.forEach((child) => {
                            if (child && typeof child.handleEvent === 'function') {
                                // child.handleEvent('creationStep');
                            }
                        });
                    }
                    break
                }
            case 'genericChangeObject':
                {
                    // const accessers = [
                    //     new accesser('color', data),
                    // ]
                    //It requires accesser as passed data
                    
                    this.handleEvent('recursivelyRemoveModel');
                    this.set_the_options(this, data)
                    this.handleEvent('buildingStep');

                    // this.handleEvent('creationStep');
                    // this.buildingStep()
                }
                break;

            case 'changeObject':
                // alert(data)
                {
                    const accessers = [
                        new accesser('color', data),
                    ]
                    this.handleEvent('recursivelyRemoveModel');
                    this.set_the_options(this, accessers)
                    this.handleEvent('buildingStep');

                    // this.handleEvent('creationStep');
                    // this.buildingStep()
                }
                break;
            case 'changeFloor':
                // alert(data)
                const accessers = [
                    new accesser('color', data),
                ]
                this.handleEvent('recursivelyRemoveModel');
                this.set_the_options(this, accessers)
                this.handleEvent('buildingStep');

                // this.handleEvent('creationStep');
                // this.buildingStep()

                break;
            default:
                // console.error(event, data)
                super.handleEvent(event, data);
                break;
        }
    }
}


export {  UconfigsImplementationController as RoofControllableBasicSystem }