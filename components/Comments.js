import { Fragment, useContext } from 'react'
import { Context } from '../lib/Context'
import { Section } from './commentsStyles'
import Comment from './Comment'
import CommentForm from './CommentForm'
import Replies from './Replies'
import Spinner from '../components/Spinner'

export default function Comments() {
	const { currentUser, comments, reply } = useContext(Context)

	function displayComments(cmts, user) {
		if (cmts.length === 0) return

		return (
			<>
				{cmts.map(cmt => {
					return (
						<Fragment key={cmt.id}>
							<Comment comment={cmt} user={user} />
							{reply && reply.commentId === cmt.id && <CommentForm />}
							{cmt.replies && cmt.replies.length !== 0 && (
								<Replies id={cmt.id}>{displayComments(cmt.replies, user.username)}</Replies>
							)}
						</Fragment>
					)
				})}
			</>
		)
	}

	return <Section>{comments ? displayComments(comments, currentUser) : <Spinner />}</Section>
}

