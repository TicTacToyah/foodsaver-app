import React from 'react'
import CreateComment from './CreateComment'

export default function CommentSection({ card, comments, addComment }) {
  return (
    <div>
      {comments &&
        comments.map(comment => (
          <div>
            <h6>{comment.name}</h6>
            <p>{comment.message}</p>
          </div>
        ))}
      <CreateComment card={card} addComment={addComment} />
    </div>
  )
}
