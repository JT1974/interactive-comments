import React from 'react'
import '../styles/css/golbals.css'
import { ContextProvider } from '../lib/Context'

function InteractiveComments({ Component, pageProps }) {
	return (
		<React.StrictMode>
			<ContextProvider>
				<Component {...pageProps} />
			</ContextProvider>
		</React.StrictMode>
	)
}

export default InteractiveComments

