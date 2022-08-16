import styled from 'styled-components'
import CommentWrapper from './comment'
const LinkButtonsWrapper = styled.div`
	grid-area: 3/3/4/4;
	display: flex;
	justify-content: flex-end;
	gap: 1rem;

	@media (min-width: 40rem) {
		${CommentWrapper} & {
			grid-area: 1/3/2/4;
		}
	}
`
export default LinkButtonsWrapper

