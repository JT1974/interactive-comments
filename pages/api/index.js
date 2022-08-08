/* POST handler */
export default async function handler(req, res) {
	// TODO: megtisztítani az inputot, nehogy scriptet küldjenek

	const response = await fetch(`${process.env.DB_URL}comments/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ ...req.body }),
	})

	const comments = await response.json()

	res.status(response.status).json(comments)
}

