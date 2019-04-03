import React, { useState } from 'react'
import styled from 'styled-components'
import CardsPage from './CardsPage'

const StyledForm = styled.form`
  width: 100%;
  padding: 54px 15px 10px;
  position: fixed;
  background: white;
  justify-content: center;
`
const StyledLabel = styled.label`
  font-family: Helvetica;
  color: #333333;
  font-size: 1rem;
  font-style: bold;
  width: 100%;
  text-align: center;
  font-size: 1.4em;
  margin-top: 10px;
  margin-bottom: 10px;
  display: inline-block;
`

const StyledSelect = styled.select`
  width: 90%;
  height: 30px;
  font-size: 1rem;
  border: rgba(201, 201, 201, 0.9) solid 1px;
  background: transparent;
  margin-bottom: 20px;
`

export default function Filter({
  cardData,
  addComment,
  deleteCard,
  deleteComment,
}) {
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

  return (
    <React.Fragment>
      <StyledForm>
        <StyledLabel htmlFor="filter-location" name="filter">
          Ist dein Stadtteil dabei?
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
