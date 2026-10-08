import { useState, useEffect } from 'react';
import { getData, setData } from '../utils/storage.js';

export default function Books() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: '', author: '', genre: '', isbn: '', quantity: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => setBooks(getData('library_books')), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedBooks;
    if (editingId) {
      updatedBooks = books.map(b => b.id === editingId ? { ...b, ...form, quantity: parseInt(form.quantity) } : b);
      setEditingId(null);
    } else {
      updatedBooks = [...books, { id: Date.now(), ...form, quantity: parseInt(form.quantity) }];
    }
    setBooks(updatedBooks);
    setData('library_books', updatedBooks);
    setForm({ title: '', author: '', genre: '', isbn: '', quantity: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this book?')) {
      const updated = books.filter(b => b.id !== id);
      setBooks(updated);
      setData('library_books', updated);
    }
  };

  return (
    <div className="container">
      <h2 className="page-title">Book Management</h2>
      <div className="form-section">
        <h3>{editingId ? 'Update Book' : 'Add New Book'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group"><label>Title</label><input value={form.title} onChange={e => setForm({...form, title: e.target.value})} required /></div>
            <div className="form-group"><label>Author</label><input value={form.author} onChange={e => setForm({...form, author: e.target.value})} required /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Genre</label><input value={form.genre} onChange={e => setForm({...form, genre: e.target.value})} required /></div>
            <div className="form-group"><label>ISBN</label><input value={form.isbn} onChange={e => setForm({...form, isbn: e.target.value})} required /></div>
          </div>
          <div className="form-group"><label>Quantity</label><input type="number" value={form.quantity} onChange={e => setForm({...form, quantity: e.target.value})} required /></div>
          <button type="submit" className="btn btn-primary">{editingId ? 'Update Book' : 'Add Book'}</button>
          {editingId && <button type="button" className="btn btn-danger" onClick={() => { setEditingId(null); setForm({ title: '', author: '', genre: '', isbn: '', quantity: '' }); }} style={{marginLeft: '10px'}}>Cancel</button>}
        </form>
      </div>
      <div className="table-section">
        <h3>Book List</h3>
        <table>
          <thead><tr><th>Title</th><th>Author</th><th>Genre</th><th>ISBN</th><th>Qty</th><th>Actions</th></tr></thead>
          <tbody>
            {books.map(book => (
              <tr key={book.id}>
                <td>{book.title}</td><td>{book.author}</td><td>{book.genre}</td><td>{book.isbn}</td><td>{book.quantity}</td>
                <td>
                  <button className="btn btn-warning" onClick={() => { setForm(book); setEditingId(book.id); }}>Update</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(book.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}