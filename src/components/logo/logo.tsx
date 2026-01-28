import type { LinkProps } from '@mui/material/Link';

import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';

import { mergeClasses } from 'minimal-shared/utils';
import { RouterLink } from 'src/routes/components';

import { logoClasses } from './classes';

// ----------------------------------------------------------------------

export type LogoProps = LinkProps & {
  isSingle?: boolean;
  disabled?: boolean;
};

export function Logo({
  sx,
  disabled,
  className,
  href = '/',
  isSingle = true,
  ...other
}: LogoProps) {
  const logoImage = (
    <img
      src="/AppIcon.png"
      alt="logo"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        display: 'block',
      }}
    />
  );

  return (
    <LogoRoot
      component={RouterLink}
      href={href}
      aria-label="Logo"
      underline="none"
      className={mergeClasses([logoClasses.root, className])}
      sx={[
        {
          // 🔥 GLOBAL LOGO SIZE (all usages)
          width: {
            xs: isSingle ? 56 : 140,
            sm: isSingle ? 64 : 160,
            md: isSingle ? 80 : 200,
          },
          height: {
            xs: isSingle ? 56 : 48,
            sm: isSingle ? 64 : 56,
            md: isSingle ? 80 : 64,
          },

          ...(disabled && {
            pointerEvents: 'none',
            opacity: 0.6,
          }),
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {logoImage}
    </LogoRoot>
  );
}

// ----------------------------------------------------------------------

const LogoRoot = styled(Link)(() => ({
  flexShrink: 0,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'middle',
  color: 'transparent',
}));
