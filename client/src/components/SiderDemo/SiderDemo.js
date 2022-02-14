import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  FireOutlined,
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
import anitime from 'C:/Users/brend/OneDrive/Desktop/Classwork/Ani-Time/client/src/images/ANITIME.PNG'
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
        <Sider trigger={null} breakpoint={"lg"} collapsible collapsed={collapsed}> 
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
            <Menu.Item key="3" icon={<FireOutlined />}>
              {login()}
            </Menu.Item>
            <Menu.Item key="4" icon={<UserOutlined />}>
              {profile()}
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
         <Header theme= "light" className="site-layout-background" style={{ padding: 0, background: "linear-gradient(261deg, rgba(131,102,214,1) 0%, rgba(230,198,255,1) 47%, rgba(224,230,251,1) 82%)", borderLeft: "3px solid", paddingLeft: "1rem"}}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
            
            <img className="headerImg" src= {anitime}></img>
          </Header>
    
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Anime" component={Anime} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
          
          <Footer style={{ textAlign: 'center', background: 'black', color:'white' }}>Ani-Time ©2022 Created by Team Ani-Time </Footer>
        </Layout>
        </Layout>
      
    )
}

export default SiderDemo;