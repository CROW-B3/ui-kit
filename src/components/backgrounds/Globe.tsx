'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef, useState } from 'react';
import { BiCctv } from 'react-icons/bi';
import { BsGlobe2 } from 'react-icons/bs';
import { HiOutlineShare } from 'react-icons/hi';

// Dynamically import react-globe.gl to avoid SSR issues
const GlobeGL = dynamic(() => import('react-globe.gl'), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

// Helper types
interface Vertex {
  x: number;
  y: number;
  z: number;
}

interface Edge {
  a: number;
  b: number;
}

// Helper functions - defined before use
const rotateY = (v: Vertex, angle: number): Vertex => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: v.x * cos - v.z * sin,
    y: v.y,
    z: v.x * sin + v.z * cos,
  };
};

const rotateX = (v: Vertex, angle: number): Vertex => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: v.x,
    y: v.y * cos - v.z * sin,
    z: v.y * sin + v.z * cos,
  };
};

const project = (
  v: Vertex,
  radius: number,
  size: number
): { x: number; y: number } => {
  return {
    x: size / 2 + v.x * radius,
    y: size / 2 - v.y * radius,
  };
};

// Generate icosphere vertices and edges for wireframe mesh
const generateIcosphere = (
  subdivisions: number = 2
): { vertices: Vertex[]; edges: Edge[] } => {
  const t = (1 + Math.sqrt(5)) / 2;

  let vertices: Vertex[] = [
    { x: -1, y: t, z: 0 },
    { x: 1, y: t, z: 0 },
    { x: -1, y: -t, z: 0 },
    { x: 1, y: -t, z: 0 },
    { x: 0, y: -1, z: t },
    { x: 0, y: 1, z: t },
    { x: 0, y: -1, z: -t },
    { x: 0, y: 1, z: -t },
    { x: t, y: 0, z: -1 },
    { x: t, y: 0, z: 1 },
    { x: -t, y: 0, z: -1 },
    { x: -t, y: 0, z: 1 },
  ];

  let faces = [
    [0, 11, 5],
    [0, 5, 1],
    [0, 1, 7],
    [0, 7, 10],
    [0, 10, 11],
    [1, 5, 9],
    [5, 11, 4],
    [11, 10, 2],
    [10, 7, 6],
    [7, 1, 8],
    [3, 9, 4],
    [3, 4, 2],
    [3, 2, 6],
    [3, 6, 8],
    [3, 8, 9],
    [4, 9, 5],
    [2, 4, 11],
    [6, 2, 10],
    [8, 6, 7],
    [9, 8, 1],
  ];

  const normalize = (v: Vertex): Vertex => {
    const len = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
    return { x: v.x / len, y: v.y / len, z: v.z / len };
  };

  const getMidpoint = (v1: Vertex, v2: Vertex): Vertex => {
    return normalize({
      x: (v1.x + v2.x) / 2,
      y: (v1.y + v2.y) / 2,
      z: (v1.z + v2.z) / 2,
    });
  };

  vertices = vertices.map(normalize);

  for (let i = 0; i < subdivisions; i++) {
    const newFaces: number[][] = [];

    faces.forEach(face => {
      const [a, b, c] = face;
      const va = vertices[a];
      const vb = vertices[b];
      const vc = vertices[c];

      const mab = getMidpoint(va, vb);
      const mbc = getMidpoint(vb, vc);
      const mca = getMidpoint(vc, va);

      const iab = vertices.length;
      vertices.push(mab);
      const ibc = vertices.length;
      vertices.push(mbc);
      const ica = vertices.length;
      vertices.push(mca);

      newFaces.push([a, iab, ica]);
      newFaces.push([b, ibc, iab]);
      newFaces.push([c, ica, ibc]);
      newFaces.push([iab, ibc, ica]);
    });

    faces = newFaces;
  }

  const edgeSet = new Set<string>();
  const edges: Edge[] = [];

  faces.forEach(face => {
    const [a, b, c] = face;
    const pairs = [
      [a, b],
      [b, c],
      [c, a],
    ];

    pairs.forEach(([i, j]) => {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!edgeSet.has(key)) {
        edgeSet.add(key);
        edges.push({ a: i, b: j });
      }
    });
  });

  return { vertices, edges };
};

