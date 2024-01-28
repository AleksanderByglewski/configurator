import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { accesser } from './base'
import { Ground, closeGround } from './objects/ground'
import { WallsControllableBasicSystem } from './objects/x-walls--old/implementation'
import { RoofControllableBasicSystem } from './objects/x-roof--old/implementation'
import { AdditionalControllableBasicSystem } from './objects/doors/implementation'
import { UconfigsImplementationController as TemplateControllableBasicSystem, UconfigsChildImplementationController as TemplateChildControllableBasicSystem } from './objects/wall/implementation'

import { UconfigsChildImplementationController as GateSystem } from './objects/gate/implementation'
import {
   UconfigsSecondaryChildImplementationController as SecondaryFloorSystem,
   UconfigsChildImplementationController as FloorSystem,
   UconfigsImplementationController as InvisibleSystem } from './objects/floors/implementation'
import { UconfigsImplementationController as RoofSystemOld } from './objects/roof/implementation'
import { UconfigsImplementationController as OmegaSystem } from './objects/omega/implementation'

import {
  UconfigsImplementationController as AdvancedPhysicsSystem,
  UconfigsImplementationSkewedController as SkewedAdvancedPhysicsSystem,
  UconfigsImplementationSkewedTopController as SkewedTopAdvancedPhysicsSystem
} from './objects/advanced_template/implementation'


import {
  UconfigsImplementationWallsController as AdvancedWallsSystem,
  UconfigsImplementationWallController as AdvancedWallSystem
} from './objects/implementation_wall/implementation'


import {
  UconfigsImplementationRoofsController as RoofSystem,
  UconfigsImplementationSecondaryRoofsController as SecondaryRoofSystem
} from './objects/implementation_roof/implementation-save'

import {
  UconfigsImplementationFloorsController as TertiaryFloorSystem,
 
} from './objects/implementation_floor/implementation'


import {
  UconfigsImplementationDoorController as DoorSystem,
  UconfigsImplementationGateController as GateLikeSystem,
  
} from './objects/implementation_door/implementation'


import {
  UconfigsImplementationCanopyController as CanopySystem,
} from './objects/implementation_canopy/implementation'


import {
  UconfigsImplementationController as OmegaAdvancedSystem,
  UconfigsImplementationDoorController as OmegaDoorAdvancedSystem,
} from './objects/implementation_add_door/implementation'

import {
  UconfigsImplementationWindowController as OmegaWindowAdvancedSystem,
} from './objects/implementation_add_window/implementation'

import {
  UconfigsImplementationController as OmegaCanopySystem,
} from './objects/implementation_add_canopy/implementation'

import {
  UconfigsImplementationController as ContactFormSystem,

} from './objects/implementation_contact_form/implementation'

import {
  UconfigsImplementationController as AdditionalOptionsSystem,

} from './objects/implementation_additional_options_form/implementation'

import {

  UconfigsImplementationRoofsController as SupportSystem,
  UconfigsImplementationSecondaryRoofsController as SecondarySupportSystem
} from './objects/implementation_supports/implementation'


import {gui} from  './base'


function addEnvMap(scene){

  const loader = new THREE.CubeTextureLoader();
  loader.setPath( '/assets/textures/cube/Bridge2/' );
	let textureEquirec, textureCube;
  textureCube = loader.load( [ 'posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg' ] );

  // const textureLoader = new THREE.TextureLoader();

  // textureEquirec = textureLoader.load( 'textures/2294472375_24a3b8ef46_o.jpg' );
  // textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
  // textureEquirec.colorSpace = THREE.SRGBColorSpace;

  // scene.background = textureCube;

	let sphereMesh, sphereMaterial;

  const geometry = new THREE.IcosahedronGeometry( 3, 15 );
  sphereMaterial = new THREE.MeshBasicMaterial( { envMap: textureCube } );
  sphereMaterial = new THREE.MeshStandardMaterial( { envMap: textureCube, color: 0xff4400, metalness: 0.6, roughness:0.0 } );
  sphereMesh = new THREE.Mesh( geometry, sphereMaterial );
  sphereMesh.position.x=20
  scene.add( sphereMesh );

}

