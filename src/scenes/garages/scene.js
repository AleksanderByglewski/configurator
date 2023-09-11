import * as THREE from 'three';
import { accesser } from './base'
import { Ground, closeGround } from './objects/ground'
import { WallsControllableBasicSystem } from './objects/x-walls--old/implementation'
import { RoofControllableBasicSystem } from './objects/x-roof--old/implementation'
import { AdditionalControllableBasicSystem } from './objects/doors/implementation'
import { UconfigsImplementationController as TemplateControllableBasicSystem, UconfigsChildImplementationController as TemplateChildControllableBasicSystem } from './objects/wall/implementation'

import { UconfigsChildImplementationController as GateSystem } from './objects/gate/implementation'
import { UconfigsChildImplementationController as FloorSystem, UconfigsImplementationController as InvisibleSystem } from './objects/floors/implementation'
import { UconfigsImplementationController as RoofSystemOld } from './objects/roof/implementation'
import { UconfigsImplementationController as OmegaSystem } from './objects/omega/implementation'

import { 
  UconfigsImplementationController as AdvancedPhysicsSystem, 
  UconfigsImplementationSkewedController as SkewedAdvancedPhysicsSystem , 
  UconfigsImplementationSkewedTopController as SkewedTopAdvancedPhysicsSystem 
} from './objects/advanced_template/implementation'


import { 
  UconfigsImplementationWallsController as AdvancedWallsSystem,
  UconfigsImplementationWallController as AdvancedWallSystem  
  } from './objects/implementation_wall/implementation'


  import { 
    UconfigsImplementationRoofsController as RoofSystem,
 
    } from './objects/implementation_roof/implementation'
  
    import { 
      UconfigsImplementationDoorController as DoorSystem,
   
      } from './objects/implementation_door/implementation'

  
  import { 
      UconfigsImplementationController as OmegaAdvancedSystem,
     
  } from './objects/implementation_add_door/implementation'
  
import { 
    UconfigsImplementationController as ContactFormSystem,
   
} from './objects/implementation_contact_form/implementation'



function setOptions(passedObject, accessers) {
  for (let i = 0; i < accessers.length; i++) {
    passedObject.state.update(accessers[i].resource_locator, accessers[i].value);
  }

}

