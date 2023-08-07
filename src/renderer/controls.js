import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function setupControls(camera, renderer){

    new OrbitControls(camera, renderer.domElement);
}
export {setupControls}