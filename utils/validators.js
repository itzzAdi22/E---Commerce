// Validation functions for forms and data

// User validation
export const validateUser = (userData) => {
  const errors = {};
  
  if (!userData.name || userData.name.trim() === '') {
    errors.name = 'Name is required';
  } else if (userData.name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  } else if (userData.name.length > 50) {
    errors.name = 'Name must be less than 50 characters';
  }
  
  if (!userData.email || userData.email.trim() === '') {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
    errors.email = 'Email is invalid';
  }
  
  if (!userData.password) {
    errors.password = 'Password is required';
  } else if (userData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  } else if (userData.password.length > 100) {
    errors.password = 'Password must be less than 100 characters';
  }
  
  if (userData.confirmPassword && userData.password !== userData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Product validation
export const validateProduct = (productData) => {
  const errors = {};
  
  if (!productData.name || productData.name.trim() === '') {
    errors.name = 'Product name is required';
  } else if (productData.name.length < 2) {
    errors.name = 'Product name must be at least 2 characters';
  }
  
  if (!productData.description || productData.description.trim() === '') {
    errors.description = 'Description is required';
  } else if (productData.description.length < 10) {
    errors.description = 'Description must be at least 10 characters';
  }
  
  if (!productData.price || productData.price <= 0) {
    errors.price = 'Price must be greater than 0';
  } else if (productData.price > 999999) {
    errors.price = 'Price must be less than 999999';
  }
  
  if (!productData.category || productData.category.trim() === '') {
    errors.category = 'Category is required';
  }
  
  if (!productData.brand || productData.brand.trim() === '') {
    errors.brand = 'Brand is required';
  }
  
  if (!productData.countInStock || productData.countInStock < 0) {
    errors.countInStock = 'Stock count must be 0 or greater';
  } else if (productData.countInStock > 999999) {
    errors.countInStock = 'Stock count must be less than 999999';
  }
  
  if (!productData.image || productData.image.trim() === '') {
    errors.image = 'Product image is required';
  } else if (!isValidUrl(productData.image)) {
    errors.image = 'Image URL is invalid';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Order validation
export const validateOrder = (orderData) => {
  const errors = {};
  
  if (!orderData.orderItems || orderData.orderItems.length === 0) {
    errors.orderItems = 'Order must contain at least one item';
  }
  
  if (!orderData.shippingAddress) {
    errors.shippingAddress = 'Shipping address is required';
  } else {
    const shippingErrors = validateShippingAddress(orderData.shippingAddress);
    Object.assign(errors, shippingErrors.errors);
  }
  
  if (!orderData.paymentMethod || orderData.paymentMethod.trim() === '') {
    errors.paymentMethod = 'Payment method is required';
  }
  
  if (!orderData.itemsPrice || orderData.itemsPrice <= 0) {
    errors.itemsPrice = 'Items price must be greater than 0';
  }
  
  if (!orderData.totalPrice || orderData.totalPrice <= 0) {
    errors.totalPrice = 'Total price must be greater than 0';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Shipping address validation
export const validateShippingAddress = (address) => {
  const errors = {};
  
  if (!address.address || address.address.trim() === '') {
    errors.address = 'Street address is required';
  }
  
  if (!address.city || address.city.trim() === '') {
    errors.city = 'City is required';
  }
  
  if (!address.postalCode || address.postalCode.trim() === '') {
    errors.postalCode = 'Postal code is required';
  } else if (!/^[A-Za-z0-9\s\-]+$/.test(address.postalCode)) {
    errors.postalCode = 'Postal code is invalid';
  }
  
  if (!address.country || address.country.trim() === '') {
    errors.country = 'Country is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Payment validation
export const validatePayment = (paymentData) => {
  const errors = {};
  
  if (!paymentData.method || paymentData.method.trim() === '') {
    errors.method = 'Payment method is required';
  }
  
  if (paymentData.method === 'creditCard') {
    if (!paymentData.cardNumber || !/^\d{16}$/.test(paymentData.cardNumber.replace(/\s/g, ''))) {
      errors.cardNumber = 'Valid 16-digit card number is required';
    }
    
    if (!paymentData.expiryDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentData.expiryDate)) {
      errors.expiryDate = 'Valid expiry date (MM/YY) is required';
    }
    
    if (!paymentData.cvv || !/^\d{3,4}$/.test(paymentData.cvv)) {
      errors.cvv = 'Valid CVV is required';
    }
    
    if (!paymentData.cardholderName || paymentData.cardholderName.trim() === '') {
      errors.cardholderName = 'Cardholder name is required';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Review validation
export const validateReview = (reviewData) => {
  const errors = {};
  
  if (!reviewData.rating || reviewData.rating < 1 || reviewData.rating > 5) {
    errors.rating = 'Rating must be between 1 and 5';
  }
  
  if (!reviewData.comment || reviewData.comment.trim() === '') {
    errors.comment = 'Review comment is required';
  } else if (reviewData.comment.length < 10) {
    errors.comment = 'Review must be at least 10 characters';
  } else if (reviewData.comment.length > 1000) {
    errors.comment = 'Review must be less than 1000 characters';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Search validation
export const validateSearch = (searchTerm) => {
  const errors = {};
  
  if (searchTerm && searchTerm.length < 2) {
    errors.searchTerm = 'Search term must be at least 2 characters';
  } else if (searchTerm && searchTerm.length > 100) {
    errors.searchTerm = 'Search term must be less than 100 characters';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Pagination validation
export const validatePagination = (page, limit) => {
  const errors = {};
  
  if (page && (page < 1 || page > 1000)) {
    errors.page = 'Page must be between 1 and 1000';
  }
  
  if (limit && (limit < 1 || limit > 100)) {
    errors.limit = 'Limit must be between 1 and 100';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// File upload validation
export const validateFileUpload = (file, allowedTypes = ['image/jpeg', 'image/png', 'image/gif'], maxSize = 5 * 1024 * 1024) => {
  const errors = {};
  
  if (!file) {
    errors.file = 'File is required';
  } else {
    if (!allowedTypes.includes(file.type)) {
      errors.file = `File type must be one of: ${allowedTypes.join(', ')}`;
    }
    
    if (file.size > maxSize) {
      errors.file = `File size must be less than ${maxSize / (1024 * 1024)}MB`;
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Helper function to validate URL
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

// Generic field validation
export const validateField = (value, rules) => {
  const errors = [];
  
  if (rules.required && (!value || value.toString().trim() === '')) {
    errors.push('This field is required');
  }
  
  if (rules.minLength && value && value.toString().length < rules.minLength) {
    errors.push(`Must be at least ${rules.minLength} characters`);
  }
  
  if (rules.maxLength && value && value.toString().length > rules.maxLength) {
    errors.push(`Must be less than ${rules.maxLength} characters`);
  }
  
  if (rules.min && value && Number(value) < rules.min) {
    errors.push(`Must be at least ${rules.min}`);
  }
  
  if (rules.max && value && Number(value) > rules.max) {
    errors.push(`Must be less than ${rules.max}`);
  }
  
  if (rules.pattern && value && !rules.pattern.test(value)) {
    errors.push(rules.message || 'Invalid format');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Form validation helper
export const validateForm = (formData, validationRules) => {
  const errors = {};
  let isValid = true;
  
  Object.keys(validationRules).forEach(field => {
    const fieldValidation = validateField(formData[field], validationRules[field]);
    if (!fieldValidation.isValid) {
      errors[field] = fieldValidation.errors;
      isValid = false;
    }
  });
  
  return {
    isValid,
    errors
  };
};
