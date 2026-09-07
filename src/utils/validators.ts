// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone validation (Iranian)
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^(\+98|0)?9\d{9}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

// Amount validation
export const isValidAmount = (amount: any): boolean => {
  const num = Number(amount);
  return !isNaN(num) && num > 0;
};

// Password validation
export const isValidPassword = (password: string): boolean => {
  // At least 6 characters, 1 uppercase, 1 lowercase, 1 number
  return password.length >= 6 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password);
};

// Check number validation
export const isValidCheckNumber = (checkNumber: string): boolean => {
  return checkNumber.length >= 5 && checkNumber.length <= 20;
};

// Account number validation
export const isValidAccountNumber = (accountNumber: string): boolean => {
  const number = accountNumber.replace(/\D/g, '');
  return number.length >= 10 && number.length <= 20;
};
