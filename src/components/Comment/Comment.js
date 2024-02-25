import { Avatar } from 'antd';
import './Comment.css';
import { UserOutlined } from '@ant-design/icons';

const Comment = ({ comment }) => {
	return (
		<div className={'comment-box'}>
			<div>
				{
					comment.photoUser ?
						<Avatar size={30} alt={comment.username} src={comment.photoUser} /> :
						<Avatar size={30} icon={<UserOutlined />} />
				}

			</div>
			<div className={'comment-body'}>
				<div className={'comment-author'}>{comment.username}</div>
				<div>{comment.body}</div>
			</div>
		</div>
	)
}
export default Comment