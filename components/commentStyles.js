import styled from 'styled-components'

const Article = styled.article`
	display: flex;
	align-items: flex-start;
	gap: 1.5rem;
	background: white;
	border-radius: 0.5rem;
	padding: 1.5rem;
`
const Data = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 1rem;
`
const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`
const HeaderData = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
	color: rgba(0, 0, 0, 0.5);
`
const Image = styled.img`
	width: 2rem;
`
const User = styled.div`
	font-weight: bold;
	color: rgba(0, 0, 0, 0.85);
	display: flex;
	align-items: center;
	gap: 0.5rem;
`
const Buttons = styled.div`
	display: flex;
	gap: 1rem;
`
const Content = styled.div`
	color: rgba(0, 0, 0, 0.5);

	span {
		font-weight: bold;
		color: blue;
	}
`
const Score = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;
	color: blue;
	font-weight: bold;
	background: rgba(0, 0, 0, 0.05);
	padding: 0.4rem;
	border-radius: 0.5rem;
`
const ScoreBtn = styled.button`
	border: none;
	background: transparent;
	color: rgba(0, 0, 0, 0.25);
	font-size: 1rem;
	font-weight: bold;
`
const LinkBtn = styled.button`
	border: none;
	background: transparent;
	color: ${props => (props.primary ? 'blue' : 'red')};
	font-size: 1rem;
	font-weight: bold;
`
const Badge = styled.span`
	padding: 1px 5px 3px 5px;
	border-radius: 2px;
	background: blue;
	color: white;
	font-size: 0.75rem;
	font-weight: bold;
	line-height: 1;
`
export { Article, Data, Header, HeaderData, Image, User, Buttons, Content, Score, ScoreBtn, LinkBtn, Badge }

