import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  FireOutlined,
} from '@ant-design/icons';
import React, { useState} from 'react';
import Anime from '../Anime/Anime';
import { Route, Switch, Link} from 'react-router-dom';
import Login from '../../pages/Login';
import Signup from '../../pages/Signup';
import Profile from '../../pages/Profile'
import Auth from "../../utils/auth";

const { Header, Sider, Content } = Layout;


function SiderDemo() {

    const [collapsed, setCollapsed] = useState(false);
    
    function toggle() {
        setCollapsed(!collapsed);
    }
    
    function login() {
      if (Auth.loggedIn()) {
        return (
          <Link to="/Anime" onClick={() => Auth.logout()}>
            Logout
          </Link>
        );
      } else {
        return (
          <Link to="/login">
            Login
          </Link>
        );
      }
    };

    return (
        <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}> 
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<VideoCameraOutlined />}>
              <Link to="/Anime">
                Anime
              </Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<FireOutlined />}>
              {login()}
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />}>
              <Link to="/profile">
                Profile
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
         <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
          <Switch>
            <Route exact path='/Anime' component={Anime} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
          </Content>
        </Layout>
      </Layout> 
    )
}

export default SiderDemo;