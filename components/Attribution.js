import styled from 'styled-components'

const AttributionContainer = styled.div`
	width: 100%;
	margin: 0 auto;
	padding: 0.5rem 1rem;
	font-family: var(--attribution-font-family);
	font-size: 0.75rem;
	color: var(--attribution-text-color);
	text-align: center;
	text-transform: initial;

	a {
		font-family: var(--attribution-font-family);
		font-size: 0.75rem;
		font-weight: bold;
		color: var(--attribution-link-color);
		text-decoration: none;
		padding-left: 0.5em;
	}
`

export default function Attribution() {
	return (
		<AttributionContainer>
			Challenge by
			<a href='https://www.frontendmentor.io?ref=challenge' target='_blank' rel='noreferrer'>
				Frontend Mentor
			</a>
			. Coded by
			<a href='https://github.com/JT1974' target='_blank' rel='noreferrer'>
				Janos Takacs
			</a>
			.
		</AttributionContainer>
	)
}

