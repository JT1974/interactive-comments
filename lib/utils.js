function getComments(comments) {
	if (!comments || comments.length === 0) return

	const commentArr = comments.map(comment => {
		return !comment.replies || comment.replies.length === 0 ? comment : [comment, ...getComments(comment.replies)]
	})

	return commentArr.flatMap(comment => comment)
}

function getCommentIds(comments) {
	const ids = comments.map(comment => {
		if (!comment.replies || comment.replies.length === 0) return +comment.id

		return [+comment.id, ...getCommentIds(comment.replies)]
	})

	return ids.flatMap(id => id)
}

function getNextId(comments) {
	if (!comments || comments.length === 0) return

	return Math.max(...getCommentIds(comments)) + 1
}

export { getComments, getCommentIds, getNextId }

