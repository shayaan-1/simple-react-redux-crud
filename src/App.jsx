import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Create from './components/Create';
import Update from './components/Update';
import Login from './components/Login';

function App() {
  const loggedInUser = useSelector(state => state.auth.loggedInUser);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {loggedInUser ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/edit/:courseid" element={<Update />} />
          </>
        ) : (
          <Route path="*" element={<Login />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
