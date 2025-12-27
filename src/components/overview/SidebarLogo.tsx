'use client';

export interface SidebarLogoProps {
  logoSrc: string;
  title?: string;
  subtitle?: string;
}

export function SidebarLogo({
  logoSrc,
  title = 'CROW',
  subtitle = 'CLIENT',
}: SidebarLogoProps) {
  return (
    <div
      style={{
        width: 117.43,
        height: 60,
        left: 24,
        top: 11.75,
        position: 'absolute',
      }}
    >
      <img
        src={logoSrc}
        alt={`${title} Logo`}
        style={{
          width: 58,
          height: 60,
          left: 0,
          top: 0,
          position: 'absolute',
          objectFit: 'contain',
        }}
      />
      <div
        style={{
          left: 58,
          top: 14,
          position: 'absolute',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          color: 'white',
          fontSize: 18,
          fontFamily: 'Sora, sans-serif',
          fontWeight: 700,
          lineHeight: '18px',
          letterSpacing: 0.45,
        }}
      >
        {title}
      </div>
      <div
        style={{
          left: 58,
          top: 36,
          position: 'absolute',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          color: '#9CA3AF',
          fontSize: 9,
          fontFamily: 'Sora, sans-serif',
          fontWeight: 500,
          textTransform: 'uppercase',
          lineHeight: '13.5px',
          letterSpacing: 0.90,
        }}
      >
        {subtitle}
      </div>
    </div>
  );
}
