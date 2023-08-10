import * as THREE from 'three'
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader'

// export const checkMaterialName = 'checkMaterial'




export function checkMaterial(scene, floor) {
  floor.attach(scene)


  const exrLoader = new EXRLoader()

  const colorMap = exrLoader.load('/src/assets/textures/brick-wall/brick_wall_001_diffuse_2k.exr', (texture) => {
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(20, 20)
  })
  const bumpMap = new THREE.TextureLoader().load(
    '/src/assets/textures/brick-wall/brick_wall_001_displacement_2k.png',
    (texture) => {
      texture.wrapS = THREE.RepeatWrapping
      texture.wrapT = THREE.RepeatWrapping
      texture.repeat.set(20, 20)
    }
  )


  const geometry = new THREE.BoxGeometry(10.01, 0.1, 10.01);
  const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });

  cubeMaterial.map = colorMap
  cubeMaterial.bumpMap = bumpMap

  cubeMaterial.normalScale.set(0.1, 0.1)


  const mesh = new THREE.Mesh(geometry, cubeMaterial);


  floor.mesh.material = cubeMaterial
  floor.mesh.position.set(0, 0, 0)
  floor.mesh.receiveShadow = true
  floor.mesh.name = 'floating-floor'
  return cubeMaterial
}

export function spawnMaterial() {



  const exrLoader = new EXRLoader()
  const colorMap = exrLoader.load('/src/assets/textures/brick-wall/brick_wall_001_diffuse_2k.exr', (texture) => {
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(1, 1)
  })
  const bumpMap = new THREE.TextureLoader().load(
    '/src/assets/textures/brick-wall/brick_wall_001_displacement_2k.png',
    (texture) => {
      texture.wrapS = THREE.RepeatWrapping
      texture.wrapT = THREE.RepeatWrapping
      texture.repeat.set(1, 1)
    }
  )
  const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });




  cubeMaterial.map = colorMap
  cubeMaterial.bumpMap = bumpMap
  cubeMaterial.normalScale.set(0.08, 0.08)
  cubeMaterial.needsUpdate = true
  return cubeMaterial
}

export function checkMaterial2(scene, floor) {

  const textureLoader = new THREE.TextureLoader();

  const normalMap4 = textureLoader.load('/src/assets/textures/golfball.jpg');
  const clearcoatNormalMap = textureLoader.load('/src/assets/textures/pbr/Scratched_gold/Scratched_gold_01_1K_Normal.png');



  // floor.attach(scene)


  // const exrLoader = new EXRLoader()

  // const colorMap = exrLoader.load('/src/assets/textures/brick-wall/brick_wall_001_diffuse_2k.exr', (texture) => {
  //   texture.wrapS = THREE.RepeatWrapping
  //   texture.wrapT = THREE.RepeatWrapping
  //   texture.repeat.set(20, 20)
  // })
  // const bumpMap = new THREE.TextureLoader().load(
  //   '/src/assets/textures/brick-wall/brick_wall_001_displacement_2k.png',
  //   (texture) => {
  //     texture.wrapS = THREE.RepeatWrapping
  //     texture.wrapT = THREE.RepeatWrapping
  //     texture.repeat.set(20, 20)
  //   }
  // )


  // const geometry = new THREE.BoxGeometry(10.01, 0.1, 10.01);
  // const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, transparent: true, opacity: 1.0 });

  // cubeMaterial.map = colorMap
  // cubeMaterial.bumpMap = bumpMap
  // const mesh = new THREE.Mesh(geometry, cubeMaterial);


  // floor.mesh.material=cubeMaterial
  // floor.mesh.position.set(0, 0, 0)
  // floor.mesh.receiveShadow = true
  // floor.mesh.name = 'floating-floor'

}
class defaultObject {

  constructor() {

    this.mesh = this.create();
  }
  create() { }
  attach(scene) {
    scene.add(this.mesh)
  }


  rotateX(rotation) {
    this.mesh.rotation.x = (rotation)
  }
  rotateY(rotation) {

    this.mesh.rotation.y = (rotation)
  }
  rotateZ(rotation) {
    this.mesh.rotation.z = (rotation)
  }
  placeX(displacement) {
    this.mesh.position.setX(displacement)
  }
  placeY(displacement) {
    this.mesh.position.setY(displacement)
  }
  placeZ(displacement) {
    this.mesh.position.setZ(displacement)
  }
  place(x, y, z) {
    this.mesh.position.set(x, y, z)
  }
}

