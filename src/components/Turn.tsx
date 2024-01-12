import { TURNS } from '../constats'
import { Square } from './Square'

interface TurnType {
  turn: string
}

export default function Turn({ turn }: TurnType) {
  return (
    <section className='w-[740px] mb-8'>
      <h2 className='text-4xl text-white mb-8 text-center'>Turno</h2>
      <div className='flex justify-center gap-4'>
        <Square isSelected={turn === TURNS.x}>{TURNS.x}</Square>
        <Square isSelected={turn === TURNS.o}>{TURNS.o}</Square>
      </div>
    </section>
  )
}
