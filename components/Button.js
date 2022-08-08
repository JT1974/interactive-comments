import ButtonWrapper from './styles/button'

export default function Button(props) {
	return <ButtonWrapper {...props}>{props.children}</ButtonWrapper>
}

