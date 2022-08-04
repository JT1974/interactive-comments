function getComments(comments) {
	if (comments.length === 0) return

	const commentArr = comments.map(comment => {
		return comment.replies.length === 0 ? comment : [comment, ...getComments(comment.replies)]
	})

	return commentArr.flatMap(comment => comment)
}

function getCommentIds(comments) {
	if (!comments || comments.length === 0) return

	const ids = comments.map(comment => {
		if (!comment.replies || comment.replies.length === 0) return +comment.id

		return [+comment.id, ...getCommentIds(comment.replies)]
	})

	return ids.flatMap(id => id)
}

function getNextId(comments) {
	return Math.max(...getCommentIds(comments)) + 1
}

export { getComments, getCommentIds, getNextId }

