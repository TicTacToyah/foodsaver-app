import React from 'react'
import Card from './Card'

export default function CardsPage({ cardData }) {
  return (
    <div>
      {cardData.map(card => (
        <Card
          category={card.category}
          image={card.imageURL}
          title={card.title}
          location={card.location}
          smell={card.smell}
          optic={card.optic}
          key={card._id}
          comment={card.comment}
        />
      ))}
    </div>
  )
}
