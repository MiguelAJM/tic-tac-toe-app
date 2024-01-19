import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'
import { TURN } from '../constats'
import { checkWinner } from './checkWinner'
import { checkEndGame } from './checkEndGame'
import { Player } from '../utils/types/Games'
import confetti from 'canvas-confetti'

export const checkTurn = async (
  players: Player[],
  currentTurn: string | undefined,
  userUID: any,
  id: string,
  board: any,
  index: number | number,
  currentPlayer: any,
  soundPressSquare: Howl,
  soundWinGame: Howl
) => {
  const newTurn = players.find((item) => item.turn === currentTurn)

  if (newTurn && currentTurn) {
    if (newTurn.uid === userUID) {
      soundPressSquare.play()
      currentTurn === TURN.x.turn
        ? await updateDoc(doc(db, 'games', id), {
            currentTurn: TURN.o.turn,
            currentPlayer: players[1].player_name
          })
        : await updateDoc(doc(db, 'games', id), {
            currentTurn: TURN.x.turn,
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
        soundWinGame.play()
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
