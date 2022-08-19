export default async function Fetcher(url, method = 'GET', body) {
	try {
		const fetchOptions = {
			method,
			headers: {
				'Content-Type': 'application/json',
			},
		}

		if (method !== 'GET' && method !== 'DELETE') {
			fetchOptions.body = JSON.stringify(body)
		}

		const response = await fetch(url, fetchOptions)

		const data = await response.json()

		return data
	} catch (error) {
		console.error(error)
	}
}

