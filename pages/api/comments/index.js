import Fetcher from '../../../lib/fetcher'

/* POST user */
export default async function handler(req, res) {
	try {
		const response = await Fetcher(`${process.env.DB_URL}/comments/`, req.method, req.body)
		res.status(201).json(response)
	} catch (error) {
		console.log(error)
	}
}

