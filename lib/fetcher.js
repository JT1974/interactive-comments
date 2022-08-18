export default async function Fetcher(url, method = 'GET', bodyObj = null) {
	try {
		const response = await fetch(url, {
			method,
			headers: {
				'Content-Type': 'application/json',
			},
			body: bodyObj && JSON.stringify(bodyObj),
		})

		const data = await response.json()

		return data
	} catch (error) {
		console.log('Data fetching error')
	}
}

