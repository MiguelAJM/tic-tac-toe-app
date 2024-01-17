import { useParams } from 'react-router-dom'
import GridGame from '../components/GridGame'
import useDataGame from '../utils/hooks/useDataGame'
import useWaitingRoom from '../utils/hooks/useWaitingRoom'

export default function Game() {
  useWaitingRoom()
  const { id } = useParams()
  const {
    gameInfo,
    status,
    boardGame,
    players,
    currentPlayer,
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

  const TURN = gameInfo?.currentTurn

  return (
    <main className='w-full h-screen bg-slate-800 text-white p-8 grid place-content-center'>
      <section className='w-[740px]'>
        <h1 className='text-4xl mb-5 font-bold text-center'>Tic tac toe</h1>

        <ul className='mx-auto max-w-[330px] grid grid-cols-3 gap-4'>
          <GridGame
            board={boardGame}
            currentPlayer={currentPlayer}
            currentTurn={TURN}
            id={id}
            players={players}
            winner={winner}
          />
        </ul>

        {winner !== 'no-winner' && winner !== 'tie' && (
          <div className='mt-8'>
            <h3 className='text-center'>Ganador: {winner}</h3>
          </div>
        )}

        {winner === 'tie' && (
          <div className='my-8'>
            <h3 className='text-center'>Empate</h3>
          </div>
        )}

        {playerHost && (
          <div className='flex justify-center gap-4 my-8'>
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
