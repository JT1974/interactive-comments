import styled from 'styled-components'
const Header = styled.div`
	grid-area: 1/1/2/4;
	display: flex;
	align-items: center;
	gap: 1rem;
	color: var(--grayishBlue);
`
const Image = styled.img`
	width: 2rem;

	@media screen and (min-width: 48rem) {
		width: 2.5rem;
	}
`
const Buttons = styled.div`
	grid-area: 3/3/4/4;
	display: flex;
	justify-content: flex-end;
	gap: 1rem;
`
const Content = styled.div`
	grid-area: 2/1/3/4;
	color: var(--grayishBlue);
	line-height: 1.5;

	span {
		font-weight: 500;
		color: var(--moderateBlue);
	}
`
const ContentUpdate = styled.textarea.attrs(() => ({
	name: 'commentUpdate',
}))`
	grid-area: 2/1/3/4;
	width: 100%;
	min-height: 7rem;
	height: auto;
	padding: 1rem 1.5rem;
	border: 1px solid var(--lightGray);
	border-radius: 0.5rem;
	color: var(--grayishBlue);
	resize: none;
	font-family: var(--primaryFont);
	line-height: 1.5;
	cursor: pointer;
	outline: transparent;

	&:hover,
	&:focus {
		border-color: var(--darkBlue);
	}

	&:focus {
		cursor: text;
	}
`
const LinkBtn = styled.button`
	border: none;
	background: transparent;
	color: ${props => (props.primary ? 'var(--moderateBlue)' : 'var(--softRed)')};
	font-size: 1rem;
	font-weight: 500;
	display: flex;
	align-items: center;
	gap: 0.5rem;

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
export { Header, Image, Buttons, Content, ContentUpdate, LinkBtn }

