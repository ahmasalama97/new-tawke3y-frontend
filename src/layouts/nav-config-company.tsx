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
        title: 'My Contracts',
        path: '/my-contracts',
        icon: icon('ic-analytics'),
        section: 'main',
    },
    {
        title: 'Signatured Contracts',
        path: '/my-signatured-contracts',
        icon: icon('ic-analytics'),
        section: 'main',
    },
    {
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
