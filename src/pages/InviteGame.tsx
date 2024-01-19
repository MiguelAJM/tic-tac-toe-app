import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'
import { v4 as uuid } from 'uuid'
import { TURN } from '../constats'
import useDataGame from '../utils/hooks/useDataGame'

export default function InviteGame() {
  const [playerName, setPlayerName] = useState('')
  const { status, id, players } = useDataGame()
  const navigate = useNavigate()

  useEffect(() => {
    if (status === 'success') {
      if (players.length === 1) {
        return
      } else {
        navigate('/')
      }
    }
  }, [status])

  const joinGame = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const UUID = uuid()

    try {
      if (id) {
        if (status === 'success') {
          const docRef = doc(db, 'games', id)
          await updateDoc(docRef, {
            status: 'running',
            players: [
              ...players,
              {
                player_name: playerName,
                isOnline: true,
                uid: UUID,
                turn: TURN.o.turn
              }
            ]
          })
        }
      }

      localStorage.setItem('uuid', JSON.stringify(UUID))
      navigate(`/waiting-room/${id}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section>
      <h2 className='text-4xl text-white mb-4 text-center'>Triqui Game</h2>
      <h3 className='text-2xl text-white mb-4 text-center'>Escoge un apodo</h3>
      <form onSubmit={joinGame}>
        <input
          className='w-full mb-4 rounded-full px-8 py-2'
          type='text'
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <button
          type='submit'
          className='bg-pink-500 font-bold px-8 py-4 w-full rounded-full'
        >
          Unirse
        </button>
      </form>
    </section>
  )
}
