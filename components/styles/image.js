import styled from 'styled-components'
import FormWrapper from './form'

const ImageWrapper = styled.img.attrs(() => ({
	width: '2rem',
	height: '2rem',
}))`
	width: 2rem;
	height: 2rem;

	@media (min-width: 40rem) {
		${FormWrapper} & {
			grid-area: 1/1/2/2;
			width: 2.5rem;
			height: 2.5rem;
		}
	}
`
export default ImageWrapper

