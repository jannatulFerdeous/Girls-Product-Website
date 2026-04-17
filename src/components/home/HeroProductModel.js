import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import texturedModelUrl from '../../assets/3d-product/textured.glb';

const createHeroProductScene = (canvas, wrapper, prefersReducedMotion, onLoaded) => {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(24, 1, 0.1, 100);
  camera.position.set(0, 0.55, 7.6);

  const ambientLight = new THREE.AmbientLight(0xffffff, 2.2);
  const hemiLight = new THREE.HemisphereLight(0xfdf2ff, 0x2c2031, 1.8);
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
  keyLight.position.set(3.6, 5.4, 5.8);
  const rimLight = new THREE.PointLight(0xd7b5ff, 20, 22);
  rimLight.position.set(-3.8, 2.4, -2.2);
  const fillLight = new THREE.PointLight(0xffd6c2, 16, 20);
  fillLight.position.set(2.5, -1.2, 3.4);
  scene.add(ambientLight, hemiLight, keyLight, rimLight, fillLight);

  const productRig = new THREE.Group();
  productRig.position.y = -0.4;
  scene.add(productRig);

  const pedestalMaterial = new THREE.MeshPhysicalMaterial({
    color: '#f4e5f8',
    metalness: 0.1,
    roughness: 0.18,
    clearcoat: 1,
    clearcoatRoughness: 0.12,
    transparent: true,
    opacity: 0.9,
  });

  const pedestal = new THREE.Mesh(
    new THREE.CylinderGeometry(1.55, 1.92, 0.56, 48),
    pedestalMaterial,
  );
  pedestal.position.y = -2.1;
  productRig.add(pedestal);

  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(1.9, 36),
    new THREE.MeshBasicMaterial({
      color: '#2f1f37',
      transparent: true,
      opacity: 0.15,
    }),
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -2.34;
  shadow.scale.set(1.1, 0.74, 1);
  productRig.add(shadow);

  const loader = new GLTFLoader();
  const modelGroup = new THREE.Group();
  productRig.add(modelGroup);

  let loadedScene = null;
  let disposed = false;

  loader.load(
    texturedModelUrl,
    (gltf) => {
      if (disposed) {
        return;
      }

      loadedScene = gltf.scene;

      loadedScene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = false;
          child.receiveShadow = false;

          if (child.material) {
            child.material.envMapIntensity = 1.05;
            child.material.needsUpdate = true;
          }
        }
      });

      const bounds = new THREE.Box3().setFromObject(loadedScene);
      const size = new THREE.Vector3();
      const center = new THREE.Vector3();
      bounds.getSize(size);
      bounds.getCenter(center);

      loadedScene.position.sub(center);

      const maxAxis = Math.max(size.x, size.y, size.z);
      const scale = 4.2 / maxAxis;
      loadedScene.scale.setScalar(scale);
      loadedScene.position.y = 0.34;
      loadedScene.rotation.y = -0.42;

      modelGroup.add(loadedScene);
      onLoaded();
    },
    undefined,
    () => {
      onLoaded();
    },
  );

  const pointer = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };
  const drag = { active: false, lastX: 0, rotationY: -0.2 };
  const intro = { progress: prefersReducedMotion ? 1 : 0 };

  const handlePointerMove = (event) => {
    const rect = wrapper.getBoundingClientRect();

    if (drag.active) {
      const deltaX = event.clientX - drag.lastX;
      drag.rotationY += deltaX * 0.012;
      drag.lastX = event.clientX;
    }

    target.x = ((event.clientX - rect.left) / rect.width - 0.5) * 0.55;
    target.y = ((event.clientY - rect.top) / rect.height - 0.5) * 0.26;
  };

  const handlePointerLeave = () => {
    drag.active = false;
    target.x = 0;
    target.y = 0;
    wrapper.style.cursor = 'grab';
  };

  const handlePointerDown = (event) => {
    drag.active = true;
    drag.lastX = event.clientX;
    wrapper.style.cursor = 'grabbing';
  };

  const handlePointerUp = () => {
    drag.active = false;
    wrapper.style.cursor = 'grab';
  };

  const resize = () => {
    const { clientWidth, clientHeight } = wrapper;
    renderer.setSize(clientWidth, clientHeight, false);
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
  };

  wrapper.addEventListener('mousemove', handlePointerMove);
  wrapper.addEventListener('mouseleave', handlePointerLeave);
  wrapper.addEventListener('mousedown', handlePointerDown);
  window.addEventListener('mouseup', handlePointerUp);
  window.addEventListener('resize', resize);
  wrapper.style.cursor = 'grab';
  resize();

  const clock = new THREE.Clock();
  let frameId = 0;

  const tick = () => {
    const elapsed = clock.getElapsedTime();

    pointer.x += (target.x - pointer.x) * 0.06;
    pointer.y += (target.y - pointer.y) * 0.06;
    intro.progress = Math.min(1, intro.progress + 0.02);

    const easedIntro = 1 - Math.pow(1 - intro.progress, 3);
    const introLift = (1 - easedIntro) * 2.9;
    const introTilt = (1 - easedIntro) * 0.85;

    productRig.rotation.y = drag.rotationY + pointer.x * 0.35;
    productRig.rotation.x = pointer.y * -0.22 + introTilt;
    productRig.position.y = -0.4 + Math.sin(elapsed * 1.6) * 0.08 - introLift;

    if (!prefersReducedMotion) {
      if (!drag.active) {
        drag.rotationY += 0.0045;
      }
      pedestal.scale.x = 1 + Math.sin(elapsed * 1.2) * 0.015;
      pedestal.scale.z = 1 + Math.sin(elapsed * 1.2) * 0.015;
      modelGroup.scale.setScalar(0.92 + easedIntro * 0.08);
    } else {
      modelGroup.scale.setScalar(1);
    }

    renderer.render(scene, camera);
    frameId = window.requestAnimationFrame(tick);
  };

  tick();

  return () => {
    disposed = true;
    window.cancelAnimationFrame(frameId);
    window.removeEventListener('resize', resize);
    wrapper.removeEventListener('mousemove', handlePointerMove);
    wrapper.removeEventListener('mouseleave', handlePointerLeave);
    wrapper.removeEventListener('mousedown', handlePointerDown);
    window.removeEventListener('mouseup', handlePointerUp);

    scene.traverse((object) => {
      if (object.isMesh) {
        object.geometry.dispose();
        if (Array.isArray(object.material)) {
          object.material.forEach((material) => material.dispose());
        } else if (object.material) {
          object.material.dispose();
        }
      }
    });

    renderer.dispose();
  };
};

const HeroProductModel = () => {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;

    if (!wrapper || !canvas) {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const cleanup = createHeroProductScene(canvas, wrapper, mediaQuery.matches, () => {
      setIsLoaded(true);
    });

    return cleanup;
  }, []);

  return (
    <div ref={wrapperRef} className="home-hero__image-shell home-hero__image-shell--model">
      <canvas ref={canvasRef} className="home-hero__canvas" />
      {!isLoaded ? <span className="home-hero__loading">Loading 3D product...</span> : null}
    </div>
  );
};

export default HeroProductModel;
