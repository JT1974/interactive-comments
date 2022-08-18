import Fetcher from '../../../lib/fetcher'

/* POST comment */
export default async function handler(req, res) {
	const { id } = req.query
	const url = `${process.env.DB_URL}/comments/${id}`

	try {
		const response = await Fetcher(url, req.method, req.body)
		res.status(201).json(response)
	} catch (error) {
		console.log(error)
	}
}

