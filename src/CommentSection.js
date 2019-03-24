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
`

export default function CommentSection({ card, comments, addComment }) {
  console.log('Comments')
  return (
    <div>
      {comments &&
        comments.map(comment => (
          <StyledComment key={comment._id}>
            <span>{dayjs().format('DD/MM/YYYY hh:mm')}</span>
            <StyledName>{comment.name}</StyledName>
            <p>{comment.message}</p>
          </StyledComment>
        ))}
      <CreateComment card={card} addComment={addComment} />
    </div>
  )
}
