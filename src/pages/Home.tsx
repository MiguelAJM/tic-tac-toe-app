import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'
import { TURN } from '../constats'
import { useNavigate } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import { useState } from 'react'
import { toast } from 'sonner'

export default function Home() {
  const [playerName, setPlayerName] = useState('')
  const navigate = useNavigate()

  const createGame = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const UUID = uuid()

    const arrayBoard = Array(9).fill(null)

    if (playerName === '') return toast.error('Por favor establece un nombre.')

    try {
      await setDoc(doc(db, 'games', UUID), {
        gameId: UUID,
        status: 'no-running',
        playerHost: playerName,
        currentTurn: TURN.x.turn,
        currentPlayer: playerName,
        winner: 'no-winner',
        gameRoom: 'no-full',
        players: [
          {
            player_name: playerName,
            isOnline: true,
            turn: TURN.x.turn,
            uid: UUID
          }
        ],
        board: arrayBoard
      })
    } catch (error) {
      console.log(error)
    }
    
    toast.success('Sala creada.')

    localStorage.setItem('uuid', JSON.stringify(UUID))
    navigate(`/waiting-room/${UUID}`)
  }

  return (
    <section>
      <h2 className='text-4xl text-white mb-4 text-center'>Triqui Game</h2>
      <form onSubmit={createGame}>
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
          Iniciar partida
        </button>
      </form>
    </section>
  )
}
