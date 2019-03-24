import React, { useState } from 'react'
import styled from 'styled-components'

const StyledForm = styled.form`
  display: grid;
  grid-auto-rows: auto;
  margin-bottom: 5px;
  border-radius: 5px;
  margin: 0 5% 1%;
`
const StyledTextarea = styled.textarea`
  font-size: 0.8em;
  border-radius: 5px;
  border: lightgrey 1px solid;
  margin: 1% 0;
`

const StyledButton = styled.button`
  font-size: 0.8em;
  background: #1be5b6;
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
