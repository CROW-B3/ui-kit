import type { Meta, StoryObj } from '@storybook/react';
import { BiCctv } from 'react-icons/bi';
import { BsGlobe2 } from 'react-icons/bs';
import { FaCloud, FaDatabase } from 'react-icons/fa';
import { HiOutlineShare } from 'react-icons/hi';
import { MdSecurity } from 'react-icons/md';

import { Globe } from './Globe';

const defaultPoints = [
  {
    label: 'Internet',
    icon: <BsGlobe2 className="text-3xl" />,
    location: [20, 0] as [number, number],
  },
  {
    label: 'CCTV',
    icon: <BiCctv className="text-3xl" />,
    location: [0, -60] as [number, number],
  },
  {
    label: 'Social Media',
    icon: <HiOutlineShare className="text-3xl" />,
    location: [-10, 50] as [number, number],
  },
];

const meta: Meta<typeof Globe> = {
  title: 'Backgrounds/Globe',
  component: Globe,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#0a0a0a' }],
    },
  },
  tags: ['autodocs'],
  args: {
    points: defaultPoints,
  },
};

export default meta;
type Story = StoryObj<typeof Globe>;

export const Default: Story = {};

export const CustomSize: Story = {
  args: {
    size: 400,
  },
};

export const LargeGlobe: Story = {
  args: {
    size: 800,
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
};
