import { useContext, useState, useEffect } from 'react'
import { Context } from '../lib/Context'
import Fetcher from '../lib/fetcher'
import { getNextId, getComments } from '../lib/utils'
import { Section, Image, TextArea } from './styles/commentForm'
import Button from './Button'
import FormWrapper from './styles/form'

export default function CommentForm() {
	const { currentUser, comments, setComments, reply, setReply } = useContext(Context)
	const [comment, setComment] = useState('')

	// if it's a reply (it has parentId & commentId), insert the original comment's username to the beginning of the reply
	const replyTo = reply ? `@${getComments(comments)?.find(cm => cm.id === +reply.commentId).user.username}, ` : ''

	const handleChange = event => {
		const cmtWoReplyTo = event.target.value.slice(replyTo.length)
		setComment(cmtWoReplyTo)
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
		const replyingTo = getComments(comments).find(cmt => cmt.id === +reply.commentId).user.username

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
			<FormWrapper onSubmit={reply ? replyComment : postComment}>
				<Image src={currentUser?.image.webp} alt={currentUser?.username} />
				<TextArea onChange={handleChange} value={`${replyTo}${comment}`} />
				<Button>{reply ? 'REPLY' : 'SEND'}</Button>
			</FormWrapper>
		</Section>
	)
}

