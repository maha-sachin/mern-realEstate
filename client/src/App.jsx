
import { BrowserRouter,Routes,Route } from 'react-router-dom'


import Home from './pages/home'
import SignUp from './pages/SignUp'
import Signin from './pages/Signin'
import About from './pages/About'
import Search from "./pages/Search"
import Header from './component/Header'
import Profile from './pages/Profile'
import PrivateRoute from './component/PrivateRoute'
import CreateListing from './pages/CreateListing'

function App() {
  

  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/search" element={<Search/>}/>
        
      <Route element={<PrivateRoute/>}>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/createlisting" element={<CreateListing/>}/>
      </Route>
        
      
    </Routes>
    </BrowserRouter>
  )
}

export default App
