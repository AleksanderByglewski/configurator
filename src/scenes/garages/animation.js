
export function setupAnimation(composer, system) {
    return function animate(time) {
        time = new Date().getTime() * 0.001; // you can get time here
        // system.handleEvent('iterationStep');
        composer.render();
        requestAnimationFrame(animate);
    };
}