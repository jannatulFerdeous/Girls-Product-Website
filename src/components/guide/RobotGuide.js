import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as THREE from 'three';
import { FiArrowRight, FiHome, FiLayers, FiShoppingBag } from 'react-icons/fi';

import './RobotGuide.css';

const guideMap = {
  '/': {
    label: 'Home Guide',
    title: 'Want to see the shopping floor?',
    text: 'I can take you straight to the modern shop page or the animated feature overview.',
    actions: [
      { to: '/shop', label: 'Go to Shop', icon: FiShoppingBag },
      { to: '/feature', label: 'View Features', icon: FiLayers },
    ],
  },
  '/shop': {
    label: 'Shop Guide',
    title: 'You are in the product zone.',
    text: 'Browse products here, or jump to the feature page to understand what makes the experience special.',
    actions: [
      { to: '/feature', label: 'See Features', icon: FiLayers },
      { to: '/', label: 'Back Home', icon: FiHome },
    ],
  },
  '/feature': {
    label: 'Feature Guide',
    title: 'Ready to explore the live experience?',
    text: 'The shop page lets you test the storefront and add products directly to the cart.',
    actions: [
      { to: '/shop', label: 'Open Shop', icon: FiShoppingBag },
      { to: '/', label: 'Home Story', icon: FiHome },
    ],
  },
};

const createRobotScene = (canvas, prefersReducedMotion) => {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 1.5, 7.5);

  const group = new THREE.Group();
  scene.add(group);

  const ambient = new THREE.AmbientLight(0xffffff, 1.8);
  const keyLight = new THREE.DirectionalLight(0xffe3d0, 2.2);
  keyLight.position.set(4, 8, 6);
  const rimLight = new THREE.PointLight(0xa4d7ff, 18, 20);
  rimLight.position.set(-3, 3, 4);

  scene.add(ambient, keyLight, rimLight);

  const peachMaterial = new THREE.MeshPhysicalMaterial({
    color: '#d8a286',
    metalness: 0.1,
    roughness: 0.28,
    clearcoat: 0.9,
    clearcoatRoughness: 0.15,
  });

  const creamMaterial = new THREE.MeshPhysicalMaterial({
    color: '#fff3eb',
    metalness: 0.02,
    roughness: 0.22,
    clearcoat: 1,
    clearcoatRoughness: 0.12,
  });

  const darkMaterial = new THREE.MeshStandardMaterial({
    color: '#1c2330',
    metalness: 0.35,
    roughness: 0.48,
  });

  const glowMaterial = new THREE.MeshStandardMaterial({
    color: '#8fc7ff',
    emissive: '#8fc7ff',
    emissiveIntensity: 1.2,
    metalness: 0.15,
    roughness: 0.28,
  });

  const shadowMaterial = new THREE.MeshBasicMaterial({
    color: '#3b241b',
    transparent: true,
    opacity: 0.16,
  });

  const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 2.25, 0.55, 48), creamMaterial);
  pedestal.position.y = -2.1;
  group.add(pedestal);

  const body = new THREE.Mesh(new THREE.CapsuleGeometry(1.02, 1.75, 10, 22), peachMaterial);
  body.position.y = -0.15;
  group.add(body);

  const head = new THREE.Mesh(new THREE.BoxGeometry(2.35, 1.68, 1.65), creamMaterial);
  head.position.set(0, 2, 0.15);
  group.add(head);

  const visor = new THREE.Mesh(new THREE.BoxGeometry(1.56, 0.68, 1.16), darkMaterial);
  visor.position.set(0, 2, 0.92);
  group.add(visor);

  const eyeGeometry = new THREE.SphereGeometry(0.09, 20, 20);
  const leftEye = new THREE.Mesh(eyeGeometry, glowMaterial);
  const rightEye = new THREE.Mesh(eyeGeometry, glowMaterial);
  leftEye.position.set(-0.34, 2.02, 1.48);
  rightEye.position.set(0.34, 2.02, 1.48);
  group.add(leftEye, rightEye);

  const antennaStem = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.55, 12), darkMaterial);
  antennaStem.position.set(0, 3.02, 0.1);
  group.add(antennaStem);

  const antennaTop = new THREE.Mesh(new THREE.SphereGeometry(0.15, 20, 20), glowMaterial);
  antennaTop.position.set(0, 3.42, 0.1);
  group.add(antennaTop);

  const armGeometry = new THREE.CapsuleGeometry(0.16, 1.2, 6, 14);
  const leftArm = new THREE.Mesh(armGeometry, creamMaterial);
  const rightArm = new THREE.Mesh(armGeometry, creamMaterial);
  leftArm.position.set(-1.42, 0.16, 0.1);
  leftArm.rotation.z = -0.65;
  rightArm.position.set(1.42, 0.22, 0.05);
  rightArm.rotation.z = 0.95;
  group.add(leftArm, rightArm);

  const handGeometry = new THREE.SphereGeometry(0.24, 18, 18);
  const leftHand = new THREE.Mesh(handGeometry, peachMaterial);
  const rightHand = new THREE.Mesh(handGeometry, peachMaterial);
  leftHand.position.set(-2.05, -0.58, 0.14);
  rightHand.position.set(2.02, 0.86, 0.18);
  group.add(leftHand, rightHand);

  const legGeometry = new THREE.CapsuleGeometry(0.2, 1.05, 6, 14);
  const leftLeg = new THREE.Mesh(legGeometry, creamMaterial);
  const rightLeg = new THREE.Mesh(legGeometry, creamMaterial);
  leftLeg.position.set(-0.5, -1.95, 0);
  rightLeg.position.set(0.5, -1.95, 0);
  group.add(leftLeg, rightLeg);

  const footGeometry = new THREE.SphereGeometry(0.32, 20, 20);
  const leftFoot = new THREE.Mesh(footGeometry, darkMaterial);
  const rightFoot = new THREE.Mesh(footGeometry, darkMaterial);
  leftFoot.scale.set(1.35, 0.6, 1.8);
  rightFoot.scale.set(1.35, 0.6, 1.8);
  leftFoot.position.set(-0.56, -2.78, 0.2);
  rightFoot.position.set(0.56, -2.78, 0.2);
  group.add(leftFoot, rightFoot);

  const chestRing = new THREE.Mesh(new THREE.TorusGeometry(0.46, 0.08, 18, 64), glowMaterial);
  chestRing.position.set(0, 0.1, 1.06);
  group.add(chestRing);

  const chestCore = new THREE.Mesh(new THREE.CircleGeometry(0.24, 32), glowMaterial);
  chestCore.position.set(0, 0.1, 1.13);
  group.add(chestCore);

  const floorShadow = new THREE.Mesh(new THREE.CircleGeometry(2.25, 40), shadowMaterial);
  floorShadow.rotation.x = -Math.PI / 2;
  floorShadow.position.y = -2.36;
  floorShadow.scale.set(1.15, 0.8, 1);
  group.add(floorShadow);

  group.rotation.y = -0.32;

  const resize = () => {
    const { clientWidth, clientHeight } = canvas;
    renderer.setSize(clientWidth, clientHeight, false);
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
  };

  resize();

  const clock = new THREE.Clock();
  let frameId = 0;

  const tick = () => {
    const elapsed = clock.getElapsedTime();

    if (!prefersReducedMotion) {
      group.position.y = Math.sin(elapsed * 1.8) * 0.08;
      group.rotation.y = -0.32 + Math.sin(elapsed * 0.9) * 0.18;
      antennaTop.scale.setScalar(1 + Math.sin(elapsed * 3.2) * 0.08);
      chestCore.material.emissiveIntensity = 1.1 + Math.sin(elapsed * 2.8) * 0.28;
      leftArm.rotation.z = -0.65 + Math.sin(elapsed * 1.3) * 0.05;
      rightArm.rotation.z = 0.95 + Math.cos(elapsed * 1.5) * 0.08;
    }

    renderer.render(scene, camera);
    frameId = window.requestAnimationFrame(tick);
  };

  tick();

  window.addEventListener('resize', resize);

  return () => {
    window.cancelAnimationFrame(frameId);
    window.removeEventListener('resize', resize);
    renderer.dispose();
    scene.traverse((object) => {
      if (object.isMesh) {
        object.geometry.dispose();
        if (Array.isArray(object.material)) {
          object.material.forEach((material) => material.dispose());
        } else {
          object.material.dispose();
        }
      }
    });
  };
};

