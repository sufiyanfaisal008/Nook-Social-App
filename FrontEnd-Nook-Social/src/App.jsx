import { Routes, Route } from 'react-router-dom'
import Post from './pages/post/post'
import Login from './pages/login/login'
import Signup from './pages/signup/signup'
import Notfound from './pages/Notfound'
import './App.css'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Post/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='*' element={<Notfound/>}/>
    </Routes>
    </>
  )
}

export default App
