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
		setCommentId,
		userId,
		setUserId,
		currentUser,
		setCurrentUser,
		comments,
		setComments,
		postUser,
		reply,
		edit,
		del,
	} = useContext(Context)

	// get/create user id
	const getUserId = () => {
		// load user id from local storage
		let uId = localStorage.getItem('iac')

		// if no id in local storage
		if (!uId) {
			const nanoid = customAlphabet('1234567890abcdef', 12)

			// create user id
			uId = nanoid()

			// save it to local storage
			localStorage.setItem('iac', uId)
		}

		// set state variable
		setUserId(uId)

		return uId
	}

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
		setCommentId(getNextId(data.comments))

		return userComments
	}

	// save current user in state
	useEffect(() => setCurrentUser(data.currentUser), [])

	// save user comments in state
	useEffect(() => {
		// get user id
		const uId = getUserId()

		// get user data
		const userComments = getUserComments(uId)

		// set user comments
		setComments(userComments)
	}, [])

	// save new user data in database
	useEffect(() => {
		// if the user is not saved to the database yet, save it (comments only)
		if (currentUser && !userInDb(userId)) postUser()
	}, [currentUser])

	// set loaded state
	useEffect(() => {
		// turn off loaded state
		comments && setLoaded(true)
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
				{!loaded ? <Spinner /> : <Comments />}
				{loaded && !reply && !edit && <CommentForm />}
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

