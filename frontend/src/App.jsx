
import {BrowserRouter,Route,Routes} from "react-router-dom"
import {Signup} from "../pages/Signup"
import {Signin} from "../pages/Signin"
import {Dashboard} from "../pages/Dashboard"
import {SendMoney} from "../pages/SendMoney"
import UserContextProvider from "../context/UserContextProvider"


function App() {

  return (
    <UserContextProvider>
       <BrowserRouter>
       <Routes>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/Dashboard" element={<Dashboard/>}/>
          <Route path="/send" element={<SendMoney/>}/>

       </Routes>
       </BrowserRouter>
    </UserContextProvider>
  )
}

export default App
