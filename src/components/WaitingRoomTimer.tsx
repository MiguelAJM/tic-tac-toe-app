import { useTimer } from 'react-timer-hook'

interface Props {
  expiryTimestamp: Date
}

export default function WaitingRoomTimer({ expiryTimestamp }: Props) {
  const time = new Date()
  time.setSeconds(time.getSeconds() + 150)

  const { minutes, seconds } = useTimer({
    expiryTimestamp
  })
  return (
    <div className='text-3xl font-bold text-white mb-16'>
      El tiempo de espera es de: <span>{minutes}</span>:<span>{seconds}</span>
    </div>
  )
}