// Component types
export interface GlobePoint {
  label: string;
  icon: React.ReactNode;
  location: [number, number]; // [latitude, longitude] in degrees
}

export interface GlobeProps {
  points?: GlobePoint[];
  size?: number;
}

interface PointData {
  lat: number;
  lng: number;
  label: string;
  icon: React.ReactNode;
  index: number;
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

export function Globe({ points, size = 600 }: GlobeProps) {
  const globeRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(
    () => new Set()
  );
  const sequenceRef = useRef(0);
  const lastPulseTime = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const displayPoints = points || defaultPoints;

  // Convert points to globe data format
  const pointsData: PointData[] = displayPoints.map((point, index) => ({
    lat: point.location[0],
    lng: point.location[1],
    label: point.label,
    icon: point.icon,
    index,
  }));

  // Sequential icon pulse animation
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      if (now - lastPulseTime.current > 2000) {
        // Pulse every 2 seconds
        setActiveIndex(sequenceRef.current);

        // Add to visible set
        setVisibleIndices(prev => {
          const next = new Set(prev);
          next.add(sequenceRef.current);
          return next;
        });

        // Reset active after animation
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          setActiveIndex(null);
        }, 500);

        sequenceRef.current = (sequenceRef.current + 1) % displayPoints.length;
        lastPulseTime.current = now;
      }
    }, 100);

    return () => {
      clearInterval(interval);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [displayPoints.length]);

  // Configure globe on mount
  useEffect(() => {
    if (globeRef.current) {
      // Set auto-rotation
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.5;
      globeRef.current.controls().enableZoom = false;

      // Set initial POV
      globeRef.current.pointOfView({ lat: 20, lng: 0, altitude: 2.5 });
    }
  }, []);

  // Custom HTML element for each point
  const htmlElement = useCallback(
    (d: object) => {
      const data = d as PointData;
      const isActive = activeIndex === data.index;
      const isVisible = visibleIndices.has(data.index);

      const container = document.createElement('div');
      container.className = 'globe-point-container';
      container.style.cssText = `
        display: flex;
        flex-direction: column;
        align-items: center;
        pointer-events: none;
        transform: translate(-50%, -50%);
        opacity: ${isVisible ? '1' : '0'};
        transition: opacity 0.5s ease-out, transform 0.3s ease-out;
        ${isActive ? 'transform: translate(-50%, -50%) scale(1.35);' : ''}
      `;

      // Icon circle
      const iconDiv = document.createElement('div');
      iconDiv.style.cssText = `
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.7);
        border: 2px solid rgba(255, 255, 255, 0.5);
        backdrop-filter: blur(4px);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      `;
      iconDiv.innerHTML = `<span style="font-size: 1.875rem; display: flex; align-items: center; justify-content: center;">●</span>`;
      container.appendChild(iconDiv);

      // Label
      const labelDiv = document.createElement('div');
      labelDiv.style.cssText = `
        margin-top: 8px;
        white-space: nowrap;
        font-size: 14px;
        color: white;
        font-weight: 500;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
      `;
      labelDiv.textContent = data.label;
      container.appendChild(labelDiv);

      return container;
    },
    [activeIndex, visibleIndices]
  );

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <GlobeGL
        ref={globeRef}
        width={size}
        height={size}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl=""
        showGlobe={false}
        showAtmosphere={false}
        htmlElementsData={pointsData}
        htmlElement={htmlElement}
        htmlAltitude={0.1}
      />

      {/* Wireframe globe overlay using custom Three.js mesh */}
      <WireframeGlobe size={size} globeRef={globeRef} />

      {/* React-rendered icons on top for better animation control */}
      <IconOverlay
        points={displayPoints}
        size={size}
        activeIndex={activeIndex}
        visibleIndices={visibleIndices}
        globeRef={globeRef}
      />
    </div>
  );
}

