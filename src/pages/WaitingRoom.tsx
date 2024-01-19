import { CopyToClipboard } from 'react-copy-to-clipboard'
import { QRCodeSVG } from 'qrcode.react'
import useWaitingPageData from '../utils/hooks/useWaitingPageData'

export default function WaitingRoom() {
  const { status, players, hostPlayer, id, handleDeleteGame, handleStartGame } =
    useWaitingPageData()

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
      <h2 className='text-4xl text-white text-center'>Triqui Game</h2>

      <div className='flex justify-center gap-4 text-white my-5 text-center'>
        <h2>{game.player_one_name}</h2>
        <p>VS</p>
        <h2>{game.player_two_name}</h2>
      </div>

      {hostPlayer && (
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

          <CopyToClipboard text={`https://${inviteLink}`}>
            <button className='bg-blue-500 font-bold px-8 py-4 w-full rounded-full'>
              Copiar link
            </button>
          </CopyToClipboard>

          {!playerTwoOnline && (
            <QRCodeSVG
              value={`https://${inviteLink}`}
              className='mx-auto my-8'
            />
          )}
        </>
      )}

      {!hostPlayer && (
        <div>
          <h2 className='text-white text-3xl'>
            Esperando que{' '}
            <span className='text-lime-500'>{game.player_one_name}</span> inicie
            la partida...
          </h2>
        </div>
      )}
    </section>
  )
}
