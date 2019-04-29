import React, { useState } from 'react'
import styled from 'styled-components'
import { imageUpload } from './services'

const StyledForm = styled.form`
  display: grid;
  grid-auto-rows: auto;
  grid-gap: 10px;
  padding: 54px 15px;
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
  margin-bottom: 20px;
`

const StyledOption = styled.option`
  font-size: 1rem;
  background: rgba(201, 201, 201, 0.9);
`

const StyledInput = styled.input`
  width: 100%;
  height: 30px;
  background: transparent;
  border: none;
  border-bottom: rgba(201, 201, 201, 0.9) solid 1px;
  margin-bottom: 20px;
  font-size: 1em;
`

const StyledButton = styled.button`
  width: 50%;
  justify-self: center;
  font-size: 1em;
  background: #76ca8f;
  border: none;
  border-radius: 5px;
  color: #333333;
  font-style: bold;
  padding: 2px;
  margin: 4px 4px 10px;
`

const StyledFileInput = styled.input`
  justify-self: center;
  font-size: 1em;
  background: #76ca8f;
  border: none;
  border-radius: 5px;
  color: #333333;
  font-style: bold;
  padding: 2px;
  margin: 4px;
`

export default function Create({ onSubmit, history }) {
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
    !Object.values(data).includes('') && onSubmit(data)
    setData(defaultData)
    setImage('')
    history.push('/')
  }

  const [data, setData] = useState(defaultData)
  const [image, setImage] = useState('')
  console.log(data)

  function onInputChange(event) {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  async function fileHandler(event) {
    const response = await imageUpload(event)
    setImage(response.data.url)
    setData({ ...data, image: response.data.url })
  }

  return (
    <StyledForm onSubmit={onSubmitHandler}>
      <div>
        {image ? (
          <img src={image} alt="" style={{ width: '100%' }} />
        ) : (
          <StyledFileInput
            type="file"
            name="file"
            onChange={fileHandler}
            required
          />
        )}
      </div>
      <StyledLabel htmlFor="select-category">
        Wähle eine Kategorie aus:
      </StyledLabel>
      <StyledSelect
        type="text"
        onChange={onInputChange}
        value={data.category}
        name="category"
        data-cy="select-one"
        required
      >
        <StyledOption value="">Wähle eine Option aus:</StyledOption>
        <StyledOption value="Gemüse">Gemüse</StyledOption>
        <StyledOption value="Frucht">Obst</StyledOption>
        <StyledOption value="Aufschnitt">Aufschnitt</StyledOption>
        <StyledOption value="Trockenes">Trockenes</StyledOption>
      </StyledSelect>
      <StyledLabel htmlFor="input-title">Was möchtest du retten?</StyledLabel>
      <StyledInput
        type="text"
        name="title"
        value={data.title}
        onChange={onInputChange}
        data-cy="input-one"
        required
      />
      <StyledLabel htmlFor="select-smell">Wie riecht&apos;s?</StyledLabel>
      <StyledSelect
        type="text"
        name="smell"
        value={data.smell}
        onChange={onInputChange}
        data-cy="select-two"
        required
      >
        <option value="">Wähle eine Option aus:</option>
        <option value="Super!">Super!</option>
        <option value="Gut">Gut</option>
        <option value="Okay">Okay</option>
        <option value="Schlecht">Ab auf den Komposthaufen</option>
      </StyledSelect>
      <StyledLabel htmlFor="select-optic">Wie sieht&apos;s aus?</StyledLabel>
      <StyledSelect
        type="text"
        name="optic"
        value={data.optic}
        onChange={onInputChange}
        data-cy="select-three"
        required
      >
        <option value="">Wähle eine Option aus:</option>
        <option value="Top">Top</option>
        <option value="Ganz gut">Ganz gut</option>
        <option value="Bio-Tonne">Bio-Tonne</option>
      </StyledSelect>
      <StyledLabel htmlFor="input-location">
        Wo kann man es abholen?
      </StyledLabel>
      <StyledInput
        type="text"
        name="location"
        value={data.location}
        onChange={onInputChange}
        data-cy="input-two"
        required
      />
      <StyledButton>Save me</StyledButton>
    </StyledForm>
  )
}
