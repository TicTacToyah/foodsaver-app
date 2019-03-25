import React from 'react'
import Card from './Card'
import styled from 'styled-components'

const CardContainer = styled.section`
  display: grid;
  grid-auto-rows: auto;
  grid-gap: 10px;
  padding: 0 15px 29px 15px;
`

export default function CardsPage({ cardData, addComment, deleteCard }) {
  console.log(cardData, 'Cards Page')
  return (
    <CardContainer>
      {cardData.map(card => (
        <Card
          card={card}
          category={card.category}
          image={card.imageURL}
          title={card.title}
          location={card.location}
          smell={card.smell}
          optic={card.optic}
          key={card._id}
          comments={card.comments}
          addComment={addComment}
          deleteCard={() => deleteCard(card)}
        />
      ))}
    </CardContainer>
  )
}
