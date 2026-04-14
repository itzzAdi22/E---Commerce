import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="card">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="card-img-top"
          style={{ height: '200px', objectFit: 'cover' }}
        />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h5 className="card-title">{product.name}</h5>
        </Link>
        <div className="d-flex justify-content-between align-items-center">
          <span className="h5 text-primary">${product.price}</span>
          <span className="text-muted">
            {product.rating} ({product.numReviews} reviews)
          </span>
        </div>
        <div className="mt-2">
          <span className="badge bg-info">{product.category}</span>
          <span className="badge bg-secondary ms-2">{product.brand}</span>
        </div>
        <button
          className="btn btn-primary btn-sm mt-3 w-100"
          onClick={addToCartHandler}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
