import { useState, useEffect, useContext } from 'react'
import { Context } from '../lib/Context'
import { customAlphabet } from 'nanoid'
import Fetcher from '../lib/fetcher'
import styles from '../styles/css/Home.module.css'
import Head from 'next/head'
import Attribution from '../components/Attribution'
import Comments from '../components/Comments'
import CommentForm from '../components/CommentForm'
import Modal from '../components/Modal'
import Spinner from '../components/Spinner'
import { getNextId } from '../lib/utils'

export default function Home({ data }) {
	const [loaded, setLoaded] = useState(false)
	const {
		getUserId,
		setCommentId,
		userId,
		currentUser,
		setCurrentUser,
		comments,
		setComments,
		postUser,
		reply,
		edit,
		del,
	} = useContext(Context)

	// get user data from database (or an empty array)
	const getUserFromDb = id => data.comments.filter(comment => comment.userId === id)

	// is the user saved in the database
	const userInDb = id => getUserFromDb(id).length

	// get default comments, and add user id
	const getDefaultData = id => {
		// get default data (without user id)
		const defaultData = getUserFromDb(undefined)

		// get next available comment id (from the entire array, not only defaults)
		let nextId = getNextId(data.comments)

		// create new comments array
		const userComments = defaultData.map(comment => ({
			...comment,
			id: nextId++,
			replies:
				comment?.replies.map(reply => ({
					...reply,
					id: nextId++,
				})) || [],
			userId: id,
		}))

		return userComments
	}

	// get/create user data
	const getUserComments = id => {
		let userComments

		if (userInDb(id)) {
			// if the user already has comments in the database, get them
			userComments = getUserFromDb(id)
		} else {
			// if the user does not have comments, save the default ones with the user id
			userComments = getDefaultData(id)
		}

		// set next available comment id in state
		// setCommentId(getNextId(data.comments))

		return userComments
	}

	// save current user in state
	// useEffect(() => setCurrentUser(data.currentUser), [])

	// save user comments in state
	useEffect(() => {
		if (comments.length === 0) {
			// get user id
			const uId = getUserId()

			// get user data
			const userComments = getUserComments(uId)

			// save current user in state
			setCurrentUser(data.currentUser)

			// set user comments
			if (userInDb(uId)) {
				setComments([...data.comments])
			} else {
				// if the user is not saved to the database yet, save it (comments only)
				postUser(userComments)

				setComments([...data.comments, ...userComments])
			}

			// set loaded state
			setLoaded(true)
		}
	}, [])

	// save new user data in database
	useEffect(() => {
		// if the user is not saved to the database yet, save it (comments only)
		if (currentUser && !userInDb(userId)) {
			//postUser()
			//DEBUG
			// console.log('user should be posted now')
		}
	}, [currentUser])

	// set loaded state
	useEffect(() => {
		// comments && setLoaded(true)

		// set next available comment id in state
		setCommentId(getNextId(comments))
	}, [comments])

	return (
		<div className={styles.container}>
			<Head>
				<link rel='icon' href='/images/favicon-32x32.png' />
				<title>Interactive Comments - Frontend Mentor challenge</title>
			</Head>

			<header className={styles.header}>
				<h1 className={styles.title}>
					<Attribution />
				</h1>
			</header>

			<main className={styles.main}>
				<Comments />
				{!reply && !edit && <CommentForm />}
				{!loaded && <Spinner />}
				{/* {!loaded ? <Spinner /> : <Comments />}
				{loaded && !reply && !edit && <CommentForm />} */}
			</main>
			{del && <Modal />}
		</div>
	)
}

export async function getStaticProps() {
	const data = await Fetcher(`${process.env.DB_URL}/db/`)

	return {
		props: { data },
	}
}

