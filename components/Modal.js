import { useContext } from 'react'
import { Context } from '../lib/Context'
import { ModalWrapper, ModalInner, Title, Para, Button } from './styles/modal'

export default function Modal() {
	const { setDel, deleteComment } = useContext(Context)

	const closeModal = () => {
		document.getElementById('modal').style.display = 'none'
		setDel(null)
	}

	return (
		<ModalWrapper id='modal'>
			<ModalInner>
				<Title>Delete comment</Title>
				<Para>
					Are you sure you want to delete this comment? This will remove the comment and can't be undone.
				</Para>
				<Button primary onClick={closeModal}>
					NO, CANCEL
				</Button>
				<Button onClick={deleteComment}>YES, DELETE</Button>
			</ModalInner>
		</ModalWrapper>
	)
}

