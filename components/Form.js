import FormWrapper from './styles/form'
export default function Form(props) {
	return <FormWrapper {...props}>{props.children}</FormWrapper>
}

