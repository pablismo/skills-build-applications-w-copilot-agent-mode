import { useEffect, useState } from 'react';

const componentName = 'users';

function Users() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const protocol = window.location.protocol === 'http:' ? 'http' : 'https';
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `${protocol}://localhost:8000`;
  const endpoint = `${baseUrl}/api/${componentName}/`;

  useEffect(() => {
    console.log('Fetching Users from', endpoint);
    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch Users: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Users fetch response', data);
        const fetchedItems = Array.isArray(data)
          ? data
          : data?.results ?? data?.data ?? [];
        setItems(fetchedItems);
      })
      .catch((fetchError) => {
        console.error('Users fetch error', fetchError);
        setError(fetchError.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [endpoint]);

  const columns = items.length ? Object.keys(items[0]) : [];

  return (
    <section>
      <h2>Users</h2>
      <p>Endpoint: <code>{endpoint}</code></p>
      {loading && <p>Loading users...</p>}
      {error && <p className="error">Error: {error}</p>}
      {!loading && !error && items.length === 0 && <p>No users found.</p>}
      {items.length > 0 && (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
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
    </section>
  );
}

export default Users;
