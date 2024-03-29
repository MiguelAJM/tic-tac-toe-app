import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import Home from './pages/Home'
import InviteGame from './pages/InviteGame'
import WaitingRoom from './pages/WaitingRoom'
import Game from './pages/Game'

export default function App() {
  return (
    <BrowserRouter>
     <Toaster position='top-center' richColors />
        <main className='w-full h-screen bg-slate-800 p-8 grid place-content-center'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/waiting-room/:id' element={<WaitingRoom />} />
            <Route path='/game/invite/:id' element={<InviteGame />} />
            <Route path='/game/:id' element={<Game />} />
          </Routes>
        </main>
    </BrowserRouter>
  )
}
