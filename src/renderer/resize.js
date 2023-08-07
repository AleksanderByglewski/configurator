import * as THREE from 'three';

function handleResize(camera, renderer, composer) {
    return function() {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
  
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
  
      renderer.setSize(newWidth, newHeight);
      composer.setSize(newWidth, newHeight);
    };
  }

export{handleResize}