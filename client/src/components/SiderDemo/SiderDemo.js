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
import Signup from '../../pages/Signup'

const { Header, Sider, Content } = Layout;


function SiderDemo() {

    const [collapsed, setCollapsed] = useState(false);
    
    function toggle() {
        setCollapsed(!collapsed);
    }

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
              <Link to="/login">
                Login
              </Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />}>
              Profile
            </Menu.Item>
            <Menu.Item key="4" icon={<UploadOutlined />}>
              Watch Later
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
          </Switch>
          </Content>
        </Layout>
      </Layout> 
    )
}

export default SiderDemo;