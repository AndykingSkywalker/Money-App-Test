import './App.css';
import { Link, Route, Routes, BrowserRouter as Router, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import React from 'react';
import Booking from './Components/Bookings/Booking';
import NavigationBar from './Components/Navbar/Navbar';
import Budget from './Components/Budget/Budget';
import VideoMessage from './Components/VideoMessage/VideoMessage';
import Expenses from "./Components/Expenses/BudgetTool";
import ContactUs from "./Components/Contact/ContactUS";
import SavingsCalculator from "./Components/Savings/Savings";
import MortgageCal from "./Components/Budget/MortgageCal";
import Login from "./Components/Login/Login";


function App() {


  return (
    <header>
    <Router>
     <NavigationBar/>
      <Routes>
      <Route path='/Login' element={<Login/>} />
    <Route path='/Booking' element={<Booking/>} />
    <Route path='/Budget' element={<Budget/>} />
    <Route path="/videomessages" element={<VideoMessage />} />    
    <Route path="/expenses" element={<Expenses />} />    
    <Route path="/contactUs" element={<ContactUs />} />    
    <Route path="/savingsCalculator" element={<SavingsCalculator />} />    
    <Route path="/MortgageCalculator" element={<MortgageCal />} />      


      </Routes>
    </Router>
  </header>
  );
}
export default App;