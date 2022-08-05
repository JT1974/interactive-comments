import { useState, useEffect, useContext } from 'react'
import { Context } from '../lib/Context'
import LinkButton from './LinkButton'
import { Header, Image, User, Buttons, Content, ContentUpdate, Score, ScoreBtn, Badge } from './commentStyles'
import Button from './Button'
import Article from './Article'

export default function Comment({ comment: commentObj, parent }) {
	const { currentUser, setReply, setDel, edit, setEdit, updateComment } = useContext(Context)
	const [comment, setComment] = useState(null)
	const {
		id,
		score,
		user: {
			username,
			image: { webp: image },
		},
		createdAt,
		replyingTo,
		content,
	} = commentObj
	const isUser = username === currentUser.username
	const isEdited = edit?.commentId === id

	/* if comment is edited sets focus on the text */
	useEffect(() => {
		const text = document.getElementById('updateContainer')

		/* set focus on textarea */
		edit?.commentId === id && text.focus()

		/* move cursor to end of text */
		text?.setSelectionRange(text.value.length, text.value.length)
	}, [edit])

	/* controlled component - removes the @replyingTo prefix before saving the text */
	const handleChange = event => setComment(event.target.value.split(`@${replyingTo} `)[1] || '')

	const setCommentReply = () => setReply({ parentId: parent.id || id, commentId: id })
	const setCommentEdit = () => setEdit({ commentId: id })
	const setCommentDelete = () => setDel({ commentId: id })

	const setUpdateComment = async event => {
		event.preventDefault()
		updateComment(commentObj, parent, comment)
		setComment('')
	}

	return (
		<Article data-comment-id={id}>
			<Score>
				<ScoreBtn>
					<img src='./images/icon-plus.svg' alt='upvote' />
				</ScoreBtn>
				{score}
				<ScoreBtn>
					<img src='./images/icon-minus.svg' alt='downvote' />
				</ScoreBtn>
			</Score>
			<Header>
				<Image src={image} alt={username} />
				<User>
					{username} {isUser && <Badge>you</Badge>}
				</User>
				<span>{createdAt}</span>
			</Header>
			{isEdited ? (
				<>
					<Button onClick={setUpdateComment}>UPDATE</Button>
					<ContentUpdate
						id='updateContainer'
						value={comment !== null ? `@${replyingTo} ${comment}` : `@${replyingTo} ${content}`}
						onChange={handleChange}
					></ContentUpdate>
				</>
			) : (
				<>
					<Buttons>
						{isUser ? (
							<>
								<LinkButton onClick={setCommentDelete} action='delete' />
								<LinkButton onClick={setCommentEdit} primary action='edit' />
							</>
						) : (
							<LinkButton onClick={setCommentReply} primary action='reply' />
						)}{' '}
					</Buttons>
					<Content>
						<span>{replyingTo ? `@${replyingTo} ` : ''}</span>
						{content}
					</Content>
				</>
			)}
		</Article>
	)
}

