import styled from 'styled-components'

const LinkBtn = styled.button`
	border: none;
	background: transparent;
	color: ${props => (props.primary ? 'var(--moderateBlue)' : 'var(--softRed)')};
	font-size: 1rem;
	font-weight: 500;
	display: flex;
	align-items: center;
	gap: 0.5rem;
	cursor: pointer;

	path {
		fill: ${props => (props.primary ? 'var(--moderateBlue)' : 'var(--softRed)')};
	}

	&:hover {
		color: ${props => (props.primary ? 'var(--lightGrayishBlue)' : 'var(--paleRed)')};

		path {
			fill: ${props => (props.primary ? 'var(--lightGrayishBlue)' : 'var(--paleRed)')};
		}
	}
`
export default LinkBtn

