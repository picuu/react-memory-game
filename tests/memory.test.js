import { loadFeature, defineFeature } from 'jest-cucumber'
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
})
