import React, { useState } from 'react'

import { Layout, Menu } from 'antd'
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'

import type { MenuProps } from 'antd'
import './style.css'

import Home from '../components/Home'

const { Header, Content, Footer, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[],
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
	} as MenuItem
}

const items: MenuItem[] = [
  	getItem(
		(<a href="/" rel="noopener noreferrer">Home</a>), '1', <PieChartOutlined />),
  	getItem(
		  (<a href="/carousel" rel="noopener noreferrer">Menu</a>), '2', <DesktopOutlined />),
  	getItem('User', 'sub1', <UserOutlined />, [
    	getItem(
			(<a href="/" rel="noopener noreferrer">Home</a>), '3', <PieChartOutlined />),
    	getItem(
			(<a href="/" rel="noopener noreferrer">Home</a>), '4', <UserOutlined />),
    	getItem(
			( <a href="/" rel="noopener noreferrer">Home</a>), '5', <FileOutlined />),
  	]),
  	getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  	getItem('Files', '9', <FileOutlined />),
]

const App: React.FC = () => {
  	const [collapsed, setCollapsed] = useState(false)

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
				<div className="logo"><img src='https://play-lh.googleusercontent.com/eZSTPFaVLBBhrS0wW-u7L8E8XlscgDiULgsbZLnAkfAb35B3yOxaky1to-mRcg8umWGE'/></div>
				<Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
			</Sider>
			<Layout className="site-layout">
				<Header className="site-layout-background" style={{ padding: 0 }}>
					<div>
						<span>Dashboard</span>
					</div>
					<div>
						<span>Hihi</span>
					</div>
				</Header>
			<Content style={{ margin: '0 16px' }}>  
			<Home/>        
			</Content>
			<Footer style={{ textAlign: 'center' }}>Đây là footer</Footer>
		</Layout>
	</Layout>
	)
}

export default App