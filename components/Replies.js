import StyledSection from './replyStyles'

export default function Replies({ id, children }) {
	return <StyledSection data-parent-id={id}>{children}</StyledSection>
}

