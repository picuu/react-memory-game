import { loadFeature, defineFeature } from 'jest-cucumber'
import { waitFor } from '@testing-library/react'
import * as steps from './steps/memory.steps'

const feature = loadFeature('./tests/features/memory.core.feature')

defineFeature(feature, (test) => {
  test('Starting the game - Cards enabled', ({ given, then, pending }) => {
    given('a player opens the game', () => {
      steps.openThePage()
    })

    then(/^all the cards should be "enabled"$/, () => {
      expect(steps.areAllCardsEnabled()).toBe(true)
    })
  })

  test('Uncovering a card using left mouse click - Checking that its uncovered', ({ given, when, then, pending }) => {
    given('a player opens the game', () => {
      steps.openThePage()
    })
    given('the player loads the following mock data:', (mockDataString) => {
      steps.setMockData(mockDataString)
    })

    when(/^the player left clicks the card \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.leftClickOnCard(rowPosition, colPosition)
    })

    then(/^the card \("(.*)","(.*)"\) should be "uncovered"$/, (rowPosition, colPosition) => {
      expect(steps.isCardUncovered(rowPosition, colPosition)).toBe(true)
    })
  })

  test('Uncovering a card - Checking its value', ({ given, when, then, pending }) => {
    given('a player opens the game', () => {
      steps.openThePage()
    })
    given('the player loads the following mock data:', (mockDataString) => {
      steps.setMockData(mockDataString)
    })

    when(/^the player left clicks the card \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.leftClickOnCard(rowPosition, colPosition)
    })

    then(/^the card \("(.*)","(.*)"\) should show: "(.*)"$/, (rowPosition, colPosition, cardValue) => {
      expect(steps.getCardValue(rowPosition, colPosition)).toBe(cardValue)
    })
  })

  test('Uncovering two cards - Checking both to be uncovered', ({ given, when, then, and, pending }) => {
    given('a player opens the game', () => {
      steps.openThePage()
    })
    given('the player loads the following mock data:', (mockDataString) => {
      steps.setMockData(mockDataString)
    })

    when(/^the player left clicks the card \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.leftClickOnCard(rowPosition, colPosition)
    })
    and(/^the player left clicks the card \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.leftClickOnCard(rowPosition, colPosition)
    })

    then(/^the card \("(.*)","(.*)"\) should be "uncovered"$/, (rowPosition, colPosition) => {
      expect(steps.isCardUncovered(rowPosition, colPosition)).toBe(true)
    })
    and(/^the card \("(.*)","(.*)"\) should be "uncovered"$/, (rowPosition, colPosition) => {
      expect(steps.isCardUncovered(rowPosition, colPosition)).toBe(true)
    })
  })

  test('Uncovering two cards - Different value on each card', ({ given, when, then, and, pending }) => {
    given('a player opens the game', () => {
      steps.openThePage()
    })
    given('the player loads the following mock data:', (mockDataString) => {
      steps.setMockData(mockDataString)
    })

    when(/^the player left clicks the card \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.leftClickOnCard(rowPosition, colPosition)
    })
    and(/^the player left clicks the card \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.leftClickOnCard(rowPosition, colPosition)
    })

    then(/^the card \("(.*)","(.*)"\) should show: "(.*)"$/, (rowPosition, colPosition, cardValue) => {
      expect(steps.getCardValue(rowPosition, colPosition)).toBe(cardValue)
    })
    and(/^the card \("(.*)","(.*)"\) should show: "(.*)"$/, (rowPosition, colPosition, cardValue) => {
      expect(steps.getCardValue(rowPosition, colPosition)).toBe(cardValue)
    })
  })

  test('Uncovering three differents cards - Only the last one should be uncovered', ({ given, when, then, and }) => {
    given('a player opens the game', () => {
      steps.openThePage()
    })
    given('the player loads the following mock data:', (mockDataString) => {
      steps.setMockData(mockDataString)
    })

    when(/^the player left clicks the card \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.leftClickOnCard(rowPosition, colPosition)
    })
    and(/^the player left clicks the card \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.leftClickOnCard(rowPosition, colPosition)
    })
    and(/^after "(.*)" seconds the player left clicks the card \("(.*)","(.*)"\)$/, async (seconds, rowPosition, colPosition) => {
      await new Promise(resolve => setTimeout(resolve, Number(seconds) * 1000))
      steps.leftClickOnCard(rowPosition, colPosition)
    })

    then(/^the card \("(.*)","(.*)"\) should be "covered" after "(.*)" seconds$/, async (rowPosition, colPosition, seconds) => {
      await waitFor(() => {
        expect(steps.isCardUncovered(rowPosition, colPosition)).toBe(false)
      })
    })
    and(/^the card \("(.*)","(.*)"\) should be "covered" after "(.*)" seconds$/, async (rowPosition, colPosition, seconds) => {
      await waitFor(() => {
        expect(steps.isCardUncovered(rowPosition, colPosition)).toBe(false)
      })
    })
    and(/^the card \("(.*)","(.*)"\) should be "uncovered"$/, (rowPosition, colPosition) => {
      expect(steps.isCardUncovered(rowPosition, colPosition)).toBe(true)
    })
  })

  test('Uncovering a pair with the same value - Disabling the cards', ({ given, when, then, and, pending }) => {
    given('a player opens the game', () => {
      steps.openThePage()
    })
    given('the player loads the following mock data:', (mockDataString) => {
      steps.setMockData(mockDataString)
    })

    when(/^the player left clicks the card \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.leftClickOnCard(rowPosition, colPosition)
    })
    and(/^the player left clicks the card \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.leftClickOnCard(rowPosition, colPosition)
    })

    then(/^the card \("(.*)","(.*)"\) should be "disabled"$/, (rowPosition, colPosition) => {
      expect(steps.isCardEnabled(rowPosition, colPosition)).toBe(false)
    })
    and(/^the card \("(.*)","(.*)"\) should be "disabled"$/, (rowPosition, colPosition) => {
      expect(steps.isCardEnabled(rowPosition, colPosition)).toBe(false)
    })
  })

  test('Uncovering a card then clicking on it - Nothing should happen', ({ given, when, then, and, pending }) => {
    given('a player opens the game', () => {
      steps.openThePage()
    })
    given('the player loads the following mock data:', (mockDataString) => {
      steps.setMockData(mockDataString)
    })
    and(/^the player left clicks the card \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.leftClickOnCard(rowPosition, colPosition)
    })

    when(/^the player left clicks the card \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.leftClickOnCard(rowPosition, colPosition)
    })

    then(/^the card \("(.*)","(.*)"\) should stay "uncovered"$/, (rowPosition, colPosition) => {
      expect(steps.isCardUncovered(rowPosition, colPosition)).toBe(true)
    })
  })
})
