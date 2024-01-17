import { TURNS } from '../constats'
import { Square } from './Square'

interface WinnerType {
  winner: string
  setTurn: (value: React.SetStateAction<string>) => void
  setWinner: (
    value: React.SetStateAction<{
      win: string
    }>
  ) => void
}

export default function Winner({
  winner,
  setTurn,
  setWinner
}: WinnerType) {
  const resetGame = () => {
    setTurn(TURNS.x)
    setWinner({ win: 'not-winner' })
  }

  return (
    winner !== 'not-winner' && (
      <section className='w-[740px] mb-8'>
        <h2 className='flex justify-center text-4xl text-white mb-8 text-center'>
          {winner === 'not-winner' || winner === 'tie-game'
            ? 'Empate'
            : 'Ganador'}
        </h2>

        <header className='flex justify-center mb-5'>
          {winner !== 'tie-game' && <Square>{winner}</Square>}
        </header>

        <footer
          onClick={resetGame}
          className='text-3xl font-bold cursor-pointer text-white text-center'
        >
          Volver a empezar
        </footer>
      </section>
    )
  )
}
