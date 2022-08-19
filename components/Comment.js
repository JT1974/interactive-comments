import { useState, useEffect, useContext } from 'react'
import { Context } from '../lib/Context'
import CommentWrapper from './styles/comment'
import Score from './Score'
import CommentHeader from './CommentHeader'
import Image from './Image'
import User from './User'
import Date from './Date'
import Button from './Button'
import TextArea from './TextArea'
import LinkButtons from './linkButtons'
import LinkButton from './LinkButton'
import Content from './Content'

export default function Comment({ comment: commentObj, parent }) {
	const { currentUser, setReply, setDel, edit, setEdit, updateComment } = useContext(Context)
	const [newContent, setNewContent] = useState('')

	const {
		id,
		user: {
			username,
			image: { webp: image },
		},
		createdAt,
		replyingTo,
		content,
	} = commentObj
	const isUser = username === currentUser?.username
	const isEdited = edit === commentObj
	const prefix = replyingTo ? `@${replyingTo}, ` : ``

	/* set new content and set focus on its container */
	useEffect(() => {
		const text = document.getElementById('updateContainer')
		setNewContent(content)
		isEdited && text.focus()
		text?.setSelectionRange(text.value.length, text.value.length)
	}, [edit])

	/* controlled component - remove the @replyingTo prefix before saving the text */
	const handleChange = event => setNewContent(event.target.value.slice(prefix.length))

	/* update comment === update currentuser's own comment - including replies */
	const updateContent = event => {
		event.preventDefault()

		updateComment({ ...commentObj, content: newContent }, parent)
		setNewContent('')
	}

	return (
		<CommentWrapper data-comment-id={id}>
			<Score handler={!isUser && updateComment} comment={commentObj} parent={parent} />
			<CommentHeader>
				<Image src={image} alt={username} />
				<User username={username} isUser={isUser} />
				<Date date={createdAt} />
			</CommentHeader>
			{isEdited ? (
				<>
					<Button onClick={updateContent}>UPDATE</Button>
					<TextArea id='updateContainer' value={prefix.concat(newContent)} onChange={handleChange} />
				</>
			) : (
				<>
					<LinkButtons>
						{isUser ? (
							<>
								<LinkButton onClick={() => setDel({ comment: commentObj, parent })} action='delete' />
								<LinkButton onClick={() => setEdit(commentObj)} primary action='edit' />
							</>
						) : (
							<LinkButton
								onClick={() => setReply({ comment: commentObj, parent })}
								primary
								action='reply'
							/>
						)}{' '}
					</LinkButtons>
					<Content prefix={prefix} content={content} />
				</>
			)}
		</CommentWrapper>
	)
}

