export default async function Fetcher(url, method = 'GET', bodyObj = null) {
	const response = await fetch(url, {
		method,
		headers: {
			'Content-Type': 'application/json',
		},
		body: bodyObj && JSON.stringify(bodyObj),
	})

	return response.json()
}

