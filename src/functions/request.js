const request = (endpoint, method = 'GET', body = {}) => {
	const url = new URL(process.env.REACT_APP_API_URL + 'data/' + endpoint)
	let options = {}
	if(!!method.match(/^POST$/i)){
		options = {
			method,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body)
		}
	} else {
		Object.keys(body).forEach(key => url.searchParams.append(key, body[key]))
	}
	return fetch(url, options)
		.then(res => Promise.resolve(res.json()))
		.catch(err => Promise.reject(err))
}

export const postRequest = (endpoint, body) => {
	return request(endpoint, 'POST', body)
}

export const getRequest = (endpoint, body) => {
	return request(endpoint, 'GET', body)
}