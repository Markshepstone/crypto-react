import React, { useState, useEffect } from 'react';
import AccountCard from './AccountCard';
import { getAccounts } from '../services/api';

function AccountList() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const fetchedAccounts = await getAccounts();
      setAccounts(fetchedAccounts);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  };

  return (
    <div>
      <h2>My Accounts</h2>
      {accounts.map(account => (
        <AccountCard key={account.address} account={account} onUpdate={fetchAccounts} />
      ))}
    </div>
  );
}

export default AccountList;