import React, { useState } from 'react'

export default function Comment({ addComment, card }) {
  const defaultComment = {
    name: '',
    comment: '',
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
    <form action="" onSubmit={submitHandler}>
      <input
        onChange={onInputChange}
        type="text"
        name="name"
        value={commentData.name}
      />
      <textarea
        name="message"
        cols="30"
        rows="10"
        placeholder="Add your Comment"
        value={commentData.message}
        type="text"
        onChange={onInputChange}
      />
      <button>Send Comment</button>
    </form>
  )
}
