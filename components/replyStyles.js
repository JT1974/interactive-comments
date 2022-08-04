import styled from 'styled-components'

const StyledSection = styled.section`
	padding-left: 1rem;
	border-left: 1px solid var(--lightGray);
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	gap: 1rem;

	@media screen and (min-width: 48rem) {
		margin-left: 2rem;
		padding-left: 2rem;
	}
`
export default StyledSection

