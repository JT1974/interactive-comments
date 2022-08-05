import FormWrapper from './formStyles'
export default function Form(props) {
	return <FormWrapper {...props}>{props.children}</FormWrapper>
}

