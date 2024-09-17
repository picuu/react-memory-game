Feature: Memory

  As a player:
    - I want to play to the classic memory game
    - So I want to find all the pairs with the same value

  How to refer to a cell: 
    - Using the (row,column) nomenclature
    - Rows and columns starts from 1

  How to load mock data: 
    - Using the <ctrl>+m keyboard combination to discover
      the load mock data form

  To define the cards data will use:
    "a" Value 'a'
    "b" Value 'b'

    There are two ways to define mock data:
      - Inline:
        "ab-ab"
      - Table:
        | a | b |
        | a | b |

  To define the cards display will use:
    "." Covered card
    "a" Uncovered card with value 'a'
    "b" Uncovered card with value 'b'

Background:
  Given a player opens the game

Scenario: Starting the game - Cards enabled
  Then all the cards should be "enabled"

Scenario Outline: Uncovering a card using left mouse click - Checking that its uncovered
  Given the player loads the following mock data:
  """
  | a | b |
  | a | b |
  """
  When the player left clicks the card ("<row>","<column>")
  Then the card ("<row>","<column>") should be "uncovered"

  Examples:
  | row | column | value |
  | 1   | 1      | a     |
  | 1   | 2      | b     |
  | 2   | 1      | a     |
  | 2   | 2      | b     |

Scenario Outline: Uncovering a card - Checking its value
  Given the player loads the following mock data:
  """
  | a | b |
  | a | b |
  """
  When the player left clicks the card ("<row>","<column>")
  Then the card ("<row>","<column>") should show: "<value>"

  Examples:
  | row | column | value |
  | 1   | 1      | a     |
  | 1   | 2      | b     |
  | 2   | 1      | a     |
  | 2   | 2      | b     |

Scenario: Uncovering two cards - Checking both to be uncovered
  Given the player loads the following mock data:
  """
  | a | b |
  | a | b |
  """
  When the player left clicks the card ("1","1")
  And the player left clicks the card ("1","2")
  Then the card ("1","1") should be "uncovered"
  And the card ("1","2") should be "uncovered"

Scenario: Uncovering two cards - Different value on each card
  Given the player loads the following mock data:
  """
  | a | b |
  | a | b |
  """
  When the player left clicks the card ("1","1")
  And the player left clicks the card ("1","2")
  Then the card ("1","1") should show: "a"
  And the card ("1","2") should show: "b"

Scenario: Uncovering two differents cards - Them should be covered automatically after 1 seconds
  Given the player loads the following mock data:
  """
  | a | b |
  | a | b |
  """
  When the player left clicks the card ("1","1")
  And the player left clicks the card ("1","2")
  Then the card ("1","1") should be "covered" after "1" seconds
  And the card ("1","2") should be "covered" after "1" seconds

Scenario: Uncovering three differents cards - Only the last one should be uncovered
  Given the player loads the following mock data:
  """
  | a | b |
  | a | b |
  """
  When the player left clicks the card ("1","1")
  And the player left clicks the card ("1","2")
  And after "2" seconds the player left clicks the card ("2","1")
  Then the card ("1","1") should be "covered" after "2" seconds
  And the card ("1","2") should be "covered" after "2" seconds
  And the card ("2","1") should be "uncovered"

Scenario: Uncovering a pair - It should stay uncovered
  Given the player loads the following mock data:
  """
  | a | b |
  | a | b |
  """
  When the player left clicks the card ("1","1")
  And the player left clicks the card ("2","1")
  And after "1" seconds the player left clicks the card ("2","1")
  Then the card ("1","1") should be "uncovered"
  And the card ("2","1") should be "uncovered"
  And the card ("1","2") should be "uncovered"

Scenario: Uncovering a pair with the same value - Disabling the cards
  Given the player loads the following mock data:
  """
  | a | b |
  | a | b |
  """
  When the player left clicks the card ("1","1")
  And the player left clicks the card ("2","1")
  Then the card ("1","1") should be "disabled"
  And the card ("2","1") should be "disabled"

Scenario: Uncovering a card then clicking on it - Nothing should happen
  Given the player loads the following mock data:
  """
  | a | b |
  | a | b |
  """
  And the player left clicks the card ("1","1")
  When the player left clicks the card ("1","1")
  Then the card ("1","1") should stay "uncovered"

Scenario: Clicking on an already uncovered card - Nothing should happen
  Given the player loads the following mock data:
  """
  | a | b |
  | a | b |
  """
  And the player left clicks the card ("1","1") 
  And the player left clicks the card ("2","1")
  When the player left clicks the card ("2","1")
  Then the card ("2","1") should stay "uncovered"
