import styles from "./Keyboard.module.css"

const KEYS = [
    "a",
    "ą",
    "b",
    "c",
    "ć",
    "d",
    "e",
    "ę",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "ł",
    "m",
    "n",
    "o",
    "ó",
    "p",
    "q",
    "r",
    "s",
    "ś",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "ż",
    "ź",
]

type KeyboardProps = {
    disabled?: boolean
    activeLetters: string[]
    inactiveLetters: string[]
    incorrectLetters: string[]
    addGuessedLetter: (letter: string) => void
}

export function Keyboard({
                             activeLetters,
                             inactiveLetters,
                             addGuessedLetter,
                             incorrectLetters,
                             disabled = false,
                         }: KeyboardProps) {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))",
                gap: ".5rem",
            }}
        >
            {KEYS.map(key => {
                const isActive = activeLetters.includes(key)
                const isInactive = inactiveLetters.includes(key)
                return (
                    <button
                        onClick={() => addGuessedLetter(key)}
                        className={`${styles.btn} ${isActive ? styles.active : ""} ${
                            isInactive ? styles.inactive : ""
                        }`}
                        disabled={isInactive || isActive || disabled}
                        key={key}
                    >
                        {key}
                    </button>
                )
            })}
        </div>
    )
}