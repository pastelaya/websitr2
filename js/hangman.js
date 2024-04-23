const wordEl = document.getElementById('word')
wrongLettersEl = document.getElementById('wrong-letters')
const playAgainBtn = document.getElementById('play-again')
const popup = document.getElementById('pupop-container')
const notification = document.getElementById('notification-container')
const finalMessage = document.getElementById('final-message')
const figureParts = document.querySelectorAll('.figure-part')

const word = ['rogue', 'barbarian', 'bard', 'fighter', 'cleric', 'paladin', 'druid', 'warlock', 'wizard']

let selectedIndex = Math.floor(word.length * Math.random())
let selectedWord = word[selectedIndex]

const correctLetters = []
const wrongLetters = []

// show hidden word
function displayWord() {
    wordEl.innerHTML = `
    ${selectedWord
        .split('')
        .map(letter => `
            <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
            </span>
        `).join('')
    }
`
    const innerWord = wordEl.innerText.replace(/\n/g, '')

    if (innerWord == selectedWord) {
        finalMessage.innerText = "Congrats traveler! You've won this game!"
        popup.style.display = 'flex'
    }
}

// Update the wrong letters
function updateWrongLettersEl() {
    console.log('Update Wrong')
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length . 0 ? `<p>Wrong</p>` : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}


    `
}

// show notification
function showNotification() {
    notification.classList.add('show')

setTimeout(() => {
    notification.classList.remove('show')
    }, 2000)
}


// Keydown letter press
window.addEventListener('keydown', e = {

    if (e.keyCode >= 65 && e.keyCode <= 90){
        const letter = e.key

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)){
                correctLetters.push(letter)

                displayWord()
            } else {
                showNotification()
            }
        } else {
            if (!wrongLitters.includes(letter)){
                wrongLetters.push(letter)

                updateWrongLettersEl()
            } else {
                showNotification()
            }
        }

        }
    }
})


displayWord()
