import { Fragment, useContext } from 'react'
import { Context } from '../lib/Context'
import CommentsWrapper from './styles/comments'
import Comment from './Comment'
import CommentForm from './CommentForm'
import Replies from './Replies'
import Spinner from '../components/Spinner'

export default function Comments() {
	const { comments, reply } = useContext(Context)

	return (
		<CommentsWrapper>
			{comments ? (
				comments
					.sort((a, b) => b.score - a.score)
					.map(comment => {
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

