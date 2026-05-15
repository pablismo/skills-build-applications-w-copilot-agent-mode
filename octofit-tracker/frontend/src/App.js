import { useState } from 'react';
import './App.css';
import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="App layout">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <NavLink className="navbar-brand fw-bold" to="/activities">
            OctoFit Tracker
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#appNavbar"
            aria-controls="appNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="appNavbar">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/activities" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                  Activities
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/leaderboard" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                  Leaderboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/teams" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                  Teams
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/users" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                  Users
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/workouts" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                  Workouts
                </NavLink>
              </li>
            </ul>
            <button type="button" className="btn btn-outline-light" onClick={() => setShowModal(true)}>
              API Info
            </button>
          </div>
        </div>
      </nav>

      <header className="App-header py-5 bg-light border-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 className="display-5 fw-bold mb-2">OctoFit Tracker</h1>
              <p className="lead text-secondary mb-0">
                Browse workout data, teams, users, and leaderboard stats from the Django REST API.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
              <NavLink to="/activities" className="btn btn-primary me-2 mb-2">
                Start Tracking
              </NavLink>
              <NavLink to="/leaderboard" className="btn btn-outline-primary mb-2">
                View Leaderboard
              </NavLink>
            </div>
          </div>
        </div>
      </header>

      <main className="App-main container py-5">
        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<div className="alert alert-warning">Page not found</div>} />
        </Routes>
      </main>

      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">API Connection Info</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)} />
              </div>
              <div className="modal-body">
                <p className="mb-2">
                  The frontend loads data from each API endpoint with the following pattern:
                </p>
                <pre className="bg-light p-3 rounded">https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev/api/[component]/</pre>
                <p className="mb-0 text-muted">
                  If the Codespace name is not available, the components fall back to <strong>localhost:8000</strong>.
                </p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" />
        </div>
      )}
    </div>
  );
}

export default App;
