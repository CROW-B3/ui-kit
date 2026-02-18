'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { BiCctv } from 'react-icons/bi';
import { BsGlobe2 } from 'react-icons/bs';
import { HiOutlineShare } from 'react-icons/hi';

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

// Helper functions
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

interface PointPosition {
  x: number;
  y: number;
  z: number;
  scale: number;
  opacity: number;
}

// Convert lat/long to 3D position
const calculatePointPosition = (
  lat: number,
  long: number,
  rotation: number,
  size: number
): PointPosition => {
  const latRad = (lat * Math.PI) / 180;
  const longRad = (long * Math.PI) / 180;

  let vertex: Vertex = {
    x: Math.cos(latRad) * Math.sin(longRad),
    y: Math.sin(latRad),
    z: Math.cos(latRad) * Math.cos(longRad),
  };

  vertex = rotateY(vertex, rotation);
  vertex = rotateX(vertex, 0.3);

  const projected = project(vertex, size * 0.4, size);
  const baseScale = vertex.z > 0 ? 1 + vertex.z * 0.3 : 0.7 + vertex.z * 0.3;

  // Smooth fade transition
  let opacity = 1;
  if (vertex.z > 0.3) {
    opacity = 1;
  } else if (vertex.z > -0.3) {
    opacity = (vertex.z + 0.3) / 0.6;
  } else {
    opacity = 0;
  }

  return {
    x: projected.x,
    y: projected.y,
    z: vertex.z,
    scale: Math.max(0.5, baseScale),
    opacity,
  };
};

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pointPositions, setPointPositions] = useState<PointPosition[]>([]);
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(
    () => new Set()
  );
  const rotationRef = useRef(-0.2);
  const scaleIndexRef = useRef(0);
  const scalingRef = useRef(false);
  const scaleStartTimeRef = useRef(0);
  const animationRef = useRef<number | undefined>(undefined);
  const revealIndexRef = useRef(0);
  const lastRevealTime = useRef(0);

  const displayPoints = points || defaultPoints;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { vertices, edges } = generateIcosphere(2);
    const radius = size * 0.4;

    const render = () => {
      ctx.clearRect(0, 0, size, size);

      // Rotate and project vertices
      const rotated = vertices.map(v => {
        let rv = rotateY(v, rotationRef.current);
        rv = rotateX(rv, 0.3);
        return rv;
      });

      // Draw edges
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1.5;

      edges.forEach(edge => {
        const v1 = rotated[edge.a];
        const v2 = rotated[edge.b];

        if (v1.z > -0.5 || v2.z > -0.5) {
          const p1 = project(v1, radius, size);
          const p2 = project(v2, radius, size);

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      });

      // Draw vertices as small dots
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      rotated.forEach(v => {
        if (v.z > -0.5) {
          const p = project(v, radius, size);
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Sequential reveal of icons (one by one)
      const now = Date.now();
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

      // Update point positions
      const positions = displayPoints.map(point =>
        calculatePointPosition(
          point.location[0],
          point.location[1],
          rotationRef.current,
          size
        )
      );

      // Sequential scaling - brief pulse when icon reaches front
      const currentPos = positions[scaleIndexRef.current];

      if (currentPos && currentPos.z > 0.4 && !scalingRef.current) {
        scalingRef.current = true;
        scaleStartTimeRef.current = now;
      }

      if (scalingRef.current) {
        const elapsed = now - scaleStartTimeRef.current;
        const scaleDuration = 500;

        if (elapsed < scaleDuration && currentPos) {
          const progress = elapsed / scaleDuration;
          const pulseAmount = Math.sin(progress * Math.PI);
          currentPos.scale *= 1 + pulseAmount * 0.35;
        } else {
          scalingRef.current = false;
          scaleIndexRef.current =
            (scaleIndexRef.current + 1) % displayPoints.length;
        }
      }

      setPointPositions(positions);
      rotationRef.current += 0.003;
      animationRef.current = requestAnimationFrame(render);
    };

    // Start first reveal immediately
    lastRevealTime.current = Date.now() - 2000;
    render();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [size, displayPoints]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* 3D Wireframe Globe Canvas */}
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        style={{
          width: size,
          height: size,
          maxWidth: '100%',
          aspectRatio: '1',
        }}
      />

      {/* Data points - synchronized with globe rotation */}
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
