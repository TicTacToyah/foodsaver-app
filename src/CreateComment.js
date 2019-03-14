import React, { useState } from 'react'

export default function Comment() {
  const defaultComment = {
    name: '',
    comment: '',
  }

  function submitHandler(event) {
    event.preventDefault()
    //addCard(commentData)
    setCommentData(defaultComment)
  }

  function onInputChange(event) {
    setCommentData({ ...commentData, [event.target.name]: event.target.value })
  }

  const [commentData, setCommentData] = useState(defaultComment)
  return (
    <form action="" onSubmit={submitHandler}>
      <input type="text" name="name" />
      <textarea
        name="comment"
        cols="30"
        rows="10"
        placeholder="Add your Comment"
        value={commentData.comment}
        type="text"
        onChange={onInputChange}
      />
      <button>Send Comment</button>
    </form>
  )
}
