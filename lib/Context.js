import React, { useState } from 'react'
import Fetcher from '../lib/fetcher'
import { getNextId } from './utils'
const Context = React.createContext()

function ContextProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null)
	const [comments, setComments] = useState(null)
	const [reply, setReply] = useState(null)
	const [del, setDel] = useState(null)
	const [edit, setEdit] = useState(null)

	/* POST - create new comment */
	const postComment = async comment => {
		const data = await Fetcher('/api/', 'POST', {
			id: getNextId(comments),
			content: comment,
			createdAt: Date.now(),
			score: 0,
			user: currentUser,
			replies: [],
		})

		setComments(prevComments => [...prevComments, data])
	}

	/* PATCH - update/reply to comment */
	const updateComment = async (comment, parent) => {
		// if parent -> update comment, if no parent -> new reply
		const commentId = parent?.id || comment.id
		const newComment = parent
			? {
					...parent,
					replies: parent.replies.map(cmt => (cmt.id === comment.id ? { ...comment } : cmt)),
			  }
			: {
					...comment,
			  }

		const data = await Fetcher(`/api/comments/${commentId}`, 'PATCH', newComment)

		setComments(prevComments =>
			prevComments.map(cmt => {
				if (cmt.id === commentId) return data
				return cmt
			})
		)
		setReply(null)
		setEdit(null)
	}

	/* DELETE - delete comment */
	const deleteComment = async () => {
		if (!del.parent) {
			await Fetcher(`/api/comments/${del.comment.id}`, 'DELETE')
			setComments(prevComments => prevComments.filter(cmt => cmt !== del.comment))
		} else {
			const data = await Fetcher(`/api/comments/${del.parent.id}`, 'PATCH', {
				...del.parent,
				replies: del.parent.replies.filter(cmt => cmt !== del.comment),
			})

			setComments(prevComments =>
				prevComments.map(cmt => {
					if (cmt.id === del.parent.id) return data
					return cmt
				})
			)
		}

		setDel(null)
	}

	return (
		<Context.Provider
			value={{
				currentUser,
				setCurrentUser,
				comments,
				setComments,
				reply,
				setReply,
				del,
				setDel,
				edit,
				setEdit,
				postComment,
				updateComment,
				deleteComment,
			}}
		>
			{children}
		</Context.Provider>
	)
}

export { ContextProvider, Context }

