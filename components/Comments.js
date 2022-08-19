import { Fragment, useContext } from 'react'
import CommentsWrapper from './styles/comments'
import Comment from './Comment'
import CommentForm from './CommentForm'
import Replies from './Replies'
import Spinner from '../components/Spinner'

export default function Comments({ comments, reply }) {
	const sortedComments = comments?.sort((a, b) => b.score - a.score)

	return (
		<CommentsWrapper>
			{sortedComments ? (
				sortedComments.map(comment => {
					return (
						<Fragment key={comment.id}>
							<Comment comment={comment} />
							{reply?.comment === comment && <CommentForm comment={comment} parent={comment} />}
							{comment.replies?.length !== 0 && <Replies parent={comment} />}
						</Fragment>
					)
				})
			) : (
				<Spinner />
			)}
		</CommentsWrapper>
	)
}

