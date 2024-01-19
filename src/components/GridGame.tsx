import { Square } from './Square'
import { checkWinner } from '../logic/checkWinner'
import { getIcon } from '../utils/helpers/getSquareIcon'
import { checkTurn } from '../logic/checkTurn'
import { Player } from '../utils/types/Games'

import { Howl } from 'howler'
import pressSquare from '../assets/sounds/pessSquare.wav'
import winGame from '../assets/sounds/winGame.wav'

interface GridTypes {
  board: any[] | undefined
  currentTurn: string | undefined
  currentPlayer: string | undefined
  id: string | undefined
  players: Player[]
  winner: string | undefined
}

export default function GridGame({
  board,
  currentTurn,
  currentPlayer,
  id,
  players,
  winner
}: GridTypes) {
  const soundPressSquare = new Howl({
    src: [pressSquare]
  })

  const soundWinGame = new Howl({
    src: [winGame]
  })

  // Obtener el UUID del usuario del LS
  const userUID = window.localStorage.getItem('uuid')
    ? JSON.parse(window.localStorage.getItem('uuid') as string)
    : ''

  const updateBoard = async (index: number) => {
    try {
      if (board && id) {
        if (board[index] || winner !== 'no-winner') return

        await checkTurn(
          players,
          currentTurn,
          userUID,
          id,
          board,
          index,
          currentPlayer,
          soundPressSquare,
          soundWinGame
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  const colorComboGame = (board: any[]) => {
    const winner = checkWinner(board)

    if (winner !== 'no-winner') {
      switch (winner) {
        case 'x':
          return 'bg-red-500'
        case 'o':
          return 'bg-blue-500'
        default:
          return 'bg-slate-900'
      }
    } else {
      return 'bg-slate-900'
    }
  }

  return board?.map((square, index) => {
    const SquareItem = square
    const comboColors = colorComboGame(board)

    const SquareIcon = getIcon(SquareItem)

    return (
      <Square
        className={`${comboColors}`}
        key={index}
        index={index}
        updateBoard={() => updateBoard(index)}
      >
        {SquareIcon}
      </Square>
    )
  })
}
