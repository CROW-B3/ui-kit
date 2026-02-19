'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { BiCctv } from 'react-icons/bi';
import { BsGlobe2 } from 'react-icons/bs';
import { HiOutlineShare } from 'react-icons/hi';
import * as THREE from 'three';
import ThreeGlobe from 'three-globe';

export interface GlobePoint {
  label: string;
  icon: React.ReactNode;
  location: [number, number];
}

export interface GlobeProps {
  points?: GlobePoint[];
  size?: number;
}

interface PointPosition {
  x: number;
  y: number;
  z: number;
  scale: number;
  opacity: number;
}

const defaultPoints: GlobePoint[] = [
  {
    label: 'Internet',
    icon: <BsGlobe2 className="text-3xl" />,
    location: [20, 0],
  },
  { label: 'CCTV', icon: <BiCctv className="text-3xl" />, location: [0, -60] },
  {
    label: 'Social Media',
    icon: <HiOutlineShare className="text-3xl" />,
    location: [-10, 50],
  },
];

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

export function Globe({ points, size = 600 }: GlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const globeRef = useRef<ThreeGlobe | null>(null);

  const [pointPositions, setPointPositions] = useState<PointPosition[]>([]);
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(
    () => new Set()
  );

  const revealIndexRef = useRef(0);
  const lastRevealTime = useRef(Date.now() - 2000);
  const scaleIndexRef = useRef(0);
  const scalingRef = useRef(false);
  const scaleStartTimeRef = useRef(0);

  const displayPoints = points || defaultPoints;

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

    scene.rotation.x = 0.2;

    const animate = () => {
      const now = Date.now();

      globe.rotation.y += 0.002;

      if (
        revealIndexRef.current < displayPoints.length &&
        now - lastRevealTime.current > 2000
      ) {
        setVisibleIndices(prev => {
          const next = new Set(prev);
          next.add(revealIndexRef.current);
          return next;
        });
        revealIndexRef.current++;
        lastRevealTime.current = now;
      }

      const positions: PointPosition[] = displayPoints.map((point, index) => {
        const [lat, lng] = point.location;

        const phi = ((90 - lat) * Math.PI) / 180;
        const theta = ((lng + 180) * Math.PI) / 180;

        const pos = new THREE.Vector3(
          -GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta),
          GLOBE_RADIUS * Math.cos(phi),
          GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta)
        );

        pos.applyAxisAngle(new THREE.Vector3(0, 1, 0), globe.rotation.y);
        pos.applyAxisAngle(new THREE.Vector3(1, 0, 0), 0.2);

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

        if (index === scaleIndexRef.current) {
          if (normalizedZ > 0.4 && !scalingRef.current) {
            scalingRef.current = true;
            scaleStartTimeRef.current = now;
          }

          if (scalingRef.current) {
            const elapsed = now - scaleStartTimeRef.current;
            const duration = 500;

            if (elapsed < duration) {
              const progress = elapsed / duration;
              const pulse = Math.sin(progress * Math.PI);
              scale *= 1 + pulse * 0.35;
            } else {
              scalingRef.current = false;
              scaleIndexRef.current =
                (scaleIndexRef.current + 1) % displayPoints.length;
            }
          }
        }

        return {
          x: screenX,
          y: screenY,
          z: normalizedZ,
          scale,
          opacity,
        };
      });

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
        const isVisible = visibleIndices.has(index);
        if (!pos || !isVisible) return null;

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
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="text-sm text-white font-medium drop-shadow-lg">
                  {point.label}
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
