
let this_loader = new THREE.TextureLoader();
let texture = this_loader.load('/assets/config/default_1k.jpg');
let global_texture = this_loader.load('/assets/config/default_1k.jpg');

export {this_loader,global_texture, texture}