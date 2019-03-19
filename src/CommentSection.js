import React from 'react'
import CreateComment from './CreateComment'

export default function CommentSection({ card, comments, addComment }) {
  return (
    <div>
      {comments &&
        comments.map(comment => (
          <div>
            <h3>{comment.name}</h3>
            <p>{comment.message}</p>
          </div>
        ))}
      <CreateComment card={card} addComment={addComment} />
    </div>
  )
}
