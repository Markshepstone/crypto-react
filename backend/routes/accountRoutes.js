const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Get accounts for a user
router.get('/', async (req, res) => {
  const { userId } = req.query;
  console.log('Fetching accounts for userId:', userId);
  
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const accounts = await prisma.xrpAccount.findMany({
      where: { userId: userId },
      select: {
        id: true,
        address: true,
        owner: true,
      }
    });
    
    console.log(`Found ${accounts.length} accounts for userId: ${userId}`);
    res.json(accounts);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create a new account
router.post('/create', async (req, res) => {
  const { userId, accountName } = req.body;
  
  if (!userId || !accountName) {
    return res.status(400).json({ message: 'User ID and account name are required' });
  }

  try {
    // Here, you'd typically interact with the XRP Ledger to create a new account
    // For now, let's just create a dummy account in your database
    const newAccount = await prisma.xrpAccount.create({
      data: {
        address: `rDummy${Math.random().toString(36).substring(7)}`, // Generate a dummy address
        owner: accountName,
        userId: userId
      }
    });
    
    res.json({ message: 'Account created successfully', account: newAccount });
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;