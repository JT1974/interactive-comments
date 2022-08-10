import { Fragment, useContext } from 'react'
import { Context } from '../lib/Context'
import Comment from './Comment'
import CommentForm from './CommentForm'
import RepliesWrapper from './styles/replies'

export default function Replies({ parent }) {
	const { reply } = useContext(Context)

	return (
		<RepliesWrapper>
			{parent.replies.map(comment => {
				return (
					<Fragment key={comment.id}>
						<Comment comment={comment} parent={parent} />
						{reply?.comment === comment && <CommentForm comment={comment} parent={parent} />}
					</Fragment>
				)
			})}
		</RepliesWrapper>
	)
}

