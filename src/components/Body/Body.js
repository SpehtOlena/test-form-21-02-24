import { useState, useEffect } from 'react';
import axios from 'axios'
import Menu from '../Menu/Menu';
import Home from '../../pages/Home/Home';
import Posts from '../../pages/Posts/Posts';
import AddPost from '../../pages/AddPost/AddPost';
import Profile from '../../pages/Profile/Profile';
import { Button, Col, Layout } from 'antd';
import './Body.css';

const { Header, Content, Footer } = Layout;

const Body = ({ activeUser, setActiveUser }) => {
	const [activePage, setActivePage] = useState(<Home />);
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		axios
			.get('http://localhost:3000/posts')
			.then((res) => setPosts(res.data))
			.catch((error) => console.log(error))
	}, [])
	const menuItems = [
		{
			label: "Home",
			element: <Home />
		},
		{
			label: "Posts",
			element: <Posts activeUser={activeUser} posts={posts} setPosts={setPosts} />
		},
		{
			label: "Add Post",
			element: <AddPost activeUser={activeUser} posts={posts} setPosts={setPosts} />
		},
		{
			label: "Profile",
			element: <Profile activeUser={activeUser} setActiveUser={setActiveUser} />
		}
	]
	return (
		<Layout className={'body-container'}>
			<Header className={'body-header'}>
				<h3 onClick={() => setActivePage(<Profile activeUser={activeUser} setActiveUser={setActiveUser} />)} className={'header-logo'}>{activeUser.username.toUpperCase()}</h3>
				<Menu setActivePage={setActivePage} menuItems={menuItems} />
				<Button onClick={() => setActiveUser(null)} danger type={'primary'}>Exit</Button>
			</Header>
			<Content className={'body-content'}>{activePage}</Content>
			<Footer className={'body-footer'}>
				<Col>©2024 Created by MYD</Col>
				<Col>{activeUser.username.toUpperCase()}</Col>
			</Footer>
		</Layout>
	)
}
export default Body