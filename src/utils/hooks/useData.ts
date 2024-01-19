import { deleteDoc, doc, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../firebase/firebaseConfig'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { GameTypes } from '../types/Games'

export default function useData() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [data, setData] = useState<GameTypes | null>(null)
  const [status, setStatus] = useState('idle')

  const userUID = window.localStorage.getItem('uuid')
    ? JSON.parse(window.localStorage.getItem('uuid') as string)
    : ''

  const gameId = data?.gameId
  const gameStatus = data?.status
  const players = data?.players || []

  useEffect(() => {
    try {
      if (id) {
        setStatus('pending')
        const unsuscribe = onSnapshot(doc(db, 'games', id), (doc) => {
          const data = { ...doc.data(), id: doc.id }

          setStatus('success')
          setData(data as any)
        })
        return unsuscribe
      }
    } catch (error) {
      toast.error('Ha ocurrido un error.')
      setStatus('rejected')
    }
  }, [id])

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
      if (gameId === undefined) {
        navigate(`/`)
      }
    }
  }, [status, gameId, id, navigate])

  return { data, status, id, players, userUID }
}
