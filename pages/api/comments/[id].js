import { useRouter } from 'next/router'

/* PATCH & DELETE handler */
export default async function handler(req, res) {
	// TODO: megtisztítani az inputot, nehogy scriptet küldjenek
	const { id } = req.query

	//DEBUG
	console.log(id)

	// NOTE: ha replies tömbbeli az id, akkor így nem találja meg
	// meg kell nézni, hogy mi a legfelsőbb szintű felmenője és azt kell update-elni!!!

	const response = await fetch(`http://localhost:3001/comments/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ ...req.body }),
	})

	const comments = await response.json()

	res.status(response.status).json(comments)
}

