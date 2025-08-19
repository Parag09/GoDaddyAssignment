import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

// Code splitting with lazy loading
const RepositoryList = React.lazy(() => import('./components/RepositoryList'));
const RepositoryDetails = React.lazy(() => import('./components/RepositoryDetails'));

function App() {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <h1>GoDaddy Repositories</h1>
          <p>Explore GoDaddy's open source projects</p>
        </header>
        
        <main className="main">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<RepositoryList />} />
              <Route path="/repo/:owner/:name" element={<RepositoryDetails />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;