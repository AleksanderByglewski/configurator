
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
        time = new Date().getTime() * 0.001; // you can get time here
        // system.handleEvent('iterationStep');
        renderer.render(scene, camera);
        system
        scene
        requestAnimationFrame(animate);
    };
}