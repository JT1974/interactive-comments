import { useContext, useState } from 'react'
import { Context } from '../lib/Context'
import { getNextId, getComments } from '../lib/utils'
import CommentFormWrapper from './styles/commentForm'
import Form from './form'
import Image from './Image'
import TextArea from './TextArea'
import Button from './Button'

export default function CommentForm({ comment: commentObj, parent }) {
	const { currentUser, comments, reply, postComment, updateComment } = useContext(Context)
	const [comment, setComment] = useState('')

	/* comment prefix (e.g. @amyrobson) */
	const prefix = reply ? `@${getComments(comments)?.find(cm => cm.id === +reply.comment.id).user.username}, ` : ''

	/* controlled component - remove the @replyingTo prefix before saving the text */
	const handleChange = event => setComment(event.target.value.slice(prefix.length))

	/* post comment === create a new (TOP LEVEL) comment */
	const saveComment = async event => {
		event.preventDefault()

		postComment(comment)
		setComment('')
	}

	/* reply to comment === update the parent object */
	const replyComment = async event => {
		event.preventDefault()

		updateComment({
			...parent,
			replies: [
				...parent.replies,
				{
					id: getNextId(comments),
					content: comment,
					createdAt: Date.now(),
					score: 0,
					replyingTo: commentObj.user.username,
					user: currentUser,
				},
			],
		})
		setComment('')
	}

	return (
		<CommentFormWrapper>
			<Form onSubmit={reply ? replyComment : saveComment}>
				<Image src={currentUser?.image.webp} alt={currentUser?.username} />
				<TextArea onChange={handleChange} value={prefix.concat(comment)} placeholder='Add a comment...' />
				<Button>{reply ? 'REPLY' : 'SEND'}</Button>
			</Form>
		</CommentFormWrapper>
	)
}

