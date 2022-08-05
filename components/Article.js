import ArticleWrapper from './articleStyles'
export default function Article(props) {
	return <ArticleWrapper {...props}>{props.children}</ArticleWrapper>
}

