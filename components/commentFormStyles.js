import styled from 'styled-components'
const Section = styled.section`
	display: flex;
	align-items: flex-start;
	gap: 1rem;
	background: white;
	border-radius: 0.5rem;
	padding: 1.5rem;
`
const Image = styled.img`
	width: 2rem;
`
const Form = styled.form`
	width: 100%;
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	gap: 1rem;
`
const TextArea = styled.textarea.attrs(() => ({
	name: 'comment',
	placeholder: 'Add a comment...',
}))`
	width: 100%;
	padding: 0.5rem 1rem;
	border: 1px solid rgba(0, 0, 0, 0.1);
	border-radius: 0.4rem;
	min-height: 5rem;
	height: auto;
	color: rgba(0, 0, 0, 0.5);
	resize: none;
	font-family: sans-serif;
`
const Button = styled.button.attrs(() => ({
	type: 'submit',
}))`
	border: none;
	border-radius: 0.4rem;
	background: blue;
	color: white;
	padding: 0.6rem 1.2rem;
	font-size: 0.75rem;
	font-weight: bold;
`
export { Section, Image, Form, TextArea, Button }

