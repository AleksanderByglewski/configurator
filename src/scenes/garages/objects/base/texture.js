import * as THREE from 'three';

let this_loader = new THREE.TextureLoader();
let texture = this_loader.load('/assets/config/default_1k.jpg');
let global_texture = this_loader.load('/assets/config/default_1k.jpg');
let loader = new THREE.TextureLoader();
export {loader, this_loader,global_texture, texture}