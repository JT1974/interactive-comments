import { Container, Loader, Tick, Loading } from './styles/spinner'

export default function Spinner({ color = 'darkorange' }) {
	const tickNum = 8
	const ticks = new Array(tickNum).fill(0)
	const spinner = ticks.map((tick, idx) => <Tick key={idx} index={idx} count={tickNum} color={color} />)

	return (
		<Container>
			<Loader count={tickNum}>{spinner}</Loader>
			<Loading color={color}>Loading...</Loading>
		</Container>
	)
}

