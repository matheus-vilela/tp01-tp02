import React from 'react';
import { IconType } from 'react-icons';
import { FaChartLine, FaHome, FaSignInAlt, FaSignOutAlt, FaSyringe, FaUsers } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';

import { Container, HeaderOption } from './styles';

export type IHeaderOption = {
  label: string;
  path: string;
  icon?: IconType;
};

const Header: React.FC = () => {
  const { pathname } = useLocation();
  const auth = useAuth();

  const data = [
    {
      label: 'dashboard',
      path: '/',
      icon: FaChartLine,
    },
    {
      label: 'unidades',
      path: '/unidade',
      icon: FaHome,
    },
    {
      label: 'pessoas',
      path: '/pessoa',
      icon: FaUsers,
    },
    {
      label: 'doações',
      path: '/doacao',
      icon: FaSyringe,
    },
  ];

  return (
    <Container>
      {data.map((item) => {
        const Icon = item.icon || FaSignInAlt;
        return (
          <HeaderOption key={item.label} to={item.path} active={pathname === item.path}>
            <Icon size={16} />
            <h1>{item.label}</h1>
          </HeaderOption>
        );
      })}
      <HeaderOption
        onClick={() => auth.setUser(null)}
        to={'/'}
        active={false}
        style={{ position: 'absolute', right: 20 }}
      >
        <FaSignOutAlt size={16} />
        <h1>sair</h1>
      </HeaderOption>
    </Container>
  );
};

export default Header;
