/* POST user */
export default async function handler(req, res) {
	// TODO: megtisztítani az inputot, nehogy scriptet küldjenek

	const response = await fetch(`${process.env.DB_URL}/comments/`, {
		method: req.method,
		headers: {
			'Content-Type': 'application/json',
		},
		body: req.body && JSON.stringify(req.body),
	})

	const comments = await response.json()

	res.status(response.status).json(comments)
}

