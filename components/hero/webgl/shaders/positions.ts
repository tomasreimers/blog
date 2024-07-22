import type * as THREE from 'three';

import { fragmentShaderFunction } from './fragment_shader_fn';

export const updatePositionsFn = fragmentShaderFunction<{
  positions: THREE.Texture;
  velocity: THREE.Texture;
  delta: number;
}>(
  {
    positions: null,
    velocity: null,
    delta: null,
  },
  `precision highp float;
precision highp sampler2D;

varying vec2 vUv;
uniform sampler2D velocity;
uniform sampler2D positions;
uniform float delta;

void main() {
  vec4 vel = texture2D( velocity, vUv ).rgba;
  vec4 pos = texture2D( positions, vUv ).rgba;
  gl_FragColor = vec4(pos.r + vel.r * delta, pos.g + vel.g * delta, pos.b + vel.b * delta, pos.a + vel.a * delta);
}
`
);
