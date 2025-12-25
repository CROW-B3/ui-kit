'use client';

export interface DashboardBackgroundProps {
  variant?: 'default' | 'minimal';
}

export function DashboardBackground({ variant = 'default' }: DashboardBackgroundProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Base background */}
      <div className="absolute inset-0 bg-[#030005]"></div>

      {/* Gradient overlay - right side */}
      <div className="absolute top-0 right-0 h-full w-[60vw] bg-gradient-to-l from-[#1e1035] via-[#0a0515] to-transparent opacity-60"></div>

      {/* Violet glow sphere */}
      <div className="absolute top-1/2 right-[-10%] -translate-y-1/2 w-[50vw] h-[50vw] bg-violet-900/20 rounded-full blur-[120px] mix-blend-screen"></div>

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBM9186nC0yZUNVUFQsJmJQknRzzd1AwL2I3qQuyt9v_TttYmsBObFae2tLBX02-ov1BYd6VcUw3Z6iiuB-b5QD-XrPY-_EOVG5eVTIPDNyFj4zZnUby6pJpUD8Yd1cV1qh1-Bz3kJ9jdffI4u-z-FYs5ExGr0v5Vjb2ORDUkKgMhxZduaD_ivZOQdfz9wmQD5WiW-mS98RHYrDsVS87PEOUqpfM1V_j_4cDoEI7MKJqvjs4zghP_QIMO3L6NVd7zST_F2DmWNPoHE')",
        }}
      ></div>

      {/* Radial fade vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,0,5,0.4)_100%)]"></div>
    </div>
  );
}
