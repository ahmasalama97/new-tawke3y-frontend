import type { ReactNode } from 'react';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} />;

export type NavItem = {
  title: string;
  path: string;
  icon: ReactNode;
  info?: ReactNode;
  section?: string;
};

export const navData = [
  // Main Navigation
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: icon('ic-analytics'),
    section: 'main',
  },
  {
    title: 'Contracts',
    path: '/contracts',
    icon: icon('ic-analytics'),
    section: 'main',
  },
  {
    title: 'Signatured Contracts',
    path: '/signatured-contracts',
    icon: icon('ic-analytics'),
    section: 'main',
  },
  // Settings
  {
    title: 'Profile',
    path: '/profile',
    icon: icon('ic-user'),
    section: 'settings',
  },
  // About & Info
  {
    title: 'About',
    path: '/about',
    icon: icon('ic-analytics'),
    section: 'about',
  },
  {
    title: 'Privacy',
    path: '/privacy',
    icon: icon('ic-analytics'),
    section: 'about',
  },
  {
    title: 'Terms',
    path: '/terms',
    icon: icon('ic-analytics'),
    section: 'about',
  },
];
