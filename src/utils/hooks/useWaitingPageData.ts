import { useNavigate } from 'react-router-dom'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebaseConfig'
import { useEffect } from 'react'
import { toast } from 'sonner'
import useData from './useData'

import { Howl } from 'howler'
import soundCasualEvent from '../../assets/sounds/casualEvent.wav'
import soundStartGame from '../../assets/sounds/startGame.wav'

export default function useWaitingPageData() {
  const navigate = useNavigate()

  const { data, status, id, players, userUID } = useData()

  const playCasualEvent = new Howl({
    src: [soundCasualEvent]
  })

  const playStartGame = new Howl({
    src: [soundStartGame]
  })

  const gameId = data?.gameId
  const hostPlayer = players[0]?.uid === userUID
  const TwoPlayer = players[1]?.uid === userUID

  const isTwoPlayer = players[1]?.player_name !== undefined
  const gameRoom = data?.gameRoom
  const gameStatus = data?.status

  useEffect(() => {
    const timeOut = setTimeout(async () => {
      if (isTwoPlayer && id) {
        const docRef = doc(db, 'games', id)
        await updateDoc(docRef, { gameRoom: 'full' })
      }
    }, 1000)

    return () => clearTimeout(timeOut)
  }, [isTwoPlayer, id])

  useEffect(() => {
    if (status === 'success') {
      if (gameStatus === 'running-game') {
        playStartGame.play()
        navigate(`/game/${id}`)
      }
    }
  }, [gameStatus])

  useEffect(() => {
    if (status === 'success') {
      const twoPlayerName = players[1]?.player_name

      if (isTwoPlayer && hostPlayer) {
        if (gameRoom !== 'full') {
          playCasualEvent.play()
          toast.success(`El jugador ${twoPlayerName} se ha unido!`)
        }
      }

      if (isTwoPlayer && TwoPlayer) {
        if (gameRoom !== 'full') {
          playCasualEvent.play()
          toast.success(`Te has unido al juego`)
        }
      }
    }
  }, [isTwoPlayer])

  async function handleStartGame() {
    if (id) {
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

  return {
    status,
    players,
    hostPlayer,
    gameId,
    id,
    handleStartGame,
    handleDeleteGame
  }
}
