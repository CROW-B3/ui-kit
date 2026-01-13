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
    <div className="w-[117.43px] h-[60px] absolute left-6 top-[11.75px]">
      <img
        src={logoSrc}
        alt={`${title} Logo`}
        className="w-[58px] h-[60px] absolute left-0 top-0 object-contain"
      />
      <div className="absolute left-[58px] top-[14px] text-white text-lg font-bold font-[Sora,sans-serif] leading-[18px] tracking-[0.45px]">
        {title}
      </div>
      <div className="absolute left-[58px] top-9 text-gray-400 text-[9px] font-medium font-[Sora,sans-serif] uppercase leading-[13.5px] tracking-[0.9px]">
        {subtitle}
      </div>
    </div>
  );
}
