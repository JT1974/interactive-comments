import Head from 'next/head'
import styles from '../styles/css/Home.module.css'
import { useState } from 'react'

function displayComments(comments) {
	if (comments.length === 0) return

	return (
		<>
			{comments.map(comment => (
				<>
					<article className={styles.comment} id={comment.id} key={comment.id}>
						<span className={styles.commentScore}>{comment.score}</span>
						<div className={styles.commentData}>
							<div className={styles.commentDataHeader}>
								<img src={comment.user.image.webp} alt={comment.user.username} />
								<span>{comment.user.username}</span>
								<span>{comment.createdAt}</span>
								<span>{comment.id}</span>
							</div>
							<span className={styles.commentDataContent}>
								<span className={styles.commentDataContentReplyTo}>
									{comment.replyingTo ? `@${comment.replyingTo} ` : ''}
								</span>
								{comment.content}
							</span>
						</div>
					</article>
					{comment.replies && comment.replies.length !== 0 && (
						<section className={styles.replies}>{displayComments(comment.replies)}</section>
					)}
				</>
			))}
		</>
	)
}

function getComments(comments) {
	if (comments.length === 0) return

	const commentArr = comments.map(comment => {
		return comment.replies.length === 0 ? comment : [comment, ...getComments(comment.replies)]
	})

	return commentArr.flatMap(comment => comment)
}

function getCommentIds(comments) {
	if (comments.length === 0) return

	const ids = comments.map(comment => {
		return comment.replies.length === 0 ? +comment.id : [+comment.id, ...getCommentIds(comment.replies)]
	})

	return ids.flatMap(id => id)
}

function getNextId(comments) {
	return Math.max(...getCommentIds(comments)) + 1
}

export default function Index({ data }) {
	const [comment, setComment] = useState('')
	const [currentUser, setCurrentUser] = useState(data.currentUser)
	const [comments, setComments] = useState(data.comments)

	const handleCommentChange = event => {
		setComment(event.target.value)
	}

	const postComment = async event => {
		event.preventDefault()

		const response = await fetch('/api/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: getNextId(comments),
				content: comment,
				createdAt: '1 month ago',
				score: 0,
				user: currentUser,
				replies: [],
			}),
		})

		const savedComment = await response.json()

		setComment('')
		setComments(prevComments => [...prevComments, savedComment])
	}

	const updateComment = async (event, { id, reply }) => {
		event.preventDefault()

		const currComment = getComments(comments).find(comment => comment.id == id)

		const response = await fetch(`/api/comments/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: reply
				? JSON.stringify({
						...currComment,
						replies: [
							...currComment.replies,
							{
								id: getNextId(comments),
								content: comment,
								createdAt: '1 minute ago',
								score: 0,
								replyingTo: currComment.user.username,
								user: currentUser,
								replies: [],
							},
						],
				  })
				: JSON.stringify({
						...currComment,
						content: comment,
						createdAt: '1 second ago',
				  }),
		})

		const savedComment = await response.json()

		setComment('')

		reply &&
			setComments(prevComments => ({
				...prevComments,
				replies: [...prevComments.replies, savedComment],
			}))
		!reply && setComments(prevComments => [...prevComments, savedComment])
	}

	const deleteComment = (event, { id }) => {
		event.preventDefault()

		fetch(`/api/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: '',
		})

		setComments(prevComments => [...prevComments.filter(comment => comment.id !== id)])
	}

	const allComments = displayComments(comments)

	return (
		<div className={styles.container}>
			<Head>
				<title>Interactive Comments - Frontend Mentor challenge</title>
				<link rel='icon' href='/images/favicon-32x32.png' />
			</Head>

			<main className={styles.main}>
				<>
					<section className={styles.allComments} title='allComments'>
						{allComments}
					</section>
					<section title='postComment'>
						<form onSubmit={postComment}>
							<textarea
								name='comment'
								placeholder='Add a comment...'
								onChange={handleCommentChange}
								value={comment}
							/>
							<button type='submit'>Send</button>
						</form>
					</section>
					<section title='updateComment'>
						<form onSubmit={e => updateComment(e, { id: 3 })}>
							<textarea
								name='updatedComment'
								placeholder='Update your comment...'
								onChange={handleCommentChange}
								value={comment}
							/>
							<button type='submit'>Update</button>
						</form>
					</section>
					<section title='replyToComment'>
						<form onSubmit={e => updateComment(e, { id: 3, reply: true })}>
							<textarea
								name='repliedComment'
								placeholder='Reply to @mosesleib...'
								onChange={handleCommentChange}
								value={comment}
							/>
							<button type='submit'>Reply</button>
						</form>
					</section>
					<section title='deleteComment'>
						<form onSubmit={e => deleteComment(e, { id: 3 })}>
							<button type='submit'>Delete</button>
						</form>
					</section>
				</>
			</main>
		</div>
	)
}

export async function getStaticProps() {
	const res = await fetch('http://localhost:3001/db')
	const data = await res.json()

	return {
		props: { data },
	}
}

