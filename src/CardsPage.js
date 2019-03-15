import React from 'react'
import Card from './Card'

export default function CardsPage({ cardData, addComment, deleteCard }) {
  return (
    <div>
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
          deleteCard={deleteCard}
        />
      ))}
    </div>
  )
}
