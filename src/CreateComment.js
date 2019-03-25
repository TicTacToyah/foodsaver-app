import React, { useState } from 'react'
import styled from 'styled-components'

const StyledForm = styled.form`
  display: grid;
  grid-auto-rows: auto;
  margin-bottom: 5px;
  border-radius: 5px;
  margin: 2% 5% 1%;
`
const StyledInput = styled.input`
  font-size: 1em;
  border-radius: 5px;
  border: lightgrey 1px solid;
`

const StyledTextarea = styled.textarea`
  font-size: 1em;
  border-radius: 5px;
  border: lightgrey 1px solid;
  margin: 1% 0;
`

const StyledButton = styled.button`
  width: 50%;
  justify-self: center;
  font-size: 1.2em;
  background: #76ca8f;
  border: none;
  border-radius: 5px;
  color: #333333;
  font-style: bold;
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
      <StyledInput
        onChange={onInputChange}
        type="text"
        name="name"
        value={commentData.name}
        placeholder="Dein Name"
        maxLength="20"
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
