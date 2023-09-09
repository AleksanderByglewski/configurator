import * as THREE from 'three';
import { accesser } from './base'
import { Ground, closeGround } from './objects/ground'
import { WallsControllableBasicSystem } from './objects/x-walls--old/implementation'
import { RoofControllableBasicSystem } from './objects/x-roof--old/implementation'
import { AdditionalControllableBasicSystem } from './objects/doors/implementation'
import { UconfigsImplementationController as TemplateControllableBasicSystem, UconfigsChildImplementationController as TemplateChildControllableBasicSystem } from './objects/wall/implementation'

import { UconfigsChildImplementationController as GateSystem } from './objects/gate/implementation'
import { UconfigsChildImplementationController as FloorSystem, UconfigsImplementationController as InvisibleSystem } from './objects/floors/implementation'
import { UconfigsImplementationController as RoofSystem } from './objects/roof/implementation'
import { UconfigsImplementationController as OmegaSystem } from './objects/omega/implementation'

import { UconfigsImplementationController as AdvancedPhysicsSystem, UconfigsImplementationSkewedController as SkewedAdvancedPhysicsSystem , UconfigsImplementationSkewedTopController as SkewedTopAdvancedPhysicsSystem } from './objects/advanced_template/implementation'

// import {FoundationGarageController, FoundationsGarageController} from './objects/foundation'
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
  //  addLights2(scene)
  let value = {}
  addLights(scene)
  // attach_ground(scene)
  // attach_fog(scene)
  scene.background = new THREE.Color(0xcce7f0);
  scene.background = new THREE.Color(0x000000);
  const grid = new THREE.GridHelper(4, 4, 0xffffff, 0xffffff);
  scene.add(grid);

  var axesHelper = new THREE.AxesHelper(1);
  scene.add(axesHelper)
  

  const geometry = new THREE.PlaneGeometry(10, 10);
  const material = new THREE.MeshBasicMaterial({ color: 0xcecece, side: THREE.DoubleSide });
  const floor = new THREE.Mesh(geometry, material);
  floor.rotation.x = Math.PI / 2;
  //scene.add(floor);

  function setOptions(passedObject, accessers) {
    for (let i = 0; i < accessers.length; i++) {
      passedObject.state.update(accessers[i].resource_locator, accessers[i].value);
    }

  }

  function createGarageObject(accessers, ObjectClass) {
    const passedObject = new ObjectClass();
    setOptions(passedObject, accessers)
    passedObject.display.set_scene(scene)
    return passedObject
  }

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
  the_floor_test()

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
    let GroupGarageSystem = createGarageObject(emptySystem, RoofSystem);
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
  value = advanced_physics_object()

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







  let design = false
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
    let GroupGarageSystem = createGarageObject(emptySystem, OmegaSystem);
    GroupGarageSystem.wall_left = wall_left
    GroupGarageSystem.wall_right = wall_right
    GroupGarageSystem.wall_back = wall_back
    GroupGarageSystem.wall_front = wall_front

    GroupGarageSystem.handleEvent('buildingStep');
    GroupGarageSystem.handleEvent('generateInputs');


    // let RedGateSystem1=createGarageObject(emptySystem, GateSystem);

    // RedGateSystem1.external_objects_controllers.push(GroupGarageSystem);
    // GroupGarageSystem.external_objects.push(RedGateSystem1)

    // RedGateSystem1.handleEvent('buildingStep');
    // RedGateSystem1.handleEvent('generateInputs');

    GroupGarageSystem.handleEvent('stateChange', { 'rotation_y': 3 * Math.PI / 2 })
    GroupGarageSystem.handleEvent('stateChange', { 'position_x': 0 })

    // GroupGarageSystem.handleEvent('stateChange', {'width': .57} )
    return [GroupGarageSystem]

  }
  //the_omega()
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