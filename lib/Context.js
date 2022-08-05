import React, { useState } from 'react'
import Fetcher from '../lib/fetcher'
const Context = React.createContext()

function ContextProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null)
	const [comments, setComments] = useState(null)
	const [reply, setReply] = useState(null)
	const [del, setDel] = useState(null)
	const [edit, setEdit] = useState(null)

	const updateComment = async (commentObj, parent, comment) => {
		const isReply = parent !== undefined

		const commentId = isReply ? parent.id : edit.commentId
		const newComment = isReply
			? {
					...parent,
					replies: parent.replies.map(cmt =>
						cmt.id === edit.commentId
							? {
									...commentObj,
									content: comment,
							  }
							: cmt
					),
			  }
			: {
					...commentObj,
					content: comment,
			  }

		const data = await Fetcher(`/api/comments/${commentId}`, 'PATCH', newComment)

		setComments(prevComments =>
			prevComments.map(cmt => {
				if (cmt.id === commentId) return data
				return cmt
			})
		)

		setEdit(null)
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
				updateComment,
			}}
		>
			{children}
		</Context.Provider>
	)
}

export { ContextProvider, Context }

