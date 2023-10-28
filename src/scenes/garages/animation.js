import * as THREE from 'three';

export function setupAnimation(composer, system,scene) {
    return function animate(time) {
        time = new Date().getTime() * 0.001; // you can get time here
        // system.handleEvent('iterationStep');
        composer.render();
        
       
        scene
        requestAnimationFrame(animate);
    };
}


export function setupAnimationRenderer(renderer, system,scene,camera) {
    return function animate(time) {
        // time = new Date().getTime() * 0.001; // you can get time here
        // system.handleEvent('iterationStep');
        renderer.render(scene, camera);
        // system
        // system.sphereMesh.material.roughness=system.params.roughness
        // system.sphereMesh.material.metalness=system.params.metalness
        // system.sphereMesh.material.color=new THREE.Color(system.params.color)
        // system.light.intensity=system.params.lightIntensity
        // scene
        requestAnimationFrame(animate);
    };
}