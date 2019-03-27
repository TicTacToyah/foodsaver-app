import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import CardsPage from './CardsPage'
import Create from './Create'
import uid from 'uid'
import {
  getCardsFromStorage,
  getAllCards,
  postNewCard,
  postComment,
  deleteStoredCard,
  deleteStoredComment,
} from './services'
import GlobalStyles from './GlobalStyles'
import styled from 'styled-components'
import dayjs from 'dayjs'
export default function App() {
  const Grid = styled.div`
    display: grid;
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
    width: 100%;
    border: solid white 2px;
    color: white;
    font-family: Helvetica, sans-serif;
    margin-bottom: 10px;
    overflow: scroll;
  `

  const [cardData, setCardData] = useState(getCardsFromStorage())

  useEffect(() => {
    getAllCards().then(response => {
      setCardData([...cardData, ...response.data])
    })
  }, [])

  function addCard(data) {
    data._id = uid()
    data.comments = []
    postNewCard(data).then(response => {
      setCardData([...cardData, response.data])
    })
  }

  function addComment(commentData, card) {
    const index = cardData.findIndex(item => item === card)
    commentData.date = dayjs()
    commentData._id = uid()
    postComment(commentData, card).then(response => {
      setCardData([
        ...cardData.slice(0, index),
        {
          ...cardData[index],
          ...cardData[index].comments.push({
            ...commentData,
          }),
        },
        ...cardData.slice(index + 1),
      ])
    })
  }

  function deleteCard(card) {
    const index = cardData.findIndex(item => item === card)
    deleteStoredCard(card).then(response => {
      setCardData([...cardData.slice(0, index), ...cardData.slice(index + 1)])
    })
  }

  function deleteComment(card, comment) {
    const index = cardData.findIndex(item => item === card)
    const commentIndex = cardData[index].comments.findIndex(
      item => item === comment
    )
    deleteStoredComment(comment).then(response => {
      setCardData([
        ...cardData,
        cardData[index].comments.splice(commentIndex, 1),
      ])
    })
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
              deleteComment={deleteComment}
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
