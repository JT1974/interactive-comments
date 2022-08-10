import styled from 'styled-components'
const CommentsWrapper = styled.section.attrs(() => {
	id: 'comments'
})`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	gap: 1rem;
`
export default CommentsWrapper

