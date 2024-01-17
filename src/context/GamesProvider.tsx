import { createContext, useContext, useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'

export interface GameTypes {
  gameId: string
  status: string
  id: string
  players: Player[]
}

interface Player {
  isOnline: boolean
  player_name: string
  turn: string
}

interface ContextTypes {
  games: GameTypes[]
  status: string
}

const GameContext = createContext<ContextTypes>({
  games: [],
  status: ''
})

export function useGames() {
  const CONTEXT = useContext(GameContext)
  if (!CONTEXT) throw new Error('Yo must wrapp the provider in the app.')
  return CONTEXT
}

export default function GamesProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [games, setGames] = useState<GameTypes[]>([])
  const [status, setStatus] = useState('idle')

  const docRef = collection(db, 'games')

  // Para extraer todos los juegos
  useEffect(() => {
    try {
      setStatus('pending')
      const unsuscribe = onSnapshot(docRef, (querySnapshot) => {
        const q = querySnapshot.docs.map((doc) => {
          const data = doc.data()
          return {
            ...data,
            id: doc.id
          }
        })
        setStatus('success')
        setGames(q as any)
      })
      return () => {
        unsuscribe
      }
    } catch (error) {
      console.log(error)
      setStatus('rejectd')
    }
  }, [])

  return (
    <GameContext.Provider value={{ games, status }}>
      {children}
    </GameContext.Provider>
  )
}
