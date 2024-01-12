import { TURNS } from '../constats'
import { checkEndGame } from '../logic/checkEndGame'
import { Square } from './Square'
import { checkWinner } from '../logic/checkWinner'
import confetti from 'canvas-confetti'

interface GridTypes {
  board: any[]
  turn: string
  winner: { win: string }
  setBoard: (value: React.SetStateAction<any[]>) => void
  setTurn: (value: React.SetStateAction<string>) => void
  setWinner: (
    value: React.SetStateAction<{
      win: string
    }>
  ) => void
}

export default function GridGame({
  board,
  turn,
  winner,
  setBoard,
  setTurn,
  setWinner
}: GridTypes) {
  const updateBoard = (index: number) => {
    if (board[index] || winner.win !== 'not-winner') return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)
    const endGame = checkEndGame(newBoard)

    if (newWinner === TURNS.x || newWinner === TURNS.o) {
      confetti()
      return setWinner((prevState) => ({ ...prevState, win: newWinner }))
    }

    if (endGame) {
      return setWinner((prevState) => ({ ...prevState, win: 'tie-game' }))
    }
  }
  return board.map((square, index) => {
    return (
      <Square key={index} index={index} updateBoard={() => updateBoard(index)}>
        {square}
      </Square>
    )
  })
}
