import ContentWrapper from './styles/content'
export default function Content({ prefix, content }) {
	return (
		<ContentWrapper>
			<span>{prefix}</span>
			{content}
		</ContentWrapper>
	)
}

