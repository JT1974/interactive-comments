import { useContext } from 'react'
import { Context } from '../lib/Context'
import LinkButton from './LinkButton'
import {
	Article,
	Data,
	Header,
	HeaderData,
	Image,
	User,
	Buttons,
	Content,
	Score,
	ScoreBtn,
	LinkBtn,
	Badge,
} from './commentStyles'

export default function Comment({ comment }) {
	const { currentUser, setReply, setDel } = useContext(Context)

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
	} = comment

	const isUser = username === currentUser.username

	const replyToComment = event => {
		const parentId = +event.target.closest('section').dataset.parentId || id
		setReply({ parentId, commentId: id })
	}

	const editComment = event => {
		return
	}

	const deleteComment = () => {
		setDel({ commentId: id })
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
			<Buttons>
				{isUser ? (
					<>
						<LinkButton handler={deleteComment} action='delete' />
						<LinkButton handler={editComment} primary action='edit' />
					</>
				) : (
					<LinkButton handler={replyToComment} primary action='reply' />
				)}
			</Buttons>
			<Content>
				<span>{replyingTo ? `@${replyingTo} ` : ''}</span>
				{content}
			</Content>
		</Article>
	)
}

