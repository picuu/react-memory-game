/* eslint-disable no-unused-vars */
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Page from '@/app/page'

export function openThePage () {
  render(<Page />)
}

export function areAllCardsEnabled () {
  const cards = screen.getAllByTestId('card', { exact: false })

  return cards.every((card) => !card.classList.contains('disabled'))
}
