import { ModalWindow, ModalInner, Title, Para, Button } from './modalStyles'

export default function Modal() {
	return (
		<ModalWindow>
			<ModalInner>
				<Title>Delete comment</Title>
				<Para>
					Are you sure you want to delete this comment? This will remove the comment and can't be undone.
				</Para>
				<Button primary>NO, CANCEL</Button>
				<Button>YES, DELETE</Button>
			</ModalInner>
		</ModalWindow>
	)
}

