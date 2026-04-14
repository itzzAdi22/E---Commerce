import axios from 'axios';

const API_URL = '/api/v1/products';

// Get all products
const getProducts = async (params) => {
  const response = await axios.get(API_URL, { params });
  return response;
};

// Get single product
const getProduct = async (productId) => {
  const response = await axios.get(API_URL + '/' + productId);
  return response;
};

// Get top products
const getTopProducts = async () => {
  const response = await axios.get(API_URL + '/top');
  return response;
};

const productService = {
  getProducts,
  getProduct,
  getTopProducts,
};

export default productService;
