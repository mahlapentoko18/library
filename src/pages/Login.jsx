import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getData, setData } from '../utils/storage.js';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  if (!getData('library_users').length) {
    setData('library_users', [{ id: 1, name: 'Admin', membershipId: 'ADM001', role: 'admin', username: 'admin', password: 'admin123' }]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = getData('library_users').find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Try admin / admin123');
    }
  };

  return (
    <div className="login-container">
      <h2>Community Library Login</h2>
      {error && <p className="error-msg">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group"><label>Username</label><input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required /></div>
        <div className="form-group"><label>Password</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
        <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Login</button>
      </form>
      <p style={{marginTop: '20px', fontSize: '0.9em'}}>Default: <strong>admin</strong> / <strong>admin123</strong></p>
    </div>
  );
}