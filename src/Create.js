import React, { useState } from 'react'
import styled from 'styled-components'
import { imageUpload } from './services'

const StyledForm = styled.form`
  display: grid;
  grid-auto-rows: auto;
  grid-gap: 10px;
  padding: 54px 5px;
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
  border: solid grey 1px;
  background: transparent;
`

const StyledOption = styled.option`
  background: rgba(201, 201, 201, 0.9);
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
  margin: 5px auto 0;
  height: 40px;
  border: solid grey 1px;
  font-family: Helvetica;
  color: #333333;
  font-style: normal;
  font-size: 1rem;
`

const StyledImagePreview = styled.div``

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
  const [image, setImage] = useState('')

  function onInputChange(event) {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  async function fileHandler(event) {
    await imageUpload(event).then(response => {
      console.log(response)
      setImage(response.data.url)
      setData({ ...data, image: response.data.url })
    })
  }

  return (
    <StyledForm onSubmit={onSubmitHandler}>
      <StyledImagePreview>
        {image ? (
          <img src={image} alt="" style={{ width: '100%' }} />
        ) : (
          <input type="file" name="file" onChange={fileHandler} />
        )}
      </StyledImagePreview>
      <StyledLabel for="select-category">Wähle eine Kategorie aus:</StyledLabel>
      <StyledSelect
        type="text"
        onChange={onInputChange}
        value={data.category}
        name="category"
        data-cy="select-one"
      >
        <StyledOption>Wähle eine Option aus</StyledOption>
        <StyledOption value="Gemüse">Gemüse</StyledOption>
        <StyledOption value="Frucht">Obst</StyledOption>
        <StyledOption value="Aufschnitt">Aufschnitt</StyledOption>
        <StyledOption value="Trockenes">Trockenes</StyledOption>
      </StyledSelect>
      <StyledLabel for="input-title">Was möchtest du retten?</StyledLabel>
      <StyledInput
        type="text"
        name="title"
        value={data.title}
        onChange={onInputChange}
        data-cy="input-one"
      />
      <StyledLabel for="select-smell">Wie riecht&apos;s?</StyledLabel>
      <StyledSelect
        type="text"
        name="smell"
        value={data.smell}
        onChange={onInputChange}
        data-cy="select-two"
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
      />
      <StyledButton>Save me</StyledButton>
    </StyledForm>
  )
}
