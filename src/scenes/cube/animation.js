export function setupAnimation(composer, cube) {
    return function animate(time) {
        time = new Date().getTime() * 0.001; // you can get time here
        // cube.rotation.x = time;
        // cube.rotation.y = time;
        composer.render();
        requestAnimationFrame(animate);
    };
}