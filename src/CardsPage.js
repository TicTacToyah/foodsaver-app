import React from 'react'
import Card from './Card'
import styled from 'styled-components'

const CardContainer = styled.section`
  display: grid;
  grid-auto-rows: auto;
  grid-gap: 10px;
  padding: ${window.location.pathname === '/filter'
    ? '150px 15px 50px 15px'
    : '52px 15px 50px 15px'};
`

export default function CardsPage({
  cardData,
  addComment,
  deleteCard,
  deleteComment,
}) {
  return (
    <CardContainer>
      {cardData.map(card => (
        <Card
          card={card}
          category={card.category}
          image={card.image}
          title={card.title}
          location={card.location}
          smell={card.smell}
          optic={card.optic}
          key={card._id}
          comments={card.comments}
          addComment={addComment}
          deleteCard={deleteCard}
          deleteComment={deleteComment}
        />
      ))}
    </CardContainer>
  )
}
