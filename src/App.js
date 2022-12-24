import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import HotelPage from './pages/hotel/HotelPage';
import DetailHotel from './pages/detail/DetailHotel';
import { Login } from './pages/login/Login';
import { Register } from './pages/login/Register';

function App() {
  return (
    <div>
      <Login />
      <Register />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/hotel' element={<HotelPage />} />
          <Route path='/hotel/:id' element={<DetailHotel />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
