import React,{useState,createContext} from 'react'

import { BrowserRouter ,Routes,Route} from 'react-router-dom';
import Home from './Home';
import Registation from './Login_reg/Registation';
import Login from './Login_reg/Login';
import Dashboard from './Dashboard';
import Chat from "./chat/Connectpeople"
import Guest from './Guest';
export const store = createContext();
function App() {
 
  const [token,setToken] = useState(null);
  return (
    <div>
 <store.Provider value={[token,setToken]}>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Dashbord' element={<Dashboard/>}/>
        <Route path='/Dashbord/chat' element={<Chat/>}/>
        <Route path='/Registation' element={<Registation/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path="/guest/:name" element={<Guest />} />


     
        <Route path='/Login/Registation' element={<Registation/>}/>

        <Route path='/Registation/Login' element={<Login/>}/>
      </Routes>
      </BrowserRouter>
      </store.Provider>
    </div>
  )
}

export default App