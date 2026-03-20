import type { Meta, StoryObj } from '@storybook/react';
import { BiCctv } from 'react-icons/bi';
import { BsGlobe2 } from 'react-icons/bs';
import { FaCloud, FaDatabase } from 'react-icons/fa';
import { HiOutlineShare } from 'react-icons/hi';
import { MdSecurity } from 'react-icons/md';

import { Globe } from './Globe';

const defaultPoints = [
  {
    label: 'Web',
    icon: <BsGlobe2 className="text-3xl" />,
    location: [0, -90] as [number, number],
  },
  {
    label: 'CCTV',
    icon: <BiCctv className="text-3xl" />,
    location: [0, 30] as [number, number],
  },
  {
    label: 'Social Media',
    icon: <HiOutlineShare className="text-3xl" />,
    location: [0, 150] as [number, number],
  },
];

const meta: Meta<typeof Globe> = {
  title: 'Backgrounds/Globe',
  component: Globe,
  parameters: {
    docs: {
      description: {
        component: `
An interactive 3D globe component that displays labeled points with icons at specified geographic coordinates.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { Globe } from '@aspect/ui-kit';
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  args: {
    points: defaultPoints,
  },
};

export default meta;
type Story = StoryObj<typeof Globe>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Default globe with preset Internet, CCTV, and Social Media points.',
      },
    },
  },
};

export const CustomSize: Story = {
  args: {
    size: 400,
  },
  parameters: {
    docs: {
      description: {
        story: 'A smaller 400px globe.',
      },
    },
  },
};

export const LargeGlobe: Story = {
  args: {
    size: 800,
  },
  parameters: {
    docs: {
      description: {
        story: 'A larger 800px globe for prominent displays.',
      },
    },
  },
};

export const CustomPoints: Story = {
  args: {
    points: [
      {
        label: 'Security',
        icon: <MdSecurity className="text-3xl" />,
        location: [40, -74] as [number, number],
      },
      {
        label: 'Database',
        icon: <FaDatabase className="text-3xl" />,
        location: [51, 0] as [number, number],
      },
      {
        label: 'Cloud',
        icon: <FaCloud className="text-3xl" />,
        location: [35, 139] as [number, number],
      },
      {
        label: 'Internet',
        icon: <BsGlobe2 className="text-3xl" />,
        location: [-33, 151] as [number, number],
      },
      {
        label: 'CCTV',
        icon: <BiCctv className="text-3xl" />,
        location: [1, 103] as [number, number],
      },
      {
        label: 'Social',
        icon: <HiOutlineShare className="text-3xl" />,
        location: [55, 37] as [number, number],
      },
    ],
    size: 600,
  },
  parameters: {
    docs: {
      description: {
        story: 'Globe with custom points at real-world city coordinates.',
      },
    },
  },
};
