import React, { useState } from 'react'
const Context = React.createContext()

function ContextProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null)
	const [comments, setComments] = useState(null)
	const [reply, setReply] = useState(null)
	const [del, setDel] = useState(null)

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
			}}
		>
			{children}
		</Context.Provider>
	)
}

export { ContextProvider, Context }

