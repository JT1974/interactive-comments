import styled from 'styled-components'
const ModalWindow = styled.div`
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.5);
	display: grid;
	place-content: center;
	padding: 1rem;
`
const ModalInner = styled.div`
	max-width: 24rem;
	padding: 1.5rem;
	background: var(--white);
	border-radius: 0.5rem;
	display: grid;
	row-gap: 1rem;
	column-gap: 0.5rem;
`
const Title = styled.h2`
	grid-area: 1/1/2/3;
	font-size: 1.2rem;
	font-weight: 500;
	color: var(--darkBlue);
`
const Para = styled.p`
	grid-area: 2/1/3/3;
	color: var(--grayishBlue);
	line-height: 1.5;
`
const Button = styled.button`
	background: ${props => (props.primary ? 'var(--grayishBlue)' : 'var(--softRed)')};
	color: var(--white);
	padding: 1rem 1rem;
	border-radius: 0.5rem;
	border: none;
	width: 9rem;
	cursor: pointer;

	&:hover {
		background: ${props => (props.primary ? 'var(--darkBlue)' : 'var(--paleRed)')};
	}
`
export { ModalWindow, ModalInner, Title, Para, Button }

