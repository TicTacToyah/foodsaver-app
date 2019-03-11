import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import CardsPage from './CardsPage'
import Create from './Create'
import uid from 'uid'
import { saveCardsToStorage } from './services'
import styled from 'styled-components'
export default function App() {
  const Nav = styled.nav`
    display: grid;
    grid-auto-flow: column;
    grid-gap: 2px;
  `

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

  useEffect(() => {
    saveCardsToStorage(cardData)
  }, [cardData])

  function addCard(data) {
    setCardData([...cardData, { ...data, _id: uid() }])
  }

  return (
    <Router>
      <React.Fragment>
        <Route
          exact
          path="/"
          render={() => <CardsPage cardData={cardData} />}
        />
        <Route path="/create" render={() => <Create onSubmit={addCard} />} />
        <Nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/create">Create</NavLink>
        </Nav>
      </React.Fragment>
    </Router>
  )
}