function addLights(scene) {
  let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 2.2, 0.4); // set the position of the light
  //scene.add(directionalLight); // add the light to the scene
  // Create an ambient light with color white and intensity 0.5
  let ambientLight = new THREE.AmbientLight(0x404040); // soft white light
  scene.add(ambientLight);

  //Create a spotlight
  // var spotlight = new THREE.SpotLight(0xffffff); // white light
  // spotlight.position.set(2, 4, 4); // set position of the light
  // var spotLightHelper = new THREE.SpotLightHelper(spotlight);
  // scene.add(spotLightHelper);
  // spotlight.target.position.set(0, 0, 0);
  // // Adjust the angle, intensity and distance of the light
  // spotlight.angle = Math.PI/28; // Angle of the light in radians (cone width)
  // spotlight.intensity = 10; // Intensity/brightness of the light
  // spotlight.distance = 100; // Maximum distance the light reaches. If 0, then it's infinite.
  // scene.add(spotlight);
}
function populateScene(scene) {
  function createGarageObject(accessers, ObjectClass) {
    const passedObject = new ObjectClass();
    setOptions(passedObject, accessers)
    passedObject.display.set_scene(scene)
    return passedObject
  }
  //  addLights2(scene)
  let value = {}
  addLights(scene)

  function advanced_physics_object() {

    // I would like to create an advanced physics object that would have some additional elements attached to it
    let GroupGarageSystem1, GroupGarageSystem2, GroupGarageSystem3;
    let RedGateSystem1;


    GroupGarageSystem1 = createGarageObject(emptySystem, Advancedm);
    GroupGarageSystem2 = createGarageObject(emptySystem, SkewedAdvancedPhysicsSystem);
    GroupGarageSystem3 = createGarageObject(emptySystem, SkewedTopAdvancedPhysicsSystem);

    GroupGarageSystem1.external_objects.push(GroupGarageSystem2)
    GroupGarageSystem2.external_objects_controllers.push(GroupGarageSystem1)
    GroupGarageSystem2.mediator=GroupGarageSystem1


    GroupGarageSystem2.external_objects.push(GroupGarageSystem3)
    // GroupGarageSystem3.external_objects_controllers.push(GroupGarageSystem2)
    GroupGarageSystem3.mediator=GroupGarageSystem2


    // GroupGarageSystem2.handleEvent('buildingStep');
    GroupGarageSystem1.state.state.position_y=1
   

    GroupGarageSystem1.handleEvent('buildingStep');
    GroupGarageSystem1.handleEvent('generateInputs');
    GroupGarageSystem2.handleEvent('generateInputs');     
    GroupGarageSystem3.handleEvent('generateInputs');

    //  GroupGarageSystem2.handleEvent('buildingStep');
    // //  GroupGarageSystem.handleEvent('generateInputs');

    // RedGateSystem1=createGarageObject(emptySystem, AdvancedPhysicsSystem);

    // RedGateSystem1.external_objects_controllers.push(GroupGarageSystem);
    // GroupGarageSystem.external_objects.push(RedGateSystem1)
    // RedGateSystem1.state.state['name']="Brama frontowa" 
    // RedGateSystem1.state.state['width']=3.15
    // RedGateSystem1.handleEvent('buildingStep');


    // RedGateSystem1.handleEvent('generateInputs');




    // GroupGarageSystem.handleEvent('stateChange', {'rotation_y': -1.57} )
    // GroupGarageSystem.handleEvent('stateChange', {'position_x': 0.25} )

    // GroupGarageSystem.handleEvent('stateChange', {'width': .57} )
    return [GroupGarageSystem1, GroupGarageSystem2, GroupGarageSystem3]

  }


  // attach_ground(scene)
  // attach_fog(scene)
  scene.background = new THREE.Color(0xcce7f0);
  scene.background = new THREE.Color(0x000000);
  const grid = new THREE.GridHelper(50, 100, 0xffffff, 0xffffff);
  scene.add(grid);

  var axesHelper = new THREE.AxesHelper(1);
  scene.add(axesHelper)
  const geometry = new THREE.PlaneGeometry(10, 10);
  const material = new THREE.MeshBasicMaterial({ color: 0xcecece, side: THREE.DoubleSide });
  const floor = new THREE.Mesh(geometry, material);
  floor.rotation.x = Math.PI / 2;
  //scene.add(floor);

  
  const emptySystem = [
    // new accesser('name', ' System'),

    // new accesser('position_x', 0.0),
    // new accesser('position_y', 0.0),
    // new accesser('position_z',0.0),
  ]

  function the_floor_test() {

    // let RedCubeSystem=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    let GroupGarageSystem = createGarageObject(emptySystem, InvisibleSystem);
    GroupGarageSystem.handleEvent('buildingStep');
    // GroupGarageSystem.handleEvent('generateInputs');
    let RedGateSystem1 = createGarageObject(emptySystem, FloorSystem);
    // let RedCubeSystem2=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    // let RedCubeSystem3=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    // let RedCubeSystem4=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);

    RedGateSystem1.state.state['name'] = "Podłoże"
    RedGateSystem1.state.state['width'] = 5.0
    RedGateSystem1.state.state['depth'] = 5.0
    RedGateSystem1.state.state['color'] = "#FFFFFF"

    RedGateSystem1.external_objects_controllers.push(GroupGarageSystem);
    GroupGarageSystem.external_objects.push(RedGateSystem1)



    RedGateSystem1.handleEvent('buildingStep');
    RedGateSystem1.handleEvent('generateInputs');



    // // RedCubeSystem2.external_objects_controllers.push(GroupGarageSystem);
    // // GroupGarageSystem.external_objects.push(RedCubeSystem2.group)

    // // RedCubeSystem3.external_objects_controllers.push(GroupGarageSystem);
    // // GroupGarageSystem.external_objects.push(RedCubeSystem3.group)


    // // RedCubeSystem4.external_objects_controllers.push(GroupGarageSystem);
    // // GroupGarageSystem.external_objects.push(RedCubeSystem4.group)



    // // RedCubeSystem2.handleEvent('buildingStep');
    // // RedCubeSystem2.handleEvent('generateInputs');

    // // RedCubeSystem3.handleEvent('buildingStep');
    // // RedCubeSystem3.handleEvent('generateInputs');

    // // RedCubeSystem4.handleEvent('buildingStep');
    // // RedCubeSystem4.handleEvent('generateInputs');



    // let RedCubeSystemChild1=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    // let RedCubeSystemChild2=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    // let RedCubeSystemChild3=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    // let RedCubeSystemChild4=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);


    // RedCubeSystemChild1.external_objects_controllers.push(RedCubeSystem1);
    // RedCubeSystem1.external_objects.push(RedCubeSystemChild1.group)
    return { GroupGarageSystem, RedGateSystem1 }

  }
  //the_floor_test()

  function roof_test() {

    let GroupGarageSystem = createGarageObject(emptySystem, RoofControllableBasicSystem);

    // GroupGarageSystem.state.update('identifier',"my walls")
    //GroupGarageSystem.state.state['color']="#FFFFFF"

    GroupGarageSystem.handleEvent('buildingStep');
    // GroupGarageSystem.state.state['color_external'] = "#ff0000"
    // GroupGarageSystem.children[0].state.state["color_external"] = "#FF0000"
    // GroupGarageSystem.handleEvent('buildingStep');
    GroupGarageSystem.handleEvent('generateInputs');




  }
  //roof_test()

  function walls_test() {
    let GroupGarageSystem = createGarageObject(emptySystem, WallsControllableBasicSystem);

    GroupGarageSystem.handleEvent('buildingStep');
    GroupGarageSystem.handleEvent('generateInputs');
  }
  //walls_test()

  function door_test() {
    let GroupGarageSystem = createGarageObject(emptySystem, AdditionalControllableBasicSystem);
    GroupGarageSystem.handleEvent('buildingStep');
    GroupGarageSystem.handleEvent('generateInputs');

  }
  //door_test()


  function two_depth_test() {

    // let RedCubeSystem=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    let GroupGarageSystem = createGarageObject(emptySystem, TemplateControllableBasicSystem);





    GroupGarageSystem.handleEvent('buildingStep');
    //GroupGarageSystem.handleEvent('generateInputs');







    let RedCubeSystem1 = createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    let RedCubeSystem2 = createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    let RedCubeSystem3 = createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    let RedCubeSystem4 = createGarageObject(emptySystem, TemplateChildControllableBasicSystem);



    RedCubeSystem1.external_objects_controllers.push(GroupGarageSystem);
    GroupGarageSystem.external_objects.push(RedCubeSystem1.group)

    // RedCubeSystem2.external_objects_controllers.push(GroupGarageSystem);
    // GroupGarageSystem.external_objects.push(RedCubeSystem2.group)

    // RedCubeSystem3.external_objects_controllers.push(GroupGarageSystem);
    // GroupGarageSystem.external_objects.push(RedCubeSystem3.group)


    // RedCubeSystem4.external_objects_controllers.push(GroupGarageSystem);
    // GroupGarageSystem.external_objects.push(RedCubeSystem4.group)

    RedCubeSystem1.handleEvent('buildingStep');
    RedCubeSystem1.handleEvent('generateInputs');

    // RedCubeSystem2.handleEvent('buildingStep');
    // RedCubeSystem2.handleEvent('generateInputs');

    // RedCubeSystem3.handleEvent('buildingStep');
    // RedCubeSystem3.handleEvent('generateInputs');

    // RedCubeSystem4.handleEvent('buildingStep');
    // RedCubeSystem4.handleEvent('generateInputs');



    let RedCubeSystemChild1 = createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    let RedCubeSystemChild2 = createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    let RedCubeSystemChild3 = createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    let RedCubeSystemChild4 = createGarageObject(emptySystem, TemplateChildControllableBasicSystem);


    RedCubeSystemChild1.external_objects_controllers.push(RedCubeSystem1);
    RedCubeSystem1.external_objects.push(RedCubeSystemChild1.group)


  }


  function template_test() {

    let RedCubeSystem = createGarageObject(emptySystem, TemplateChildControllableBasicSystem);



    let GroupGarageSystem = createGarageObject(emptySystem, TemplateControllableBasicSystem);



    // RedCubeSystem.external_objects_controllers.push(GroupGarageSystem);
    // GroupGarageSystem.external_objects.push(RedCubeSystem.group)



    GroupGarageSystem.handleEvent('buildingStep');
    // GroupGarageSystem.handleEvent('generateInputs');

    //RedCubeSystem.handleEvent('buildingStep');
    //RedCubeSystem.handleEvent('generateInputs');






    let RedCubeSystem2 = createGarageObject(emptySystem, TemplateChildControllableBasicSystem);


    RedCubeSystem2.external_objects_controllers.push(GroupGarageSystem.children[0]);
    GroupGarageSystem.children[0].external_objects.push(RedCubeSystem2.group)

    GroupGarageSystem.children[0].handleEvent('buildingStep');
    RedCubeSystem2.handleEvent('buildingStep');
    RedCubeSystem2.handleEvent('generateInputs');
    //  GroupGarageSystem.display.get_scene().add(RedCubeSystem.group)
    //GroupGarageSystem.display.get_scene().add(RedCubeSystem.group)

  }
  //template_test()

  function the_roof_test() {

    // let RedCubeSystem=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    let GroupGarageSystem = createGarageObject(emptySystem, RoofSystemOld);
    let RedGateSystem1;
    GroupGarageSystem.handleEvent('buildingStep');
    //  GroupGarageSystem.handleEvent('generateInputs');


    RedGateSystem1 = createGarageObject(emptySystem, GateSystem);

    // RedGateSystem1.external_objects_controllers.push(GroupGarageSystem);
    // GroupGarageSystem.external_objects.push(RedGateSystem1)
    // RedGateSystem1.state.state['name']="Brama frontowa" 
    // RedGateSystem1.state.state['width']=3.15
    // RedGateSystem1.handleEvent('buildingStep');


    // RedGateSystem1.handleEvent('generateInputs');




    // GroupGarageSystem.handleEvent('stateChange', {'rotation_y': -1.57} )
    // GroupGarageSystem.handleEvent('stateChange', {'position_x': 0.25} )

    // GroupGarageSystem.handleEvent('stateChange', {'width': .57} )
    return [GroupGarageSystem, RedGateSystem1]

  }
  //the_roof_test()

  function advanced_physics_object() {

    // I would like to create an advanced physics object that would have some additional elements attached to it
    let GroupGarageSystem1, GroupGarageSystem2, GroupGarageSystem3;
    let RedGateSystem1;


    GroupGarageSystem1 = createGarageObject(emptySystem, AdvancedPhysicsSystem);
    GroupGarageSystem2 = createGarageObject(emptySystem, SkewedAdvancedPhysicsSystem);
    GroupGarageSystem3 = createGarageObject(emptySystem, SkewedTopAdvancedPhysicsSystem);

    GroupGarageSystem1.external_objects.push(GroupGarageSystem2)
    GroupGarageSystem2.external_objects_controllers.push(GroupGarageSystem1)
    GroupGarageSystem2.mediator=GroupGarageSystem1


    GroupGarageSystem2.external_objects.push(GroupGarageSystem3)
    // GroupGarageSystem3.external_objects_controllers.push(GroupGarageSystem2)
    GroupGarageSystem3.mediator=GroupGarageSystem2


    // GroupGarageSystem2.handleEvent('buildingStep');
    GroupGarageSystem1.state.state.position_y=1
   

    GroupGarageSystem1.handleEvent('buildingStep');
    GroupGarageSystem1.handleEvent('generateInputs');
    GroupGarageSystem2.handleEvent('generateInputs');     
    GroupGarageSystem3.handleEvent('generateInputs');

    //  GroupGarageSystem2.handleEvent('buildingStep');
    // //  GroupGarageSystem.handleEvent('generateInputs');

    // RedGateSystem1=createGarageObject(emptySystem, AdvancedPhysicsSystem);

    // RedGateSystem1.external_objects_controllers.push(GroupGarageSystem);
    // GroupGarageSystem.external_objects.push(RedGateSystem1)
    // RedGateSystem1.state.state['name']="Brama frontowa" 
    // RedGateSystem1.state.state['width']=3.15
    // RedGateSystem1.handleEvent('buildingStep');


    // RedGateSystem1.handleEvent('generateInputs');




    // GroupGarageSystem.handleEvent('stateChange', {'rotation_y': -1.57} )
    // GroupGarageSystem.handleEvent('stateChange', {'position_x': 0.25} )

    // GroupGarageSystem.handleEvent('stateChange', {'width': .57} )
    return [GroupGarageSystem1, GroupGarageSystem2, GroupGarageSystem3]

  }

  let GroupGarageSystem;
  function advanced_garage_system(){
    GroupGarageSystem=createGarageObject(emptySystem, AdvancedWallsSystem)
  }
  advanced_garage_system()

  function advanced_walls_object() {

    // I would like to create an advanced physics object that would have some additional elements attached to it

    let WallSystem1, WallSystem2, WallSystem3 , WallSystem4;

    


    WallSystem1=createGarageObject(emptySystem, AdvancedWallSystem)
    WallSystem2=createGarageObject(emptySystem, AdvancedWallSystem)
    WallSystem3=createGarageObject(emptySystem, AdvancedWallSystem)
    WallSystem4=createGarageObject(emptySystem, AdvancedWallSystem)



    GroupGarageSystem.external_objects.push(WallSystem1)
    GroupGarageSystem.external_objects.push(WallSystem2)
    GroupGarageSystem.external_objects.push(WallSystem3)
    GroupGarageSystem.external_objects.push(WallSystem4)
 
    WallSystem1.external_objects_controllers.push(GroupGarageSystem)
    WallSystem2.external_objects_controllers.push(GroupGarageSystem)
    WallSystem3.external_objects_controllers.push(GroupGarageSystem)
    WallSystem4.external_objects_controllers.push(GroupGarageSystem)

    WallSystem1.mediator=GroupGarageSystem
    WallSystem2.mediator=GroupGarageSystem
    WallSystem3.mediator=GroupGarageSystem
    WallSystem4.mediator=GroupGarageSystem




    


   



    


    
    
  
    // RedGateSystem1=createGarageObject(emptySystem, AdvancedPhysicsSystem);

    // RedGateSystem1.external_objects_controllers.push(GroupGarageSystem);
    // GroupGarageSystem.external_objects.push(RedGateSystem1)
    // RedGateSystem1.state.state['name']="Brama frontowa" 
    // RedGateSystem1.state.state['width']=3.15
    // RedGateSystem1.handleEvent('buildingStep');


    // RedGateSystem1.handleEvent('generateInputs');




    // GroupGarageSystem.handleEvent('stateChange', {'rotation_y': -1.57} )
    // GroupGarageSystem.handleEvent('stateChange', {'position_x': 0.25} )

    // GroupGarageSystem.handleEvent('stateChange', {'width': .57} )
    //eturn [GroupGarageSystem, WallSystem1, WallSystem2, WallSystem3, WallSystem4]

  }
  advanced_walls_object() 



  let RoofSystem1
  function advanced_roof_object(){
    
    RoofSystem1=createGarageObject(emptySystem, RoofSystem)
    RoofSystem1.state.state['name'] = "Kolory dachu"
    GroupGarageSystem.external_objects.push(RoofSystem1)
    RoofSystem1.external_objects_controllers.push(GroupGarageSystem)
    RoofSystem1.mediator=GroupGarageSystem



  }
  advanced_roof_object()



  function semiAdvanced_floor_object(){
    
    // let RedCubeSystem=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    // let GroupGarageSystem = createGarageObject(emptySystem, InvisibleSystem);
    // GroupGarageSystem.handleEvent('buildingStep');
    // GroupGarageSystem.handleEvent('generateInputs');
    let RedGateSystem1 = createGarageObject(emptySystem, FloorSystem);
    // let RedCubeSystem2=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    // let RedCubeSystem3=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    // let RedCubeSystem4=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);

    RedGateSystem1.state.state['name'] = "Typy podłoża"
    RedGateSystem1.state.state['width'] = 5.0
    RedGateSystem1.state.state['depth'] = 5.0
    RedGateSystem1.state.state['color'] = "#FFFFFF"

    GroupGarageSystem.external_objects.push(RedGateSystem1)
    RedGateSystem1.external_objects_controllers.push(GroupGarageSystem)
    RedGateSystem1.mediator=GroupGarageSystem


    RedGateSystem1.handleEvent('generateInputs')


  }
  semiAdvanced_floor_object()


  function initialization_system(){

    GroupGarageSystem.handleEvent('buildingStep')
    GroupGarageSystem.handleEvent('generateInputs')
  }
  initialization_system()


  let DoorSystem1;
  function attaching_gates(){
    let front_wall=GroupGarageSystem.external_objects[0]


    DoorSystem1=createGarageObject(emptySystem, DoorSystem)
    front_wall.external_objects.push(DoorSystem1)
    DoorSystem1.external_objects_controllers.push(front_wall)
    DoorSystem1.mediator=front_wall

     
   
    GroupGarageSystem.handleEvent('buildingStep')
    

  }
  attaching_gates()




   RoofSystem1.handleEvent('generateInputs')
   //DoorSystem1.handleEvent('generateInputs');
  //value = advanced_physics_object()

  let wall_front, wall_left, wall_right, wall_back;
  let addition_front, addition_left, addition_right, addition_back
  //A two depth test is a failure right now
  function the_gate_test1() {

    // let RedCubeSystem=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    let GroupGarageSystem = createGarageObject(emptySystem, TemplateControllableBasicSystem);

    GroupGarageSystem.handleEvent('buildingStep');
    //  GroupGarageSystem.handleEvent('generateInputs');


    let RedGateSystem1 = createGarageObject(emptySystem, GateSystem);

    RedGateSystem1.external_objects_controllers.push(GroupGarageSystem);
    GroupGarageSystem.external_objects.push(RedGateSystem1)
    RedGateSystem1.state.state['name'] = "Brama frontowa"
    RedGateSystem1.state.state['width'] = 3.15
    RedGateSystem1.handleEvent('buildingStep');


    RedGateSystem1.handleEvent('generateInputs');




    GroupGarageSystem.handleEvent('stateChange', { 'rotation_y': 0 })

    // GroupGarageSystem.handleEvent('stateChange', {'width': .57} )
    return [GroupGarageSystem, RedGateSystem1]

  }
  function the_gate_test2() {

    // let RedCubeSystem=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    let GroupGarageSystem = createGarageObject(emptySystem, TemplateControllableBasicSystem);

    GroupGarageSystem.handleEvent('buildingStep');
    //  GroupGarageSystem.handleEvent('generateInputs');


    let RedGateSystem1 = createGarageObject(emptySystem, GateSystem);

    RedGateSystem1.external_objects_controllers.push(GroupGarageSystem);
    GroupGarageSystem.external_objects.push(RedGateSystem1)
    RedGateSystem1.state.state['name'] = "Drzwi prawe"


    RedGateSystem1.handleEvent('buildingStep');



    RedGateSystem1.handleEvent('generateInputs');

    GroupGarageSystem.handleEvent('stateChange', { 'rotation_y': 1.57 })

    // GroupGarageSystem.handleEvent('stateChange', {'width': .57} )
    return [GroupGarageSystem, RedGateSystem1]

  }
  function the_gate_test3() {

    // let RedCubeSystem=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    let GroupGarageSystem = createGarageObject(emptySystem, TemplateControllableBasicSystem);

    GroupGarageSystem.handleEvent('buildingStep');
    // GroupGarageSystem.handleEvent('generateInputs');


    let RedGateSystem1 = createGarageObject(emptySystem, GateSystem);

    // RedGateSystem1.external_objects_controllers.push(GroupGarageSystem);
    // GroupGarageSystem.external_objects.push(RedGateSystem1)

    // RedGateSystem1.handleEvent('buildingStep');
    // RedGateSystem1.handleEvent('generateInputs');

    GroupGarageSystem.handleEvent('stateChange', { 'rotation_y': 2 * Math.PI / 2 })

    // GroupGarageSystem.handleEvent('stateChange', {'width': .57} )
    return [GroupGarageSystem, RedGateSystem1]

  }
  function the_gate_test4() {

    // let RedCubeSystem=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    let GroupGarageSystem = createGarageObject(emptySystem, TemplateControllableBasicSystem);

    GroupGarageSystem.handleEvent('buildingStep');
    // GroupGarageSystem.handleEvent('generateInputs');


    // let RedGateSystem1=createGarageObject(emptySystem, GateSystem);

    // RedGateSystem1.external_objects_controllers.push(GroupGarageSystem);
    // GroupGarageSystem.external_objects.push(RedGateSystem1)

    // RedGateSystem1.handleEvent('buildingStep');
    // RedGateSystem1.handleEvent('generateInputs');

    GroupGarageSystem.handleEvent('stateChange', { 'rotation_y': 3 * Math.PI / 2 })

    // GroupGarageSystem.handleEvent('stateChange', {'width': .57} )
    return [GroupGarageSystem]

  }







  let design = true
  if (typeof design === 'undefined' || !design) {

    roof_test();
    [wall_front, addition_front] = the_gate_test1();
    [wall_right, addition_right] = the_gate_test2();
    [wall_back, addition_back] = the_gate_test3();
    [wall_left] = the_gate_test4();

    //[wall_back, addition_back] = the_gate_test3();
    //walls_test()
    //door_test()

  }

  function the_omega() {

    // let RedCubeSystem=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    let OmegaSystems = createGarageObject(emptySystem, OmegaSystem);
    OmegaSystems.wall_left = GroupGarageSystem.external_objects[0]
    OmegaSystems.wall_right = GroupGarageSystem.external_objects[1]
    OmegaSystems.wall_back = GroupGarageSystem.external_objects[2]
    OmegaSystems.wall_front = GroupGarageSystem.external_objects[3]

    OmegaSystems.handleEvent('buildingStep');
    OmegaSystems.handleEvent('generateInputs');


    // let RedGateSystem1=createGarageObject(emptySystem, GateSystem);

    // RedGateSystem1.external_objects_controllers.push(GroupGarageSystem);
    // GroupGarageSystem.external_objects.push(RedGateSystem1)

    // RedGateSystem1.handleEvent('buildingStep');
    // RedGateSystem1.handleEvent('generateInputs');

    // GroupGarageSystem.handleEvent('stateChange', { 'rotation_y': 3 * Math.PI / 2 })
    // GroupGarageSystem.handleEvent('stateChange', { 'position_x': 0 })

    // GroupGarageSystem.handleEvent('stateChange', {'width': .57} )
    return [GroupGarageSystem]

  }
  //the_omega()

  function generic_attaching_gates(){
  
    let OmegaSystems = createGarageObject(emptySystem, OmegaAdvancedSystem);

    OmegaSystems.wall_front = GroupGarageSystem.external_objects[0]
    OmegaSystems.wall_back = GroupGarageSystem.external_objects[1]
    OmegaSystems.wall_left = GroupGarageSystem.external_objects[2]
    OmegaSystems.wall_right = GroupGarageSystem.external_objects[3]
    OmegaSystems.door_type=false
    OmegaSystems.state.state['name'] = "Dodaj bramy"
    OmegaSystems.handleEvent('buildingStep')
    OmegaSystems.handleEvent('generateInputs')
   
      // GroupGarageSystem.handleEvent('buildingStep')
    

  }
  generic_attaching_gates()

  function generic_attaching_doors(){
  
    let OmegaSystems = createGarageObject(emptySystem, OmegaAdvancedSystem);
    
   
   OmegaSystems.wall_front = GroupGarageSystem.external_objects[0]
   OmegaSystems.wall_back = GroupGarageSystem.external_objects[1]
   OmegaSystems.wall_left = GroupGarageSystem.external_objects[2]
   OmegaSystems.wall_right = GroupGarageSystem.external_objects[3]


    // let front_wall=GroupGarageSystem.external_objects[1]


    // DoorSystem1=createGarageObject(emptySystem, DoorSystem)
    // front_wall.external_objects.push(DoorSystem1)
    // DoorSystem1.external_objects_controllers.push(front_wall)
    // DoorSystem1.mediator=front_wall

     
   
    GroupGarageSystem.handleEvent('buildingStep')
    OmegaSystems.state.state['name'] = "Dodaj drzwi"
    OmegaSystems.door_type=true
    OmegaSystems.handleEvent('generateInputs')
   
      // GroupGarageSystem.handleEvent('buildingStep')
    

  }
  generic_attaching_doors()


  function generic_contact_form(){
  
     let ContactSystems = createGarageObject(emptySystem, ContactFormSystem);
    
    // ContactSystems.state.state['name'] = "Formularze kontatktowe"
   
  //  OmegaSystems.wall_front = GroupGarageSystem.external_objects[0]
  //  OmegaSystems.wall_back = GroupGarageSystem.external_objects[1]
  //  OmegaSystems.wall_left = GroupGarageSystem.external_objects[2]
  //  OmegaSystems.wall_right = GroupGarageSystem.external_objects[3]


    // let front_wall=GroupGarageSystem.external_objects[1]


    // DoorSystem1=createGarageObject(emptySystem, DoorSystem)
    // front_wall.external_objects.push(DoorSystem1)
    // DoorSystem1.external_objects_controllers.push(front_wall)
    // DoorSystem1.mediator=front_wall

     
   
    
   

     ContactSystems.handleEvent('generateInputs')
   
      // GroupGarageSystem.handleEvent('buildingStep')
    

  }
  generic_contact_form()

  // function the_omega(){

  //   let GroupGarageSystem=createGarageObject(emptySystem,OmegaSystem);

  //   GroupGarageSystem.handleEvent('buildingStep');
  //   GroupGarageSystem.handleEvent('generate_inputs');
  //   //  wall_front.handleEvent('stateChange', {'width': 10.57} );
  //   //  wall_back.handleEvent('stateChange', {'width': 10.57} );
  //   //  wall_left.handleEvent('stateChange', {'width': 10.57} );
  //   //  wall_right.handleEvent('stateChange', {'width': 10.57} ); 

  //   //  wall_front.handleEvent('stateChange', {'color': 10.57} );
  //   //  wall_back.handleEvent('stateChange', {'color': 10.57} );
  //   //  wall_left.handleEvent('stateChange', {'color': 10.57} );
  //   //  wall_right.handleEvent('stateChange', {'color': 10.57} ); 
  //  }



  return value


}


export { populateScene }