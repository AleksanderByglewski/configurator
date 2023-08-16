import * as THREE from 'three';
export class defaultObject {

    constructor() {
      this.state = {}
      this.mesh = this.create();
    }
    access(state) {
  
    }
    update(state) {
      this.state = { ...this.state, ...newState };
    }
    quick_modification(state) {
      update(state)
      create()
    }
  
    create_geometry(dimensions_param) {
      const geometry = new THREE.BoxGeometry(...dimensions_param);
      return geometry;
    }
    create_material(material_param) {
      const material = new THREE.MeshStandardMaterial(material_param);
      return material
    }
    create_mesh() {
      const mesh = new THREE.Mesh(geometry, material);
      return mesh
    }
    displace_mesh(displacement_param) {
      mesh.position.set(...displacement_param)
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

export class closeGround extends defaultObject {
    constructor() {
      super();
    }
    create(){
      let TEXTURE_PATH = '/assets/textures/floor/aerial_grass_rock_diff_4k.jpg';
      let DISPLACEMENT_PATH = "/assets/textures/floor/aerial_grass_rock_disp_4k.png";
      // let NORMAL_PATH = "/assets/textures/floor/aerial_grass_rock_nor_gl_4k.exr";
      let ROUGHNESS_PATH = "/assets/textures/floor/aerial_grass_rock_rough_4k.jpg";
      
      const textureLoader = new THREE.TextureLoader();
      const gridTexture = textureLoader.load(TEXTURE_PATH);
      const terrainTexture = textureLoader.load(DISPLACEMENT_PATH);
      const roughnessTexture = textureLoader.load(ROUGHNESS_PATH);
      
      // Load .exr file using EXRLoader instead of TextureLoader
      // const exrLoader = new EXRLoader();
      // const normalTexture = exrLoader.load(NORMAL_PATH);
      
      let repeat = 10;
      gridTexture.repeat.set(repeat, repeat);
      terrainTexture.repeat.set(repeat, repeat);
      // normalTexture.repeat.set(repeat, repeat);
      roughnessTexture.repeat.set(repeat, repeat);
      
      gridTexture.wrapS = THREE.MirroredRepeatWrapping;
      gridTexture.wrapT = THREE.MirroredRepeatWrapping;
      terrainTexture.wrapS = THREE.MirroredRepeatWrapping; 
      terrainTexture.wrapT = THREE.MirroredRepeatWrapping;
      // normalTexture.wrapS = THREE.MirroredRepeatWrapping; 
      // normalTexture.wrapT = THREE.MirroredRepeatWrapping;
      roughnessTexture.wrapS = THREE.MirroredRepeatWrapping; 
      roughnessTexture.wrapT = THREE.MirroredRepeatWrapping;
      
      const geometry = new THREE.PlaneGeometry(120, 120, 24, 24);
      const matrix = new THREE.Matrix4().makeRotationX(-Math.PI / 2);
      geometry.applyMatrix4(matrix);
      geometry.translate(0, -0.2, 0);
      const material = new THREE.MeshStandardMaterial({
          map: gridTexture,
          displacementMap: terrainTexture,
          // normalMap: normalTexture,
          roughnessMap: roughnessTexture,
          displacementScale: 0.3,
          color: new THREE.Color(0x323230),
      });
      
      const mesh = new THREE.Mesh(geometry, material);
  
      mesh.receiveShadow = true
   
  
      mesh.name = 'ground'
      return mesh
  
    }
    create2() {
      //rotate the geometry by 90deg around the x axis
      // const geometry = new THREE.PlaneGeometry(1000,1000);
      // const matrix = new THREE.Matrix4().makeRotationX(-Math.PI / 2);
      // geometry.applyMatrix4(matrix);
  
      
      // const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.5 });
      // const mesh = new THREE.Mesh(geometry, cubeMaterial);
  
      // const colorMap = new THREE.TextureLoader().load('/assets/textures/red-bricks/red_bricks_04_diff_1k.jpg', (texture) => {
      //   texture.wrapS = THREE.RepeatWrapping
      //   texture.wrapT = THREE.RepeatWrapping
      //   texture.repeat.set(1000, 1000)
      // })
      // const normalMap = new THREE.TextureLoader().load(
      //   '/assets/textures/red-bricks/red_bricks_04_nor_gl_1k.jpg',
      //   (texture) => {
      //     texture.wrapS = THREE.RepeatWrapping
      //     texture.wrapT = THREE.RepeatWrapping
      //     texture.repeat.set(1000, 1000)
      //   }
      // )
      // const material = new THREE.MeshPhongMaterial({
      //   color:
      //     0xffffff
      // })
      // material.map = colorMap
      // material.normalMap = normalMap
      // const mesh = new THREE.Mesh(geometry, material);
  
  
      // const TEXTURE_PATH = "https://res.cloudinary.com/dg5nsedzw/image/upload/v1641657168/blog/vaporwave-threejs-textures/grid.png";  
      let TEXTURE_PATH='/assets/textures/floor/forest.jpg'
      // TEXTURE_PATH="/assets/textures//sand.jpg"
      let DISPLACEMENT_PATH = "/assets/textures/floor/forest_disp.png";
  
      const textureLoader = new THREE.TextureLoader();
      const gridTexture = textureLoader.load(TEXTURE_PATH);
     
      //I want to increase the uv repeat on this texture
      const terrainTexture = textureLoader.load(DISPLACEMENT_PATH);
      let repeat=5
      gridTexture.repeat.set(repeat,repeat)
       
      gridTexture.wrapS= THREE.MirroredRepeatWrapping;
      gridTexture.wrapT= THREE.MirroredRepeatWrapping;
      terrainTexture.repeat.set(repeat,repeat)
  
       terrainTexture.wrapS = THREE.MirroredRepeatWrapping; // Set horizontal (u) wrap mode to repeat
        terrainTexture.wrapT = THREE.MirroredRepeatWrapping; // Set vertical (v) wrap mode to repeat
  
      const geometry = new THREE.PlaneGeometry(40, 40, 24, 24);
      const matrix = new THREE.Matrix4().makeRotationX(-Math.PI / 2);
       geometry.applyMatrix4(matrix);
       geometry.translate(0, -0.7, 0);
  
      const material = new THREE.MeshStandardMaterial({
          map: gridTexture,
          // Add the displacement map / height map to the material
          displacementMap: terrainTexture,
          // Tweak the displacement scale to adjust the "intensity" of the terrain
          displacementScale: 0.3,
          color: new THREE.Color(0x272727),
      });
  
      
      const mesh = new THREE.Mesh(geometry, material);
  
  
  
  
      // const colorMap = new THREE.TextureLoader().load('/assets/textures/displacement/w_c.jpg', (texture) => {
      //   texture.wrapS = THREE.RepeatWrapping
      //   texture.wrapT = THREE.RepeatWrapping
      // })
      // const displacementMap = new THREE.TextureLoader().load('/assets/textures/displacement/w_d.png', (texture) => {
      //   texture.wrapS = THREE.RepeatWrapping
      //   texture.wrapT = THREE.RepeatWrapping
      // })
  
      // const material = new THREE.MeshPhongMaterial({ color: 0xffffff })
      // material.map = colorMap
      // material.displacementMap = displacementMap
      // const mesh = new THREE.Mesh(geometry, material);
  
      mesh.receiveShadow = true
      mesh.name = 'ground'
      return mesh
    }
  
  }


export class Ground extends defaultObject {
    constructor() {
      super();
    }
    create() {
      //rotate the geometry by 90deg around the x axis
      // const geometry = new THREE.PlaneGeometry(1000,1000);
      // const matrix = new THREE.Matrix4().makeRotationX(-Math.PI / 2);
      // geometry.applyMatrix4(matrix);
  
      
      // const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.5 });
      // const mesh = new THREE.Mesh(geometry, cubeMaterial);
  
      // const colorMap = new THREE.TextureLoader().load('/assets/textures/red-bricks/red_bricks_04_diff_1k.jpg', (texture) => {
      //   texture.wrapS = THREE.RepeatWrapping
      //   texture.wrapT = THREE.RepeatWrapping
      //   texture.repeat.set(1000, 1000)
      // })
      // const normalMap = new THREE.TextureLoader().load(
      //   '/assets/textures/red-bricks/red_bricks_04_nor_gl_1k.jpg',
      //   (texture) => {
      //     texture.wrapS = THREE.RepeatWrapping
      //     texture.wrapT = THREE.RepeatWrapping
      //     texture.repeat.set(1000, 1000)
      //   }
      // )
      // const material = new THREE.MeshPhongMaterial({
      //   color:
      //     0xffffff
      // })
      // material.map = colorMap
      // material.normalMap = normalMap
      // const mesh = new THREE.Mesh(geometry, material);
  
  
      // const TEXTURE_PATH = "https://res.cloudinary.com/dg5nsedzw/image/upload/v1641657168/blog/vaporwave-threejs-textures/grid.png";  
      let TEXTURE_PATH='/assets/textures/floor/rock.jpg'
      // TEXTURE_PATH='/assets/textures/red-bricks/red_bricks_04_diff_1k.jpg'
      // TEXTURE_PATH="/assets/textures//sand.jpg"
      let DISPLACEMENT_PATH = "/assets/textures/displacement/displacement2.png";
  


      
      const textureLoader = new THREE.TextureLoader();
      const gridTexture = textureLoader.load(TEXTURE_PATH);
      gridTexture.repeat.set(10, 10);
      gridTexture.wrapS = THREE.RepeatWrapping; // Set horizontal (u) wrap mode to repeat
      gridTexture.wrapT = THREE.RepeatWrapping; // Set vertical (v) wrap mode to repeat
      //I want to increase the uv repeat on this texture
      const terrainTexture = textureLoader.load(DISPLACEMENT_PATH);
      
      // terrainTexture.repeat.set(2,2)
      // terrainTexture.wrapS = THREE.RepeatWrapping; // Set horizontal (u) wrap mode to repeat
      // terrainTexture.wrapT = THREE.RepeatWrapping; // Set vertical (v) wrap mode to repeat
  
      const geometry = new THREE.PlaneGeometry(250, 500, 24, 24);
      const matrix = new THREE.Matrix4().makeRotationX(-Math.PI / 2);
       geometry.applyMatrix4(matrix);
       geometry.translate(0, -0.3, 0);
  
      const material = new THREE.MeshStandardMaterial({
        map: gridTexture,
          color:0x272727,
          // Add the displacement map / height map to the material
          displacementMap: terrainTexture,
          // Tweak the displacement scale to adjust the "intensity" of the terrain
          displacementScale: 50,

      });
      // material.map.wrapS = THREE.RepeatWrapping;
      // material.map.wrapT = THREE.RepeatWrapping;
      
  
      
      const mesh = new THREE.Mesh(geometry, material);
  
  
  
  
      // const colorMap = new THREE.TextureLoader().load('/assets/textures/displacement/w_c.jpg', (texture) => {
      //   texture.wrapS = THREE.RepeatWrapping
      //   texture.wrapT = THREE.RepeatWrapping
      // })
      // const displacementMap = new THREE.TextureLoader().load('/assets/textures/displacement/w_d.png', (texture) => {
      //   texture.wrapS = THREE.RepeatWrapping
      //   texture.wrapT = THREE.RepeatWrapping
      // })
  
      // const material = new THREE.MeshPhongMaterial({ color: 0xffffff })
      // material.map = colorMap
      // material.displacementMap = displacementMap
      // const mesh = new THREE.Mesh(geometry, material);
  
      mesh.receiveShadow = true
      mesh.name = 'ground'
      return mesh
    }
  
  }