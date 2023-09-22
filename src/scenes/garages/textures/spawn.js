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
        color: '#ffffff',
        lightIntensity:1.8
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
    //  sphereMaterial.map = colorMap
      sphereMaterial.normalMap = normalMap
      sphereMaterial.bumpMap = bumpMap

  
    //  sphereMaterial.normalScale.set(2, 2); 
    return sphereMaterial
    }

const global_metal_material= load_texture('/assets/textures/factory_wall/factory_wall_', '1k')

export {global_metal_material}