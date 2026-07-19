import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Booking from './pages/Booking'
import Success from './pages/Success'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book" element={<Booking />} />
      <Route path="/success" element={<Success />} />
    </Routes>
  )
}

export default App
