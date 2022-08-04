import styled from 'styled-components'
const Section = styled.section`
	background: var(--white);
	border-radius: 0.5rem;
	padding: 1rem;
`
const Form = styled.form`
	display: grid;
	justify-content: space-between;
	align-items: end;
	row-gap: 1rem;
`
const Image = styled.img`
	width: 2rem;
	grid-area: 2/1/3/2;

	@media screen and (min-width: 48rem) {
		width: 2.5rem;
	}
`
const TextArea = styled.textarea.attrs(() => ({
	name: 'comment',
	placeholder: 'Add a comment...',
}))`
	grid-area: 1/1/2/3;
	width: 100%;
	min-height: 7rem;
	height: auto;
	padding: 1rem 1.5rem;
	border: 1px solid var(--lightGray);
	border-radius: 0.5rem;
	color: var(--grayishBlue);
	resize: none;
	font-family: var(--primaryFont);
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
const Button = styled.button.attrs(() => ({
	type: 'submit',
}))`
	grid-area: 2/2/3/3;
	border: none;
	border-radius: 0.5rem;
	background: var(--moderateBlue);
	color: var(--white);
	padding: 1rem 0;
	font-weight: 500;
	cursor: pointer;

	&:hover {
		background: var(--lightGrayishBlue);
	}
`
export { Section, Image, Form, TextArea, Button }

