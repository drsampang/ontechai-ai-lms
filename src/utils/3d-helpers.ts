import * as THREE from 'three';

export const createGradientCanvas = (width: number, height: number): Canvas => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#3B82F6');
  gradient.addColorStop(0.5, '#8B5CF6');
  gradient.addColorStop(1, '#EC4899');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  return canvas;
};

export const createFloatingCube = (scene: THREE.Scene, position: [number, number, number]) => {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({
    color: 0x3B82F6,
    emissive: 0x1E40AF,
    shininess: 100
  });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(...position);
  scene.add(cube);
  
  return cube;
};

export const createFloatingSphere = (scene: THREE.Scene, position: [number, number, number], color: number) => {
  const geometry = new THREE.SphereGeometry(0.5, 32, 32);
  const material = new THREE.MeshPhongMaterial({
    color,
    emissive: color,
    wireframe: true,
    emissiveIntensity: 0.3
  });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.set(...position);
  scene.add(sphere);
  
  return sphere;
};

export const createParticleSystem = (scene: THREE.Scene, count: number = 100) => {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  
  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 20;
    positions[i + 1] = (Math.random() - 0.5) * 20;
    positions[i + 2] = (Math.random() - 0.5) * 20;
  }
  
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({
    color: 0x8B5CF6,
    size: 0.1,
    sizeAttenuation: true
  });
  
  const particles = new THREE.Points(geometry, material);
  scene.add(particles);
  
  return particles;
};

export const animateCube = (cube: THREE.Mesh, time: number) => {
  cube.rotation.x = time * 0.5;
  cube.rotation.y = time * 0.7;
  cube.position.y = Math.sin(time * 0.001) * 2;
};

export const animateCamera = (camera: THREE.Camera, time: number, radius: number = 10) => {
  const angle = (time * 0.0001) % (Math.PI * 2);
  camera.position.x = Math.cos(angle) * radius;
  camera.position.z = Math.sin(angle) * radius;
  (camera as THREE.PerspectiveCamera).lookAt(0, 0, 0);
};
