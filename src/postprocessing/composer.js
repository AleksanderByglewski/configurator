import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';

// Assuming you moved the FilmGrainShader here as well.
// ... (FilmGrainShader definition)

const FilmGrainShader = {
    uniforms: {
        "tDiffuse": { value: null },
        "amount": { value: 0.05 }  // The intensity of the grain (adjust as needed)
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float amount;
        varying vec2 vUv;
        float rand(vec2 coord) {
            return fract(sin(dot(coord, vec2(12.9898, 78.233))) * 43758.5453);
        }
        void main() {
            vec4 color = texture2D(tDiffuse, vUv);
            float grain = rand(vUv * vec2(1.0 / amount));
            gl_FragColor = vec4(color.rgb + amount * (0.5 - grain), color.a);
        }
    `
  };
  

function setupComposer(renderer, scene, camera) {
  const composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  const bokehPass = new BokehPass(scene, camera, {
    focus: 1.0,
    aperture: 0.025,
    maxblur: 1.0,
    width: window.innerWidth,
    height: window.innerHeight
  });
  composer.addPass(bokehPass);

  const filmGrainPass = new ShaderPass(FilmGrainShader);
  filmGrainPass.renderToScreen = true;
  composer.addPass(filmGrainPass);

  return composer;
}

export { setupComposer };