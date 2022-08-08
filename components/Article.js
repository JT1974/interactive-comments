import ArticleWrapper from './styles/article'
export default function Article(props) {
	return <ArticleWrapper {...props}>{props.children}</ArticleWrapper>
}

