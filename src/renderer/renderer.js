import * as THREE from 'three';
export function setupRenderer()
{
const canvasContainer = document.querySelector('#app');
const renderer = new THREE.WebGLRenderer({ antialias: true, shadowMap:true });
canvasContainer.appendChild(renderer.domElement);

// Additional renderer settings for improved visuals
renderer.gammaFactor = 2.2;
renderer.gammaOutput = true;
renderer.physicallyCorrectLights = false;
renderer.shadowMap=THREE.BasicShadowMap 
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputColorSpace=THREE.LinearSRGBColorSpace


renderer.setSize(window.innerWidth, window.innerHeight);
return renderer
}