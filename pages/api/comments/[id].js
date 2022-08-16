/* POST comment */
export default async function handler(req, res) {
	// TODO: megtisztítani az inputot, nehogy scriptet küldjenek
	const { id } = req.query

	const url = `${process.env.DB_URL}/comments/${id}`

	const response = await fetch(url, {
		method: req.method,
		headers: {
			'Content-Type': 'application/json',
		},
		body: req.body && JSON.stringify(req.body),
	})

	const comments = await response.json()

	res.status(response.status).json(comments)
}
