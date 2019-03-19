import React from 'react'
import CreateComment from './CreateComment'
import styled from 'styled-components'

const StyledComment = styled.div`
  font-family: Helvetica, sans-serif;
  background-color: #f8f8ff;
  border-radius: 5px;
  margin: 0 5% 1%;
  padding: 5px 10px;
`

export default function CommentSection({ card, comments, addComment }) {
  return (
    <div>
      {comments &&
        comments.map(comment => (
          <StyledComment key={comment._id}>
            <h4>{comment.name}</h4>
            <p>{comment.message}</p>
          </StyledComment>
        ))}
      <CreateComment card={card} addComment={addComment} />
    </div>
  )
}
