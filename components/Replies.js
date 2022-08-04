import { Fragment, useContext } from 'react'
import { Context } from '../lib/Context'
import Comment from './Comment'
import CommentForm from './CommentForm'
import StyledSection from './replyStyles'

export default function Replies({ parent, comments }) {
	const { reply } = useContext(Context)

	return (
		<StyledSection data-parent-id={parent}>
			{comments.map(comment => {
				return (
					<Fragment key={comment.id}>
						<Comment comment={comment} />
						{reply && reply.commentId === comment.id && <CommentForm />}
					</Fragment>
				)
			})}
		</StyledSection>
	)
}

