import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebaseConfig'
import { TURNS } from '../../constats'

export interface GameTypes {
  gameId: string
  currentPlayer: string
  playerHost: string
  players: Player[]
  currentTurn: string
  status: string
  board: any[]
  winner: string
}

export interface Player {
  isOnline: boolean
  player_name: string
  turn?: string
  uid: string
  status?: string
}

export default function useDataGame() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [gameInfo, setGameInfo] = useState<GameTypes | null>(null)
  const [status, setStatus] = useState('idle')

  const userUID = window.localStorage.getItem('uuid')
    ? JSON.parse(window.localStorage.getItem('uuid') as string)
    : ''

  const players = gameInfo?.players || []
  const playerHost = players[0]?.uid === userUID
  const gameId = gameInfo?.gameId
  const boardGame = gameInfo?.board
  const currentPlayer = gameInfo?.currentPlayer
  const winner = gameInfo?.winner

  useEffect(() => {
    try {
      if (id) {
        setStatus('pending')
        const unsuscribe = onSnapshot(doc(db, 'games', id), (doc) => {
          const data = { ...doc.data(), id: doc.id }

          setStatus('success')
          setGameInfo(data as any)
        })
        return unsuscribe
      }
    } catch (error) {
      console.log(error)
      setStatus('rejected')
    }
  }, [])

  useEffect(() => {
    if (status === 'success') {
      if (gameInfo?.status === 'running-game') {
        navigate(`/game/${id}`)
      }
    }
  }, [gameInfo?.status])

  async function handleDeleteGame() {
    if (id) {
      const docRef = doc(db, 'games', id)
      await deleteDoc(docRef)
    }
  }

  async function handleStartGame() {
    if (id) {
      const docRef = doc(db, 'games', id)
      await updateDoc(docRef, {
        status: 'running-game'
      })
      navigate(`/game/${id}`)
    }
  }
  async function handleResetGame() {
    if (id && players) {
      const docRef = doc(db, 'games', id)
      const arrayBoard = Array(9).fill(null)

      await updateDoc(docRef, {
        status: 'no-running',
        board: arrayBoard,
        currentTurn: TURNS.x,
        currentPlayer: players[0].player_name,
        winner: 'no-winner',
      })
      navigate(`/game/${id}`)
    }
  }

  return {
    gameInfo,
    boardGame,
    status,
    players,
    playerHost,
    gameId,
    id,
    userUID,
    currentPlayer,
    winner,
    handleResetGame,
    handleDeleteGame,
    handleStartGame
  }
}
