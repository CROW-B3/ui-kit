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

function generatePointsData(points: GlobePoint[]) {
  return points.map(p => ({
    lat: p.location[0],
    lng: p.location[1],
    size: 0.5,
    color: '#ffffff',
  }));
}

export default function GlobeRenderer({ points = [], size = 600 }: GlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const globeRef = useRef<ThreeGlobe | null>(null);

  const [pointPositions, setPointPositions] = useState<PointPosition[]>([]);
  const [visiblePoints, setVisiblePoints] = useState<Set<number>>(
    () => new Set()
  );

  const displayPoints = points;

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    for (let i = 0; i < displayPoints.length; i++) {
      // eslint-disable-next-line react-web-api/no-leaked-timeout -- Cleanup is handled below
      const timeout = setTimeout(() => {
        setVisiblePoints(prev => new Set(prev).add(i));
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

    const GLOBE_RADIUS = 100;

    const globe = new ThreeGlobe({ animateIn: true })
      .globeImageUrl(
        'https://unpkg.com/three-globe@2.45.0/example/img/earth-night.jpg'
      )
      .bumpImageUrl(
        'https://unpkg.com/three-globe@2.45.0/example/img/earth-topology.png'
      )
      .showAtmosphere(true)
      .atmosphereColor('#3a82f7')
      .atmosphereAltitude(0.15)
      .pointsData(generatePointsData(displayPoints))
      .pointAltitude(0.01)
      .pointColor('color')
      .pointRadius('size')
      .arcsData(generateArcs(displayPoints))
      .arcColor('color')
      .arcDashLength(0.4)
      .arcDashGap(0.2)
      .arcDashAnimateTime(2000)
      .arcStroke(0.3)
      .arcAltitudeAutoScale(0.3);

    globeRef.current = globe;
    scene.add(globe);

    scene.rotation.x = 0;

    const animate = () => {
      globe.rotation.y += 0.003;

      const positions: PointPosition[] = displayPoints.map((point, _index) => {
        const [lat, lng] = point.location;

        const phi = ((90 - lat) * Math.PI) / 180;
        const theta = ((lng + 180) * Math.PI) / 180;

        const pos = new THREE.Vector3(
          -GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta),
          GLOBE_RADIUS * Math.cos(phi),
          GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta)
        );

        pos.applyAxisAngle(new THREE.Vector3(0, 1, 0), globe.rotation.y);

        const projected = pos.clone().project(camera);
        const screenX = (projected.x * 0.5 + 0.5) * size;
        const screenY = (-projected.y * 0.5 + 0.5) * size;

        const normalizedZ = pos.z / GLOBE_RADIUS;
        let opacity = 1;
        if (normalizedZ > 0.3) {
          opacity = 1;
        } else if (normalizedZ > -0.3) {
          opacity = (normalizedZ + 0.3) / 0.6;
        } else {
          opacity = 0;
        }

        let scale =
          normalizedZ > 0 ? 1 + normalizedZ * 0.3 : 0.7 + normalizedZ * 0.3;
        scale = Math.max(0.5, scale);

        const centerX = size / 2;
        const centerY = size / 2;
        const distanceFromCenter = Math.sqrt(
          (screenX - centerX) ** 2 + (screenY - centerY) ** 2
        );
        const centerThreshold = 80;
        const isInCenter =
          distanceFromCenter < centerThreshold && normalizedZ > 0;

        if (isInCenter) {
          const centerProgress = 1 - distanceFromCenter / centerThreshold;
          scale *= 1 + centerProgress * 0.3;
        }

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
              <div className="w-16 h-16 rounded-full bg-black/70 border-2 border-white/50 backdrop-blur-sm flex items-center justify-center text-white shadow-lg">
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
