import React, { useState } from 'react'
import styled from 'styled-components'
import CommentSection from './CommentSection'

const CardBody = styled.section`
  display: grid;
  grid-auto-rows: auto;
  background: #ffffff;
  box-shadow: 0px 15px 18px rgba(201, 201, 201, 0.5);
  margin-bottom: 28px;
  padding: 5px;
  border: rgba(201, 201, 201, 0.2) solid 1px;
`

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`

const CardInformation = styled.section`
  padding: 5px 10px;
`
const CardCategory = styled.h3`
  font-family: Helvetica;
  font-size: 1em;
  color: #858585;
`

const CardHeadline = styled.h2`
  font-family: Helvetica;
  color: #333333;
  font-style: normal;
  font-size: 1.4em;
`

const CardList = styled.ul`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  padding: 0;
  flex-direction: row;
`

const CardListItem = styled.li`
  display: inline-block;
  margin: 0 10px 10px 0;
  padding: 2px 6px;
  font-family: Helvetica, sans-serif;
  color: #858585;
`

const LocationIcon = styled.img`
  display: inline-block;
  height: 24px;
  width: 20px;
`

const NoseIcon = styled.img`
  display: inline-block;
  height: 24px;
  width: 20px;
`

const EyeIcon = styled.img`
  display: inline-block;
  height: 24px;
  width: 20px;
`
const StyledButton = styled.button`
  justify-self: end;
  background: transparent;
  border: none;
  width: 20%;
`
const CommentIcon = styled.img`
  height: 24px;
  width: 20px;
  margin-bottom: -4px;
  padding-left: 2px;
`
const DeleteIcon = styled.img`
  height: 24px;
  width: 20px;
`

const StyledDeleteButton = styled.button`
  justify-self: end;
  width: 20%;
  background: transparent;
  border: none;
`

export default function Card({
  card,
  image,
  category,
  title,
  location,
  smell,
  optic,
  comments,
  addComment,
  deleteCard,
  deleteComment,
}) {
  function countComments() {
    if (comments === undefined) {
      return 0
    } else {
      return comments.length
    }
  }

  const [isHidden, setIsHidden] = useState(false)

  return (
    <CardBody>
      <StyledDeleteButton onClick={deleteCard}>
        <DeleteIcon src={require('./images/round-delete-button.svg')} />
      </StyledDeleteButton>
      <CardImage src={image} />
      <CardInformation>
        <CardCategory>{category}</CardCategory>
        <CardHeadline>{title}</CardHeadline>
        <CardList>
          <LocationIcon src={require('./images/location-pin.svg')} alt="" />
          <CardListItem>{location}</CardListItem>
          <NoseIcon src={require('./images/aroma.svg')} alt="" />
          <CardListItem>{smell}</CardListItem>
          <EyeIcon src={require('./images/visibility.svg')} alt="" />
          <CardListItem>{optic}</CardListItem>
        </CardList>
      </CardInformation>
      <StyledButton onClick={() => setIsHidden(!isHidden)}>
        {countComments()}
        <CommentIcon src={require('./images/comment.svg')} alt="" />
      </StyledButton>
      {isHidden && (
        <CommentSection
          comments={comments}
          addComment={addComment}
          card={card}
          deleteComment={deleteComment}
        />
      )}
    </CardBody>
  )
}
