'use client';

import type { GlobePoint, GlobeProps } from './Globe';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

import ThreeGlobe from 'three-globe';

interface PointPosition {
  x: number;
  y: number;
  z: number;
  scale: number;
  opacity: number;
  isInCenter: boolean;
}

interface OrbitConfig {
  tiltX: number;
  tiltZ: number;
  speed: number;
  radius: number;
  startAngle: number;
}

function generateArcs(points: GlobePoint[], randomArcCount = 6) {
  const arcs: {
    startLat: number;
    startLng: number;
    endLat: number;
    endLng: number;
    color: string;
  }[] = [];

  const colors = [
    'rgba(255, 107, 107, 0.4)',
    'rgba(78, 205, 196, 0.4)',
    'rgba(69, 183, 209, 0.4)',
    'rgba(150, 206, 180, 0.4)',
    'rgba(168, 85, 247, 0.4)',
    'rgba(59, 130, 246, 0.4)',
  ];

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      arcs.push({
        startLat: points[i].location[0],
        startLng: points[i].location[1],
        endLat: points[j].location[0],
        endLng: points[j].location[1],
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
  }

  for (let i = 0; i < randomArcCount; i++) {
    const startLat = Math.random() * 140 - 70;
    const startLng = Math.random() * 360 - 180;
    const endLat = Math.random() * 140 - 70;
    const endLng = Math.random() * 360 - 180;

    arcs.push({
      startLat,
      startLng,
      endLat,
      endLng,
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }

  return arcs;
}

export default function GlobeRenderer({ points = [], size = 600 }: GlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const globeRef = useRef<ThreeGlobe | null>(null);
  const orbitRingsRef = useRef<THREE.Line[]>([]);

  const [pointPositions, setPointPositions] = useState<PointPosition[]>([]);
  const [visiblePoints, setVisiblePoints] = useState<Set<number>>(
    () => new Set()
  );
  const visiblePointsRef = useRef<Set<number>>(new Set());

  const displayPoints = points;

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    for (let i = 0; i < displayPoints.length; i++) {
      // eslint-disable-next-line react-web-api/no-leaked-timeout -- Cleanup is handled below
      const timeout = setTimeout(() => {
        setVisiblePoints(prev => {
          const next = new Set(prev).add(i);
          visiblePointsRef.current = next;
          return next;
        });
      }, i * 800);

      timeouts.push(timeout);
    }

    return () => {
      for (const t of timeouts) {
        clearTimeout(t);
      }
    };
  }, [displayPoints]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 1, 1000);
    camera.position.z = 350;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.2);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const ORBIT_RADIUS = 115;
    const ORBIT_SPEED = 0.006;

    // Create custom purple-tinted material for the globe
    const globeMaterial = new THREE.MeshPhongMaterial({
      color: new THREE.Color(0.85, 0.45, 0.95), // Purple-magenta tint
      emissive: new THREE.Color(0x3a2559),
      emissiveIntensity: 0.25,
      shininess: 5,
    });

    const globe = new ThreeGlobe({ animateIn: true })
      .globeImageUrl(
        'https://unpkg.com/three-globe@2.45.0/example/img/earth-night.jpg'
      )
      .bumpImageUrl(
        'https://unpkg.com/three-globe@2.45.0/example/img/earth-topology.png'
      )
      .globeMaterial(globeMaterial)
      .showAtmosphere(true)
      .atmosphereColor('#8B5CF6')
      .atmosphereAltitude(0.15)
      .pointsData([])
      .arcsData(generateArcs(displayPoints))
      .arcColor('color')
      .arcDashLength(0.4)
      .arcDashGap(0.2)
      .arcDashAnimateTime(2000)
      .arcStroke(0.3)
      .arcAltitudeAutoScale(0.3);

    globeRef.current = globe;
    scene.add(globe);

    // Create 3 orbit configurations with different tilts - spread evenly, not overlapping
    const orbitConfigs: OrbitConfig[] = [
      {
        tiltX: 0.4,
        tiltZ: 0,
        speed: ORBIT_SPEED,
        radius: ORBIT_RADIUS,
        startAngle: 0,
      },
      {
        tiltX: -0.3,
        tiltZ: 0.5,
        speed: ORBIT_SPEED,
        radius: ORBIT_RADIUS,
        startAngle: Math.PI * 0.66,
      },
      {
        tiltX: -0.3,
        tiltZ: -0.5,
        speed: ORBIT_SPEED,
        radius: ORBIT_RADIUS,
        startAngle: Math.PI * 1.33,
      },
    ];

    // Create orbit ring geometries - start hidden
    const orbitRings: THREE.Line[] = [];
    orbitConfigs.forEach(config => {
      const orbitGeometry = new THREE.BufferGeometry();
      const orbitPoints: THREE.Vector3[] = [];
      const segments = 128;

      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        const x = Math.cos(angle) * config.radius;
        const y = 0;
        const z = Math.sin(angle) * config.radius;
        orbitPoints.push(new THREE.Vector3(x, y, z));
      }

      orbitGeometry.setFromPoints(orbitPoints);

      const orbitMaterial = new THREE.LineBasicMaterial({
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0,
      });

      const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);
      orbitLine.rotation.x = config.tiltX;
      orbitLine.rotation.z = config.tiltZ;
      scene.add(orbitLine);
      orbitRings.push(orbitLine);
    });
    orbitRingsRef.current = orbitRings;

    scene.rotation.x = 0;

    let orbitAngles = orbitConfigs.map(config => config.startAngle);

    const animate = () => {
      globe.rotation.y += 0.003;

      // Update orbit ring visibility based on visible points
      orbitRings.forEach((ring, index) => {
        const material = ring.material as THREE.LineBasicMaterial;
        const targetOpacity = visiblePointsRef.current.has(index) ? 0.3 : 0;
        material.opacity += (targetOpacity - material.opacity) * 0.05;
      });

      // Update orbit angles
      orbitAngles = orbitAngles.map(
        (angle, i) => angle + orbitConfigs[i].speed
      );

      const positions: PointPosition[] = displayPoints.map((_point, index) => {
        if (index >= orbitConfigs.length) {
          return { x: 0, y: 0, z: -1, scale: 0, opacity: 0, isInCenter: false };
        }

        const config = orbitConfigs[index];
        const angle = orbitAngles[index];

        // Calculate position on orbit circle
        const localPos = new THREE.Vector3(
          Math.cos(angle) * config.radius,
          0,
          Math.sin(angle) * config.radius
        );

        // Apply the same tilt rotation as the orbit ring
        const euler = new THREE.Euler(config.tiltX, 0, config.tiltZ);
        localPos.applyEuler(euler);

        const projected = localPos.clone().project(camera);
        const screenX = (projected.x * 0.5 + 0.5) * size;
        const screenY = (-projected.y * 0.5 + 0.5) * size;

        const normalizedZ = localPos.z / config.radius;
        let opacity = 1;
        if (normalizedZ > 0.3) {
          opacity = 1;
        } else if (normalizedZ > -0.3) {
          opacity = (normalizedZ + 0.3) / 0.6;
        } else {
          opacity = 0;
        }

        // Scale based on Z position - bigger when at front
        let scale = 0.7;
        if (normalizedZ > 0.5) {
          // At the front - scale up significantly
          const frontProgress = (normalizedZ - 0.5) / 0.5;
          scale = 1 + frontProgress * 0.5;
        } else if (normalizedZ > 0) {
          scale = 0.7 + normalizedZ * 0.6;
        } else {
          scale = 0.5 + (normalizedZ + 1) * 0.2;
        }
        scale = Math.max(0.4, scale);

        const isInCenter = normalizedZ > 0.7;

        return {
          x: screenX,
          y: screenY,
          z: normalizedZ,
          scale,
          opacity,
          isInCenter,
        };
      });

      // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect -- Animation loop requires setState on each frame
      setPointPositions(positions);

      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      // Clean up orbit rings
      orbitRings.forEach(ring => {
        scene.remove(ring);
        ring.geometry.dispose();
        (ring.material as THREE.Material).dispose();
      });
      if (rendererRef.current && container) {
        container.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, [size, displayPoints]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div ref={containerRef} className="absolute inset-0" />

      {displayPoints.map((point, index) => {
        const pos = pointPositions[index];
        if (!pos) return null;

        if (!visiblePoints.has(index)) return null;

        const showText = pos.isInCenter;

        return (
          <motion.div
            key={point.label}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              left: pos.x,
              top: pos.y,
              opacity: pos.opacity,
              zIndex: pos.z > 0 ? 10 : 5,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: pos.opacity,
              scale: pos.scale,
            }}
            transition={{
              opacity: { duration: 0.3 },
              scale: { duration: 0.3, ease: 'easeOut' },
            }}
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-black/10 backdrop-blur-sm flex items-center justify-center text-white">
                {point.icon}
              </div>
              {showText && (
                <motion.div
                  className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-sm text-white font-medium drop-shadow-lg">
                    {point.label}
                  </span>
                </motion.div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
