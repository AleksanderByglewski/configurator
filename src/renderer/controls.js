import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function setupControls(camera, renderer){

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI * 0.480;
    return controls
    //new OrbitControls(camera, renderer.domElement);
}
export {setupControls}