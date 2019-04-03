import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom'
import styled from 'styled-components'
import uid from 'uid'
import CardsPage from './CardsPage'
import Create from './Create'
import Filter from './Filter'
import {
  deleteStoredCard,
  deleteStoredComment,
  getAllCards,
  postComment,
  postNewCard,
} from './services'
import dayjs from 'dayjs'

const Grid = styled.div`
  display: grid;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
`
const StyledNav = styled.nav`
  display: grid;
  grid-auto-flow: column;
  font-family: Helvetica, sans-serif;
  background-color: whitesmoke;
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
  color: #76ca8f;
`
const StyledHeader = styled.header`
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 3;
  background-color: whitesmoke;
  width: 100%;
  border: solid white 2px;
  color: white;
  font: 1.5em Helvetica, sans-serif;
  color: #76ca8f;
  margin-bottom: 10px;
  overflow: scroll;
`

export default function App() {
  const [cardData, setCardData] = useState([])

  useEffect(() => {
    getAllCards().then(response => {
      setCardData([...response.data])
    })
  }, [])

  function addCard(data) {
    data.comments = []
    postNewCard(data).then(response => {
      setCardData([...cardData, response.data])
    })
  }

  function addComment(commentData, card) {
    const index = cardData.findIndex(item => item === card)
    commentData.date = dayjs()
    commentData._id = uid()
    commentData.belongsToCard = card._id
    postComment(commentData, card).then(response => {
      setCardData([
        ...cardData.slice(0, index),
        response.data,
        ...cardData.slice(index + 1),
      ])
    })
  }

  function deleteCard(card) {
    if (window.confirm('Willst du die Karte wirklich löschen?')) {
      const index = cardData.findIndex(item => item === card)
      deleteStoredCard(card).then(
        setCardData([...cardData.slice(0, index), ...cardData.slice(index + 1)])
      )
    }
  }

  function deleteComment(card, comment) {
    if (window.confirm('Willst den Kommentar wirklich löschen?')) {
      const index = cardData.findIndex(item => item === card)
      const commentIndex = cardData[index].comments.findIndex(
        item => item === comment
      )
      deleteStoredComment(comment, card).then(response => {
        setCardData([
          ...cardData,
          cardData[index].comments.splice(commentIndex, 1),
        ])
      })
    }
  }

  return (
    <Router>
      <Grid>
        <StyledHeader>FoodSaver</StyledHeader>
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
        <Route
          path="/create"
          render={({ history }) => (
            <Create onSubmit={addCard} history={history} />
          )}
        />
        <Route
          path="/filter"
          render={() => (
            <Filter
              cardData={cardData}
              addComment={addComment}
              deleteCard={deleteCard}
              deleteComment={deleteComment}
            />
          )}
        />
        <StyledNav>
          <StyledNavLink to="/">Home</StyledNavLink>
          <StyledNavLink to="/create">Create</StyledNavLink>
          <StyledNavLink to="/filter">Filter</StyledNavLink>
        </StyledNav>
      </Grid>
    </Router>
  )
}
