import * as THREE from 'three';
import {accesser} from './base'
import {Ground, closeGround} from './objects/ground'
import {WallsControllableBasicSystem} from './objects/x-walls--old/implementation'
import {RoofControllableBasicSystem} from './objects/roof/implementation'  
import {AdditionalControllableBasicSystem } from './objects/doors/implementation'  
import {UconfigsImplementationController as TemplateControllableBasicSystem, UconfigsChildImplementationController as TemplateChildControllableBasicSystem} from './objects/base_template/implementation'  

import {UconfigsChildImplementationController as GateSystem} from './objects/gate/implementation'  
import {UconfigsChildImplementationController as FloorSystem, UconfigsImplementationController as InvisibleSystem} from './objects/floors/implementation'  


// import {FoundationGarageController, FoundationsGarageController} from './objects/foundation'
function addLights(scene){
  let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 2.2, 0.4); // set the position of the light
  //scene.add(directionalLight); // add the light to the scene
  // Create an ambient light with color white and intensity 0.5
  let ambientLight = new THREE.AmbientLight(0xffffff, 10);
  scene.add(ambientLight); // add the light to the scene

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
function addLights2(scene){
  let particleLight;
  particleLight = new THREE.Mesh(
    new THREE.SphereGeometry(0, 24, 24),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );
  scene.add(particleLight);

  particleLight.add(new THREE.PointLight(0xffffff, 0.3));

  particleLight.position.x = 10;
  particleLight.position.y = 3;
  particleLight.position.z = 0;



  let particleLight2 = new THREE.Mesh(
    new THREE.SphereGeometry(0, 24, 24),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );
  particleLight2.add(new THREE.PointLight(0xffffff, 2.3));


  particleLight2.position.x = 0;
  particleLight2.position.y = 10;
  particleLight2.position.z = 0;

  scene.add(particleLight2);


  const lightPos = new THREE.Vector3(20, 20, -100);
  const pointLight = new THREE.PointLight(0xffffff, 1, 500);
  pointLight.castShadow = true;
  pointLight.shadow.bias = 0.0001;
  pointLight.shadow.mapSize.width = 1024;
  pointLight.shadow.mapSize.height = 1024;
  pointLight.shadow.autoUpdate = true;
  pointLight.shadow.camera.near = 0.1;
  pointLight.shadow.camera.far = 400;
  pointLight.shadow.camera.updateProjectionMatrix();
  pointLight.position.copy(lightPos);
  pointLight.intensity = 0.5
  scene.add(pointLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
  scene.add(ambientLight);

}
function attach_ground(scene){
  let ground = new Ground()
  ground.attach(scene)
  let ground2 = new closeGround()
  ground2.attach(scene)
  }
function attach_fog(scene){
  const fogColor = new THREE.Color(0xe7e7e9);  // White color
  const fogDensity = 0.015;  // Adjust this value to control how quickly the fog density increases with distance
  scene.fog = new THREE.Fog(fogColor, 20,70);
  scene.fog = new THREE.FogExp2(fogColor, fogDensity);


}

function populateScene(scene) {
   addLights2(scene)
  addLights(scene)
  // attach_ground(scene)
  // attach_fog(scene)
  scene.background = new THREE.Color(0xcce7f0);
  scene.background = new THREE.Color(0x000000);
  const grid = new THREE.GridHelper(100, 100, 0xffffff, 0xffffff);
  scene.add(grid);

  const geometry = new THREE.PlaneGeometry(10, 10);
  const material = new THREE.MeshBasicMaterial({ color: 0xcecece, side: THREE.DoubleSide });
  const floor = new THREE.Mesh(geometry, material);
  floor.rotation.x = Math.PI / 2;
  //scene.add(floor);

  function set_the_options(passedObject, accessers){
    for(let i=0; i<accessers.length; i++) {
        passedObject.state.update(accessers[i].resource_locator, accessers[i].value);
    }

  }

  function createGarageObject(accessers, ObjectClass){
    const passedObject = new ObjectClass();
    set_the_options(passedObject, accessers)
    passedObject.display.set_scene(scene)
    return passedObject
  }

  const emptySystem=[
    // new accesser('name', ' System'),

    // new accesser('position_x', 0.0),
    // new accesser('position_y', 0.0),
    // new accesser('position_z',0.0),
  ]


  function the_floor_test(){

    // let RedCubeSystem=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    let GroupGarageSystem=createGarageObject(emptySystem,InvisibleSystem);
    GroupGarageSystem.handleEvent('buildingStep');
    // GroupGarageSystem.handleEvent('generateInputs');
    let RedGateSystem1=createGarageObject(emptySystem, FloorSystem);
    // let RedCubeSystem2=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    // let RedCubeSystem3=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    // let RedCubeSystem4=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    
    RedGateSystem1.state.state['name']="Podłoże" 
    RedGateSystem1.state.state['width']=5.0
    RedGateSystem1.state.state['depth']=5.0
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
    return { GroupGarageSystem, RedGateSystem1}

  }
  the_floor_test()

  function roof_test(){
    
    let GroupGarageSystem=createGarageObject(emptySystem,RoofControllableBasicSystem);
    // GroupGarageSystem.state.update('identifier',"my walls")

    GroupGarageSystem.handleEvent('buildingStep');

    GroupGarageSystem.handleEvent('generateInputs');
    GroupGarageSystem.handleEvent('changeObject', {'roof_top_color': "#757375"} )
   
  }
  //roof_test()

  function walls_test(){
    let GroupGarageSystem=createGarageObject(emptySystem,WallsControllableBasicSystem);

    GroupGarageSystem.handleEvent('buildingStep');
    GroupGarageSystem.handleEvent('generateInputs');
  }
  //walls_test()

  function door_test(){
    let GroupGarageSystem=createGarageObject(emptySystem,AdditionalControllableBasicSystem);
    GroupGarageSystem.handleEvent('buildingStep');
    GroupGarageSystem.handleEvent('generateInputs');

  }
   //door_test()


   function two_depth_test(){

    // let RedCubeSystem=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    let GroupGarageSystem=createGarageObject(emptySystem,TemplateControllableBasicSystem);

  



    GroupGarageSystem.handleEvent('buildingStep');
    //GroupGarageSystem.handleEvent('generateInputs');







    let RedCubeSystem1=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    let RedCubeSystem2=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    let RedCubeSystem3=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    let RedCubeSystem4=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    


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
    


    let RedCubeSystemChild1=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    let RedCubeSystemChild2=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    let RedCubeSystemChild3=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    let RedCubeSystemChild4=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    

    RedCubeSystemChild1.external_objects_controllers.push(RedCubeSystem1);
    RedCubeSystem1.external_objects.push(RedCubeSystemChild1.group)


  }


   function template_test(){

    let RedCubeSystem=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);

    

    let GroupGarageSystem=createGarageObject(emptySystem,TemplateControllableBasicSystem);

  

    // RedCubeSystem.external_objects_controllers.push(GroupGarageSystem);
    // GroupGarageSystem.external_objects.push(RedCubeSystem.group)



    GroupGarageSystem.handleEvent('buildingStep');
    // GroupGarageSystem.handleEvent('generateInputs');

    //RedCubeSystem.handleEvent('buildingStep');
    //RedCubeSystem.handleEvent('generateInputs');
    





    let RedCubeSystem2=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
  

     RedCubeSystem2.external_objects_controllers.push(GroupGarageSystem.children[0]);
     GroupGarageSystem.children[0].external_objects.push(RedCubeSystem2.group)

     GroupGarageSystem.children[0].handleEvent('buildingStep');
     RedCubeSystem2.handleEvent('buildingStep');
     RedCubeSystem2.handleEvent('generateInputs');
    //  GroupGarageSystem.display.get_scene().add(RedCubeSystem.group)
    //GroupGarageSystem.display.get_scene().add(RedCubeSystem.group)

  }
   //template_test()

 

  let wall_front, wall_left, wall_right, wall_back;
  let addition_front, addition_left, addition_right, addition_back
//A two depth test is a failure right now
function the_gate_test1(){

  // let RedCubeSystem=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
  let GroupGarageSystem=createGarageObject(emptySystem,TemplateControllableBasicSystem);

  GroupGarageSystem.handleEvent('buildingStep');
  //  GroupGarageSystem.handleEvent('generateInputs');


  let RedGateSystem1=createGarageObject(emptySystem, GateSystem);

  RedGateSystem1.external_objects_controllers.push(GroupGarageSystem);
  GroupGarageSystem.external_objects.push(RedGateSystem1)
  RedGateSystem1.state.state['name']="Brama frontowa" 
  RedGateSystem1.state.state['width']=3.15
  RedGateSystem1.handleEvent('buildingStep');


  RedGateSystem1.handleEvent('generateInputs');




  GroupGarageSystem.handleEvent('stateChange', {'rotation_y': 0} )

  // GroupGarageSystem.handleEvent('stateChange', {'width': .57} )
  return [GroupGarageSystem , RedGateSystem1]

}
   function the_gate_test2(){

    // let RedCubeSystem=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    let GroupGarageSystem=createGarageObject(emptySystem,TemplateControllableBasicSystem);

    GroupGarageSystem.handleEvent('buildingStep');
    //  GroupGarageSystem.handleEvent('generateInputs');


    let RedGateSystem1=createGarageObject(emptySystem, GateSystem);

    RedGateSystem1.external_objects_controllers.push(GroupGarageSystem);
    GroupGarageSystem.external_objects.push(RedGateSystem1)
    RedGateSystem1.state.state['name']="Drzwi prawe" 


    RedGateSystem1.handleEvent('buildingStep');



    RedGateSystem1.handleEvent('generateInputs');

    GroupGarageSystem.handleEvent('stateChange', {'rotation_y': 1.57} )

    // GroupGarageSystem.handleEvent('stateChange', {'width': .57} )
    return [GroupGarageSystem , RedGateSystem1]

  }
  function the_gate_test3(){
  
    // let RedCubeSystem=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    let GroupGarageSystem=createGarageObject(emptySystem,TemplateControllableBasicSystem);

    GroupGarageSystem.handleEvent('buildingStep');
    // GroupGarageSystem.handleEvent('generateInputs');


    let RedGateSystem1=createGarageObject(emptySystem, GateSystem);

    // RedGateSystem1.external_objects_controllers.push(GroupGarageSystem);
    // GroupGarageSystem.external_objects.push(RedGateSystem1)

    // RedGateSystem1.handleEvent('buildingStep');
    // RedGateSystem1.handleEvent('generateInputs');

    GroupGarageSystem.handleEvent('stateChange', {'rotation_y': 2*Math.PI/2} )

    // GroupGarageSystem.handleEvent('stateChange', {'width': .57} )
    return [GroupGarageSystem, RedGateSystem1]

  }
  function the_gate_test4(){

    // let RedCubeSystem=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    let GroupGarageSystem=createGarageObject(emptySystem,TemplateControllableBasicSystem);

    GroupGarageSystem.handleEvent('buildingStep');
    // GroupGarageSystem.handleEvent('generateInputs');


    // let RedGateSystem1=createGarageObject(emptySystem, GateSystem);

    // RedGateSystem1.external_objects_controllers.push(GroupGarageSystem);
    // GroupGarageSystem.external_objects.push(RedGateSystem1)

    // RedGateSystem1.handleEvent('buildingStep');
    // RedGateSystem1.handleEvent('generateInputs');

    GroupGarageSystem.handleEvent('stateChange', {'rotation_y': 3*Math.PI/2} )

    // GroupGarageSystem.handleEvent('stateChange', {'width': .57} )
    return [ GroupGarageSystem]

  }

 
  let value={}
  let design=false
  if( typeof design === 'undefined' || !design ){

    roof_test();
    [wall_front, addition_front] =the_gate_test1();
    [wall_right, addition_right] = the_gate_test2();
    [wall_back, addition_back]=the_gate_test3();
    [wall_left]=the_gate_test4();

    //[wall_back, addition_back] = the_gate_test3();
    //walls_test()
    //door_test()

  }


  function the_omega(){
     wall_front.handleEvent('stateChange', {'width': 10.57} );
     wall_front.handleEvent('stateChange', {'object_width': 10.57} );
     wall_back.handleEvent('stateChange', {'width': 10.57} );
     wall_left.handleEvent('stateChange', {'width': 10.57} );
     wall_right.handleEvent('stateChange', {'width': 10.57} ); 
   }
  
  // the_omega()


  return value
  
  
}


export {populateScene}