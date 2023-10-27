
import NavBar from './components/navbar'
import {Login, Register, Home, Landing} from './pages'
import { Route, Routes } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' Component={Landing}></Route>
        <Route path='/login' Component={Login}></Route>
        <Route path='/register' Component={Register}></Route>
        <Route path='/home' Component={Home}></Route>
      </Routes>
    </>
  )
}

export default App



