import { useEffect, useState } from 'react';
import './PostCard.css';
import { Avatar, Button, Typography, Row, Col, Input } from 'antd';
import axios from 'axios';
import { UserOutlined, DashOutlined, CommentOutlined, SendOutlined } from '@ant-design/icons';
import Comment from '../Comment/Comment';


const PostCard = ({ post, activeUser, setPosts, posts }) => {
	const [user, setUser] = useState(null);
	const [showComment, setShowComment] = useState(false);
	const [showAddComment, setShowAddComment] = useState(false);
	const [commentInputValue, setCommentInputValue] = useState(null);
	const handeAddPostComment = () => {
		axios
			.put(`http://localhost:3000/posts/${post.id}`, {
				...post, comments: [...post.comments, {
					body: commentInputValue,
					idUser: activeUser.id,
					photoUser: activeUser.avatar || null,
					username: activeUser.username
				}]
			})
			.then((res) => setPosts(posts.map((value) => {
				if (value.id === post.id) {
					return res.data
				} else {
					return value
				}
			})))
			.then(() => {
				setCommentInputValue('')
				setShowComment(false)
			})
	}
	useEffect(() => {
		axios
			.get(`http://localhost:3000/users/${post.userId}`)
			.then((res) => setUser(res.data))
			.catch((error) => { console.log(error) })

	})
	return (
		<>
			{
				!!user &&
				<div className={'card-container'}>
					<div className={'post-card'}>
						<div className={'card-img'}>
							<img alt="book cover" src={post.photo} />
						</div>
						<div className={'card-info'}>
							<Typography.Title level={2}>{post.bookTitle}</Typography.Title>
							<Typography.Title level={4}>{post.author}</Typography.Title>
							<Typography.Title level={5}>{post.genres}</Typography.Title>
							<p>{post.annotation}</p>
						</div>
					</div>
					<div className={'user-info'}>
						<div>
							{
								!!user.avatar ?
									<Avatar size={40} alt={user.username} src={user.avatar} /> :
									<Avatar size={40} icon={<UserOutlined />} />
							}
						</div>
						<div>
							<Typography.Title level={4}>{user.username}</Typography.Title>
						</div>
					</div>
					<div>
						{
							!!showComment &&
							<div className={'comments-container'}>
								{
									!!post.comments.length ?
										<Row>
											<ul>
												{
													post.comments.map((value, index) => (
														<li key={index}>
															<Comment comment={value} />
														</li>
													))
												}
											</ul>
										</Row> :
										<div className={'no-comments'}>No Comments yet!</div>
								}
							</div>


						}
					</div>
					<div>
						{
							!!showAddComment &&
							<div className={'add-comment-container'}>
								<Input.TextArea onChange={(e) => setCommentInputValue(e.target.value)} value={commentInputValue} autoSize={{ minRows: 1, maxRows: 4 }} />
								<Button onClick={handeAddPostComment} icon={<SendOutlined />} />
							</div>
						}
					</div>

					<div className={'comment-button'}>
						<Button icon={<CommentOutlined />} onClick={() => setShowAddComment(!showAddComment)} />
						<Button icon={<DashOutlined />} onClick={() => setShowComment(!showComment)} />
					</div>

				</div>
			}

		</>

	)
}
export default PostCard