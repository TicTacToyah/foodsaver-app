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
    background-color: grey;
    position: fixed;
    bottom: 0;
    width: 100%;
  `
  const StyledNavLink = styled(NavLink)`
    height: 48px;
    grid-auto-flow: column;
    font-family: Helvetica, sans-serif;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
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
        <div>HEADER</div>
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
