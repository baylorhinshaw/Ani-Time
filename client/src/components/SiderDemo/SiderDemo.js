import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  FireOutlined,
  LockOutlined,
  HomeOutlined
} from '@ant-design/icons';
import React, { useState} from 'react';
import Anime from '../Anime/Anime';
import { Route, Switch, Link} from 'react-router-dom';
import Login from '../../pages/Login';
import Signup from '../../pages/Signup';
import Profile from '../../pages/Profile'
import Home from '../../pages/Home'
import Auth from "../../utils/auth";
import anitime from '../../images/ANITIME.PNG'
import './SiderDemo.css'
const { Header, Sider, Content, Footer } = Layout;


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

    function profile() {
      if (Auth.loggedIn()) {
        return (
          <Link to="/profile">
            Profile
          </Link>
        );
      } else {
        return (
          <Link to="/login">
            Profile
          </Link>
        );
      }
    };

    return (
      <Layout>
        <Sider trigger={null} defaultCollapsed={true} collapsible={true} collapsed={true} style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top:60,
        bottom: 0,
      }}> 
          <Menu  mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <Link to="/">
                Home
              </Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              <Link to="/Anime">
                Anime
              </Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<LockOutlined />}>
              {login()}
            </Menu.Item>
            <Menu.Item key="4" icon={<UserOutlined />}>
              {profile()}
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
         <Header className="site-layout-background headerShadow" style={{ padding: 0, background: "linear-gradient(261deg, rgba(131,102,214,1) 0%, rgba(230,198,255,1) 47%, rgba(224,230,251,1) 82%)", paddingLeft: "16", position: 'fixed', zIndex: 1, width: '100%'}}>
            {/* {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })} */}
            
            <img className="headerImg" src= {anitime}></img>
          </Header>
          <Layout className="site-layout" style={{ marginLeft: 75 }}>
      
      <Content style={{ marginTop:'0', overflow: 'initial' }}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Anime" component={Anime} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
          </Content>
          </Layout>
          <Footer style={{ textAlign: 'center', background: 'black', color:'white', paddingLeft: '7rem', minHeight: '18rem' }}>Ani-Time ©2022 Created by Team Ani-Time </Footer>
        </Layout> 
      </Layout>
      
    )
}

export default SiderDemo;