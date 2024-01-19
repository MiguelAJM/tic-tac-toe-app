import { TURN } from '../constats'
import { Square } from './Square'

interface TurnType {
  turn: string
}

export default function Turn({ turn }: TurnType) {
  return (
    <section className='w-[740px] mb-8'>
      <h2 className='text-4xl text-white mb-8 text-center'>Turno</h2>
      <div className='flex justify-center gap-4'>
        <Square isSelected={turn === TURN.x.turn}>{TURN.x.turn}</Square>
        <Square isSelected={turn === TURN.o.turn}>{TURN.o.turn}</Square>
      </div>
    </section>
  )
}
