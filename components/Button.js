import ButtonWrapper from './buttonStyles'

export default function Button(props) {
	return <ButtonWrapper {...props}>{props.children}</ButtonWrapper>
}

