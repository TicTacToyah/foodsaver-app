import React from 'react'
import CreateComment from './CreateComment'
import styled from 'styled-components'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const StyledComment = styled.div`
  display: grid;
  grid-auto-rows: auto;
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
const StyledButton = styled.button`
  justify-self: end;
  width: 10%;
  background: transparent;
  border: none;
`

export default function CommentSection({
  card,
  comments,
  addComment,
  deleteComment,
}) {
  return (
    <div>
      {comments &&
        comments.map(comment => (
          <StyledComment key={comment._id}>
            <StyledButton onClick={() => deleteComment(card, comment)}>
              X
            </StyledButton>
            {dayjs(comment.date).format('DD.MM.YYYY HH:mm')}
            <StyledName>{comment.name}</StyledName>
            <p>{comment.message}</p>
          </StyledComment>
        ))}
      <CreateComment card={card} addComment={addComment} />
    </div>
  )
}
