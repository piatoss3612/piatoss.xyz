"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import piatoss128 from "@/../public/piatoss128-removebg.png";
import piatoss256 from "@/../public/piatoss256-removebg.png";
import piatoss512 from "@/../public/piatoss512-removebg.png";
import piatossHD from "@/../public/piatossHD-removebg.png";

interface FloatingImage {
  sprite: THREE.Sprite;
  speed: THREE.Vector3;
  rotationSpeed: number;
}

const FloatingPiatoss = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mountRef.current?.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    const imagePaths = [
      piatoss128.src,
      piatoss256.src,
      piatoss512.src,
      piatossHD.src,
    ];
    const floatingImages: FloatingImage[] = [];

    const boundaryWidth = width / 20;
    const boundaryHeight = height / 20;

    const imageCount = 32;

    for (let i = 0; i < imageCount; i++) {
      const texture = textureLoader.load(imagePaths[i % imagePaths.length]);
      const material = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(material);

      const scale = Math.random() * 5 + 2;
      sprite.scale.set(scale, scale, 1);

      sprite.position.set(
        Math.random() * boundaryWidth - boundaryWidth / 2,
        Math.random() * boundaryHeight - boundaryHeight / 2,
        Math.random() * 50 - 25
      );

      const speed = new THREE.Vector3(
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.05
      );

      const rotationSpeed = (Math.random() - 0.5) * 0.02;

      scene.add(sprite);
      floatingImages.push({ sprite, speed, rotationSpeed });
    }

    camera.position.z = 32;

    const animate = function () {
      requestAnimationFrame(animate);

      floatingImages.forEach(({ sprite, speed, rotationSpeed }) => {
        sprite.position.add(speed);
        sprite.material.rotation += rotationSpeed;

        if (Math.abs(sprite.position.x) > boundaryWidth / 2) {
          speed.x *= -1;
          sprite.position.x =
            (Math.sign(sprite.position.x) * boundaryWidth) / 2;
        }
        if (Math.abs(sprite.position.y) > boundaryHeight / 2) {
          speed.y *= -1;
          sprite.position.y =
            (Math.sign(sprite.position.y) * boundaryHeight) / 2;
        }
        if (Math.abs(sprite.position.z) > 25) {
          speed.z *= -1;
          sprite.position.z = Math.sign(sprite.position.z) * 25;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
};

export default FloatingPiatoss;
