import React, { useState } from 'react'
import styled from 'styled-components'

const StyledForm = styled.form`
  margin-bottom: 5px;
  border: #ff6347 1px solid;
`
const StyledTextarea = styled.textarea`
  font-size: 0.8em;
`

const StyledButton = styled.button`
  font-size: 0.8em;
  background: #ff6347;
  border-radius: 5px;
`
export default function Comment({ addComment, card }) {
  const defaultComment = {
    name: '',
    message: '',
  }
  function submitHandler(event) {
    event.preventDefault()
    console.log(addComment)
    addComment(commentData, card)
    setCommentData(defaultComment)
  }

  function onInputChange(event) {
    setCommentData({ ...commentData, [event.target.name]: event.target.value })
  }

  const [commentData, setCommentData] = useState(defaultComment)

  return (
    <StyledForm onSubmit={submitHandler}>
      <input
        onChange={onInputChange}
        type="text"
        name="name"
        value={commentData.name}
        placeholder="Dein Name"
      />
      <StyledTextarea
        name="message"
        cols="30"
        rows="5"
        placeholder="Schreibe einen Kommentar"
        value={commentData.message}
        type="text"
        onChange={onInputChange}
        maxLength="200"
      />
      <StyledButton>Abschicken</StyledButton>
    </StyledForm>
  )
}
