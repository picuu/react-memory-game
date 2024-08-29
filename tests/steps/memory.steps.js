/* eslint-disable no-unused-vars */
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Page from '@/app/page'

export function openThePage () {
  render(<Page />)
}

export function setMockData (data) {
  data = data.trim()

  fireEvent.keyDown(screen.getByTestId('board'), {
    key: 'm',
    keyCode: 77,
    wich: 77,
    code: 'KeyM',
    location: 0,
    altKey: false,
    ctrlKey: true,
    metaKey: false,
    shiftKey: false,
    repeat: false
  })

  const textInput = screen.getByTestId('mock-data-input')
  const submitButton = screen.getByTestId('mock-data-submit')
  fireEvent.change(textInput, { target: { value: data } })
  fireEvent.click(submitButton)
}

export function areAllCardsEnabled () {
  const cards = screen.getAllByTestId('card', { exact: false })

  return cards.every((card) => !card.classList.contains('disabled'))
}

export function leftClickOnCard (rowPosition, colPosition) {
  const card = screen.getByTestId(`card card-row${rowPosition}-col${colPosition}`, { exact: true })
  fireEvent.click(card, { exact: true })
}

export function isCardUncovered (rowPosition, colPosition) {
  const card = screen.getByTestId(`card card-row${rowPosition}-col${colPosition}`, { exact: true })
  return !card.classList.contains('covered')
}

export function isCardCovered (rowPosition, colPosition) {
  const card = screen.getByTestId(`card card-row${rowPosition}-col${colPosition}`, { exact: true })
  return card.classList.contains('covered')
}

export function getCardValue (rowPosition, colPosition) {
  const card = screen.getByTestId(`card card-row${rowPosition}-col${colPosition}`, { exact: true })
  return card.textContent
}

export function isCardEnabled (rowPosition, colPosition) {
  const card = screen.getByTestId(`card card-row${rowPosition}-col${colPosition}`, { exact: true })
  return !card.classList.contains('disabled')
}
