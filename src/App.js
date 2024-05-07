import './App.css';
import { Link, Route, Routes, BrowserRouter as Router, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import React from 'react';
import Booking from './Components/Bookings/Booking';
import NavigationBar from './Components/Navbar/Navbar';




function App() {


  return (
    <header>
    <Router>
     <NavigationBar/>
      <Routes>
    <Route path='/Booking' element={<Booking/>} />
        

      </Routes>
    </Router>
  </header>
  );
}
export default App;