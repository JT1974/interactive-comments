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
	const data = await Fetcher('http://localhost:3001/db')

	return {
		props: { data },
	}
}

