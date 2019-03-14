import React from 'react'
import Comment from './CreateComment'

export default function CommentSection({ commentData }) {
  return (
    <div>
      {commentData.map(comments => (
        <Comment name={comments.name} content={comments.content} />
      ))}
    </div>
  )
}
