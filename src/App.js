import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import CardsPage from './CardsPage'
import Create from './Create'
import uid from 'uid'
import {
  saveCardsToStorage,
  getCardsFromStorage,
  getAllCards,
  postNewCard,
  postComment,
} from './services'
import GlobalStyles from './GlobalStyles'
import styled from 'styled-components'
import dayjs from 'dayjs'
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
    width: 100%;
    border: solid white 2px;
    color: white;
    font-family: Helvetica, sans-serif;
    margin-bottom: 10px;
    overflow: scroll;
  `

  const [cardData, setCardData] = useState(getCardsFromStorage())
  //   {
  //     title: 'Banane',
  //     _id: 'gfhdjdfhjd',
  //     location: 'dfdd',
  //     smell: 'Okay',
  //     optic: 'Bio-Tonne',
  //     category: 'Frucht',
  //     comments: [
  //       {
  //         date: '',
  //         name: 'Toyah',
  //         message: 'Ich möchte die Banane gern abholen',
  //       },
  //       { date: '', name: 'Alex', message: 'Wunderbar' },
  //     ],
  //   },
  // ])
  console.log(getAllCards(), 'Get')

  useEffect(() => {
    getAllCards().then(response => {
      setCardData([...cardData, ...response.data])
    })
  }, [])
  console.log(cardData, 'Card Data')
  // useEffect(() => {
  //   getCardsFromStorage()
  // }, [cardData])

  // function addCard(data) {
  //   setCardData([...cardData, { data, _id: uid(), comments: [] }])
  //   saveCardsToStorage([getCardsFromStorage(), { data, _id: uid() }])
  // }
  function addCard(data) {
    data._id = uid()
    data.comments = []
    saveCardsToStorage([...cardData, data])
    postNewCard(data).then(response => {
      setCardData([...cardData, response.data])
      console.log(response, 'response of add card')
    })
  }

  function addComment(commentData, card) {
    console.log(commentData, 'Comment Data')
    const index = cardData.findIndex(item => item === card)
    commentData.date = dayjs()
    commentData._id = uid()
    console.log(index, 'Index')
    postComment(commentData, card).then(response => {
      console.log(commentData, 'comment data')
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

    console.log(commentData.date)
  }

  function deleteCard(card) {
    const index = cardData.findIndex(item => item === card)
    console.log(index, 'INDEy!')

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
