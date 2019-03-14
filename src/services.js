import axios from 'axios'
const ip = process.env.REACT_APP_BACKEND_IP
const cardsPath = `http://${ip}:4000/cards`

const CLOUDNAME = process.env.REACT_APP_CLOUDINARY_CLOUDNAME
const PRESET = process.env.REACT_APP_CLOUDINARY_PRESET

export function getAllCards() {
  return axios.get(cardsPath)
}

export function postNewCard(card) {
  return axios.post(cardsPath, card)
}

export function toggleCardBookmark(card) {
  return axios.patch(`${cardsPath}/${card._id}`, {
    bookmarked: !card.bookmarked,
  })
}

export function getCardsFromStorage() {
  return getFromStorage('cards') || []
}

export function saveCardsToStorage(cards) {
  saveToStorage('cards', cards)
}

export function saveToStorage(name, data) {
  const dataString = JSON.stringify(data)
  localStorage.setItem(name, dataString)
}

export function getFromStorage(name) {
  const dataString = localStorage.getItem(name)
  try {
    return JSON.parse(dataString)
  } catch (error) {
    console.error(error.message)
  }
}

export function imageUpload(event) {
  const url = `https://api.cloudinary.com/v1_1/${CLOUDNAME}/upload`

  const formData = new FormData()
  formData.append('file', event.target.files[0])
  formData.append('upload_preset', PRESET)

  return axios.post(url, formData, {
    headers: {
      'Content-type': 'multipart/form-data',
    },
  })
}
