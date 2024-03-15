"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const StarSky = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const width = mountRef.current?.clientWidth || 0;
    const height = mountRef.current?.clientHeight || 0;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(width, height);
    mountRef.current?.appendChild(renderer.domElement);

    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff });

    const starsVertices = [];
    for (let i = 0; i < 5000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = -Math.random() * 2000;
      starsVertices.push(x, y, z);
    }

    starsGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starsVertices, 3)
    );

    const stars = new THREE.Points(starsGeometry, starsMaterial);

    scene.add(stars);

    camera.position.z = 1;

    const animate = function () {
      requestAnimationFrame(animate);

      stars.rotation.x += 0.0005;
      stars.rotation.y += 0.0005;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    />
  );
};

export default StarSky;
