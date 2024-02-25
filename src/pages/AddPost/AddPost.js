import TextArea from 'antd/es/input/TextArea';
import './AddPost.css';
import { Button, Form, Input } from 'antd';
import axios from 'axios';

const AddPost = ({ activeUser, posts, setPosts }) => {
	const onFinish = (values) => {
		axios
			.post('http://localhost:3000/posts', { ...values, userId: activeUser.id, comments: [] })
			.then(res => setPosts([...posts, res.data]))
	};
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};
	return (
		<Form
			className={'add-post-form'}
			name="basic"
			initialValues={{
				remember: true,
			}}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
		>
			<Form.Item
				label="Book title"
				name="bookTitle"
				rules={[
					{
						required: true,
						message: 'Please input book title!',
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="Author"
				name="author"
				rules={[
					{
						required: true,
						message: 'Please input author!',
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="Cover"
				name="photo"
				rules={[
					{
						required: true,
						message: 'Please download cover image!',
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="Genres"
				name="genres"
				rules={[
					{
						required: true,
						message: 'Please input genres!',
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="Annotation "
				name="annotation"
				rules={[
					{
						required: true,
						message: 'Please input annotation !',
					},
				]}
			>
				<TextArea autoSize={{ minRows: 3, maxRows: 10 }} />
			</Form.Item>

			<Form.Item
				style={{ textAlign: "right" }}
			>
				<Button type="primary" htmlType="submit">
					Save
				</Button>
			</Form.Item>
		</Form>
	)
}
export default AddPost