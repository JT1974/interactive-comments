import styled from 'styled-components'
import CommentWrapper from './comment'
import FormWrapper from './form'
import ScoreWrapper from './score'
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

	${CommentWrapper} & {
		grid-area: 3/3/4/4;
	}

	${ScoreWrapper} & {
		border: none;
		background: transparent;
		display: flex;
		align-items: center;
		padding: 0.75rem 1rem;
		height: 100%;

		path {
			fill: var(--lightGrayishBlue);
		}

		&:hover {
			path {
				fill: var(--moderateBlue);
			}
		}
	}
`
export default ButtonWrapper

