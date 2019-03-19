import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import CardsPage from './CardsPage'
import Create from './Create'
import uid from 'uid'
import { saveCardsToStorage, getCardsFromStorage } from './services'
<<<<<<< HEAD
import GlobalStyles from './GlobalStyles'
=======
>>>>>>> master
import styled from 'styled-components'
export default function App() {
  const Grid = styled.div`
    display: grid;
    grid-template-rows: auto 48px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  `

  const StyledNav = styled.nav`
    display: grid;
    grid-auto-flow: column;
    grid-gap: 2px;
    font-family: Helvetica, sans-serif;
    background-color: grey;
    font-style: grey;
    text-decoration: none;
  `
  const StyledNavLink = styled(NavLink)`
    font-family: Helvetica, sans-serif;
    text-decoration: none;
  `
  const [cardData, setCardData] = useState([
    {
      title: 'axel',
      _id: 'gfhdjdfhjd',
      location: 'dfdd',
      smell: 'Okay',
      optic: 'Bio-Tonne',
      category: 'Frucht',
      comments: [
        { name: 'toyah', message: 'lol' },
        { name: 'Toto', message: 'egeh' },
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
      <Grid>
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
        <StyledNav>
          <StyledNavLink to="/">Home</StyledNavLink>
          <StyledNavLink to="/create">Create</StyledNavLink>
        </StyledNav>
      </Grid>
    </Router>
  )
}
