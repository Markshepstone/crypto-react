require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updatePassword(email, newPassword) {
  try {
    const updatedUser = await prisma.user.update({
      where: { email: email },
      data: { passwordHash: newPassword },
    });
    console.log(`Updated password for user: ${updatedUser.email}`);
  } catch (error) {
    console.error('Error updating password:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Usage
updatePassword('mshepstone@gmail.com', 'nicola18')
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });