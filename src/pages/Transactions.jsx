import { useState, useEffect } from 'react';
import { getData, setData } from '../utils/storage.js';

export default function Transactions() {
  const [books, setBooks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({ bookId: '', type: 'add', quantity: '' });

  useEffect(() => {
    setBooks(getData('library_books'));
    setTransactions(getData('library_transactions'));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookId = parseInt(form.bookId);
    const qty = parseInt(form.quantity);
    const book = books.find(b => b.id === bookId);

    if (!book) return alert('Select a book');
    if (form.type === 'deduct' && qty > book.quantity) return alert('Not enough stock!');

    const updatedBooks = books.map(b => b.id === bookId ? { ...b, quantity: b.quantity + (form.type === 'add' ? qty : -qty) } : b);
    setBooks(updatedBooks);
    setData('library_books', updatedBooks);

    const newTrans = {
      id: Date.now(), date: new Date().toLocaleString(), bookTitle: book.title,
      type: form.type === 'add' ? 'Add Stock' : 'Borrow', quantity: qty,
      newStock: updatedBooks.find(b => b.id === bookId).quantity
    };
    const updatedTrans = [newTrans, ...transactions];
    setTransactions(updatedTrans);
    setData('library_transactions', updatedTrans);
    setForm({ bookId: '', type: 'add', quantity: '' });
    alert('Transaction processed!');
  };

  return (
    <div className="container">
      <h2 className="page-title">Transactions</h2>
      <div className="form-section">
        <h3>Update Stock</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Select Book</label>
              <select value={form.bookId} onChange={e => setForm({...form, bookId: e.target.value})} required>
                <option value="">-- Choose --</option>
                {books.map(b => <option key={b.id} value={b.id}>{b.title} (Stock: {b.quantity})</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Type</label>
              <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} required>
                <option value="add">Add Stock</option>
                <option value="deduct">Deduct Stock (Borrow)</option>
              </select>
            </div>
          </div>
          <div className="form-group"><label>Quantity</label><input type="number" min="1" value={form.quantity} onChange={e => setForm({...form, quantity: e.target.value})} required /></div>
          <button type="submit" className="btn btn-primary">Process Transaction</button>
        </form>
      </div>
      <div className="table-section">
        <h3>Transaction History</h3>
        <table>
          <thead><tr><th>Date</th><th>Book</th><th>Type</th><th>Quantity</th><th>New Stock</th></tr></thead>
          <tbody>
            {transactions.map(t => (
              <tr key={t.id}><td>{t.date}</td><td>{t.bookTitle}</td><td>{t.type}</td><td>{t.quantity}</td><td>{t.newStock}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}