import styled from 'styled-components'
const FormWrapper = styled.form`
	display: grid;
	justify-content: space-between;
	align-items: end;
	gap: 1rem;

	@media (min-width: 40rem) {
		grid-template-columns: 2.5rem 1fr auto;
		align-items: start;
	}
`
export default FormWrapper

