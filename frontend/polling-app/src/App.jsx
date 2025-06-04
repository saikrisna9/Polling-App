import "./index.css"


import {
  BrowserRouter  as Router,
  Routes,
  Route,
  Navigate

} from "react-router-dom"
import Loginform from './pages/Auth/Loginform'
import SignUpform from './pages/Auth/SignUpform'
import Home from './pages/Dashboard/Home'
import CreatePoll from './pages/Dashboard/CreatePoll'
import MyPolls from './pages/Dashboard/MyPolls'
import VotedPolls from './pages/Dashboard/VotedPolls'
import Bookmarks from './pages/Dashboard/Bookmarks'
import UserProvider from './context/UserContext'

import {Toaster} from "react-hot-toast"




// const apiurl="https://polling-app-n1ey.onrender.com"

const App = () => {
  return (
      <UserProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Root />} />
          <Route path='/login' element={<Loginform/>} />
          <Route path='/signUp' element={<SignUpform/>} />
          <Route path='/dashboard' element={<Home/>} />
          <Route path='/create-poll' element={<CreatePoll/>} />
          <Route path='/my-polls' element={<MyPolls />} />
          <Route path='/voted-polls' element={<VotedPolls/>} />
          <Route path='/bookmarked-polls' element={<Bookmarks/>} />

        </Routes>
      </Router>
      <Toaster toastOptions={{ 
        className :"",
        style:{
          fontSize:'13px'
        }

      }} 
       />
      </UserProvider>
  )
}

export default App



const Root =()=>{
  const isAuthenticated =!!localStorage.getItem("token");

  return isAuthenticated ?(
    <Navigate to="/dashboard" />
  ):(
  <Navigate to="/login"/>
)
};