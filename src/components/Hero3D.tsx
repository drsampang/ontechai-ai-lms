import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

const Hero3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cubesRef = useRef<THREE.Mesh[]>([]);
  const particlesRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x3B82F6, 1, 100);
    pointLight1.position.set(10, 10, 10);
    pointLight1.castShadow = true;
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x8B5CF6, 0.8, 100);
    pointLight2.position.set(-10, -10, 10);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xEC4899, 0.6, 100);
    pointLight3.position.set(0, 0, 15);
    scene.add(pointLight3);

    // Create floating cubes
    const createCube = (position: [number, number, number], color: number) => {
      const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
      const material = new THREE.MeshPhongMaterial({
        color,
        emissive: color,
        shininess: 100,
        emissiveIntensity: 0.2,
      });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(...position);
      cube.castShadow = true;
      cube.receiveShadow = true;
      scene.add(cube);
      cubesRef.current.push(cube);
    };

    createCube([-3, 2, 0], 0x3B82F6);
    createCube([3, -2, 0], 0x8B5CF6);
    createCube([0, 0, -2], 0xEC4899);
    createCube([-2, -2, 1], 0x06B6D4);
    createCube([2, 2, 1], 0x10B981);

    // Create particle system
    const particleCount = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 15;
      positions[i + 1] = (Math.random() - 0.5) * 15;
      positions[i + 2] = (Math.random() - 0.5) * 15;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: 0x8B5CF6,
      size: 0.05,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.6,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    particlesRef.current = particles;

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Rotate cubes
      cubesRef.current.forEach((cube, index) => {
        cube.rotation.x += 0.005 + index * 0.001;
        cube.rotation.y += 0.007 + index * 0.002;
        cube.position.y += Math.sin(Date.now() * 0.0005 + index) * 0.005;
      });

      // Rotate particles
      if (particlesRef.current) {
        particlesRef.current.rotation.x += 0.0001;
        particlesRef.current.rotation.y += 0.0002;
      }

      // Animate camera
      const time = Date.now() * 0.0001;
      camera.position.x = Math.sin(time) * 8;
      camera.position.z = 5 + Math.cos(time) * 2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-screen bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center z-10"
        >
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
            15-Day Advanced AI Professional Mastery
          </h1>
          <p className="text-2xl text-blue-300 mb-8 drop-shadow-lg font-semibold">
            "AI चलाउन होइन, AI बाट आफ्नो काम गराउन सिकौं।"
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-bold rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            Start Learning
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero3D;
