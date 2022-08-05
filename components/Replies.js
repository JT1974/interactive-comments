import { Fragment, useContext } from 'react'
import { Context } from '../lib/Context'
import Comment from './Comment'
import CommentForm from './CommentForm'
import StyledSection from './replyStyles'

export default function Replies({ parent }) {
	const { reply } = useContext(Context)

	return (
		<StyledSection data-parent-id={parent.id}>
			{parent.replies.map(comment => {
				return (
					<Fragment key={comment.id}>
						<Comment comment={comment} parent={parent} />
						{reply && reply.commentId === comment.id && <CommentForm />}
					</Fragment>
				)
			})}
		</StyledSection>
	)
}

