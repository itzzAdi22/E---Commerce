// API Constants
export const API_BASE_URL = process.env.REACT_APP_API_URL || '/api/v1';

// Product Constants
export const PRODUCT_CATEGORIES = [
  'Electronics',
  'Clothing',
  'Books',
  'Home & Garden',
  'Sports',
  'Toys',
  'Food',
  'Health',
  'Beauty',
  'Automotive'
];

export const PRODUCT_BRANDS = [
  'Apple',
  'Samsung',
  'Nike',
  'Adidas',
  'Sony',
  'LG',
  'Microsoft',
  'Dell',
  'HP',
  'Canon'
];

// Order Constants
export const ORDER_STATUS = {
  PENDING: 'Pending',
  PROCESSING: 'Processing',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled'
};

export const PAYMENT_METHODS = [
  { value: 'PayPal', label: 'PayPal or Credit Card' },
  { value: 'Stripe', label: 'Stripe' },
  { value: 'Razorpay', label: 'Razorpay' },
  { value: 'COD', label: 'Cash on Delivery' }
];

// User Constants
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin'
};

// UI Constants
export const PAGINATION_LIMITS = [5, 10, 20, 50];
export const DEFAULT_PAGINATION_LIMIT = 10;

// Local Storage Keys
export const STORAGE_KEYS = {
  USER: 'user',
  CART: 'cart',
  SHIPPING_ADDRESS: 'shippingAddress',
  PAYMENT_METHOD: 'paymentMethod'
};

// Validation Constants
export const VALIDATION_RULES = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  PASSWORD_MIN_LENGTH: 6,
  PASSWORD_MAX_LENGTH: 100,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[\d\s\-\+\(\)]+$/
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  USER_NOT_FOUND: 'User not found.',
  PRODUCT_NOT_FOUND: 'Product not found.',
  CART_EMPTY: 'Your cart is empty.',
  ORDER_FAILED: 'Failed to place order. Please try again.',
  UPLOAD_FAILED: 'Failed to upload image.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'Server error. Please try again later.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  REGISTER_SUCCESS: 'Registration successful!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  PASSWORD_UPDATED: 'Password updated successfully!',
  CART_UPDATED: 'Cart updated successfully!',
  ORDER_PLACED: 'Order placed successfully!',
  PRODUCT_ADDED: 'Product added successfully!',
  PRODUCT_UPDATED: 'Product updated successfully!',
  PRODUCT_DELETED: 'Product deleted successfully!'
};

// Loading Messages
export const LOADING_MESSAGES = {
  AUTHENTICATING: 'Authenticating...',
  LOADING_PRODUCTS: 'Loading products...',
  PROCESSING_ORDER: 'Processing order...',
  UPLOADING_IMAGE: 'Uploading image...',
  SAVING_CHANGES: 'Saving changes...'
};
