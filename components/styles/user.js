import styled from 'styled-components'
const UserWrapper = styled.div`
	font-weight: 500;
	color: var(--darkBlue);
	display: flex;
	align-items: center;
	gap: 0.5rem;
`
const Badge = styled.span`
	padding: 0 6px 4px;
	border-radius: 2px;
	background: var(--moderateBlue);
	color: var(--white);
	font-size: 0.8rem;
	font-weight: 500;
`
export { UserWrapper, Badge }

