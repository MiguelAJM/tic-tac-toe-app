import { CopyToClipboard } from 'react-copy-to-clipboard'
import useDataGame from '../utils/hooks/useDataGame'
import useWaitingRoom from '../utils/hooks/useWaitingRoom'
import QRCode from 'react-qr-code'

export default function WaitingRoom() {
  useWaitingRoom()
  const { status, players, playerHost, id, handleDeleteGame, handleStartGame } =
    useDataGame()

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

  const pathname = window.location.host
  const url = `/game/invite/${id}`
  const inviteLink = pathname + url

  const playerTwoOnline = players[1] && players[1].player_name !== ''

  const game = {
    player_one_name: players[0]?.player_name || 'Esperando...',
    player_two_name: players[1]?.player_name || 'Esperando...'
  }

  return (
    <section>
      <h2 className='text-4xl text-white mb-4 text-center'>Triqui Game</h2>

      <div className='text-white mb-5 text-center'>
        <h2>Jugador 1: {game.player_one_name}</h2>
        <h2>Jugador 2: {game.player_two_name}</h2>
      </div>

      {playerHost && (
        <>
          {playerTwoOnline && (
            <button
              onClick={handleStartGame}
              className='bg-lime-500 font-bold px-8 py-4 w-full rounded-full mb-4'
            >
              Iniciar partida
            </button>
          )}

          <button
            onClick={handleDeleteGame}
            className='bg-red-500 font-bold px-8 py-4 w-full rounded-full mb-4'
          >
            Salirse de la partida
          </button>

          <CopyToClipboard text={inviteLink}>
            <button className='bg-blue-500 font-bold px-8 py-4 w-full rounded-full'>
              Copiar link
            </button>
          </CopyToClipboard>

          <QRCode value={inviteLink} className='mx-auto my-8' />
        </>
      )}

      {!playerHost && (
        <div>
          <h2 className='text-white text-3xl'>
            Esperando que inicie la partida...
          </h2>
        </div>
      )}
    </section>
  )
}
