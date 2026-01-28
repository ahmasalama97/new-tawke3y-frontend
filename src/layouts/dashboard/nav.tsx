import type { ReactNode } from 'react';
import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { useEffect } from 'react';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import { useTheme } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import Drawer, { drawerClasses } from '@mui/material/Drawer';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { Logo } from 'src/components/logo';
import { Scrollbar } from 'src/components/scrollbar';

import type { NavItem } from '../nav-config-dashboard';

// ----------------------------------------------------------------------

export type NavContentProps = {
  data: NavItem[];
  slots?: {
    topArea?: ReactNode;
    bottomArea?: ReactNode;
  };
  sx?: SxProps<Theme>;
};

export function NavDesktop({
  sx,
  data,
  slots,
  layoutQuery,
}: NavContentProps & { layoutQuery: Breakpoint }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        pt: 2.5,
        px: 2.5,
        top: 0,
        left: 0,
        height: 1,
        display: 'none',
        position: 'fixed',
        flexDirection: 'column',
        zIndex: 'var(--layout-nav-zIndex)',
        width: 'var(--layout-nav-vertical-width)',
        borderRight: `1px solid ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)}`,
        [theme.breakpoints.up(layoutQuery)]: {
          display: 'flex',
        },
        ...sx,
      }}
    >
      <NavContent data={data} slots={slots} />
    </Box>
  );
}

// ----------------------------------------------------------------------

export function NavMobile({
  sx,
  data,
  open,
  slots,
  onClose,
}: NavContentProps & { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          pt: 2.5,
          px: 2.5,
          overflow: 'unset',
          width: 'var(--layout-nav-mobile-width)',
          ...sx,
        },
      }}
    >
      <NavContent data={data} slots={slots} />
    </Drawer>
  );
}

// ----------------------------------------------------------------------

export function NavContent({ data, slots, sx }: NavContentProps) {
  const pathname = usePathname();

  // Group items by section
  const groupedData = data.reduce(
    (acc, item) => {
      const section = item.section || 'main';
      if (!acc[section]) {
        acc[section] = [];
      }
      acc[section].push(item);
      return acc;
    },
    {} as Record<string, typeof data>
  );

  const sectionOrder = ['main', 'settings', 'about'];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
        <Logo />
      </div>
      {slots?.topArea}

      <Scrollbar fillContent>
        <Box
          component="nav"
          sx={[
            {
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column',
            },
            ...(Array.isArray(sx) ? sx : [sx]),
          ]}
        >
          <Box
            component="ul"
            sx={{
              gap: 0.5,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {sectionOrder.map((section, sectionIndex) => (
              <Box key={section}>
                {groupedData[section]?.map((item) => {
                  const isActived = item.path === pathname;

                  return (
                    <ListItem disableGutters disablePadding key={item.title}>
                      <ListItemButton
                        disableGutters
                        component={RouterLink}
                        href={item.path}
                        sx={[
                          (theme: Theme) => ({
                            pl: 2,
                            py: 1,
                            gap: 2,
                            pr: 1.5,
                            borderRadius: 0.75,
                            typography: 'body2',
                            fontWeight: 'fontWeightMedium',
                            color: theme.vars.palette.text.secondary,
                            minHeight: 44,
                            ...(isActived && {
                              fontWeight: 'fontWeightSemiBold',
                              color: theme.vars.palette.primary.main,
                              bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.08),
                              '&:hover': {
                                bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.16),
                              },
                            }),
                          }),
                        ]}
                      >
                        <Box component="span" sx={{ width: 24, height: 24 }}>
                          {item.icon}
                        </Box>

                        <Box component="span" sx={{ flexGrow: 1 }}>
                          {item.title}
                        </Box>

                        {item.info && item.info}
                      </ListItemButton>
                    </ListItem>
                  );
                })}
                {sectionIndex < sectionOrder.length - 1 && groupedData[section] && (
                  <Divider sx={{ my: 1 }} />
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </Scrollbar>

      {slots?.bottomArea}
    </>
  );
}
