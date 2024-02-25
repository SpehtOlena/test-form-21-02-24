import { Form, Input, Button, Avatar } from 'antd';
import './Profile.css'
import axios from 'axios';
import { UserOutlined } from '@ant-design/icons';

const Profile = ({ activeUser, setActiveUser }) => {
	const onFinish = (values) => {
		axios
			.put(`http://localhost:3000/users/${activeUser.id}`, values)
			.then((res) => setActiveUser(res.data))
			.catch((error) => console.log(error))
	};
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};
	return (
		<div className={"profile-container"}>
			{
				!!activeUser.avatar ?
					<Avatar shape={'square'} size={250} alt={activeUser.username} src={activeUser.avatar} /> :
					<Avatar shape={'square'} size={250} alt={activeUser.username} icon={<UserOutlined />} />
			}
			<Form
				className={'profile-form'}
				name="profile-form"
				initialValues={activeUser}
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
						Edit
					</Button>
				</Form.Item>
			</Form>
		</div>

	)
}
export default Profile