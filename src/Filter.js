import React, { useState } from 'react'
import styled from 'styled-components'
import CardsPage from './CardsPage'

export default function Filter({
  cardData,
  addComment,
  deleteCard,
  deleteComment,
}) {
  const StyledForm = styled.form`
    display: grid;
    grid-auto-rows: auto;
    width: 100%;
    grid-gap: 10px;
    padding: 54px 15px;
    padding-bottom: 0;
    position: fixed;
    background: white;
  `
  const StyledLabel = styled.label`
    font-family: Helvetica;
    color: #333333;
    font-size: 1rem;
    font-style: bold;
  `

  const StyledSelect = styled.select`
    width: 100%;
    height: 30px;
    font-size: 1rem;
    border: rgba(201, 201, 201, 0.9) solid 1px;
    background: transparent;
  `
  const [locationInput, setLocationInput] = useState('all')

  function onChangeHandler(event) {
    setLocationInput(event.target.value)
  }
  function filteredCards() {
    if (locationInput === 'all') {
      return cardData
    } else {
      return cardData.filter(card => card.location === locationInput)
    }
  }
  const options = [...new Set(cardData.map(item => item.location))]
  console.log(options)
  return (
    <React.Fragment>
      <StyledForm>
        <StyledLabel htmlFor="filter-location" name="filter">
          Hallo
        </StyledLabel>
        <StyledSelect
          value={locationInput}
          name="locationfilter"
          id="filter-location"
          type="text"
          onChange={event => onChangeHandler(event)}
        >
          <option value="all">Alle Stadtteile</option>
          {options.map(location => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </StyledSelect>
      </StyledForm>
      <CardsPage
        cardData={filteredCards()}
        addComment={addComment}
        deleteCard={deleteCard}
        deleteComment={deleteComment}
      />
    </React.Fragment>
  )
}
