import { useContext, useState, useEffect } from 'react'
import { Context } from '../lib/Context'
import Fetcher from '../lib/fetcher'
import { getNextId } from '../lib/utils'
import { Section, Image, Form, TextArea, Button } from './commentFormStyles'

export default function CommentForm() {
	const { currentUser, comments, setComments, reply, setReply } = useContext(Context)
	const [comment, setComment] = useState('')

	// if it's a reply (it has parentId & commentId), insert the original comment's username to the beginning of the reply
	useEffect(() => {
		if (reply) {
			setComment(`@${comments.find(comment => (comment.id = +reply.commentId)).user.username}, `)
		}
	}, [])

	const handleChange = event => {
		setComment(event.target.value)
	}

	// save comment document to the comments collection of the database
	const postComment = async event => {
		event.preventDefault()

		const data = await Fetcher('/api/', 'POST', {
			id: getNextId(comments),
			content: comment,
			createdAt: '1 month ago',
			score: 0,
			user: currentUser,
			replies: [],
		})

		setComment('')
		setComments(prevComments => [...prevComments, data])
	}

	// add the comment to the replies array of the parent comment
	const replyComment = async event => {
		event.preventDefault()

		const parent = comments.find(cmt => cmt.id === +reply.parentId)
		const replyingTo = comments.find(cmt => cmt.id === +reply.commentId).user.username

		const data = await Fetcher(`/api/comments/${+reply.parentId}`, 'PATCH', {
			...parent,
			replies: [
				...parent.replies,
				{
					id: getNextId(comments),
					content: comment,
					createdAt: '1 minute ago',
					score: 0,
					replyingTo,
					user: currentUser,
				},
			],
		})

		setReply(null)
		setComment('')
		setComments(prevComments => {
			const parentIdx = prevComments.findIndex(com => com.id === parent.id)
			return [...prevComments.slice(0, parentIdx), data, ...prevComments.slice(parentIdx + 1)]
		})
	}

	return (
		<Section>
			<Image src={currentUser?.image.webp} alt={currentUser?.username} />
			<Form onSubmit={reply ? replyComment : postComment}>
				<TextArea onChange={handleChange} value={comment} />
				<Button>{reply ? 'REPLY' : 'SEND'}</Button>
			</Form>
		</Section>
	)
}

