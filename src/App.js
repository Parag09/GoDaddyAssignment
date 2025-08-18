import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RepositoryList from './components/RepositoryList';
import RepositoryDetails from './components/RepositoryDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <h1>GoDaddy Repositories</h1>
          <p>Explore GoDaddy's open source projects</p>
        </header>
        
        <main className="main">
          <Routes>
            <Route path="/" element={<RepositoryList />} />
            <Route path="/repo/:owner/:name" element={<RepositoryDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;