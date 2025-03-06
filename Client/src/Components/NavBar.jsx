import { useState } from 'react';
import {
  IconCalendarStats,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconGauge,
  IconHome2,
  IconLogout,
  IconSettings,
  IconSwitchHorizontal,
  IconUser,
  IconArrowAutofitUp,
  IconArchive
} from '@tabler/icons-react';
import { Center, Stack, Tooltip, UnstyledButton } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

function NavbarLink({ icon: Icon, label, active, onClick, path }) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
       <NavLink to={path}>
      <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
       
        <Icon size={20} stroke={1.5} />
        
      </UnstyledButton>
      </NavLink>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, label: 'Home',path: '/' },
  { icon: IconArrowAutofitUp, label: 'Upload',path:'/upload' },
  { icon: IconDeviceDesktopAnalytics, label: 'Files',path: '/files' },
  { icon: IconArchive, label: 'Recieved',path: '/recieved' },
  { icon: IconUser, label: 'Account',path: '/profile' },
  { icon: IconSettings, label: 'Settings',path:'/setting' },
];

export default function NavbarMinimal() {
  const [active, setActive] = useState(2);

  const links = mockdata.map((link, index) => (
    <NavbarLink
      key={link.label}
      icon={link.icon}
      label={link.label}
      active={index === active}
      onClick={() => setActive(index)}
      path={link.path}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <Center>
        <MantineLogo type="mark" size={30} />
      </Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        <NavbarLink icon={IconSwitchHorizontal} label="Change account" />
        <NavbarLink icon={IconLogout} label="Logout" />
      </Stack>
    </nav>
  );
}