function addEnvMapTextured(scene, gui){



  const params = {
    envMap: 'HDR',
    roughness: 0.25,
    metalness: 0.95,
    // exposure: 2.0,
    // debug: false,
    color: '#ffffff',
    lightIntensity:3.25
  };

  // gui.add( params, 'envMap', [ 'Generated', 'LDR', 'HDR', 'RGBM16' ] );
  gui.add( params, 'roughness', 0, 1, 0.01 );
  gui.add( params, 'metalness', 0, 1, 0.01 );
  gui.add( params, 'lightIntensity', 0, 25, 0.01 );
  // gui.add( params, 'exposure', 0, 2, 0.01 );
  // gui.add( params, 'debug', false );
  gui.addColor( params, 'color' );
  gui.open();

  const loader = new THREE.CubeTextureLoader();
  loader.setPath( '/assets/textures/cube/Bridge2/' );
	let textureEquirec, textureCube;
  textureCube = loader.load( [ 'posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg' ] );

  // const textureLoader = new THREE.TextureLoader();

  // textureEquirec = textureLoader.load( 'textures/2294472375_24a3b8ef46_o.jpg' );
  // textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
  // textureEquirec.colorSpace = THREE.SRGBColorSpace;

  // scene.background = textureCube;

	let sphereMesh, sphereMaterial;

  const geometry = new THREE.BoxGeometry( 3.01, 4.24,4.01 );
  sphereMaterial = new THREE.MeshBasicMaterial( { envMap: textureCube } );
  sphereMaterial = new THREE.MeshStandardMaterial( { 
    
    envMap: textureCube, 
    color: 0xff4400, 

    metalness: params.metalness,
    roughness: params.roughness
  
  } );

  let repeat=5


      function load_texture(path='/assets/textures/red-bricks/red_bricks_04_', resolution="1k"){
    

      let sphereMaterial = new THREE.MeshStandardMaterial( { 
      
        envMap: textureCube, 
        color: 0xff4400, 
    
        metalness: params.metalness,
        roughness: params.roughness
      
      } );
    
        let repeat=5
    
    // const colorMap = new THREE.TextureLoader().load(path + 'diff_'+resolution+'.jpg', (texture) => {
    //   texture.wrapS = THREE.RepeatWrapping
    //   texture.wrapT = THREE.RepeatWrapping
    //   texture.repeat.set(repeat,repeat)
    // })

    
        const colorMap = new THREE.TextureLoader().load(path + 'diff_'+resolution+'.jpg', (texture) => {
          texture.wrapS = THREE.MirroredRepeatWrapping;
          texture.wrapT = THREE.MirroredRepeatWrapping;
          texture.repeat.set(repeat,repeat)
        })
        const normalMap = new THREE.TextureLoader().load(
          path+'nor_gl_'+resolution+'.jpg',
          (texture) => {
            texture.wrapS = THREE.RepeatWrapping
            texture.wrapT = THREE.RepeatWrapping
            texture.repeat.set(repeat,repeat)
          }
        )
        const bumpMap = new THREE.TextureLoader().load(
          path+'disp_'+resolution+'.png',
          (texture) => {
            texture.wrapS = THREE.RepeatWrapping
            texture.wrapT = THREE.RepeatWrapping
            texture.repeat.set(repeat,repeat)
          }
        )
        sphereMaterial.map = colorMap
        sphereMaterial.map.repeat.set(1, 1);
        sphereMaterial.normalMap = normalMap
        sphereMaterial.bumpMap = bumpMap

    
      //  sphereMaterial.normalScale.set(2, 2); 
      return sphereMaterial
      }
    //load_texture()


    //load_texture('/assets/textures/metal_shutter/painted_metal_shutter_', '1k')
    sphereMaterial=load_texture('/assets/textures/factory_oak/factory_wall_', '1k')
    // sphereMaterial.bumpMap = bumpMap
    sphereMesh = new THREE.Mesh( geometry, sphereMaterial );
    sphereMesh.position.x=15


  // const roughnessTexture = new THREE.TextureLoader().load(
  //   '/assets/textures/red-bricks/red_bricks_04_rough_gl_1k.jpg',
  //   (texture) => {
  //     texture.wrapS = THREE.RepeatWrapping
  //     texture.wrapT = THREE.RepeatWrapping
  //   }
  // )
  
  scene.add( sphereMesh );
  return {sphereMesh, params}
}

