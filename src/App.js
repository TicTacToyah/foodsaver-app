import React, { useState } from 'react'
import Card from './Card'
import Create from './Create'
import uid from 'uid'
export default function App() {
  const [cardData, setCardData] = useState([
    {
      category: 'Frucht',
      title: 'Banane',
      location: 'St.Pauli',
      smell: 'Gut',
      optic: 'Gut',
      _id: uid(),
    },
    {
      category: 'Frucht',
      title: 'Erdbeere',
      location: 'Altona',
      smell: 'Okay',
      optic: 'Gut',
      _id: uid(),
    },
    {
      category: 'Gemüse',
      title: 'Gurke',
      location: 'Rahlstedt',
      smell: 'Sehr gut',
      optic: 'Gut',
      _id: uid(),
    },
  ])
  return (
    <React.Fragment>
      {cardData.map(card => (
        <Card
          category={card.category}
          title={card.title}
          location={card.location}
          smell={card.smell}
          optic={card.optic}
          key={card._id}
        />
      ))}
      <Create />
    </React.Fragment>
  )
}
