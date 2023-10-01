import React from 'react';

import './Header.scss';
import logo from './logo.svg';

function Header() {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="" />
    </header>
  );
}

export default Header;