function checkTheUVs(scene,gui, params){
  let material
  let geometry;
  let width=params.width;
  let height=params.height;
  let offset_x=params.offset_x
  let offset_y=params.offset_x

  let color=new THREE.Color("#FF00FF")
  let shape = new THREE.Shape();
  shape.moveTo(-width/2,0)
  shape.lineTo(width/2,0)
  shape.lineTo(-width/2,height)
 // shape.moveTo( 0, height );  // Move to the first point
 // shape.lineTo( -1, -1 );  // Draw a line to the second point
 // shape.lineTo( 1, -1 );  // Draw a line to the third point
  shape.closePath();  // Close the path to create a triangle
  
  geometry = new THREE.ShapeGeometry( shape );
  

  // Create a material

  // Create a material
  let local_texture=new THREE.TextureLoader().load('/assets/config/testing/uv_grid.jpg');
  // local_texture.wrapS=THREE.RepeatWrapping
  // local_texture.wrapT=THREE.RepeatWrapping
  // local_texture.repeat.set(1, 2*height);
  // Create a material
  material = new THREE.MeshStandardMaterial({
      map:local_texture,
      side:THREE.DoubleSide,
      // color:color
    }
      
      );

        
    const mesh = new THREE.Mesh(geometry, material);
    let object = scene.getObjectByName('triangle')
    if(object){
      scene.remove(object)
    }
    mesh.name="triangle"
    mesh.position.z=4.3
    scene.add(mesh)
}

function checkTheUVs2(scene,gui, params){
  let material
  let geometry;
  let width=params.width;
  let height=params.height;
  let offset_x=params.offset_x
  let offset_y=params.offset_x

  let color=new THREE.Color("#FF00FF")
  let shape = new THREE.Shape();
  shape.moveTo(-width/2,0)
  shape.lineTo(width/2,0)
  shape.lineTo(-width/2,height)
 // shape.moveTo( 0, height );  // Move to the first point
 // shape.lineTo( -1, -1 );  // Draw a line to the second point
 // shape.lineTo( 1, -1 );  // Draw a line to the third point
  shape.closePath();  // Close the path to create a triangle
  
  geometry = new THREE.ShapeGeometry( shape );
  

  // Create a material

  // Create a material
  let local_texture=new THREE.TextureLoader().load('/assets/config/testing/uv_grid.jpg');
  // local_texture.wrapS=THREE.RepeatWrapping
  // local_texture.wrapT=THREE.RepeatWrapping
  // local_texture.repeat.set(1, 2*height);
  // Create a material
  material = new THREE.MeshStandardMaterial({
      map:local_texture,
      side:THREE.DoubleSide,
      // color:color
    }
      
      );

        
    const mesh = new THREE.Mesh(geometry, material);
    let object = scene.getObjectByName('square')
    if(object){
      scene.remove(object)
    }
    mesh.name="square"
    mesh.position.z=4.3
    mesh.position.x=5.3
    scene.add(mesh)
}

function check_the_lights(scene){

  // Create a cube geometry
// const geometry = new THREE.BoxGeometry(10, 10, 10);
// // Create a material for the cube
// const material = new THREE.MeshStandardMaterial({color: 0xffffff});
// // Create a mesh with the geometry and material
// const cube = new THREE.Mesh(geometry, material);

// // Set the cube to cast shadows


// // Add the cube to the scene
// scene.add(cube);

// Create a plane geometry
const planeGeometry = new THREE.PlaneGeometry(15,15);
// Rotate the plane geometry to make it horizontal
planeGeometry.rotateX(- Math.PI / 2);


// Create a material for the plane
const planeMaterial = new THREE.MeshStandardMaterial({color: 0xffffff});

// Create a mesh with the plane geometry and material
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

plane.position.set(0,0.1,0)

// Set the plane to receive shadows


// Add the plane to the scene
scene.add(plane);
}

function setOptions(passedObject, accessers) {
  for (let i = 0; i < accessers.length; i++) {
    passedObject.state.update(accessers[i].resource_locator, accessers[i].value);
  }

}

function addShadows(scene){

  scene.traverse(function(object) {
    if (object instanceof THREE.Mesh) {
        // Enable casting shadows
        object.castShadow = true;
        // Enable receiving shadows
        object.receiveShadow = true;
    }
});

}

