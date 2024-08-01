// App.js
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from '../src/components/PrivateRoute'; // Adjust path as per your project structure
import Loginpage from '../src/pages/Loginpage';
import Registerpage from '../src/pages/Registerpage';
import Homepage from './pages/Homepage';
import ManageUserpage from './pages/ManageUserpage';
import AdminManagepage from './pages/AdminManagepage.jsx';
import { AuthProvider } from '../src/components/AuthContext'; // Adjust path as per your project structure

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path='/login' element={<Loginpage />} />
          <Route path='/register' element={<Registerpage />} />
          
          
          {/* Private Routes */}
          <Route path='/' element={<PrivateRoute />}>
            <Route path='/home' element={<Homepage />} />
            <Route path='/manageuser' element={<ManageUserpage />} />
            <Route path='/adminmanage' element={<AdminManagepage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
