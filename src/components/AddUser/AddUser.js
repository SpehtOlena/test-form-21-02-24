import { Button, Form, Input } from 'antd';
import './AddUser.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

const AddUser = ({ activeUser, setActiveUser }) => {
	const [users, setUsers] = useState([]);
	useEffect(() => {
		axios
			.get('http://localhost:3000/users')
			.then((res) => setUsers(res.data))
			.catch((error) => console.log(error))
	})
	const onFinish = (values) => {
		const testUser = users.find((value) => value.username === values.username)
		if (!!testUser) {
			if (testUser.password === values.password) {
				setActiveUser(testUser)
			} else {
				console.log('error password')
			}
		} else {
			axios
				.post('http://localhost:3000/users', values)
				.then(res => setActiveUser(res.data))
		}
	};
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};
	return (
		<Form
			className={'add-user-form'}
			name="basic"
			initialValues={{
				remember: true,
			}}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
		>
			<Form.Item
				label="Username"
				name="username"
				rules={[
					{
						required: true,
						message: 'Please input your username!',
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="Password"
				name="password"
				rules={[
					{
						required: true,
						message: 'Please input your password!',
					},
				]}
			>
				<Input.Password />
			</Form.Item>


			<Form.Item
				label="Avatar"
				name="avatar"
				rules={[
					{
						required: true,
						message: 'Please download your avatar!',
					},
				]}
			>
				<Input addonAfter={'url'} />
			</Form.Item>

			<Form.Item
				style={{ textAlign: "right" }}
			>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form.Item>
		</Form>
	)
}
export default AddUser