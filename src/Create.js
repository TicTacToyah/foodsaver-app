import React, { useState } from 'react'
import styled from 'styled-components'

const StyledSection = styled.section`
  display: flex;
`

const StyledText = styled.p`
  font-family: Helvetica;
  color: #333333;
  font-style: normal;
`
const StyledSelect = styled.select`
  width: 100%;
  height: 40px;
  font-size: 1rem;
  border: solid grey 1px;
`

const StyledInput = styled.input`
  width: 100%;
  height: 40px;
  border: solid grey 1px;
`

const StyledButton = styled.button`
  margin: 5px auto 0;
  height: 40px;
  border: solid grey 1px;
  font-family: Helvetica;
  color: #333333;
  font-style: normal;
  font-size: 1rem;
`

export default function Create({ onSubmit, upload }) {
  const defaultData = {
    image: '',
    title: '',
    location: '',
    smell: '',
    optic: '',
  }

  function onSubmitHandler(event) {
    event.preventDefault()
    onSubmit(data)
    setData(defaultData)
  }
  const [data, setData] = useState(defaultData)

  function onInputChange(event) {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
    console.log(data)
  }

  return (
    <StyledSection>
      <form onSubmit={onSubmitHandler}>
        <div>
          {data.image ? (
            <img src={data.image} alt="" style={{ width: '100%' }} />
          ) : (
            <input type="file" name="file" onChange={upload} />
          )}
        </div>
        <StyledText>Wähle eine Kategorie aus:</StyledText>
        <StyledSelect
          type="text"
          onChange={onInputChange}
          value={data.category}
          name="category"
          data-cy="select-one"
        >
          <option value="Gemüse">Gemüse</option>
          <option value="Frucht">Obst</option>
          <option value="Aufschnitt">Aufschnitt</option>
          <option value="Trockenes">Trockenes</option>
        </StyledSelect>
        <StyledText>Was möchtest du retten?</StyledText>
        <StyledInput
          type="text"
          name="title"
          value={data.title}
          onChange={onInputChange}
          data-cy="input-one"
        />
        <StyledText>Wie riechts?</StyledText>
        <StyledSelect
          type="text"
          name="smell"
          value={data.smell}
          onChange={onInputChange}
          data-cy="select-two"
        >
          <option value="Einfach lecker!">Einfach lecker!</option>
          <option value="Gut">Gut</option>
          <option value="Okay">Okay</option>
          <option value="Schlecht">Ab auf den Komposthaufen</option>
        </StyledSelect>
        <StyledText>Wie sieht's aus?</StyledText>
        <StyledSelect
          type="text"
          name="optic"
          value={data.optic}
          onChange={onInputChange}
          data-cy="select-three"
        >
          <option value="Top">Top</option>
          <option value="Noch ganz gut">Noch ganz gut</option>
          <option value="Bio-Tonne">Bio-Tonne</option>
        </StyledSelect>
        <StyledText>Wo kann man es abholen?</StyledText>
        <StyledInput
          type="text"
          name="location"
          value={data.location}
          onChange={onInputChange}
          data-cy="input-two"
        />
        <StyledButton>Save me</StyledButton>
      </form>
    </StyledSection>
  )
}
