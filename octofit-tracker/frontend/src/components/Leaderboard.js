import { useEffect, useState } from 'react';

const componentName = 'leaderboard';

function Leaderboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const protocol = window.location.protocol === 'http:' ? 'http' : 'https';
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `${protocol}://localhost:8000`;
  const endpoint = `${baseUrl}/api/${componentName}/`;

  useEffect(() => {
    console.log('Fetching Leaderboard from', endpoint);
    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch Leaderboard: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Leaderboard fetch response', data);
        const fetchedItems = Array.isArray(data)
          ? data
          : data?.results ?? data?.data ?? [];
        setItems(fetchedItems);
      })
      .catch((fetchError) => {
        console.error('Leaderboard fetch error', fetchError);
        setError(fetchError.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [endpoint, refreshKey]);

  const filteredItems = items.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(search.toLowerCase())
  );
  const columns = filteredItems.length ? Object.keys(filteredItems[0]) : [];

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
          <div>
            <h2 className="h4 card-title">Leaderboard</h2>
            <p className="text-muted mb-1">Endpoint: <code>{endpoint}</code></p>
          </div>
          <div className="btn-group">
            <button type="button" className="btn btn-outline-primary" onClick={() => setRefreshKey((prev) => prev + 1)}>
              Refresh
            </button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => setSearch('')}>
              Clear Search
            </button>
          </div>
        </div>

        <form className="row g-2 mb-4" onSubmit={(event) => event.preventDefault()}>
          <div className="col-sm-9">
            <input
              type="search"
              className="form-control"
              placeholder="Search leaderboard"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <div className="col-sm-3 d-grid">
            <button type="button" className="btn btn-primary" onClick={() => setSearch('')}>
              Reset
            </button>
          </div>
        </form>

        {loading && <div className="alert alert-info">Loading leaderboard...</div>}
        {error && <div className="alert alert-danger">Error: {error}</div>}
        {!loading && !error && filteredItems.length === 0 && <div className="alert alert-warning">No leaderboard entries found.</div>}

        {filteredItems.length > 0 && (
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  {columns.map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item, index) => (
                  <tr key={item.id ?? index}>
                    {columns.map((column) => (
                      <td key={column}>{JSON.stringify(item[column])}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
