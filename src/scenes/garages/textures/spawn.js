import * as THREE from 'three';
import { global_texture } from '../objects/base/texture';

function load_texture(path='/assets/textures/red-bricks/red_bricks_04_', resolution="1k"){
    const loader = new THREE.CubeTextureLoader();
    loader.setPath( '/assets/textures/cube/Bridge2/' );
    let textureEquirec, textureCube;
    textureCube = loader.load( [ 'posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg' ] );
    const params = {
        envMap: 'HDR',
        roughness: 0.25,
        metalness: 0.95,
        // exposure: 2.0,
        // debug: false,

      };
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


      
      sphereMaterial.normalMap = normalMap
      sphereMaterial.bumpMap = bumpMap
      
      
      sphereMaterial.normalMap.wrapS=THREE.RepeatWrapping
      sphereMaterial.normalMap.wrapT=THREE.RepeatWrapping

      sphereMaterial.bumpMap.wrapS=THREE.RepeatWrapping
      sphereMaterial.bumpMap.wrapT=THREE.RepeatWrapping
  
    //  sphereMaterial.normalScale.set(2, 2); 
    return sphereMaterial
    }
function load_color_texture(path='/assets/textures/red-bricks/red_bricks_04_', resolution="1k"){
  const loader = new THREE.CubeTextureLoader();
  loader.setPath( '/assets/textures/cube/Bridge2/' );
  let textureEquirec, textureCube;
  textureCube = loader.load( [ 'posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg' ] );
  const params = {
      envMap: 'HDR',
      roughness: 0.25,
      metalness: 0.95,
      // exposure: 2.0,
      // debug: false,
   
    };
  let sphereMaterial = new THREE.MeshStandardMaterial( { 
  
    envMap: textureCube, 
    color: 0xff4400, 

    metalness: params.metalness,
    roughness: params.roughness
  
  } );

    let repeat=5

    const colorMap = new THREE.TextureLoader().load(path + 'diff_'+resolution+'.jpg', (texture) => {
      texture.wrapS = THREE.RepeatWrapping
      texture.wrapT = THREE.RepeatWrapping
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
    sphereMaterial.normalMap = normalMap
    sphereMaterial.bumpMap = bumpMap
    
    sphereMaterial.map.wrapS=THREE.RepeatWrapping
    sphereMaterial.map.wrapT=THREE.RepeatWrapping
    
    sphereMaterial.normalMap.wrapS=THREE.RepeatWrapping
    sphereMaterial.normalMap.wrapT=THREE.RepeatWrapping

    sphereMaterial.bumpMap.wrapS=THREE.RepeatWrapping
    sphereMaterial.bumpMap.wrapT=THREE.RepeatWrapping

  //  sphereMaterial.normalScale.set(2, 2); 
  // return sphereMaterialet(2, 2); 
      return sphereMaterial
      }
function load_texture_debug(path='/assets/textures/roof_tile/roof_07_', resolution="1k"){
        const loader = new THREE.CubeTextureLoader();
        loader.setPath( '/assets/textures/cube/Bridge2/' );
        let textureEquirec, textureCube;
        textureCube = loader.load( [ 'posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg' ] );
        const params = {
            envMap: 'HDR',
            roughness: 0.25,
            metalness: 0.95,
            // exposure: 2.0,
            // debug: false,
  
          };
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
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.RepeatWrapping
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
          sphereMaterial.normalMap = normalMap
          sphereMaterial.bumpMap = bumpMap
          
          sphereMaterial.map.wrapS=THREE.RepeatWrapping
          sphereMaterial.map.wrapT=THREE.RepeatWrapping
          
          
          
          sphereMaterial.normalMap.wrapS=THREE.RepeatWrapping
          sphereMaterial.normalMap.wrapT=THREE.RepeatWrapping
    
          sphereMaterial.bumpMap.wrapS=THREE.RepeatWrapping
          sphereMaterial.bumpMap.wrapT=THREE.RepeatWrapping
      
        //  sphereMaterial.normalScale.set(2, 2); 
        return sphereMaterial
      }
function load_texture_tiling(path='/assets/textures/roof_tile/grey_roof_tiles_02', resolution="1k"){
        const loader = new THREE.CubeTextureLoader();
        loader.setPath( '/assets/textures/cube/Bridge2/' );
        let textureEquirec, textureCube;
        textureCube = loader.load( [ 'posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg' ] );
        const params = {
            envMap: 'HDR',
            roughness: 0.75,
            metalness: 0.9,
            // exposure: 2.0,
            // debug: false,
    
          };

          
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
            texture.wrapS = THREE.RepeatWrapping
            texture.wrapT = THREE.RepeatWrapping
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
          sphereMaterial.normalMap = normalMap
          sphereMaterial.bumpMap = bumpMap
          
          sphereMaterial.map.wrapS=THREE.RepeatWrapping
          sphereMaterial.map.wrapT=THREE.RepeatWrapping
          
          sphereMaterial.normalMap.wrapS=THREE.RepeatWrapping
          sphereMaterial.normalMap.wrapT=THREE.RepeatWrapping

          sphereMaterial.bumpMap.wrapS=THREE.RepeatWrapping
          sphereMaterial.bumpMap.wrapT=THREE.RepeatWrapping
    
      //  sphereMaterial.normalScale.set(2, 2); 
        return sphereMaterial
        }
    

const global_debug=load_texture_debug('/assets/textures/debug/debug_', '1k')

const global_metal_material= load_texture('/assets/textures/factory_wall/factory_wall_', '1k')

const global_metal_tiling=load_texture_tiling('/assets/textures/roof_tile2/grey_roof_tiles_02_', '1k')

const global_golden_oak= load_color_texture('/assets/textures/factory_oak/factory_wall_', '1k')

const DEBUG=false
function select_texture(args){

 let width=args['width']
 let height=args['height'] 
 let color=args['color']
 let debug=args['debug']

 let material_type=args['material_type']
 

let material
let material_output
// debug=true

if(debug){
material_output=global_debug.clone()
// material_output.color=new THREE.Color("#ED972A")
material_output.bumpMap = global_debug.bumpMap.clone();
material_output.normalMap = global_debug.normalMap.clone();
material_output.map = global_debug.map.clone();
material_output.map.repeat.set(width,height);
//material_output.bumpMap.repeat.set(width, height/2);
//material_output.normalMap.repeat.set(width, height/2);
material_output.color=new THREE.Color(color)
return material_output
}

switch(color){
  case '#ED972A':
    material_output=global_golden_oak.clone()
    // material_output.color=new THREE.Color("#ED972A")
    material_output.bumpMap = global_golden_oak.bumpMap.clone();
    material_output.normalMap = global_golden_oak.normalMap.clone();
    material_output.map = global_golden_oak.map.clone();
    material_output.map.repeat.set(width,height);
    material_output.bumpMap.repeat.set(width, height/2);
    material_output.normalMap.repeat.set(width, height/2);
    material_output.color=new THREE.Color(color)
    material_output.color=new THREE.Color('#ed882a')
    material_output.roughness = 0.5;
    break;
  case '#C76E3C':
    material_output=global_golden_oak.clone()
    // material_output.color=new THREE.Color("#ED972A")
    material_output.bumpMap = global_golden_oak.bumpMap.clone();
    material_output.normalMap = global_golden_oak.normalMap.clone();
    material_output.map = global_golden_oak.map.clone();
    material_output.map.repeat.set(width,height);
    material_output.bumpMap.repeat.set(width, height/2);
    material_output.normalMap.repeat.set(width, height/2);
    material_output.color=new THREE.Color(color)
    material_output.color=new THREE.Color('#c38a57')
    material_output.roughness = 0.5;
      break;
  case '#925f50':
    material_output=global_golden_oak.clone()
    
    material_output.bumpMap = global_golden_oak.bumpMap.clone();
    material_output.normalMap = global_golden_oak.normalMap.clone();
    material_output.map = global_golden_oak.map.clone();
    material_output.map.repeat.set(width,height);
    material_output.bumpMap.repeat.set(width, height/2);
    material_output.normalMap.repeat.set(width, height/2);
    material_output.color=new THREE.Color(color)
    material_output.color=new THREE.Color("#a9705e")
    material_output.roughness = 0.5;
    break;


  case '#c6eaff':
    
    material_output=global_metal_material.clone()
    material_output.bumpMap = global_metal_material.bumpMap.clone();
    material_output.normalMap = global_metal_material.normalMap.clone();
    material_output.bumpMap.repeat.set(width, height/2);
    material_output.normalMap.repeat.set(width, height/2);
    material_output.color=new THREE.Color(color)
    //material_output.bumpMap.repeat.set(width, height/2);
    //material_output.normalMap.repeat.set(width, height/2);
    material_output.metalness = 0.99;

// You can also modify other properties similarly, like roughness
material_output.roughness = 0.1; // Replace someRoughnessValue with your desired valu
    material_output.color=new THREE.Color("#c6eaff")
    material_output.color=new THREE.Color("#ffffff")
      break;
  default:
    
    material_output=global_metal_material.clone()
    material_output.bumpMap = global_metal_material.bumpMap.clone();
    material_output.normalMap = global_metal_material.normalMap.clone();
    material_output.bumpMap.repeat.set(width, height/2);
    material_output.normalMap.repeat.set(width, height/2);
    material_output.color=new THREE.Color(color)
    material_output.roughness = 0.5;
    // material_output.color=new THREE.Color("#ff0000")
    break;
}
const t7_scaling=1.42
const t17_scaling=0.76
switch(material_type){
      case "material_glass":
        material_output.map = undefined
                  // local_texture.wrapS=THREE.RepeatWrapping
        material_output.bumpMap.rotation = Math.PI / 2;
        material_output.normalMap.rotation = Math.PI / 2;
        material_output.bumpMap.repeat.set(1,1 );
        material_output.normalMap.repeat.set(1, 1 );
     
        material_output.bumpMap = undefined;
         material_output.normalMap = undefined;
         material_output.color = new THREE.Color(0xfbfdff);
         material_output.metalness = 0.91;
         material_output.reflectivity = 1.0;
         material_output.envMapIntensity = 5.0;
         material_output.clearcoat = 1.00; 
         material_output.clearcoatRoughness = 0.00;
      // texture=global_texture
      
      break;



      case "material_type_1":
  
          // texture=global_texture
     
          material_output.bumpMap.repeat.set(t7_scaling*width, height);
          material_output.normalMap.repeat.set(t7_scaling*width, height);
       
          break;
      case "material_type_2":
      //  color ="#ee2797";
          // local_texture=global_texture.clone();
          // local_texture.wrapS=THREE.RepeatWrapping
          material_output.bumpMap.rotation = Math.PI / 2;
          material_output.normalMap.rotation = Math.PI / 2;

          
          material_output.bumpMap.repeat.set(t7_scaling*height, width );
          material_output.normalMap.repeat.set(t7_scaling*height, width );
          // local_texture.wrapT=THREE.RepeatWrapping
          // material_output.repeat.set(width, height/2);
      
          break;
      case "material_type_3":
          // material_output=loader.load('/assets/config/default_1k.jpg');
          // material_output.map.rotation = Math.PI / 2;
          material_output.bumpMap.rotation = Math.PI / 2;
          material_output.normalMap.rotation = Math.PI / 2;
          
     
          material_output.bumpMap.repeat.set(t17_scaling*height, width );
          material_output.normalMap.repeat.set(t17_scaling*height, width );
          // material_output.repeat.set(width, height);
          // material_output=global_texture.clone();
          
          // material_output.repeat.set(1, height);
          
          break;
      case "material_type_4":
          // material_output=loader.load('/assets/config/default_1k.jpg');
          // material_output=global_texture.clone();
          // material_output.bumpMap.rotation = Math.PI / 2;
          // material_output.normalMap.rotation = Math.PI / 2;
          
          material_output.bumpMap.repeat.set(t17_scaling*width, height);
          material_output.normalMap.repeat.set(t17_scaling*width, height);
          // material_output.repeat.set(1, height);
          
          
          break;
      case "material_type_5":
          // material_output=loader.load('/assets/config/default_1k.jpg');
          
          // material_output.map.rotation = Math.PI / 2;
          material_output.bumpMap.rotation = Math.PI / 2;
          material_output.normalMap.rotation = Math.PI / 2;
          // material_output.repeat.set(1, height);
          
          
          break;
      case "material_type_6":
            //  color ="#ee2797";
                // local_texture=global_texture.clone();
                // local_texture.wrapS=THREE.RepeatWrapping
                material_output.bumpMap.rotation = Math.PI / 2;
                material_output.normalMap.rotation = Math.PI / 2;
      
                
                material_output.bumpMap.repeat.set(0.62*height, 0.62*width );
                material_output.normalMap.repeat.set(0.62*height, 0.62*width );
                // local_texture.wrapT=THREE.RepeatWrapping
                // material_output.repeat.set(width, height/2);
            
                break;
      case "material_type_7":
                  //  color ="#ee2797";
                      // local_texture=global_texture.clone();
                      // local_texture.wrapS=THREE.RepeatWrapping
                      material_output.bumpMap.rotation = Math.PI / 2;
                      material_output.normalMap.rotation = Math.PI / 2;
            
                      
                      material_output.bumpMap.repeat.set(0.81*height, 0.81*width );
                      material_output.normalMap.repeat.set(0.81*height, 0.81*width );
                      // local_texture.wrapT=THREE.RepeatWrapping
                      // material_output.repeat.set(width, height/2);
                  
                      break;
      case "material_type_8":
                        //  color ="#ee2797";
                            // local_texture=global_texture.clone();
                            // local_texture.wrapS=THREE.RepeatWrapping
                            //material_output=global_metal_material.clone()
                           

                            material_output=global_metal_tiling.clone()
                            // material_output.map= global_metal_tiling.map.clone();


  //                          material_output.bumpMap = global_metal_material.bumpMap.clone();
//                            material_output.normalMap = global_metal_material.normalMap.clone();

                            material_output.bumpMap = global_metal_tiling.bumpMap.clone();
                            material_output.normalMap = global_metal_tiling.normalMap.clone();

                          
                           // material_output.bumpMap = global_metal_material.bumpMap.clone();
                           // material_output.normalMap = global_metal_material.normalMap.clone();

                            // material_output.bumpMap.rotation = Math.PI / 2;
                            // material_output.normalMap.rotation = Math.PI / 2;
                  
                             material_output.map.repeat.set(height, width );
                             material_output.bumpMap.repeat.set(height, width );
                            material_output.normalMap.repeat.set(height, width );
                            material_output.color=new THREE.Color(color)
                            // material_output.color=new THREE.Color()
                            // local_texture.wrapT=THREE.RepeatWrapping
                            // material_output.repeat.set(width, height/2);
                        
                            break;

      default:
            // code to be executed if expression doesn't match any cases
  }

  
// if (color=="#ed972a"){
//      console.log("texture loading trigger")
// }
// else{

// material=global_metal_material.clone()
// material.bumpMap = material.bumpMap.clone();
// material.normalMap = material.normalMap.clone();
// material.bumpMap.repeat.set(width, height/2);
// material.normalMap.repeat.set(width, height/2);
// material.color=new THREE.Color(color)

// }


return material_output
}

export { select_texture,global_metal_material,}