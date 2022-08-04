import '../styles/css/golbals.css'
import { ContextProvider } from '../lib/Context'

function InteractiveComments({ Component, pageProps }) {
	return (
		<ContextProvider>
			<Component {...pageProps} />
		</ContextProvider>
	)
}

export default InteractiveComments

