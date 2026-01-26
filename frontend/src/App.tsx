import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home/Home.tsx';
import Login from './pages/auth/Login/Login.tsx';
import Register from './pages/auth/Register/Register.tsx';
import ForgotPassword from './pages/auth/forgot-password/forgot-password.tsx';
import ResetPassword from './pages/auth/reset-password/reset-password.tsx';
import CreateProject from './pages/CreateProject/CreateProject.tsx';
import Gallery from './pages/Gallery/Gallery.js';
import Project from './pages/Project/Project.js';
import CreateTapestry from './pages/CreateTapestry/CreateTapestry.tsx';
import Tapestry from './pages/Tapestry/Tapestry.tsx';
import NotFound from './pages/NotFound/NotFound.tsx';
import ProtectedRoute from './pages/ProtectedRoute/ProtectedRoute.tsx';
import Settings from './pages/Settings/Settings.tsx';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password/:token' element={<ResetPassword />} />
      <Route path='/gallery' element={<ProtectedRoute><Gallery /></ProtectedRoute>} />
      <Route path='/project' element={<ProtectedRoute><Project /></ProtectedRoute>} />
      <Route path='/create-project' element={<ProtectedRoute><CreateProject /></ProtectedRoute>} />
      <Route path='/create-tapestry' element={<CreateTapestry/>} />
      <Route path='/tapestry/:id' element={<Tapestry />} />
      <Route path='/settings' element={<Settings />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}