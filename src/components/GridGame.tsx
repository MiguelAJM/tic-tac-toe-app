import { doc, updateDoc } from 'firebase/firestore'
import { TURNS } from '../constats'
import { Square } from './Square'
import { db } from '../firebase/firebaseConfig'
import { Player } from '../utils/hooks/useDataGame'
import { checkWinner } from '../logic/checkWinner'
import confetti from 'canvas-confetti'
import { checkEndGame } from '../logic/checkEndGame'

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
  const userUID = window.localStorage.getItem('uuid')
    ? JSON.parse(window.localStorage.getItem('uuid') as string)
    : ''

  const updateBoard = async (index: number) => {
    if (board && id) {
      if (board[index] || winner !== 'no-winner') return

      const newTurn = players.find((item) => item.turn === currentTurn)
      
      if (newTurn) {
        if (newTurn.uid === userUID) {
          currentTurn === TURNS.x
            ? await updateDoc(doc(db, 'games', id), {
                currentTurn: TURNS.o,
                currentPlayer: players[1].player_name
              })
            : await updateDoc(doc(db, 'games', id), {
                currentTurn: TURNS.x,
                currentPlayer: players[0].player_name
              })

          const newBoard = [...board]
          newBoard[index] = currentTurn

          await updateDoc(doc(db, 'games', id), {
            board: newBoard
          })

          const newWinner = checkWinner(newBoard)
          const endGame = checkEndGame(newBoard)

          if (newTurn.turn === newWinner) {
            confetti()
            return await updateDoc(doc(db, 'games', id), {
              winner: currentPlayer
            })
          }

          if (endGame) {
            return await updateDoc(doc(db, 'games', id), {
              winner: 'tie'
            })
          }
        }
      }
    }
  }
  return board?.map((square, index) => {
    return (
      <Square key={index} index={index} updateBoard={() => updateBoard(index)}>
        {square}
      </Square>
    )
  })
}
