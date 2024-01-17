import { useEffect } from 'react'
import { deleteDoc, doc } from 'firebase/firestore'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../../firebase/firebaseConfig'
import { useGames } from '../../context/GamesProvider'

export default function useWaitingRoom() {
  const { games, status } = useGames()

  const navigate = useNavigate()
  const { id: gameId } = useParams()

  // Comprobamos que el juego exista
  useEffect(() => {
    if (status === 'success') {
      const currentGameId = games.find((item) => item.gameId === gameId)
      const thisExistGame = currentGameId?.gameId === gameId

      if (!thisExistGame) {
        navigate('/')
      }
    }
  }, [games, navigate, gameId, status])

  // Eliminar el juego despues de 2Min:50Seg.
  useEffect(() => {
    if (status === 'success') {
      const currentGame = games.find((items) => items.gameId === gameId)
      const waitTime = 150000

      const deleteGame = setTimeout(async () => {
        try {
          if (currentGame && currentGame.status === 'no-running' && gameId) {
            const docRef = doc(db, 'games', gameId)
            await deleteDoc(docRef)
            navigate('/')
          }
        } catch (error) {
          console.log(error)
        }
      }, waitTime)

      return () => clearTimeout(deleteGame)
    }
  }, [games, gameId, navigate, status])

  return
}
