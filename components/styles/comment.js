import styled from 'styled-components'
const CommentWrapper = styled.article`
	display: grid;
	justify-content: space-between;
	align-items: start;
	gap: 1rem;
	background: var(--white);
	border-radius: 0.5rem;
	padding: 1rem;

	@media (min-width: 40rem) {
		padding: 1.5rem;
		grid-template-columns: auto 1fr auto;
	}
`
export default CommentWrapper

