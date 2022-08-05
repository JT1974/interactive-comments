import { Fragment, useContext } from 'react'
import { Context } from '../lib/Context'
import { Section } from './commentsStyles'
import Comment from './Comment'
import CommentForm from './CommentForm'
import Replies from './Replies'
import Spinner from '../components/Spinner'

export default function Comments() {
	const { comments, reply } = useContext(Context)

	return (
		<Section id='comments'>
			{comments ? (
				comments.map(comment => {
					return (
						<Fragment key={comment.id}>
							<Comment comment={comment} />
							{reply && reply.commentId === comment.id && <CommentForm />}
							{comment.replies.length !== 0 && <Replies parent={comment.id} comments={comment.replies} />}
						</Fragment>
					)
				})
			) : (
				<Spinner />
			)}
		</Section>
	)
}

