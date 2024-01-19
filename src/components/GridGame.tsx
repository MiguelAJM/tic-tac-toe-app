import { Square } from './Square'
import { Player } from '../utils/hooks/useDataGame'
import { checkWinner } from '../logic/checkWinner'
import { getIcon } from '../utils/helpers/getSquareIcon'
import { checkTurn } from '../logic/checkTurn'

import pressSquare from '../assets/sounds/pessSquare.wav'
import winGame from '../assets/sounds/winGame.wav'

import { motion, AnimatePresence } from 'framer-motion'

import useSound from 'use-sound'

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
  const [playPressSquare] = useSound(pressSquare)
  const [playWinGame] = useSound(winGame)

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
          playWinGame,
          playPressSquare
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
      <AnimatePresence mode='wait'>
        <Square
          className={`${comboColors}`}
          key={index}
          index={index}
          updateBoard={() => updateBoard(index)}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: 'easeInOut', delay: 0.5 }}
          >
            {SquareIcon}
          </motion.div>
        </Square>
      </AnimatePresence>
    )
  })
}
