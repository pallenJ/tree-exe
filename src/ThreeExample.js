import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeExample = () => {
  const canvasRef = useRef(null); // 캔버스 참조
  const cameraRef = useRef(null); // 카메라 참조

  useEffect(() => {
    // Scene 생성
    const scene = new THREE.Scene();

    // Camera 생성
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera; // useRef를 통해 cameraRef에 camera 저장

    // Renderer 생성
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight); // 렌더러 크기를 설정

    // Geometry 생성 (Box)
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // 애니메이션 함수
    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, cameraRef.current); // cameraRef를 사용하여 camera에 접근

      // 화면 크기 변화에 대응하여 렌더러 크기 조정
      const onWindowResize = () => {
        const { innerWidth, innerHeight } = window;
        cameraRef.current.aspect = innerWidth / innerHeight;
        cameraRef.current.updateProjectionMatrix();
        renderer.setSize(innerWidth, innerHeight);
      };

      window.addEventListener('resize', onWindowResize);

      return () => window.removeEventListener('resize', onWindowResize);
    };

    animate();
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />; // 렌더링 영역 설정
};

export default ThreeExample;
