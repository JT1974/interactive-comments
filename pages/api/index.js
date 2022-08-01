/* POST handler */
export default async function handler(req, res) {
	// TODO: megtisztítani az inputot, nehogy scriptet küldjenek

	const response = await fetch('http://localhost:3001/comments', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ ...req.body }),
	})

	const comments = await response.json()

	res.status(response.status).json(comments)
}

