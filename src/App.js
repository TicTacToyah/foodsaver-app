import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import CardsPage from './CardsPage'
import Create from './Create'
import uid from 'uid'
import {
  saveCardsToStorage,
  getCardsFromStorage,
  upload,
  onImageSave,
} from './services'
import styled from 'styled-components'
export default function App() {
  const Nav = styled.nav`
    display: grid;
    grid-auto-flow: column;
    grid-gap: 2px;
  `

  const [cardData, setCardData] = useState([
    {
      title: 'axel',
      location: 'dfdd',
      smell: 'Okay',
      optic: 'Bio-Tonne',
      category: 'Frucht',
      comments: [
        { name: 'toyah', message: 'lol' },
        { name: 'lutz', message: 'egeh' },
      ],
    },
  ])

  // useEffect(() => {
  //   saveCardsToStorage(cardData)
  // }, [cardData])

  useEffect(() => {
    setCardData([...cardData, ...getCardsFromStorage()])
  }, [])

  function addCard(data) {
    setCardData([...cardData, { ...data, _id: uid() }])
    saveCardsToStorage([...getCardsFromStorage(), { ...data, _id: uid() }])
  }

  function addComment(commentData) {
    setCardData([...cardData, { ...commentData }])
  }

  return (
    <Router>
      <React.Fragment>
        <Route
          exact
          path="/"
          render={() => (
            <CardsPage cardData={cardData} addComment={addComment} />
          )}
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
