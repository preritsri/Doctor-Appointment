import {BrowserRouter, Routes,Route} from 'react-router-dom'
import HomePage from "./pages/HomePage";
import Login from "./pages/login";
import Register from "./pages/register";
import { useSelector } from 'react-redux';
import ProtectedRoutes from './components/ProtectedRoutes';
import PublicRoute from './components/PublicRoute';
import ApplyDoctor from './pages/ApplyDoctor';
import NotificationPage from './pages/NotificationPage';
import Users from './pages/admin/Users';
import Doctors from './pages/admin/Doctors';
import Profile from './pages/doctor/Profile';
import BookingPage from './pages/BookingPage';
import Appointments from './pages/Appointments';
import DoctorAppointments from './pages/doctor/DoctorAppointments';
// import spinner from './components/spinner';
function App() {
  const {loading}=useSelector(state=>state.alerts)
  return (
    <>
     <BrowserRouter>
     {loading && <spinner></spinner>}
     <Routes>
      <Route path='/' element={
        <ProtectedRoutes>
            <HomePage/>
        </ProtectedRoutes>
      
       } ></Route>
      <Route path='/apply-doctor' element={
        <ProtectedRoutes>
            <ApplyDoctor/>
        </ProtectedRoutes>
       } ></Route>

      <Route path='/admin/users' element={
        <ProtectedRoutes>
            <Users/>
        </ProtectedRoutes>
       } ></Route>

      <Route path='/admin/doctors' element={
        <ProtectedRoutes>
            <Doctors/>
        </ProtectedRoutes>
       } ></Route>

      <Route path='/doctor/profile/:id' element={
        <ProtectedRoutes>
            <Profile />
        </ProtectedRoutes>
       } ></Route>

      <Route path='/doctor/book-appointment/:doctorId' element={
        <ProtectedRoutes>
            <BookingPage />
        </ProtectedRoutes>
       } ></Route>

      <Route path='/notification' element={
        <ProtectedRoutes>
            <NotificationPage/>
        </ProtectedRoutes>
      
       } ></Route>
       <Route path='/appointments' element={
        <ProtectedRoutes>
            <Appointments/>
        </ProtectedRoutes>
      
       } ></Route>
      <Route path='/doctor-appointments' element={
        <ProtectedRoutes>
            <DoctorAppointments/>
        </ProtectedRoutes>
      
       } ></Route>
      <Route path='/login' element={
        <PublicRoute>
           <Login/>
        </PublicRoute>
      
      }></Route>
      <Route path='/register' element={
          <PublicRoute>
          <Register/>
         </PublicRoute>
      }></Route>

     </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;
