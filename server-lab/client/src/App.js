import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Spin } from 'antd';
import { useRoutes } from './routes';
import {BrowserRouter, NavLink} from 'react-router-dom';
import {RadarChartOutlined} from '@ant-design/icons';
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import { Loader } from './Loader';

const { Header, Content, Footer } = Layout;

function App() {
  const { token, login, logout, userId, ready } = useAuth();
  const isAuth = !!token;
  const Routes = useRoutes(isAuth);

  const handleLogout = () => {
      logout();
  }

  if (!ready) return <Loader/>

  return (
      <AuthContext.Provider value={{
          token, login, logout, userId, isAuth,
      }}>
          <BrowserRouter>
              <Layout style={{ height: '100vh' }}>
                  <Header>
                      <div className="logo"><RadarChartOutlined /></div>
                      {
                          isAuth &&
                          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                              <Menu.Item key="1">
                                  <NavLink to="/create">
                                      Create Link
                                  </NavLink>
                              </Menu.Item>
                              <Menu.Item key="2">
                                  <NavLink to="/links">
                                  All links
                                  </NavLink>
                              </Menu.Item>
                              <Menu.Item key="3" onClick={handleLogout}>
                                  Logout
                              </Menu.Item>
                          </Menu>
                      }
                  </Header>
                  <Content style={{ padding: '30px 0' }}>
                      {Routes}
                  </Content>
                  <Footer style={{ textAlign: 'center' }}>Made with love by Daria Lutkova</Footer>
              </Layout>
          </BrowserRouter>
      </AuthContext.Provider>
  );
}

export default App;