// Wireframe globe overlay component
function WireframeGlobe({
  size,
  globeRef,
}: {
  size: number;
  globeRef: React.RefObject<any>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { vertices, edges } = generateIcosphere(2);
    const radius = size * 0.35;
    let rotation = 0;

    const render = () => {
      ctx.clearRect(0, 0, size, size);

      // Get rotation from globe if available
      if (globeRef.current) {
        const pov = globeRef.current.pointOfView();
        if (pov) {
          rotation = (-pov.lng * Math.PI) / 180;
        }
      }

      // Rotate and project vertices
      const rotated = vertices.map(v => {
        let rv = rotateY(v, rotation);
        rv = rotateX(rv, 0.3);
        return rv;
      });

      // Draw edges
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;

      edges.forEach(edge => {
        const v1 = rotated[edge.a];
        const v2 = rotated[edge.b];

        if (v1.z > -0.3 || v2.z > -0.3) {
          const p1 = project(v1, radius, size);
          const p2 = project(v2, radius, size);

          const avgZ = (v1.z + v2.z) / 2;
          const alpha = Math.max(0, Math.min(1, (avgZ + 0.5) * 0.6));
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.4})`;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      });

      // Draw vertices as small dots
      rotated.forEach(v => {
        if (v.z > -0.3) {
          const p = project(v, radius, size);
          const alpha = Math.max(0, Math.min(1, (v.z + 0.5) * 0.8));
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.5})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [size, globeRef]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className="absolute inset-0 pointer-events-none"
      style={{ width: size, height: size }}
    />
  );
}

// Icon overlay component with React animations
function IconOverlay({
  points,
  size,
  activeIndex,
  visibleIndices,
  globeRef,
}: {
  points: GlobePoint[];
  size: number;
  activeIndex: number | null;
  visibleIndices: Set<number>;
  globeRef: React.RefObject<any>;
}) {
  const [positions, setPositions] = useState<
    { x: number; y: number; z: number; visible: boolean }[]
  >([]);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const updatePositions = () => {
      if (!globeRef.current) {
        animationRef.current = requestAnimationFrame(updatePositions);
        return;
      }

      const pov = globeRef.current.pointOfView();
      if (!pov) {
        animationRef.current = requestAnimationFrame(updatePositions);
        return;
      }

      const rotation = (-pov.lng * Math.PI) / 180;
      const radius = size * 0.35;

      const newPositions = points.map(point => {
        const lat = point.location[0];
        const lng = point.location[1];

        const latRad = (lat * Math.PI) / 180;
        const lngRad = (lng * Math.PI) / 180;

        let vertex = {
          x: Math.cos(latRad) * Math.sin(lngRad),
          y: Math.sin(latRad),
          z: Math.cos(latRad) * Math.cos(lngRad),
        };

        vertex = rotateY(vertex, rotation);
        vertex = rotateX(vertex, 0.3);

        const projected = project(vertex, radius, size);

        return {
          x: projected.x,
          y: projected.y,
          z: vertex.z,
          visible: vertex.z > -0.2,
        };
      });

      setPositions(newPositions);
      animationRef.current = requestAnimationFrame(updatePositions);
    };

    updatePositions();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [points, size, globeRef]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {points.map((point, index) => {
        const pos = positions[index];
        const isActive = activeIndex === index;
        const isVisible = visibleIndices.has(index);

        if (!pos || !isVisible) return null;

        return (
          <motion.div
            key={point.label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: pos.x,
              top: pos.y,
              zIndex: pos.z > 0 ? 10 : 5,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: pos.visible ? 1 : 0,
              scale: isActive ? 1.35 : 1,
            }}
            transition={{
              opacity: { duration: 0.3 },
              scale: { duration: 0.3, ease: 'easeOut' },
            }}
          >
            <div className="relative">
              {/* Icon circle */}
              <div className="w-16 h-16 rounded-full bg-black/70 border-2 border-white/50 backdrop-blur-sm flex items-center justify-center text-white shadow-lg">
                {point.icon}
              </div>

              {/* Label */}
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
