import React from 'react';
import './App.css';
import { useCallback, useEffect, useState } from "react"
import { HangmanDrawing } from "../componets/Hangman/HangmanDrawing"
import { HangmanWord } from "../componets/Hangman/HangmanWord"
import { Keyboard } from "../componets/Keyboard/Keyboard"
import words from "../wordList.json"
import CounterIncorrect from "../componets/CounterIncorrect";
import GameTimer, {time} from "../componets/GameTimer";
import NewRecord from "../componets/NewRecord";
import WordHandler from "../componets/WordHandler";

export let incorrectCount = 6
export let gameID= 0
export let isWinner = false
export let isLoser = false


function getWord() {
    return words[Math.floor(Math.random() * words.length)]
}

export function getIncorrect(){
    return incorrectCount
}

function App() {

    const [wordToGuess, setWordToGuess] = useState(getWord)
    const [guessedLetters, setGuessedLetters] = useState<string[]>([])

    const incorrectLetters = guessedLetters.filter(
        letter => !wordToGuess.includes(letter)
    )
    isLoser = incorrectLetters.length >= 6
    isWinner = wordToGuess
        .split("")
        .every((letter:string) => guessedLetters.includes(letter))

    incorrectCount = incorrectLetters.length
    const gameOver:boolean = (isWinner || isLoser)
    if(gameOver) NewRecord(wordToGuess, time, incorrectCount)

    const addGuessedLetter = useCallback(

        (letter: string) => {
            if (guessedLetters.includes(letter) || isLoser || isWinner) return

            setGuessedLetters(currentLetters => [...currentLetters, letter])


        },

        [guessedLetters, isWinner, isLoser]

    )

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const key = e.key
            if (!key.match(/^[a-z]$/)) return
            e.preventDefault()
            addGuessedLetter(key)
        }

        document.addEventListener("keypress", handler)

        return () => {
            document.removeEventListener("keypress", handler)
        }
    }, [guessedLetters])

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const key = e.key
            if (key !== "Enter") return

            e.preventDefault()
            setGuessedLetters([])
            setWordToGuess(getWord())
            gameID++
        }

        document.addEventListener("keypress", handler)

        return () => {
            document.removeEventListener("keypress", handler)
        }
    }, [])

    return(



        <div
            style={{

                maxWidth: "1100px",
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
                margin: "0 auto",
                alignItems: "center",
            }}
        >
            <CounterIncorrect/>
            <GameTimer/>


            <div style={{ fontSize: "2rem", textAlign: "center" }}>
                {!isWinner && !isLoser && <span>&#8203;</span>}
                {isWinner && "Zwycięstwo! 😎 - aby zagrać ponownie, wciśnij ENTER"}
                {isLoser && "Powiesiłeś chłopa 😕 - aby zagrać ponownie, wciśnij ENTER"}
            </div>

            <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
            <HangmanWord
                reveal={isLoser}
                guessedLetters={guessedLetters}
                wordToGuess={wordToGuess}

            />


            <div style={{ alignSelf: "stretch" }}>
                <Keyboard
                    disabled={isWinner || isLoser}
                    activeLetters={guessedLetters.filter(letter =>
                        wordToGuess.includes(letter)
                    )}
                    inactiveLetters={incorrectLetters}
                    addGuessedLetter={addGuessedLetter}
                    incorrectLetters={incorrectLetters}
                />
            </div>
        </div>
    )
}

export default App;
