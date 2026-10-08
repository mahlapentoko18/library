export const getData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export const setData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const initializeData = () => {
  if (!getData('library_users').length) {
    setData('library_users', [
      { id: 1, name: 'Admin User', membershipId: 'ADM001', role: 'admin', username: 'admin', password: 'admin123' }
    ]);
  }
  if (!getData('library_books').length) {
    setData('library_books', [
      { id: 1, title: 'Sephiri ke moloi', author: 'David Nkanda Ntoa', genre: 'Drama', isbn: '978-9991128627', quantity: 5 },
      { id: 2, title: 'Intimate', author: 'Elizabeth Gage', genre: 'Romantic', isbn: '0-671-89706-3', quantity: 1 }
    ]);
  }
  if (!getData('library_transactions').length) {
    setData('library_transactions', []);
  }
};