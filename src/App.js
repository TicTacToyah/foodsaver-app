import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import CardsPage from './CardsPage'
import Create from './Create'
import uid from 'uid'
import { saveCardsToStorage, getCardsFromStorage } from './services'
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
    setCardData([...cardData, { ...data, _id: uid(), comments: [] }])
    saveCardsToStorage([...getCardsFromStorage(), { ...data, _id: uid() }])
  }

  function addComment(commentData, card) {
    const index = cardData.findIndex(item => item === card)

    setCardData([
      ...cardData.slice(0, index),
      {
        ...cardData[index],
        ...cardData[index].comments.push({
          name: commentData.name,
          message: commentData.message,
        }),
      },
      ...cardData.slice(index + 1),
    ])
  }

  function deleteCard(cardData, card) {
    const index = cardData.findIndex(item => item === card)

    setCardData([...cardData.slice(0, index), ...cardData.slice(index + 1)])
  }

  return (
    <Router>
      <React.Fragment>
        <Route
          exact
          path="/"
          render={() => (
            <CardsPage
              cardData={cardData}
              addComment={addComment}
              deleteCard={deleteCard}
            />
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
