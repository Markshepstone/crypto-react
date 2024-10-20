import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchAccounts, createAccount } from '../services/api';
import './Dashboard.css'; // You'll need to create this CSS file

function Dashboard() {
  const { user, logout } = useAuth();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newAccountName, setNewAccountName] = useState('');

  const handleFetchAccounts = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const fetchedAccounts = await fetchAccounts(user.id);
      setAccounts(fetchedAccounts);
    } catch (error) {
      setError('Failed to fetch accounts. Please try again.');
      console.error('Error fetching accounts:', error);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    handleFetchAccounts();
  }, [handleFetchAccounts]);

  const handleLogout = () => {
    logout();
    // Redirect to login page
  };

  const handleCreateAccount = async () => {
    if (!newAccountName.trim()) {
      setError('Please enter a name for the new account.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await createAccount(user.id, newAccountName);
      setNewAccountName('');
      await handleFetchAccounts();
    } catch (error) {
      setError('Failed to create new account. Please try again.');
      console.error('Error creating account:', error);
    }
    setLoading(false);
  };

  const truncateAddress = (address) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p>Welcome, {user ? user.email : 'Guest'}</p>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleFetchAccounts} disabled={loading}>
        {loading ? 'Fetching...' : 'Refresh Accounts'}
      </button>
      {error && <p className="error-message">{error}</p>}
      <div className="create-account">
        <input
          type="text"
          value={newAccountName}
          onChange={(e) => setNewAccountName(e.target.value)}
          placeholder="New Account Name"
        />
        <button onClick={handleCreateAccount} disabled={loading}>
          Create Account
        </button>
      </div>
      {accounts.length > 0 ? (
        <ul className="account-list">
          {accounts.map(account => (
            <li key={account.id} className="account-item">
              <span className="account-address">{truncateAddress(account.address)}</span>
              <span className="account-owner">{account.owner}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No accounts found.</p>
      )}
    </div>
  );
}

export default Dashboard;