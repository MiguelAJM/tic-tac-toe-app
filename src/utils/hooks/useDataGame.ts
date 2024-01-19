import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebaseConfig'
import { TURN } from '../../constats'
import { toast } from 'sonner'
import useSound from 'use-sound'
import casualEvent from '../../assets/sounds/casualEvent.wav'

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
  turn?: Turn
  uid: string
  status?: string
}

export interface Turn {
  turn: string
  svg: string
}

export default function useDataGame() {
  const [playCasualEvent] = useSound(casualEvent)

  const { id } = useParams()
  const navigate = useNavigate()

  const [gameInfo, setGameInfo] = useState<GameTypes | null>(null)
  const [status, setStatus] = useState('idle')

  const userUID = window.localStorage.getItem('uuid')
    ? JSON.parse(window.localStorage.getItem('uuid') as string)
    : ''

  const players = gameInfo?.players || []
  const playerTwoIsOnline = players[1]?.isOnline
  const playerHost = players[0]?.uid === userUID
  const playerSecond = players[1]?.uid === userUID
  const gameId = gameInfo?.gameId
  const gameStatus = gameInfo?.status
  const boardGame = gameInfo?.board
  const currentPlayer = gameInfo?.currentPlayer
  const currentTurn = gameInfo?.currentTurn
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
      toast.error('Ha ocurrido un error.')
      setStatus('rejected')
    }
  }, [id])

  useEffect(() => {
    if (status === 'success') {
      if (gameStatus === 'running-game') {
        navigate(`/game/${id}`)
      }
    }
  }, [gameStatus])

  useEffect(() => {
    if (status === 'success') {
      if (gameId !== id) {
        navigate(`/`)
      }
    }
  }, [gameId, id])

  useEffect(() => {
    if (status === 'success' && id) {
      const waitTime = 150000

      const deleteGame = setTimeout(async () => {
        try {
          if (gameStatus === 'no-running' && gameId) {
            const docRef = doc(db, 'games', id)
            await deleteDoc(docRef)
            navigate('/')
          }
        } catch (error) {
          toast.error('Ha ocurrido un error.')
          setStatus('rejected')
        }
      }, waitTime)

      return () => clearTimeout(deleteGame)
    }
  }, [gameStatus, gameId, navigate, status])

  useEffect(() => {
    if (status === 'success') {
      const playerTwoName = players[1]?.player_name
      if (playerTwoIsOnline && playerHost) {
        toast.success(`El jugador ${playerTwoName} se ha unido.`)
      }

      if (playerSecond) {
        toast.success(`Te has unido.`)
      }
    }
  }, [players.length])

  async function handleStartGame() {
    if (id) {
      playCasualEvent()
      const docRef = doc(db, 'games', id)
      await updateDoc(docRef, {
        status: 'running-game'
      })
      navigate(`/game/${id}`)
    }
  }
  async function handleDeleteGame() {
    if (id) {
      const docRef = doc(db, 'games', id)
      await deleteDoc(docRef)
    }
  }
  async function handleResetGame() {
    if (id && players) {
      playCasualEvent()
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
    currentTurn,
    handleResetGame,
    handleDeleteGame,
    handleStartGame
  }
}
