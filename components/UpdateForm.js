import { useContext, useState, useEffect } from 'react'
import { Context } from '../lib/Context'
import Fetcher from '../lib/fetcher'
import { getNextId } from '../lib/utils'

export default function UpdateForm({ parentId = undefined, commentId = undefined }) {
	const { currentUser, comments, setComments } = useContext(Context)
	const [comment, setComment] = useState('')

	// if it's a reply (it has parentId & commentId), insert the original comment's username to the beginning of the reply
	useEffect(() => {
		if (commentId) {
			setComment(`@${comments.find(comment => (comment.id = commentId)).user.username}, `)
		}
	}, [])

	const handleChange = event => {
		setComment(event.target.value)
	}

	// save comment document to the comments collection of the database
	const postComment = async event => {
		event.preventDefault()

		// const response = await fetch('/api/', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify({
		// 		id: getNextId(comments),
		// 		content: comment,
		// 		createdAt: '1 month ago',
		// 		score: 0,
		// 		user: currentUser,
		// 		replies: [],
		// 	}),
		// } )

		// const savedComment = await response.json()

		const data = await Fetcher('/api/', 'POST', {
			id: getNextId(comments),
			content: comment,
			createdAt: '1 month ago',
			score: 0,
			user: currentUser,
			replies: [],
		})

		setComment('')
		setComments(prevComments => [...prevComments, data])
	}

	// add the comment to the replies array of the parent comment
	const replyComment = async event => {
		event.preventDefault()

		const parent = comments.find(comment => (comment.id = parentId))
		const replyingTo = comments.find(comment => (comment.id = commentId)).user.username

		// const response = await fetch(`/api/comments/${parentId}`, {
		// 	method: 'PATCH',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify({
		// 		...parent,
		// 		replies: [
		// 			...parent.replies,
		// 			{
		// 				id: getNextId(comments),
		// 				content: comment,
		// 				createdAt: '1 minute ago',
		// 				score: 0,
		// 				replyingTo,
		// 				user: currentUser,
		// 			},
		// 		],
		// 	}),
		// })

		// const savedComment = await response.json()

		const data = await Fetcher(`/api/comments/${parentId}`, 'PATCH', {
			...parent,
			replies: [
				...parent.replies,
				{
					id: getNextId(comments),
					content: comment,
					createdAt: '1 minute ago',
					score: 0,
					replyingTo,
					user: currentUser,
				},
			],
		})

		setComment('')
		setComments(prevComments => ({
			...prevComments,
			replies: [...prevComments.replies, data],
		}))
	}

	return (
		<section>
			<img src={currentUser?.image.webp} alt={currentUser?.username}></img>
			<form onSubmit={commentId ? replyComment : postComment}>
				<textarea name='comment' placeholder='Add a comment...' onChange={handleChange} value={comment} />
				<button type='submit'>{commentId ? 'REPLY' : 'SEND'}</button>
			</form>
		</section>
	)
}

// const updateComment = async (event, { id, reply }) => {
// 	/* <form onSubmit={e => updateComment(e, { id: 3 })}>
// 		<textarea name='updatedComment' onChange={handleCommentChange} value={comment} />
// 		<button type='submit'>Update</button>
// 	</form>
// 	<form onSubmit={e => updateComment(e, { id: 3, reply: true })}>
// 		<textarea name='repliedComment' onChange={handleCommentChange} value={comment} />
// 		<button type='submit'>Reply</button>
// 	</form>*/
// 	event.preventDefault()

// 	const currComment = getComments(comments).find(comment => comment.id == id)

// 	const response = await fetch(`/api/comments/${id}`, {
// 		method: 'PATCH',
// 		headers: {
// 			'Content-Type': 'application/json',
// 		},
// 		body: reply
// 			? JSON.stringify({
// 					...currComment,
// 					replies: [
// 						...currComment.replies,
// 						{
// 							id: getNextId(comments),
// 							content: comment,
// 							createdAt: '1 minute ago',
// 							score: 0,
// 							replyingTo: currComment.user.username,
// 							user: currentUser,
// 							replies: [],
// 						},
// 					],
// 			  })
// 			: JSON.stringify({
// 					...currComment,
// 					content: comment,
// 					createdAt: '1 second ago',
// 			  }),
// 	})

// 	const savedComment = await response.json()

// 	setComment('')

// 	reply &&
// 		setComments(prevComments => ({
// 			...prevComments,
// 			replies: [...prevComments.replies, savedComment],
// 		}))
// 	!reply && setComments(prevComments => [...prevComments, savedComment])
// }

// const deleteComment = (event, { id }) => {
// 	/* <form onSubmit={e => deleteComment(e, { id: 3 })}>
// 		<button type='submit'>Delete</button>
// 	</form> */
// 	event.preventDefault()

// 	fetch(`/api/${id}`, {
// 		method: 'DELETE',
// 		headers: {
// 			'Content-Type': 'application/json',
// 		},
// 		body: '',
// 	})

// 	setComments(prevComments => [...prevComments.filter(comment => comment.id !== id)])

// }
