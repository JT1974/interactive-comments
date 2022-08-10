import styled from 'styled-components'
import { CommentFormWrapper } from './commentForm'
const ImageWrapper = styled.img`
	width: 2rem;

	${CommentFormWrapper} & {
		grid-area: 2/1/3/2;
	}

	@media screen and (min-width: 48rem) {
		width: 2.5rem;
	}
`
export default ImageWrapper
