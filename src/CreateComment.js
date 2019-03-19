import React, { useState } from 'react'
import styled from 'styled-components'

const StyledForm = styled.form`
  margin-bottom: 5px;
  border: #ff6347 1px solid;
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
      <textarea
        name="message"
        cols="30"
        rows="5"
        placeholder="Schreibe einen Kommentar"
        value={commentData.message}
        type="text"
        onChange={onInputChange}
      />
      <button>Send Comment</button>
    </StyledForm>
  )
}
