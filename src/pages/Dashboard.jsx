import { useEffect, useState } from 'react';
import { getData } from '../utils/storage.js';

export default function Dashboard() {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setBooks(getData('library_books'));
    setUsers(getData('library_users'));
  }, []);

  const totalStock = books.reduce((sum, b) => sum + b.quantity, 0);
  const lowStockCount = books.filter(b => b.quantity < 2).length;

  return (
    <div className="container">
      <h2 className="page-title">Dashboard</h2>
      <div className="card-grid">
        <div className="stat-card"><h3>Total Books</h3><p>{books.length}</p></div>
        <div className="stat-card"><h3>Available Stock</h3><p>{totalStock}</p></div>
        <div className={`stat-card ${lowStockCount > 0 ? 'warning' : ''}`}><h3>Low Stock</h3><p>{lowStockCount}</p></div>
        <div className="stat-card"><h3>Total Users</h3><p>{users.length}</p></div>
      </div>
      <h3 style={{marginBottom: '15px', color: 'var(--dark)'}}>Book Availability</h3>
      <div className="table-section">
        <table>
          <thead><tr><th>Title</th><th>Author</th><th>Genre</th><th>ISBN</th><th>Quantity</th></tr></thead>
          <tbody>
            {books.map(book => (
              <tr key={book.id} className={book.quantity < 2 ? 'low-stock-row' : ''}>
                <td>{book.title}</td><td>{book.author}</td><td>{book.genre}</td><td>{book.isbn}</td>
                <td style={{fontWeight: 'bold', color: book.quantity < 2 ? 'var(--danger)' : 'var(--primary)'}}>{book.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}