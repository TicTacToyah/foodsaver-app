import React from 'react'
import styled from 'styled-components'
import CommentSection from './CommentSection'

const CardBody = styled.section`
  background: #f2f2f2;
  box-shadow: 0px 15px 18px rgba(201, 201, 201, 0.5);
  margin: 15px 0;
`

const CardImage = styled.img`
  width: 100%;
`

const CardInformation = styled.section`
  padding: 5px 10px;
`
const CardCategory = styled.h3`
  font-family: Helvetica;
  font-size: 0.8em;
  color: #9e9e9e;
`

const CardHeadline = styled.h2`
  font-family: Helvetica;
  color: #333333;
  font-style: normal;
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
  font-size: 0.8em;
  color: #9e9e9e;
`

const LocationIcon = styled.img`
  display: inline-block;
  height: 20px;
  width: 16px;
`

const NoseIcon = styled.img`
  display: inline-block;
  height: 20px;
  width: 16px;
`

const EyeIcon = styled.img`
  display: inline-block;
  height: 20px;
  width: 16px;
`

export default function Card({
  card,
  category,
  title,
  location,
  smell,
  optic,
  comments,
  addComment,
}) {
  return (
    <CardBody>
      <CardImage src={require('./images/Braune_Bananen_verwerten.jpg')} />
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
      <CommentSection comments={comments} addComment={addComment} card={card} />
    </CardBody>
  )
}
