/* PATCH & DELETE handler */
export default async function handler(req, res) {
	// TODO: megtisztítani az inputot, nehogy scriptet küldjenek
	const { id } = req.query

	const response = await fetch(`${process.env.DB_URL}comments/${id}`, {
		method: req.method,
		headers: {
			'Content-Type': 'application/json',
		},
		body: req.body && JSON.stringify(req.body),
	})

	const comments = await response.json()

	res.status(response.status).json(comments)
}

