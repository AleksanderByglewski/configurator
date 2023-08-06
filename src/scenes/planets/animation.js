export function setupAnimation(composer, cube) {
    return function animate(time) {
        time = new Date().getTime() * 0.001; // you can get time here
        cube.position.x = Math.sin(time);
        cube.position.y = Math.cos(time);
        composer.render();
        requestAnimationFrame(animate);
    };
}