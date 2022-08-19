import { useState, useEffect, useContext, Suspense } from 'react'
import { Context } from '../lib/Context'
import Fetcher from '../lib/fetcher'
import styles from '../styles/css/Home.module.css'
import Head from 'next/head'
import Attribution from '../components/Attribution'
import Comments from '../components/Comments'
import CommentForm from '../components/CommentForm'
import Modal from '../components/Modal'
import { getNextId } from '../lib/utils'

export default function Home({ data }) {
	const { setUserComments, setCommentId, setCurrentUser, comments, reply, edit, del } = useContext(Context)
	const defaultComments = data.comments?.filter(comment => !comment.userId)
	const userComments = comments || defaultComments

	useEffect(() => {
		const nextCommentId = getNextId(data.comments)

		setCurrentUser(data.currentUser)
		setCommentId(nextCommentId)
		setUserComments(data.comments)
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
				<Comments comments={userComments} reply={reply} />
				{!reply && !edit && <CommentForm />}
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

