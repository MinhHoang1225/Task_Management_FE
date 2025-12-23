import {
  MenuOutlined,
  UserOutlined,
  ReadOutlined,
  FileTextOutlined,
  TeamOutlined,
  LogoutOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Drawer, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';

import { DefaultAvatar } from '@app/assets';
import { useLogout } from '@app/core/hooks';
import { useAppSelector } from '@app/core/Redux/hooks';
import type { RootState } from '@app/core/Redux/store';
import { ROUTES } from '@app/core/types/constants';
import type { UserRole } from '@app/core/types/constants';

type NavItem = {
  label: string;

  path: string;

  icon: React.ReactNode;

  roles?: UserRole[];
};

const btnLoginClass =
  'flex items-center justify-center px-5 py-2.5 rounded-lg border border-[var(--secondary-blue)] text-[var(--secondary-blue)] hover:bg-[var(--secondary-blue)] hover:text-[var(--bg-main)] transition-all duration-300 font-semibold text-sm';

const btnRegisterClass =
  'flex items-center justify-center px-5 py-2.5 rounded-lg bg-[var(--primary-orange)] text-white hover:bg-[var(--primary-orange-hover)] transition-all duration-300 font-bold text-sm shadow-lg shadow-orange-500/20';

const baseLinkClass = 'px-4 py-2 rounded-lg transition-all duration-300 font-medium';
const activeClass = 'text-[var(--primary-orange)] shadow-[0_0_12px_rgba(249,115,22,0.4)]';
const inactiveClass =
  'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-soft)]';

const Navbar = () => {
  const { isAuth } = useAppSelector((state) => state.auth);
  const { user } = useSelector((state: RootState) => state.auth);
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const { handleLogout } = useLogout();

  const role = user?.role;

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: <Link to='/profile'>Trang cá nhân</Link>,
      icon: <UserOutlined />,
    },
    { type: 'divider' },
    {
      key: 'logout',
      label: 'Đăng xuất',
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  const navItems: NavItem[] = [
    { label: 'Bài viết', path: ROUTES.HOME, icon: <ReadOutlined /> },
    {
      label: 'Quản lý Post',
      path: ROUTES.POST_MANAGEMENT,
      icon: <FileTextOutlined />,
      roles: ['user', 'admin'],
    },
    {
      label: 'Quản lý User',
      path: ROUTES.ADMIN_DASHBOARD,
      icon: <TeamOutlined />,
      roles: ['admin'],
    },
  ];

  const renderLinks = (isMobile = false) => (
    <div className={isMobile ? 'flex flex-col gap-2' : 'flex items-center gap-2'}>
      {navItems.map((item) => {
        if (item.roles && (!isAuth || !item.roles.includes(role!))) return null;
        const isActive =
          item.path === ROUTES.HOME ? pathname === ROUTES.HOME : pathname.startsWith(item.path);
        return (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setOpen(false)}
            className={`${isMobile ? 'flex items-center gap-3 px-4 py-3' : baseLinkClass} ${isActive ? activeClass : inactiveClass}`}
          >
            <span className='flex items-center gap-2 whitespace-nowrap'>
              <span className='text-base'>{item.icon}</span>
              <span>{item.label}</span>
            </span>
          </NavLink>
        );
      })}
    </div>
  );

  return (
    <header className='sticky top-0 z-50 backdrop-blur-xl bg-[var(--glass-effect)] border-b border-[var(--border-light)] shadow-[var(--shadow-3d)]'>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='flex h-16 items-center justify-between'>
          {/* Left: Logo */}
          <div className='flex-1'>
            <NavLink
              to='/'
              className='text-xl font-bold tracking-wider text-[var(--text-primary)] hover:text-[var(--primary-orange)] transition-all'
            >
              DevBlog
            </NavLink>
          </div>

          {/* Center: Desktop menu */}
          <div className='hidden md:flex flex-[2] justify-center'>{renderLinks()}</div>

          {/* Right: Auth / Avatar (Desktop) */}
          <div className='hidden md:flex flex-1 justify-end items-center gap-3'>
            {!isAuth ? (
              <>
                <Link to={ROUTES.LOGIN} className={btnLoginClass}>
                  Đăng nhập
                </Link>
                <Link to={ROUTES.REGISTER} className={btnRegisterClass}>
                  Đăng ký
                </Link>
              </>
            ) : (
              <Dropdown menu={{ items: userMenuItems }} trigger={['click']} placement='bottomRight'>
                <div className='flex items-center gap-3 cursor-pointer p-1 pr-3 rounded-full hover:bg-[var(--bg-soft)] transition-all border border-[var(--border-light)]'>
                  <Avatar src={DefaultAvatar} className='border border-[var(--primary-orange)]' />
                  <div className='flex flex-col items-start leading-tight'>
                    <span className='text-sm font-semibold text-[var(--text-primary)]'>
                      {user?.fullName}
                    </span>
                    <span className='text-[10px] text-[var(--text-secondary)] uppercase'>
                      {role}
                    </span>
                  </div>
                  <DownOutlined className='text-[10px] text-[var(--text-secondary)]' />
                </div>
              </Dropdown>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className='md:hidden flex items-center'>
            <Button
              type='text'
              icon={<MenuOutlined className='text-xl text-[var(--text-primary)]' />}
              onClick={() => setOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        open={open}
        placement='right'
        onClose={() => setOpen(false)}
        width={300}
        closeIcon={<span className='text-[var(--text-primary)]'>×</span>}
        styles={{
          body: { background: 'var(--bg-main)', padding: '24px 16px' },
          header: {
            background: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border-light)',
            color: 'var(--text-primary)',
          },
        }}
      >
        <div className='flex flex-col h-full'>
          <div className='flex-1'>{renderLinks(true)}</div>

          {/* Bottom Auth Section (Mobile) */}
          <div className='mt-auto pt-8 border-t border-[var(--border-light)] flex flex-col gap-3'>
            {!isAuth ? (
              <>
                {/* Sử dụng đúng class như Desktop */}
                <Link to={ROUTES.LOGIN} onClick={() => setOpen(false)} className={btnLoginClass}>
                  Đăng nhập
                </Link>
                <Link
                  to={ROUTES.REGISTER}
                  onClick={() => setOpen(false)}
                  className={btnRegisterClass}
                >
                  Đăng ký
                </Link>
              </>
            ) : (
              <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-3 p-4 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-light)]'>
                  <Avatar
                    src={DefaultAvatar}
                    size='large'
                    className='border border-[var(--primary-orange)]'
                  />
                  <div className='flex flex-col overflow-hidden'>
                    <span className='font-bold text-[var(--text-primary)] truncate'>
                      {user?.fullName}
                    </span>
                    <span className='text-xs text-[var(--text-secondary)] truncate'>
                      {user?.email}
                    </span>
                  </div>
                </div>
                <Button
                  danger
                  block
                  icon={<LogoutOutlined />}
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className='h-12 rounded-xl font-bold flex items-center justify-center border-red-500/50'
                >
                  Đăng xuất
                </Button>
              </div>
            )}
          </div>
        </div>
      </Drawer>
    </header>
  );
};

export default Navbar;
