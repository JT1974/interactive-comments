import styled from 'styled-components'
import CommentWrapper from './comment'
const ScoreWrapper = styled.form`
	grid-area: 3/1/4/2;
	width: max-content;
	display: flex;
	justify-content: center;
	align-items: center;
	color: var(--moderateBlue);
	font-weight: 500;
	background: var(--lightGray);
	border-radius: 0.625rem;

	@media (min-width: 40rem) {
		${CommentWrapper} & {
			grid-area: 1/1/4/2;
			flex-direction: column;
			width: 2.25rem;
			gap: 0.5rem;
		}
	}
`
export default ScoreWrapper