export class Torus extends defaultObject {
  constructor() {
    super();
    let name = "floor"
  }
  create() {
    const geometry = new THREE.TorusKnotGeometry(1, 0.4, 120, 120);
    // var cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xFF00FF, transparent: false, opacity: 1 });
    //    var cubeMaterial =new THREE.MeshPhysicalMaterial( {
    // 					metalness: 0.8,
    // 					roughness: 0.4,
    // 					clearcoat: 0.0,

    //           color: 0xFFFFFF,

    // 					// y scale is negated to compensate for normal map handedness.
    // 					// clearcoatNormalScale: new THREE.Vector2( 2.0, - 2.0 )
    // 				} );

    // // const roughnessTexture = new THREE.TextureLoader().load(
    // //           '/src/assets/textures/marble/marble_0008_roughness_2k.jpg',
    // //           (texture) => {
    // //             texture.wrapS = THREE.RepeatWrapping
    // //             texture.wrapT = THREE.RepeatWrapping
    // //             texture.repeat.set(2, 2)
    // //           })
    // //           cubeMaterial.roughnessMap = roughnessTexture
    // const textureLoader = new THREE.TextureLoader()

    //   let roughnessTexture = new THREE.TextureLoader().load('/src/assets/textures/red-bricks/red_bricks_04_diff_1k.jpg')
    //   cubeMaterial.roughnessMap = roughnessTexture


    //   let bricksTexture = textureLoader.load('/src/assets/textures/red-bricks/red_bricks_04_diff_1k.jpg')
    //   cubeMaterial.map = bricksTexture
    //   // bricksTexture = new THREE.TextureLoader().load('/src/assets/textures/bricks/brick_diffuse.jpg')

    //   let normalMap = new THREE.TextureLoader().load(
    //     '/src/assets/textures/red-bricks/red_bricks_04_nor_gl_1k.jpg',
    //     (texture) => {
    //       texture.wrapS = THREE.RepeatWrapping
    //       texture.wrapT = THREE.RepeatWrapping
    //       texture.repeat.set(1, 1)
    //     }
    //   )
    //   cubeMaterial.normalMap = normalMap
    let cubeMaterial = brickMaterial()
    const mesh = new THREE.Mesh(geometry, cubeMaterial);

    mesh.position.set(0, 0, 0)
    mesh.receiveShadow = true
    mesh.name = 'floating-floor'
    return mesh
  }
}

export function brickMaterial2() {
  var cubeMaterial = new THREE.MeshPhysicalMaterial({
    metalness: 0.2,
    roughness: 0.3,
    clearcoat: 0.0,

    color: 0xFFFFFF,

    // y scale is negated to compensate for normal map handedness.
    // clearcoatNormalScale: new THREE.Vector2( 2.0, - 2.0 )
  });

  // const roughnessTexture = new THREE.TextureLoader().load(
  //           '/src/assets/textures/marble/marble_0008_roughness_2k.jpg',
  //           (texture) => {
  //             texture.wrapS = THREE.RepeatWrapping
  //             texture.wrapT = THREE.RepeatWrapping
  //             texture.repeat.set(2, 2)
  //           })
  //           cubeMaterial.roughnessMap = roughnessTexture
  const textureLoader = new THREE.TextureLoader()
  let wrapS=2
  let wrapT=2

  let roughnessTexture = new THREE.TextureLoader().load('/src/assets/textures/red-bricks/red_bricks_04_diff_1k.jpg', (texture) => {
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(wrapS, wrapT)
  })
  cubeMaterial.roughnessMap = roughnessTexture


  let bricksTexture = textureLoader.load('/src/assets/textures/red-bricks/red_bricks_04_diff_1k.jpg',  (texture) => {
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(wrapS, wrapT)
  })
  cubeMaterial.map = bricksTexture
  // bricksTexture = new THREE.TextureLoader().load('/src/assets/textures/bricks/brick_diffuse.jpg')

  let normalMap = new THREE.TextureLoader().load(
    '/src/assets/textures/red-bricks/red_bricks_04_nor_gl_1k.jpg',
    (texture) => {
      texture.wrapS = THREE.RepeatWrapping
      texture.wrapT = THREE.RepeatWrapping
      texture.repeat.set(wrapS, wrapT)
    }
  )
  cubeMaterial.normalMap = normalMap


  cubeMaterial.normalScale.set(1.1, 1.1)
  return cubeMaterial
}

export function brickMaterial() {


  var cubeMaterial = new THREE.MeshPhysicalMaterial({
    metalness: 0.4,
    roughness: 0.3,
    clearcoat: 0.1,

    color: 0xAAAAAA,
     emissive: 0x0A0A0A,
    // y scale is negated to compensate for normal map handedness.
    // clearcoatNormalScale: new THREE.Vector2( 2.0, - 2.0 )
  });

  // const roughnessTexture = new THREE.TextureLoader().load(
  //           '/src/assets/textures/marble/marble_0008_roughness_2k.jpg',
  //           (texture) => {
  //             texture.wrapS = THREE.RepeatWrapping
  //             texture.wrapT = THREE.RepeatWrapping
  //             texture.repeat.set(2, 2)
  //           })
  //           cubeMaterial.roughnessMap = roughnessTexture
  const textureLoader = new THREE.TextureLoader()
  let wrapS=2
  let wrapT=2

  let roughnessTexture = new THREE.TextureLoader().load(`/src/assets/textures/config/rought_1k.jpg`, (texture) => {
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(wrapS, wrapT)
  })
  cubeMaterial.roughnessMap = roughnessTexture


  let bricksTexture = textureLoader.load('/src/assets/textures/config/default_1k.jpg',  (texture) => {
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(wrapS, wrapT)
  })
  cubeMaterial.map = bricksTexture
  // bricksTexture = new THREE.TextureLoader().load('/src/assets/textures/bricks/brick_diffuse.jpg')

  let normalMap = new THREE.TextureLoader().load(
    '/src/assets/textures/config/red_bricks_04_nor_gl_1k.jpg',
    (texture) => {
      texture.wrapS = THREE.RepeatWrapping
      texture.wrapT = THREE.RepeatWrapping
      texture.repeat.set(wrapS, wrapT)
    }
  )
   cubeMaterial.normalMap = normalMap

  let ao_1k = new THREE.TextureLoader().load(
    '/src/assets/textures/config/red_bricks_04_ao_gl_1k.jpg',
    (texture) => {
      texture.wrapS = THREE.RepeatWrapping
      texture.wrapT = THREE.RepeatWrapping
      texture.repeat.set(wrapS, wrapT)
    }
  )
  
  //  cubeMaterial.aoMap = ao_1k


  cubeMaterial.normalScale.set(1.1, 1.1)
  return cubeMaterial
}

