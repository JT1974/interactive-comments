import Head from 'next/head'
import { useEffect, useContext } from 'react'
import { Context } from '../lib/Context'
import styles from '../styles/css/Home.module.css'
import Fetcher from '../lib/fetcher'
import Attribution from '../components/Attribution'
import CommentForm from '../components/CommentForm'
import Comments from '../components/Comments'
import Modal from '../components/Modal'

export default function Home({ data }) {
	const { setCurrentUser, setComments, reply, edit, del } = useContext(Context)

	useEffect(() => {
		setCurrentUser(data.currentUser)
		setComments(data.comments)
	}, [])

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
			</main>
			{del && <Modal />}
		</div>
	)
}

export async function getStaticProps() {
	// 1. does the user have a key in the local storage?

	// 2. load / create one

	// 3. if loaded, load the corresponding database TODO update below code
	const data = await Fetcher(`${process.env.DB_URL}db/`)

	// 4. if created, save the key to the local storage

	// 5. if created, load the original database

	// 6. if created, first time, when the user saves anything, save the whole database under the new key (if database does not exist with that key, create it with the whole content, otherwise just update it) --> do it on the first change, and not automatically at the start, because the user may not even bother changing anything

	return {
		props: { data },
	}
}

