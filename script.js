const inputs = document.querySelector('.inputs-container')
const resetButton = document.querySelector('.reset-button')
const hintButton = document.querySelector('.hint-button')
const guessesSpan = document.querySelector('.guesses')
const mistakesSpan = document.querySelector('.mistakes')
const hintSpan = document.querySelector('.hint')
let mistakes = [],
  guesses,
  randomWord

function startGame() {
  alert('The Game will start, try and guess the word')
  // Getting the random word
  randomWord = wordList[Math.floor(Math.random() * wordList.length)]
  // Initializing variables
  mistakes = []
  guesses = []
  inputs.innerHTML = ''
  mistakesSpan.textContent = mistakes
  guesses.textContent = guesses
  // Adding inputs based on number of letters of the random word
  for (let i = 0; i < randomWord.word.length; i++) {
    const input = document.createElement('input')
    input.type = 'text'
    input.disabled = true
    inputs.appendChild(input)
  }
  // Initialize hint
  hintSpan.textContent = randomWord.hint.toUpperCase()
  hintSpan.style.display = 'none'
  hintSpan.style.opacity = '0'
  // Initializing number of guesses
  randomWord.word.length < 6 ? (guesses = 6) : (guesses = 8)
  guessesSpan.textContent = guesses
}

startGame()

function handleInput(e) {
  if (guesses > 0) {
    let key = e.key
    // Check if key is in the random word
    if (randomWord.word.includes(key)) {
      for (let i = 0; i < randomWord.word.length; i++) {
        if (randomWord.word[i] == key) {
          inputs.children[i].value = key.toUpperCase()
        }
      }
    } else if (!mistakes.includes(key)) {
      guesses--
      guessesSpan.textContent = guesses
      mistakes.push(key)
      mistakesSpan.textContent = mistakes
    }
  }

  checkWin()
}

function checkWin() {
  if ([...inputs.children].every((input) => input.value !== '')) {
    alert(`Congrats! The word was ${randomWord.word.toUpperCase()}`)
  }
  if (guesses == 0) {
    alert(
      `You have no more guesses! The word was ${String(
        randomWord.word
      ).toUpperCase()}`
    )
    for (let i = 0; i < randomWord.word.length; i++) {
      inputs.children[i].value = randomWord.word[i]
    }
  }
}

function showHint() {
  hintSpan.style.display = 'block'
  hintSpan.style.opacity = '1'
}

document.addEventListener('keydown', handleInput)
resetButton.addEventListener('click', startGame)
hintButton.addEventListener('click', showHint)
