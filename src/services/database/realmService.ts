import Realm from 'realm';

let realm: Realm;

// Define schemas
const TransactionSchema = {
  name: 'Transaction',
  properties: {
    _id: 'string',
    title: 'string',
    description: 'string?',
    amount: 'float',
    type: 'string',
    paymentMethod: 'string',
    fromAccount: 'string',
    toAccount: 'string',
    date: 'date',
    category: 'string',
    projectId: 'string?',
    isRecurring: 'bool',
  },
  primaryKey: '_id',
};

const AccountSchema = {
  name: 'BankAccount',
  properties: {
    _id: 'string',
    name: 'string',
    accountNumber: 'string',
    balance: 'float',
    currency: 'string',
    bankName: 'string',
    color: 'string',
  },
  primaryKey: '_id',
};

// Initialize database
export const initializeDatabase = async () => {
  try {
    realm = new Realm({
      schema: [TransactionSchema, AccountSchema],
      schemaVersion: 1,
    });
    console.log('✅ Realm Database initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing Realm:', error);
    throw error;
  }
};

// Get realm instance
export const getRealm = (): Realm => {
  if (!realm) {
    throw new Error('Database not initialized');
  }
  return realm;
};

// Close database
export const closeDatabase = () => {
  if (realm && !realm.isClosed) {
    realm.close();
  }
};