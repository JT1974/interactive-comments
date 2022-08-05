import { useRouter } from 'next/router'

/* PATCH & DELETE handler */
export default async function handler(req, res) {
	// TODO: megtisztítani az inputot, nehogy scriptet küldjenek
	const { id } = req.query

	// NOTE: ha replies tömbbeli az id, akkor így nem találja meg
	// meg kell nézni, hogy mi a legfelsőbb szintű felmenője és azt kell update-elni!!!

	const response = await fetch(`http://localhost:3001/comments/${id}`, {
		method: req.method,
		headers: {
			'Content-Type': 'application/json',
		},
		body: req.body && JSON.stringify({ ...req.body }),
	})

	const comments = await response.json()

	res.status(response.status).json(comments)
}

