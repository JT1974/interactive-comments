import styled from 'styled-components'

const Article = styled.article`
	display: grid;
	gap: 1rem;
	background: var(--white);
	border-radius: 0.5rem;
	padding: 1rem;
`
const Header = styled.div`
	grid-area: 1/1/2/4;
	display: flex;
	align-items: center;
	gap: 1rem;
	color: var(--grayishBlue);
`
const Image = styled.img`
	width: 2rem;

	@media screen and (min-width: 48rem) {
		width: 2.5rem;
	}
`
const User = styled.div`
	font-weight: 500;
	color: var(--darkBlue);
	display: flex;
	align-items: center;
	gap: 0.5rem;
`
const Buttons = styled.div`
	grid-area: 3/3/4/4;
	display: flex;
	justify-content: flex-end;
	gap: 1rem;
`
const Content = styled.div`
	grid-area: 2/1/3/4;
	color: var(--grayishBlue);
	line-height: 1.5;

	span {
		font-weight: 500;
		color: var(--moderateBlue);
	}
`
const Score = styled.div`
	grid-area: 3/1/4/2;
	width: max-content;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	color: var(--moderateBlue);
	font-weight: 500;
	background: var(--lightGray);
	padding: 0.5rem 1rem;
	border-radius: 0.5rem;
`
const ScoreBtn = styled.button`
	border: none;
	background: transparent;
	display: flex;

	img:hover + path {
		fill: var(--moderateBlue);
	}
`
const LinkBtn = styled.button`
	border: none;
	background: transparent;
	color: ${props => (props.primary ? 'var(--moderateBlue)' : 'var(--softRed)')};
	font-size: 1rem;
	font-weight: 500;
	display: flex;
	align-items: center;
	gap: 0.5rem;

	path {
		fill: ${props => (props.primary ? 'var(--moderateBlue)' : 'var(--softRed)')};
	}

	&:hover {
		color: ${props => (props.primary ? 'var(--lightGrayishBlue)' : 'var(--paleRed)')};

		path {
			fill: ${props => (props.primary ? 'var(--lightGrayishBlue)' : 'var(--paleRed)')};
		}
	}
`
const Badge = styled.span`
	padding: 0 6px 4px;
	border-radius: 2px;
	background: var(--moderateBlue);
	color: var(--white);
	font-size: 0.8rem;
	font-weight: 500;
`
export { Article, Header, Image, User, Buttons, Content, Score, ScoreBtn, LinkBtn, Badge }

