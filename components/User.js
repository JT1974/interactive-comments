import { UserWrapper, Badge } from './styles/user'

export default function User({ username, isUser }) {
	return (
		<UserWrapper>
			{username} {isUser && <Badge>you</Badge>}
		</UserWrapper>
	)
}

