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
  bottom: 0px;
  width: 100%;
`
const StyledNavLink = styled(NavLink)`
  height: 48px;
  display: flex;
  position: relative;
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
  font: 2em Monsserat, sans-serif;
  letter-spacing: 2px;
  color: #333333;
  margin-bottom: 10px;
  overflow: scroll;
`
const AddIconBg = styled.div`
  height: 60px;
  width: 80px;
  position: absolute;
  background-color: whitesmoke;
  border-radius: 50%;
  z-index: 5;
  bottom: 1px;
`

const AddIcon = styled.img`
  height: 50px;
  width: auto;
  z-index: 2;
  position: absolute;
  bottom: 1px;
  left: 15px;
`
const NavIcon = styled.img`
  height: 28px;
  width: auto;
`
const HeaderLogo = styled.img`
  height: 30px;
  width: auto;
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
        <StyledHeader>
          <HeaderLogo src={require('./images/Group.svg')} alt="" />
          FoodSaver
        </StyledHeader>
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
          <StyledNavLink to="/">
            <NavIcon src={require('./images/home.svg')} />
          </StyledNavLink>
          <StyledNavLink to="/create">
            <AddIconBg>
              <AddIcon src={require('./images/plus (5).svg')} />
            </AddIconBg>
          </StyledNavLink>
          <StyledNavLink to="/filter">
            <NavIcon src={require('./images/filter.svg')} />
          </StyledNavLink>
        </StyledNav>
      </Grid>
    </Router>
  )
}