export const RobotGuide = () => {
  const location = useLocation();
  const canvasRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);

  const guide = useMemo(() => {
    if (location.pathname.startsWith('/product/')) {
      return {
        label: 'Product Guide',
        title: 'Need a different view?',
        text: 'Go back to the shop to compare more items, or open the feature page to see the full experience.',
        actions: [
          { to: '/shop', label: 'Back to Shop', icon: FiShoppingBag },
          { to: '/feature', label: 'Feature Tour', icon: FiLayers },
        ],
      };
    }

    return guideMap[location.pathname] || guideMap['/'];
  }, [location.pathname]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const cleanup = createRobotScene(canvasRef.current, mediaQuery.matches);
    return cleanup;
  }, []);

  return (
    <aside className={`robot-guide ${isOpen ? 'is-open' : 'is-collapsed'}`} aria-label='Robot guide'>
      <button
        type='button'
        className='robot-guide__toggle'
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Minimize robot guide' : 'Open robot guide'}
      >
        <span>AI Guide</span>
        <FiArrowRight />
      </button>

      <div className='robot-guide__canvas-shell' aria-hidden='true'>
        <canvas ref={canvasRef} className='robot-guide__canvas' />
      </div>

      <div className='robot-guide__panel'>
        <span className='robot-guide__label'>{guide.label}</span>
        <h2>{guide.title}</h2>
        <p>{guide.text}</p>

        <div className='robot-guide__actions'>
          {guide.actions.map(({ to, label, icon: Icon }) => (
            <Link key={to} to={to} className='robot-guide__action'>
              <Icon />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default RobotGuide;
