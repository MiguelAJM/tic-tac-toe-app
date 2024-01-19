import { useNavigate } from 'react-router-dom'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebaseConfig'
import { TURN } from '../../constats'

import useData from './useData'

export default function useGamePageData() {
  const navigate = useNavigate()
  
  const { data, status, id, players, userUID } = useData()

  const playerHost = players[0]?.uid === userUID
  const boardGame = data?.board
  const currentPlayer = data?.currentPlayer
  const currentTurn = data?.currentTurn
  const winner = data?.winner

  async function handleDeleteGame() {
    if (id) {
      const docRef = doc(db, 'games', id)
      await deleteDoc(docRef)
    }
  }

  async function handleResetGame() {
    if (id && players) {
      const docRef = doc(db, 'games', id)
      const arrayBoard = Array(9).fill(null)

      await updateDoc(docRef, {
        status: 'running',
        board: arrayBoard,
        currentTurn: TURN.x.turn,
        currentPlayer: players[0].player_name,
        winner: 'no-winner'
      })
      navigate(`/game/${id}`)
    }
  }

  return {
    status,
    boardGame,
    players,
    currentPlayer,
    currentTurn,
    winner,
    playerHost,
    handleResetGame,
    handleDeleteGame
  }
}
