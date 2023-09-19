import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function setupControls(camera, renderer){

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI * 0.480;
    controls.enableDamping=true
    controls.dampingFactor=0.5
    return controls
    //new OrbitControls(camera, renderer.domElement);
}
export {setupControls}