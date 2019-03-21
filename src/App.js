import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import CardsPage from './CardsPage'
import Create from './Create'
import uid from 'uid'
import { saveCardsToStorage, getCardsFromStorage } from './services'
import GlobalStyles from './GlobalStyles'
import styled from 'styled-components'
export default function App() {
  const Grid = styled.div`
    display: grid;
    grid-template-rows: 48px auto 48px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  `

  const StyledNav = styled.nav`
    display: grid;
    grid-auto-flow: column;
    font-family: Helvetica, sans-serif;
    background-color: rgba(187, 187, 187, 0.4);
    position: fixed;
    bottom: 0;
    width: 100%;
  `
  const StyledNavLink = styled(NavLink)`
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Helvetica, sans-serif;
    text-decoration: none;
    border: solid white 2px;
    color: white;
  `
  const StyledHeader = styled.div`
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    background-color: rgba(187, 187, 187, 0.4);
    justify-content: center;
    align-items: center;
    width: 100%;
    border: solid white 2px;
    color: white;
    font-family: Helvetica, sans-serif;
  `

  const [cardData, setCardData] = useState([
    {
      title: 'Banane',
      _id: 'gfhdjdfhjd',
      location: 'dfdd',
      smell: 'Okay',
      optic: 'Bio-Tonne',
      category: 'Frucht',
      comments: [
        { name: 'Toyah', message: 'Ich möchte die Banane gern abholen' },
        { name: 'Alex', message: 'Wunderbar' },
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
          _id: uid(),
        }),
      },
      ...cardData.slice(index + 1),
    ])
  }

  function deleteCard(card) {
    const index = cardData.findIndex(item => item === card)

    setCardData([...cardData.slice(0, index), ...cardData.slice(index + 1)])
  }

  return (
    <Router>
      <Grid>
        <StyledHeader>Foodsaver</StyledHeader>
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
