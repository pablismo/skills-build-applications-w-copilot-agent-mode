import { useState } from 'react';
import logo from './octofitapp-small.svg';
import './App.css';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [activityForm, setActivityForm] = useState({
    date: '2026-05-15',
    type: 'Run',
    duration: '30',
    distance: '5',
  });

  const recentActivities = [
    { id: 1, date: '2026-05-15', type: 'Run', duration: '30 min', distance: '5 km', status: 'Completed' },
    { id: 2, date: '2026-05-14', type: 'Cycle', duration: '45 min', distance: '18 km', status: 'Completed' },
    { id: 3, date: '2026-05-13', type: 'Yoga', duration: '40 min', distance: '-', status: 'Planned' },
  ];

  const leaderboard = [
    { position: 1, team: 'Team Octopus', points: 1540 },
    { position: 2, team: 'Team Kraken', points: 1390 },
    { position: 3, team: 'Team Nautilus', points: 1255 },
  ];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setActivityForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowModal(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold d-flex align-items-center" href="#home">
            <img src={logo} alt="OctoFit logo" className="brand-icon me-2" />
            OctoFit Tracker
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#dashboard">
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#activities">
                  Activities
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#leaderboard">
                  Leaderboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#support">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="app-shell py-5" id="dashboard">
        <div className="container">
          <header className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
            <div>
              <h1 className="display-6 fw-semibold mb-2">OctoFit Tracker Dashboard</h1>
              <p className="text-muted mb-0">
                Track workouts, manage teams, and compare performance with a responsive Bootstrap layout.
              </p>
            </div>
            <div>
              <button type="button" className="btn btn-primary me-2" onClick={() => setShowModal(true)}>
                Add Activity
              </button>
              <a className="btn btn-outline-secondary" href="#leaderboard">
                View Leaderboard
              </a>
            </div>
          </header>

          <div className="row g-4 mb-4" id="activities">
            <div className="col-md-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h2 className="h6 text-uppercase text-secondary">Weekly Goal</h2>
                  <p className="display-6 fw-bold mb-2">18 hrs</p>
                  <p className="mb-0 text-muted">Stay on pace with your weekly workout target.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h2 className="h6 text-uppercase text-secondary">Active Teams</h2>
                  <p className="display-6 fw-bold mb-2">4</p>
                  <p className="mb-0 text-muted">Teams competing in this week’s fitness challenge.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h2 className="h6 text-uppercase text-secondary">Open Challenges</h2>
                  <p className="display-6 fw-bold mb-2">3</p>
                  <p className="mb-0 text-muted">View your current leaderboard and finish strong.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-lg-7">
              <div className="card shadow-sm">
                <div className="card-header d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3">
                  <div>
                    <h2 className="h5 mb-1">Recent Activities</h2>
                    <p className="text-muted mb-0">A consistent, clean table layout for workout tracking.</p>
                  </div>
                  <button className="btn btn-sm btn-outline-primary" onClick={() => setShowModal(true)}>
                    New Activity
                  </button>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-striped table-hover align-middle mb-0">
                      <thead className="table-light">
                        <tr>
                          <th scope="col">Date</th>
                          <th scope="col">Activity</th>
                          <th scope="col">Duration</th>
                          <th scope="col">Distance</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentActivities.map((activity) => (
                          <tr key={activity.id}>
                            <td>{activity.date}</td>
                            <td>{activity.type}</td>
                            <td>{activity.duration}</td>
                            <td>{activity.distance}</td>
                            <td>
                              <span className={`badge ${activity.status === 'Completed' ? 'bg-success' : 'bg-warning text-dark'}`}>
                                {activity.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="card shadow-sm" id="leaderboard">
                <div className="card-header">
                  <h2 className="h5 mb-0">Team Leaderboard</h2>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-striped table-hover align-middle mb-0">
                      <thead className="table-light">
                        <tr>
                          <th scope="col">Rank</th>
                          <th scope="col">Team</th>
                          <th scope="col">Points</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leaderboard.map((entry) => (
                          <tr key={entry.position}>
                            <th scope="row">{entry.position}</th>
                            <td>{entry.team}</td>
                            <td>{entry.points}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="card shadow-sm mt-4">
                <div className="card-body">
                  <h2 className="h5 mb-3">Quick Search</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="search" className="form-label">
                        Find activity
                      </label>
                      <input type="search" className="form-control" id="search" placeholder="Search by type, date or team" />
                    </div>
                    <button type="submit" className="btn btn-outline-secondary">
                      Search
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-top py-4 bg-white">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <p className="mb-0 text-muted">Built with Bootstrap for a polished OctoFit experience.</p>
          <div>
            <a href="#support" className="link-secondary me-3">
              Help Center
            </a>
            <a href="https://reactjs.org" target="_blank" rel="noreferrer" className="link-secondary">
              React Docs
            </a>
          </div>
        </div>
      </footer>

      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content shadow-lg">
              <div className="modal-header">
                <div>
                  <h5 className="modal-title">Add New Activity</h5>
                  <p className="text-muted mb-0">Create a workout entry in your tracker.</p>
                </div>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)} />
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="date" className="form-label">
                      Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="date"
                      name="date"
                      value={activityForm.date}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="type" className="form-label">
                      Activity type
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="type"
                      name="type"
                      value={activityForm.type}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="duration" className="form-label">
                        Duration
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="duration"
                        name="duration"
                        value={activityForm.duration}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="distance" className="form-label">
                        Distance
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="distance"
                        name="distance"
                        value={activityForm.distance}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Activity
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="modal-backdrop fade show" />
        </div>
      )}
    </>
  );
}

export default App;
