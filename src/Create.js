import React, { useState } from 'react'
import styled from 'styled-components'
import { imageUpload } from './services'

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
    <StyledSection>
      <form onSubmit={onSubmitHandler}>
        <div>
          {image ? (
            <img src={image} alt="" style={{ width: '100%' }} />
          ) : (
            <input type="file" name="file" onChange={fileHandler} />
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
          <option>Wähle eine Option aus</option>
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
        <StyledText>Wie riecht&apos;s?</StyledText>
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
        <StyledText>Wie sieht&apos;s aus?</StyledText>
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
      <StyledButton onClick={() => console.log(data)} />
    </StyledSection>
  )
}
