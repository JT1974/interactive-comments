import styled from 'styled-components'
const CommentFormWrapper = styled.section.attrs(() => ({
	height: '10rem',
}))`
	background: var(--white);
	border-radius: 0.5rem;
	padding: 1rem;
	min-height: 10rem;
	height: auto;

	@media (min-width: 40rem) {
		padding: 1.5rem;
	}
`
export default CommentFormWrapper

