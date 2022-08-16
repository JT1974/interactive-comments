import styled from 'styled-components'
import CommentFormWrapper from './commentForm'
import CommentWrapper from './comment'
import FormWrapper from './form'
const TextAreaWrapper = styled.textarea.attrs(props => ({
	...props,
}))`
	width: 100%;
	min-height: 7rem;
	height: auto;
	padding: 1rem 1.5rem;
	border: 1px solid var(--lightGray);
	border-radius: 0.5rem;
	color: var(--grayishBlue);
	resize: none;
	font-family: var(--primaryFont);
	line-height: 1.5;
	cursor: pointer;
	outline: transparent;

	${CommentWrapper} & {
		grid-area: 2/1/3/4;
	}

	${CommentFormWrapper} & {
		grid-area: 1/1/2/3;
	}

	&:hover,
	&:focus {
		border-color: var(--darkBlue);
	}

	&:focus {
		cursor: text;
	}

	@media (min-width: 40rem) {
		${CommentWrapper} & {
			grid-area: 2/2/3/4;
		}

		${FormWrapper} & {
			grid-area: 1/2/3/3;
		}
	}
`
export default TextAreaWrapper

