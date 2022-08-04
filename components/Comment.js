import { useContext } from 'react'
import { Context } from '../lib/Context'
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

export default function Comment({ comment, user }) {
	const { setReply } = useContext(Context)
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

	const isUser = username === user

	const replyToComment = event => {
		const parentId = +event.target.closest('section').dataset.parentId || id
		setReply({ parentId, commentId: id })
	}

	return (
		<Article data-comment-id={id}>
			<Score>
				<ScoreBtn>+</ScoreBtn>
				{score}
				<ScoreBtn>-</ScoreBtn>
			</Score>
			<Data>
				<Header>
					<HeaderData>
						<Image src={image} alt={username} />
						<User>
							{username} {isUser && <Badge>you</Badge>}
						</User>
						<span>{createdAt}</span>
					</HeaderData>
					<Buttons>
						{isUser ? (
							<>
								<LinkBtn>Delete</LinkBtn>
								<LinkBtn primary>Edit</LinkBtn>
							</>
						) : (
							<LinkBtn onClick={replyToComment}>Reply</LinkBtn>
						)}
					</Buttons>
				</Header>
				<Content>
					<span>{replyingTo ? `@${replyingTo} ` : ''}</span>
					{content}
				</Content>
			</Data>
		</Article>
	)
}

