import React, { useState } from 'react';
import { updateAccount, deleteAccount, getAccountBalance } from '../services/api';

function AccountCard({ account, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [owner, setOwner] = useState(account.owner);

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setIsEditing(false);
    setOwner(account.owner);
  };

  const handleSave = async () => {
    try {
      await updateAccount(account.address, { owner });
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      console.error('Error updating account:', error);
      alert('Failed to update account.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this account?')) {
      try {
        await deleteAccount(account.address);
        onUpdate();
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Failed to delete account.');
      }
    }
  };

  const handleGetBalance = async () => {
    try {
      const balanceInfo = await getAccountBalance(account.address);
      alert(`Current balance: ${balanceInfo.balance} XRP`);
      onUpdate();
    } catch (error) {
      console.error('Error fetching balance:', error);
      alert('Failed to fetch account balance.');
    }
  };

  return (
    <div className="account-card">
      <h3>Address: {account.address}</h3>
      {isEditing ? (
        <>
          <input
            type="text"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            placeholder="Owner"
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <p>Owner: {account.owner}</p>
          <button onClick={handleEdit}>Edit</button>
        </>
      )}
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleGetBalance}>Get Balance</button>
      {account.latestBalance && (
        <p>Balance: {account.latestBalance.balance} XRP</p>
      )}
    </div>
  );
}

export default AccountCard;