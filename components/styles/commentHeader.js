import styled from 'styled-components'
import CommentWrapper from './comment'
const CommentHeaderWrapper = styled.header`
	grid-area: 1/1/2/4;
	display: flex;
	align-items: center;
	gap: 1rem;
	color: var(--grayishBlue);

	@media (min-width: 40rem) {
		${CommentWrapper} & {
			grid-area: 1/2/2/4;
		}
	}
`
export default CommentHeaderWrapper

