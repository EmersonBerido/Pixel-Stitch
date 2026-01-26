import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home/Home.tsx';
import Login from './pages/auth/Login/Login.tsx';
import Register from './pages/auth/Register/Register.tsx';
import ForgotPassword from './pages/auth/forgot-password/forgot-password.tsx';
import ResetPassword from './pages/auth/reset-password/reset-password.tsx';
import Profile from './pages/Profile/Profile.tsx';
import CreateProject from './pages/CreateProject/CreateProject.tsx';
import Projects from './pages/Projects/Projects.tsx';
import CreateTapestry from './pages/CreateTapestry/CreateTapestry.tsx';
import Tapestry from './pages/Tapestry/Tapestry.tsx';
import NotFound from './pages/NotFound/NotFound.tsx';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password/:token' element={<ResetPassword />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/projects' element={<Projects />} />
      <Route path='/create-project' element={<CreateProject />} />
      <Route path='/create-tapestry' element={<CreateTapestry/>} />
      <Route path='/tapestry/:id' element={<Tapestry />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}