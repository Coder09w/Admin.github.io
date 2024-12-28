// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

const Navbar = () => {
  return (
    <Menu mode="horizontal">
      <Menu.Item key="1">
        <Link to="/">Product List</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/add">Add Product</Link>
      </Menu.Item>
        <Menu.Item key="4">
        <Link to="/delete">Delete Product</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;