function addLights(scene) {
  //let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  //directionalLight.position.set(1, 2.2, 0.4); // set the position of the light
  //scene.add(directionalLight); // add the light to the scene
  // Create an ambient light with color white and intensity 0.5
  let ambientLight = new THREE.AmbientLight(0xffffff, 30.0); // soft white light
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xfffffff, 0.5);

// Set the position of the light
directionalLight.position.set(-30, 30, 30);

// Make the light look at the center of the scene
directionalLight.lookAt(30, -30, -30);
// directionalLight.castShadow = true;
// directionalLight.shadow.camera.top = 30
// directionalLight.shadow.camera.right = 30
// directionalLight.shadow.camera.left = -30
// directionalLight.shadow.camera.bottom = -30
// directionalLight.shadow.camera.near = 1
// directionalLight.shadow.camera.far = 100

// Add the light to the scene
scene.add(directionalLight);
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 10);
scene.add(directionalLightHelper);
// const shadowCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(shadowCameraHelper);

return directionalLight
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
  let directionalLight=addLights(scene)


  //check_the_lights(scene)
  function advanced_physics_object() {

    // I would like to create an advanced physics object that would have some additional elements attached to it
    let GroupGarageSystem1, GroupGarageSystem2, GroupGarageSystem3;
    let RedGateSystem1;


    GroupGarageSystem1 = createGarageObject(emptySystem, AdvancedPhysicsSystem);
    GroupGarageSystem2 = createGarageObject(emptySystem, SkewedAdvancedPhysicsSystem);
    GroupGarageSystem3 = createGarageObject(emptySystem, SkewedTopAdvancedPhysicsSystem);

    GroupGarageSystem1.external_objects.push(GroupGarageSystem2)
    GroupGarageSystem2.external_objects_controllers.push(GroupGarageSystem1)
    GroupGarageSystem2.mediator = GroupGarageSystem1


    GroupGarageSystem2.external_objects.push(GroupGarageSystem3)
    // GroupGarageSystem3.external_objects_controllers.push(GroupGarageSystem2)
    GroupGarageSystem3.mediator = GroupGarageSystem2


    // GroupGarageSystem2.handleEvent('buildingStep');
    // GroupGarageSystem1.state.state.position_y = 1


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
   //attach_fog(scene)
  // scene.background = new THREE.Color(0xcce7f0);
  // scene.background = new THREE.Color(0x000000);
  const grid = new THREE.GridHelper(100, 100, 0xdddddd, 0xdddddd);
  scene.add(grid);


  // var axesHelper = new THREE.AxesHelper(1);
  // scene.add(axesHelper)
  const geometry = new THREE.PlaneGeometry(100, 100);
  const material = new THREE.MeshStandardMaterial({ color: 0xbbbbbb, side: THREE.DoubleSide });
  const floor = new THREE.Mesh(geometry, material);
  floor.rotation.x = Math.PI / 2;
  scene.add(floor);
  floor.name="floor"
  scene.background=new THREE.Color(0x97DEFB);
  // scene.background=new THREE.Color(0x000000);
  scene.fog = new THREE.Fog(0xffffff, 10, 100);

  const emptySystem = [
    // new accesser('name', ' System'),
    // new accesser('position_x', 0.0),
    // new accesser('position_y', 0.0),
    // new accesser('position_z',0.0),
  ]

  let GroupGarageSystem;
  function advanced_garage_system() {
    GroupGarageSystem = createGarageObject(emptySystem, AdvancedWallsSystem)
    GroupGarageSystem.status="top_level"
    
    GroupGarageSystem.state.state['object_depth']=4

    GroupGarageSystem.state.state['object_width'] = GroupGarageSystem.state.state['object_width'] || 3;
    GroupGarageSystem.state.state['object_depth'] = GroupGarageSystem.state.state['object_depth'] || 5;
    GroupGarageSystem.state.state['object_height'] = GroupGarageSystem.state.state['object_height'] || 2.13;
  }
  advanced_garage_system()

  function advanced_walls_object() {

    // I would like to create an advanced physics object that would have some additional elements attached to it

    let WallSystem1, WallSystem2, WallSystem3, WallSystem4;




    WallSystem1 = createGarageObject(emptySystem, AdvancedWallSystem)
    WallSystem2 = createGarageObject(emptySystem, AdvancedWallSystem)
    WallSystem3 = createGarageObject(emptySystem, AdvancedWallSystem)
    WallSystem4 = createGarageObject(emptySystem, AdvancedWallSystem)



    GroupGarageSystem.external_objects.push(WallSystem1)
    GroupGarageSystem.external_objects.push(WallSystem2)
    GroupGarageSystem.external_objects.push(WallSystem3)
    GroupGarageSystem.external_objects.push(WallSystem4)

    WallSystem1.external_objects_controllers.push(GroupGarageSystem)
    WallSystem2.external_objects_controllers.push(GroupGarageSystem)
    WallSystem3.external_objects_controllers.push(GroupGarageSystem)
    WallSystem4.external_objects_controllers.push(GroupGarageSystem)

    WallSystem1.mediator = GroupGarageSystem
    WallSystem2.mediator = GroupGarageSystem
    WallSystem3.mediator = GroupGarageSystem
    WallSystem4.mediator = GroupGarageSystem


  }
  advanced_walls_object()



  let RoofSystem1
  function advanced_roof_object() {

    RoofSystem1 = createGarageObject(emptySystem, RoofSystem)
    RoofSystem1.state.state['name'] = "Kolory dachu"
    RoofSystem1.status="main_roof"
    GroupGarageSystem.external_objects.push(RoofSystem1)
    RoofSystem1.external_objects_controllers.push(GroupGarageSystem)
    RoofSystem1.mediator = GroupGarageSystem



  }
  advanced_roof_object()


  function advanced_support_object() {

    let RoofSystem1 = createGarageObject(emptySystem, SupportSystem)
    RoofSystem1.state.state['name'] = "Kolory dachu"
    RoofSystem1.status="support_roof"
    GroupGarageSystem.external_objects.push(RoofSystem1)
    RoofSystem1.external_objects_controllers.push(GroupGarageSystem)
    RoofSystem1.mediator = GroupGarageSystem
  }
  advanced_support_object()



  let CanopySystem1
  function advanced_canopy_object() {

    let RoofSystem2 = createGarageObject(emptySystem, SecondaryRoofSystem)

    CanopySystem1 = createGarageObject(emptySystem, CanopySystem)
    CanopySystem1.state.state['name'] = "Kontrola Wiat"
    
    GroupGarageSystem.external_objects.push(CanopySystem1)
    CanopySystem1.external_objects_controllers.push(GroupGarageSystem)
    CanopySystem1.mediator = GroupGarageSystem
    

    CanopySystem1.external_objects.push(RoofSystem2)
    RoofSystem2.external_objects_controllers.push(CanopySystem1)
    CanopySystem1.mediator = GroupGarageSystem
    // RoofSystem2.state.state['position_x']=3.25
    // RoofSystem2.handleEvent('buildingStep')
    // RoofSystem2.handleEvent('generateInputs')


    let RedGateSystem1 = createGarageObject(emptySystem, SecondaryFloorSystem);
    RedGateSystem1.state.state['color'] = "#FFFFFF"
    CanopySystem1.external_objects.push(RedGateSystem1)
    RedGateSystem1.external_objects_controllers.push(CanopySystem1)
    RedGateSystem1.mediator = CanopySystem1
  }
  //advanced_canopy_object()
  function generic_attaching_canopies(){

    let OmegaSystems = createGarageObject(emptySystem, OmegaCanopySystem);


    OmegaSystems.wall_front = GroupGarageSystem.external_objects[0]
    OmegaSystems.wall_back = GroupGarageSystem.external_objects[1]
    OmegaSystems.wall_left = GroupGarageSystem.external_objects[2]
    OmegaSystems.wall_right = GroupGarageSystem.external_objects[3]
    OmegaSystems.group_controller = GroupGarageSystem
    



    // let front_wall=GroupGarageSystem.external_objects[1]


    // DoorSystem1=createGarageObject(emptySystem, DoorSystem)
    // front_wall.external_objects.push(DoorSystem1)
    // DoorSystem1.external_objects_controllers.push(front_wall)
    // DoorSystem1.mediator=front_wall



    GroupGarageSystem.handleEvent('buildingStep')
    OmegaSystems.state.state['name'] = "Dodaj wiatę"
    OmegaSystems.state.state['gui_child_name'] = "Dodaj wiatę"
    OmegaSystems.door_type = true
    OmegaSystems.handleEvent('generateInputs')
    //OmegaSystems.gui.initial_call('left')
  }

  function semiAdvanced_floor_object() {

    // let RedCubeSystem=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    // let GroupGarageSystem = createGarageObject(emptySystem, InvisibleSystem);
    // GroupGarageSystem.handleEvent('buildingStep');
    // GroupGarageSystem.handleEvent('generateInputs');
    let RedGateSystem1 = createGarageObject(emptySystem,FloorSystem);
    RedGateSystem1.status="main_floor"
    // let RedCubeSystem2=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    // let RedCubeSystem3=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    // let RedCubeSystem4=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);

    RedGateSystem1.state.state['name'] = "Typy podłoża"
    RedGateSystem1.state.state['width'] = 5.0
    RedGateSystem1.state.state['depth'] = 5.0
    RedGateSystem1.state.state['color'] = "#FFFFFF"

    GroupGarageSystem.external_objects.push(RedGateSystem1)
    RedGateSystem1.external_objects_controllers.push(GroupGarageSystem)
    RedGateSystem1.mediator = GroupGarageSystem


    RedGateSystem1.handleEvent('generateInputs')


  }
  semiAdvanced_floor_object()


  function initialization_system() {

    GroupGarageSystem.handleEvent('buildingStep')
    GroupGarageSystem.handleEvent('generateInputs')
    GroupGarageSystem.state['object_depth'] = 5
    GroupGarageSystem.gui.notifyMediator('stateChange', { ['object_depth']: 5 });
    GroupGarageSystem.gui.notifyMediator('buildingStep', { });
    GroupGarageSystem.gui.notifyMediator('stateChange', { 'object_color': "#ED972A"});
    GroupGarageSystem.gui.notifyMediator('stateChange', { 'wall_color': "#ED972A"});

    GroupGarageSystem.gui.notifyMediator('stateChange', { 'material_type': 'material_type_3'});
    GroupGarageSystem.gui.notifyMediator('buildingStep', { });


  }
  initialization_system()


  try{
  RoofSystem1.handleEvent('generateInputs')
  CanopySystem1.handleEvent('generateInputs')

  }catch(error){
    console.log(error)
  }


  function generic_attaching_gates() {

    let OmegaSystems = createGarageObject(emptySystem, OmegaAdvancedSystem);

    OmegaSystems.wall_front = GroupGarageSystem.external_objects[0]
    OmegaSystems.wall_back = GroupGarageSystem.external_objects[1]
    OmegaSystems.wall_left = GroupGarageSystem.external_objects[2]
    OmegaSystems.wall_right = GroupGarageSystem.external_objects[3]
    OmegaSystems.door_type = false
    OmegaSystems.state.state['name'] = "Dodaj bramy"
    OmegaSystems.handleEvent('buildingStep')
    OmegaSystems.handleEvent('generateInputs')




    // GroupGarageSystem.handleEvent('buildingStep')
    OmegaSystems.gui.initialGeneration()




  }
  generic_attaching_gates()

  function generic_attaching_doors() {

    let OmegaSystems = createGarageObject(emptySystem, OmegaDoorAdvancedSystem);


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
    OmegaSystems.door_type = true
    OmegaSystems.handleEvent('generateInputs')

    // OmegaSystems.gui.notifyMediator('stateChange', { 'gate_type': 'gate_type_2'});
    // OmegaSystems.gui.notifyMediator('buildingStep', { });
    // OmegaSystems.gui.notifyMediator('hardBuildingStep', {})


    // GroupGarageSystem.handleEvent('buildingStep')


  }
  generic_attaching_doors()

  
  function generic_attaching_windows() {

    let OmegaSystems = createGarageObject(emptySystem, OmegaWindowAdvancedSystem);


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
    OmegaSystems.state.state['name'] = "Dodaj okna"
    OmegaSystems.door_type = true
    OmegaSystems.handleEvent('generateInputs')

    // GroupGarageSystem.handleEvent('buildingStep')


  }
  generic_attaching_windows()



  function generic_additional_options() {

    let ContactSystems = createGarageObject(emptySystem, AdditionalOptionsSystem);
    ContactSystems.handleEvent('generateInputs')
  }
  generic_additional_options()



 generic_attaching_canopies()

//Okay now for the niche


{
function advanced_garage_system() {
  GroupGarageSystem = createGarageObject(emptySystem, AdvancedWallsSystem)
  GroupGarageSystem.status="top_level"
  GroupGarageSystem.state.state['object_depth']=5
  GroupGarageSystem.state.state['position_z']=-4
}
function generic_attaching_canopies(){

  let OmegaSystems = createGarageObject(emptySystem, OmegaCanopySystem);


  OmegaSystems.wall_front = GroupGarageSystem.external_objects[0]
  OmegaSystems.wall_back = GroupGarageSystem.external_objects[1]
  OmegaSystems.wall_left = GroupGarageSystem.external_objects[2]
  OmegaSystems.wall_right = GroupGarageSystem.external_objects[3]
  OmegaSystems.group_controller = GroupGarageSystem
  GroupGarageSystem.handleEvent('buildingStep')
  OmegaSystems.state.state['name'] = "Dodaj wiatę"
  OmegaSystems.state.state['gui_child_name'] = "Dodaj wiatę"
  OmegaSystems.door_type = true
  OmegaSystems.handleEvent('generateInputs')
  OmegaSystems.gui.initial_call('right')
}


function start_the_niche(){
advanced_garage_system()
advanced_walls_object()
advanced_roof_object()
initialization_system()
semiAdvanced_floor_object()
generic_attaching_canopies()
}
//start_the_niche()
}


{
  let NicheSystem;
  function advanced_niche_system() {
    NicheSystem = createGarageObject(emptySystem, AdvancedWallsSystem)
    NicheSystem.status="niche_level"
    // NicheSystem.state.state['position_y']=4
  }

  function advanced_niche_walls_object() {

    // I would like to create an advanced physics object that would have some additional elements attached to it

    let WallSystem1, WallSystem2, WallSystem3, WallSystem4;




    WallSystem1 = createGarageObject(emptySystem, AdvancedWallSystem)
    WallSystem2 = createGarageObject(emptySystem, AdvancedWallSystem)
    WallSystem3 = createGarageObject(emptySystem, AdvancedWallSystem)
    WallSystem4 = createGarageObject(emptySystem, AdvancedWallSystem)



    NicheSystem.external_objects.push(WallSystem1)
    NicheSystem.external_objects.push(WallSystem2)
    NicheSystem.external_objects.push(WallSystem3)
    NicheSystem.external_objects.push(WallSystem4)

    WallSystem1.external_objects_controllers.push(NicheSystem)
    WallSystem2.external_objects_controllers.push(NicheSystem)
    WallSystem3.external_objects_controllers.push(NicheSystem)
    WallSystem4.external_objects_controllers.push(NicheSystem)

    WallSystem1.mediator = NicheSystem
    WallSystem2.mediator = NicheSystem
    WallSystem3.mediator = NicheSystem
    WallSystem4.mediator = NicheSystem

  
  }
 
  let RoofSystem2
  function advanced_niche_roof_object() {

    RoofSystem2 = createGarageObject(emptySystem, SecondaryRoofSystem)
    RoofSystem2.state.state['name'] = "Kolory dachu wnęka"
    RoofSystem2.status="niche_roof"
    NicheSystem.external_objects.push(RoofSystem2)
    RoofSystem2.external_objects_controllers.push(NicheSystem)
    RoofSystem2.mediator = NicheSystem

    RoofSystem2.handleEvent('generateInputs')


  }

  function semiAdvanced_niche_floor_object() {

    // let RedCubeSystem=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    // let GroupGarageSystem = createGarageObject(emptySystem, InvisibleSystem);
    // GroupGarageSystem.handleEvent('buildingStep');
    // GroupGarageSystem.handleEvent('generateInputs');
    let RedGateSystem1 = createGarageObject(emptySystem, SecondaryFloorSystem);
    RedGateSystem1.status="niche_floor"
    // let RedCubeSystem2=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    // let RedCubeSystem3=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    // let RedCubeSystem4=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);

    RedGateSystem1.state.state['name'] = "Typy podłoża"
    RedGateSystem1.state.state['width'] = 5.0
    RedGateSystem1.state.state['depth'] = 5.0
    RedGateSystem1.state.state['color'] = "#FFFFFF"

    NicheSystem.external_objects.push(RedGateSystem1)
    RedGateSystem1.external_objects_controllers.push(NicheSystem)
    RedGateSystem1.mediator = NicheSystem


    RedGateSystem1.handleEvent('generateInputs')


  }
  
  function semiAdvanced_niche_floor_object2() {

    // let RedCubeSystem=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    // let GroupGarageSystem = createGarageObject(emptySystem, InvisibleSystem);
    // GroupGarageSystem.handleEvent('buildingStep');
    // GroupGarageSystem.handleEvent('generateInputs');
    let RedGateSystem1 = createGarageObject(emptySystem, TertiaryFloorSystem);
    RedGateSystem1.status="niche_floor"
    // let RedCubeSystem2=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    // let RedCubeSystem3=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);
    // let RedCubeSystem4=createGarageObject(emptySystem, TemplateChildControllableBasicSystem);

    RedGateSystem1.state.state['name'] = "Typy podłoża"
    RedGateSystem1.state.state['width'] = 5.0
    RedGateSystem1.state.state['depth'] = 5.0
    RedGateSystem1.state.state['color'] = "#FFFFFF"

    NicheSystem.external_objects.push(RedGateSystem1)
    RedGateSystem1.external_objects_controllers.push(NicheSystem)
    RedGateSystem1.mediator = NicheSystem


    RedGateSystem1.handleEvent('generateInputs')


  }

  function initialization_niche(){
    advanced_niche_system()
    advanced_niche_walls_object()
    advanced_niche_roof_object()
    semiAdvanced_niche_floor_object2()

  GroupGarageSystem.external_objects.push(NicheSystem)
  NicheSystem.external_objects_controllers.push(GroupGarageSystem)
  NicheSystem.mediator = GroupGarageSystem

  NicheSystem.state.state['name']="Nisza"
  NicheSystem.state.state['position_z']=3.0
  // NicheSystem.state.state['object_width']=0.3
  NicheSystem.state.state['object_depth']=2.0
  NicheSystem.state.state['object_height']=2.52
  //NicheSystem.state.state['position_x']=0
  NicheSystem.handleEvent('buildingStep')
  NicheSystem.handleEvent('generateInputs')


  }

  //initialization_niche()
  //  generic_attaching_niche_canopies()
}
function generic_contact_form() {

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
  function generic_attaching_niche_canopies(){

    let OmegaSystems = createGarageObject(emptySystem, OmegaCanopySystem);
    OmegaSystems.wall_front = NicheSystem.external_objects[0]
    OmegaSystems.wall_back = NicheSystem.external_objects[1]
    OmegaSystems.wall_left = NicheSystem.external_objects[2]
    OmegaSystems.wall_right = NicheSystem.external_objects[3]
    OmegaSystems.group_controller = NicheSystem
  

    NicheSystem.handleEvent('buildingStep')
    OmegaSystems.state.state['name'] = "Dodaj dach do wnęki"
    OmegaSystems.door_type = true
    OmegaSystems.handleEvent('generateInputs')
    OmegaSystems.gui.initial_call()


    
    NicheSystem.external_objects.push(OmegaSystems)
    OmegaSystems.external_objects_controllers.push(NicheSystem)
    OmegaSystems.mediator = NicheSystem
 
  }




  {
  let geometry = new THREE.BoxGeometry();
  let material = new THREE.MeshBasicMaterial({color: 0xff0000});
  let cube = new THREE.Mesh(geometry, material);

  // // Add the cube to the scene
  // scene.add(cube);
  // let loader = new GLTFLoader();
  // loader.load('/assets/models/door_handle/scene.gltf', (gltf) => {
 
      
  //     const doorHandle = gltf.scene;
  //     doorHandle.position.set(0, 0, 0);
  //     doorHandle.scale.set(3, 3, 3);
  //     scene.add(doorHandle);  // Assuming this.set() is a method to add the object to your scene or perform other necessary operations
  // });

  }
  addShadows(scene)
  value.light=directionalLight
  return value


}


export { populateScene }