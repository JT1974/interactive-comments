import { useContext } from 'react'
import { Context } from '../lib/Context'
import { ModalWindow, ModalInner, Title, Para, Button } from './styles/modal'
import Fetcher from '../lib/fetcher'

export default function Modal() {
	const { del, setDel, comments, setComments } = useContext(Context)

	const deleteComment = async () => {
		const { commentId } = del

		/* find top level comment */
		const comment = comments.find(cmt => cmt.id === commentId)

		/* if comment is found */
		if (comment !== undefined) {
			/* it can be deleted straight from database */
			await Fetcher(`/api/comments/${commentId}`, 'DELETE')

			/* delete it from Context */
			const commentIdx = comments.findIndex(cmt => cmt.id === comment.id)
			setComments(prevComments => [...prevComments.slice(0, commentIdx), ...prevComments.slice(commentIdx + 1)])
		} else {
			/* if comment is a reply to a (parent) comment */
			/* find parent first */
			const sections = Array.from(document.getElementById('comments').children)?.filter(
				child => child.dataset.parentId
			)

			const parentId = +sections.find(section => {
				const articles = Array.from(section.children)
				const article = articles.find(art => +art.dataset.commentId === commentId)

				return article
			}).dataset.parentId

			const parent = comments.find(cmt => cmt.id === parentId)

			/* get comment's index in parent array */
			const commentIdx = parent.replies.findIndex(com => com.id === commentId)

			/* delete comment from parent's replies array and update in database */
			const data = await Fetcher(`/api/comments/${parentId}`, 'PATCH', {
				...parent,
				replies: [...parent.replies.slice(0, commentIdx), ...parent.replies.slice(commentIdx + 1)],
			})

			/* delete comment from parent's replies array in Context */
			const parentIdx = comments.findIndex(cmt => cmt.id === parentId)
			setComments(prevComments => [
				...prevComments.slice(0, parentIdx),
				{
					...parent,
					replies: [...parent.replies.slice(0, commentIdx), ...parent.replies.slice(commentIdx + 1)],
				},
				...prevComments.slice(parentIdx + 1),
			])
		}

		setDel(null)
	}

	const closeModal = () => {
		document.getElementById('modal').style.display = 'none'
		setDel(null)
	}

	return (
		<ModalWindow id='modal'>
			<ModalInner>
				<Title>Delete comment</Title>
				<Para>
					Are you sure you want to delete this comment? This will remove the comment and can't be undone.
				</Para>
				<Button primary onClick={closeModal}>
					NO, CANCEL
				</Button>
				<Button onClick={deleteComment}>YES, DELETE</Button>
			</ModalInner>
		</ModalWindow>
	)
}

