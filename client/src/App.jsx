
import { BrowserRouter,Routes,Route } from 'react-router-dom'


import Home from './pages/home'
import SignUp from './pages/SignUp'
import Signin from './pages/Signin'
import About from './pages/About'
import Search from "./pages/Search"
import Header from './component/Header'

function App() {
  

  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/sign-in" element={<Signin/>}/>
      <Route path="/sign-up" element={<SignUp/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/search" element={<Search/>}/>
        
      
    </Routes>
    </BrowserRouter>
  )
}

export default App
