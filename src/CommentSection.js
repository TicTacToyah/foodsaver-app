import React from 'react'
import CreateComment from './CreateComment'
import styled from 'styled-components'
import dayjs from 'dayjs'
const StyledComment = styled.div`
  font-family: Helvetica, sans-serif;
  background-color: #f8f8ff;
  border-radius: 5px;
  margin: 0 5% 1%;
  padding: 5px 10px;
  font-size: 0.8em;
`
const StyledName = styled.h4`
  font-weight: normal;
  margin: 0;
`

export default function CommentSection({ card, comments, addComment }) {
  return (
    <div>
      {comments &&
        comments.map(comment => (
          <StyledComment key={comment._id}>
            {dayjs(comment.date).format('DD/MM/YYYY hh:mm')}
            <StyledName>{comment.name}</StyledName>
            <p>{comment.message}</p>
          </StyledComment>
        ))}
      <CreateComment card={card} addComment={addComment} />
    </div>
  )
}
