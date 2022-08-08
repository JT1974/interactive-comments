import styled from 'styled-components'
const Container = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 99;
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(0, 0, 0, 0.9);
	flex-direction: column;
	gap: 2rem;
`
const Loader = styled.div`
	--count: ${props => props.count || 8};
	height: 2rem;
	width: 2rem;
	position: relative;
	-webkit-animation: spin 0.75s infinite steps(var(--count));
	animation: spin 0.75s infinite steps(var(--count));

	@-webkit-keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
`
const Tick = styled.span`
	--count: ${props => props.count || 8};
	--index: ${props => props.index || 0};

	position: absolute;
	height: 50%;
	width: 10%;
	border-radius: 25%;
	background: ${props => props.color || 'darkorange'};
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%) rotate(calc(((360 / var(--count)) * var(--index)) * 1deg)) translate(0, -125%);
	opacity: calc(var(--index) / var(--count));
`
const Loading = styled.span`
	font-size: 0.75rem;
	color: ${props => props.color || 'darkorange'};
	animation: pulse 3s infinite;

	@keyframes pulse {
		0% {
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
`
export { Container, Loader, Tick, Loading }

