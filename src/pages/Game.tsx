import { useParams } from 'react-router-dom'
import GridGame from '../components/GridGame'
import useDataGame from '../utils/hooks/useDataGame'
import useWaitingRoom from '../utils/hooks/useWaitingRoom'

export default function Game() {
  useWaitingRoom()
  const { id } = useParams()
  const {
    status,
    boardGame,
    players,
    currentPlayer,
    currentTurn,
    winner,
    playerHost,
    handleResetGame,
    handleDeleteGame
  } = useDataGame()

  if (status === 'pending' || status === 'idle') {
    return (
      <div className='text-3xl text-white font-bold text-center'>
        <h2>Cargando...</h2>
      </div>
    )
  }

  if (status === 'rejected') {
    return (
      <div className='text-3xl text-white font-bold text-center'>
        <h2>Ha ocurrido un error, intentalo mas tarde.</h2>
      </div>
    )
  }

  return (
    <main className='w-full h-screen bg-slate-800 text-white p-8 grid place-content-center'>
      <section className='w-[740px] flex flex-col gap-8'>
        <h1 className='text-4xl font-bold text-center'>Triqui Game</h1>

        {winner !== 'no-winner' && winner !== 'tie' && (
          <div>
            <h3 className='text-2xl font-bold text-center'>
              Ganador: <span className='text-lime-500'>{winner}</span>
            </h3>
          </div>
        )}

        {winner === 'no-winner' && (
          <div>
            <h3 className='text-2xl font-bold text-center'>
              Turno de: <span className='text-yellow-500'>{currentPlayer}</span>
            </h3>
          </div>
        )}

        {winner === 'tie' && (
          <div>
            <h3 className='text-2xl font-bold text-center'>
              Ha habido un <span className='text-pink-500'>Empate</span>
            </h3>
          </div>
        )}

        <ul className='mx-auto max-w-[330px] grid grid-cols-3 gap-4'>
          <GridGame
            board={boardGame}
            currentPlayer={currentPlayer}
            currentTurn={currentTurn}
            id={id}
            players={players}
            winner={winner}
          />
        </ul>

        {playerHost && (
          <div className='flex justify-center gap-4'>
            <button onClick={handleDeleteGame} className=''>
              <span className='bg-red-500 px-8 py-4 rounded-full font-bold'>
                Terminar juego
              </span>
            </button>
            {winner !== 'no-winner' && (
              <button onClick={handleResetGame} className=''>
                <span className='bg-blue-500 px-8 py-4 rounded-full font-bold'>
                  Reiniciar juego
                </span>
              </button>
            )}
          </div>
        )}
      </section>
    </main>
  )
}
