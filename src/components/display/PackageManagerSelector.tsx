import { useState, type ReactNode } from 'react';
import { SiBun, SiNpm, SiPnpm, SiYarn } from 'react-icons/si';

export type PackageManager = 'bun' | 'npm' | 'pnpm' | 'yarn';

interface PackageManagerSelectorProps {
  defaultManager?: PackageManager;
  onChange?: (manager: PackageManager) => void;
}

const managers: {
  value: PackageManager;
  label: string;
  icon: ReactNode;
  color: string;
}[] = [
  { value: 'bun', label: 'Bun', icon: <SiBun />, color: 'text-[#fbf0df]' },
  { value: 'npm', label: 'npm', icon: <SiNpm />, color: 'text-[#cb3837]' },
  { value: 'pnpm', label: 'pnpm', icon: <SiPnpm />, color: 'text-[#f9ad00]' },
  { value: 'yarn', label: 'Yarn', icon: <SiYarn />, color: 'text-[#2c8ebb]' },
];

export function PackageManagerSelector({
  defaultManager = 'bun',
  onChange,
}: PackageManagerSelectorProps) {
  const [selected, setSelected] = useState<PackageManager>(defaultManager);

  const handleSelect = (manager: PackageManager) => {
    setSelected(manager);
    onChange?.(manager);
  };

  return (
    <div className="flex bg-white/5 rounded-full p-1 border border-white/5">
      {managers.map(manager => (
        <button
          key={manager.value}
          onClick={() => handleSelect(manager.value)}
          className={`px-3 py-1 text-xs font-medium transition-colors rounded-full flex items-center gap-1.5 ${
            selected === manager.value
              ? 'text-white bg-white/10 shadow-sm'
              : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          <span className={selected === manager.value ? manager.color : ''}>
            {manager.icon}
          </span>
          {manager.label}
        </button>
      ))}
    </div>
  );
}
