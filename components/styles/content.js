import styled from 'styled-components'
import CommentWrapper from './comment'
const ContentWrapper = styled.div`
	grid-area: 2/1/3/4;
	color: var(--grayishBlue);
	line-height: 1.5;
	overflow-wrap: anywhere;

	span {
		font-weight: 500;
		color: var(--moderateBlue);
	}

	@media (min-width: 40rem) {
		${CommentWrapper} & {
			grid-area: 2/2/4/4;
		}
	}
`
export default ContentWrapper

