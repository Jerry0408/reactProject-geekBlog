import React, { useEffect } from 'react'
import { useStore } from '../../store'
import { removeToken } from '../../utils'
import { Layout, Menu, Popconfirm } from 'antd'
import { observer } from 'mobx-react-lite'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import './index.scss'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const { Header, Sider } = Layout



const GeekLayout = () => {
  const { loginStore, userStore, channelStore } = useStore()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    userStore.getUserInfo()
    channelStore.loadChannelList()
  }, [userStore, channelStore])

  const menuItems = [
    {
      key: "article",
      icon: <DiffOutlined />,
      label: 'Content Management',
    },
    {
      key: "publish",
      icon: <EditOutlined />,
      label: 'Aritical Publishing',
    },
    {
      key: "home",
      icon: <HomeOutlined />,
      label: 'Data Overview',
    },
  ]
  const pathnameToKey = (pathname) => {
    return [pathname.slice(8)]
  }
  const logoutConfirm = () => {
    loginStore.clearToken()
    navigate('/login', { replace: true })
  }

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{userStore.userInfo.name}</span>
          <span className="user-logout">
            <Popconfirm
              title="Confirm Sign out?"
              cancelText="Cancel"
              okText="Yes"
              onConfirm={logoutConfirm}
            >
              <LogoutOutlined /> Sign out
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={pathnameToKey(pathname)}
            selectedKeys={pathnameToKey(pathname)}
            style={{ height: '100%', borderRight: 0 }}
            items={menuItems}
            onClick={({ key }) => {
              navigate(key, { replace: true })
            }}
          >
          </Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet></Outlet>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default observer(GeekLayout)