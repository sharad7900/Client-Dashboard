import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Welcome from './components/Welcome';
import MFD from './components/MFD';
import ChatPage from './components/Comments';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import CorporatePortFolio from './components/CorporatePortfolio';
import DematPortfolio from './components/DematPortfolio';
import { AssigneeIDs } from './AssigneesContext';
import Description from './components/Description';




function App(){
  return(<>
  <AssigneeIDs>
  <BrowserRouter>
    <Routes>
       <Route path='*' element={<Login/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/welcome' element={<Welcome/>}/>
       <Route path='/mfd' element={<MFD/>}/>
       <Route path='/chatpage' element={<ChatPage/>}/>
       <Route path='/corporateportfolio' element={<CorporatePortFolio/>}/>
       <Route path='/dematportfolio' element={<DematPortfolio/>}/>
       <Route path='/forgotpassword' element={<ForgotPassword/>}/>
       <Route path='/createpassword' element={<ResetPassword/>}/>
       <Route path='/descriptions' element={<Description/>}/>
    </Routes>
    
    </BrowserRouter>
  </AssigneeIDs>
 
  </>)
}

export default App;
