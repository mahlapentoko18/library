import { useState, useEffect } from 'react';
import { getData, setData } from '../utils/storage.js';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', membershipId: '', role: 'member', username: '', password: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => setUsers(getData('library_users')), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedUsers;
    if (editingId) {
      updatedUsers = users.map(u => u.id === editingId ? { ...u, ...form } : u);
      setEditingId(null);
    } else {
      updatedUsers = [...users, { id: Date.now(), ...form }];
    }
    setUsers(updatedUsers);
    setData('library_users', updatedUsers);
    setForm({ name: '', membershipId: '', role: 'member', username: '', password: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this user?')) {
      const updated = users.filter(u => u.id !== id);
      setUsers(updated);
      setData('library_users', updated);
    }
  };

  return (
    <div className="container">
      <h2 className="page-title">User Management</h2>
      <div className="form-section">
        <h3>{editingId ? 'Update User' : 'Add New User'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group"><label>Name</label><input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required /></div>
            <div className="form-group"><label>Membership ID</label><input value={form.membershipId} onChange={e => setForm({...form, membershipId: e.target.value})} required /></div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Role</label>
              <select value={form.role} onChange={e => setForm({...form, role: e.target.value})} required>
                <option value="member">Member</option><option value="librarian">Librarian</option><option value="admin">Admin</option>
              </select>
            </div>
            <div className="form-group"><label>Username</label><input value={form.username} onChange={e => setForm({...form, username: e.target.value})} required /></div>
          </div>
          <div className="form-group"><label>Password</label><input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required /></div>
          <button type="submit" className="btn btn-primary">{editingId ? 'Update User' : 'Add User'}</button>
          {editingId && <button type="button" className="btn btn-danger" onClick={() => { setEditingId(null); setForm({ name: '', membershipId: '', role: 'member', username: '', password: '' }); }} style={{marginLeft: '10px'}}>Cancel</button>}
        </form>
      </div>
      <div className="table-section">
        <h3>User List</h3>
        <table>
          <thead><tr><th>Name</th><th>Membership ID</th><th>Role</th><th>Username</th><th>Actions</th></tr></thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td><td>{user.membershipId}</td><td>{user.role}</td><td>{user.username}</td>
                <td>
                  <button className="btn btn-warning" onClick={() => { setForm(user); setEditingId(user.id); }}>Update</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}