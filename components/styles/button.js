import styled from 'styled-components'
import ArticleWrapper from './article'
import FormWrapper from './form'
const ButtonWrapper = styled.button.attrs(() => ({
	type: 'submit',
}))`
	border: none;
	border-radius: 0.5rem;
	background: var(--moderateBlue);
	color: var(--white);
	padding: 1rem 1.5rem;
	width: max-content;
	justify-self: end;
	font-weight: 500;
	cursor: pointer;

	&:hover {
		background: var(--lightGrayishBlue);
	}

	${FormWrapper} & {
		grid-area: 2/2/3/3;
	}

	${ArticleWrapper} & {
		grid-area: 3/3/4/4;
	}
`
export default ButtonWrapper

