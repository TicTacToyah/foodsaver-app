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
  margin: 1% 5% 1%;
  padding: 5px 10px;
  font-size: 0.9em;
`

const StyledDate = styled.div`
  font-family: Helvetica, sans-serif;
  color: #858585;
  font-size: 0.8em;
  justify-self: flex-end;
`

const StyledName = styled.h4`
  font-weight: bold;
  margin: 2px 4px;
  color: #76ca8f;
`
const StyledParagraph = styled.p`
  margin: 2px 4px;
  overflow-wrap: break-word;
`
const StyledButton = styled.button`
  color: #858585;
  font-size: 0.8em;
  justify-self: flex-start;
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
            <StyledDate>
              {dayjs(comment.date).format('DD.MM.YYYY HH:mm')}
            </StyledDate>
            <StyledName>{comment.name}:</StyledName>
            <StyledParagraph>{comment.message}</StyledParagraph>
          </StyledComment>
        ))}
      <CreateComment card={card} addComment={addComment} />
    </div>
  )
}
