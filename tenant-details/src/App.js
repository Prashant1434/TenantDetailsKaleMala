import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserDetails from './UserDetails';  // Import the UserDetails component
import TenantDetails from './TenantDetails';  // Import the TenantDetails component
import HomePage from './HomePage';

function App() {
    return (
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                {/* Route for UserDetails page */}
                <Route path="/user-details/:roomNo" element={<UserDetails />} />

                {/* Route for TenantDetails page */}
                <Route path="/tenant-details" element={<TenantDetails />} />
                
                {/* Add other routes if necessary */}
            </Routes>
    );
}

export default App;
