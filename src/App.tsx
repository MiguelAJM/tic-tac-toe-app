import { useState } from 'react'
import { TURNS } from './constats'
import GridGame from './components/GridGame'
import Turn from './components/Turn'
import Winner from './components/Winner'

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.x)

  const [winner, setWinner] = useState({
    win: 'not-winner'
  })

  return (
    <main className='w-full h-screen bg-slate-800 p-8 grid place-content-center'>
      <section className='w-[740px] mb-8'>
        <h1 className='text-4xl mb-5 font-bold text-center text-white'>
          Tic tac toe
        </h1>

        <ul className='mx-auto max-w-[330px] grid grid-cols-3 gap-4'>
          <GridGame
            board={board}
            turn={turn}
            winner={winner}
            setBoard={setBoard}
            setTurn={setTurn}
            setWinner={setWinner}
          />
        </ul>
      </section>

      <Turn turn={turn} />

      <Winner
        winner={winner.win}
        setBoard={setBoard}
        setTurn={setTurn}
        setWinner={setWinner}
      />
    </main>
  )
}
