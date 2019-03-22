import React, { useState } from 'react'
import styled from 'styled-components'
import { imageUpload } from './services'

const StyledForm = styled.form`
  margin-top: 50px;
  width: 100vw;
  grid-gap: 20px;
`

const StyledLabel = styled.label`
  font-family: Helvetica;
  color: #333333;
  font-style: normal;
`
const StyledSelect = styled.select`
  width: 100%;
  height: 40px;
  font-size: 1rem;
  margin-bottom: 10px;
`

const StyledInput = styled.input`
  width: 100%;
  height: 40px;
  background: transparent;
  border: none;
  border-bottom: solid grey 1px;
  margin-bottom: 10px;
`

const StyledButton = styled.button`
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
    comments: [],
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
  }

  async function fileHandler(event) {
    await imageUpload(event).then(response =>
      setData({ ...data, imageURL: response.data.url })
    )
  }

  return (
    <StyledForm onSubmit={onSubmitHandler}>
      <div>
        {data.image ? (
          <img src={data.image} alt="" style={{ width: '100%' }} />
        ) : (
          <input type="file" name="file" onChange={fileHandler} />
        )}
      </div>
      <StyledLabel for="select-category">Wähle eine Kategorie aus:</StyledLabel>
      <StyledSelect
        type="text"
        onChange={onInputChange}
        value={data.category}
        name="category"
        data-cy="select-one"
        id="select-category"
      >
        <option>Wähle eine Option aus</option>
        <option value="Gemüse">Gemüse</option>
        <option value="Frucht">Obst</option>
        <option value="Aufschnitt">Aufschnitt</option>
        <option value="Trockenes">Trockenes</option>
      </StyledSelect>
      <StyledLabel for="input-title">Was möchtest du retten?</StyledLabel>
      <StyledInput
        type="text"
        name="title"
        value={data.title}
        onChange={onInputChange}
        data-cy="input-one"
        id="input-title"
      />
      <StyledLabel for="select-smell">Wie riecht&apos;s?</StyledLabel>
      <StyledSelect
        type="text"
        name="smell"
        value={data.smell}
        onChange={onInputChange}
        data-cy="select-two"
        id="select-smell"
      >
        <option>Wähle eine Option aus</option>
        <option value="Einfach lecker!">Einfach lecker!</option>
        <option value="Gut">Gut</option>
        <option value="Okay">Okay</option>
        <option value="Schlecht">Ab auf den Komposthaufen</option>
      </StyledSelect>
      <StyledLabel for="select-optic">Wie sieht&apos;s aus?</StyledLabel>
      <StyledSelect
        type="text"
        name="optic"
        value={data.optic}
        onChange={onInputChange}
        data-cy="select-three"
        id="select-optic"
      >
        <option>Wähle eine Option aus</option>
        <option value="Top">Top</option>
        <option value="Noch ganz gut">Noch ganz gut</option>
        <option value="Bio-Tonne">Bio-Tonne</option>
      </StyledSelect>
      <StyledLabel for="input-location">Wo kann man es abholen?</StyledLabel>
      <StyledInput
        type="text"
        name="location"
        value={data.location}
        onChange={onInputChange}
        data-cy="input-two"
        id="input-location"
      />
      <StyledButton>Save me</StyledButton>
    </StyledForm>
  )
}
