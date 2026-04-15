import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../features/products/productSlice';
import { addToCart } from '../features/cart/cartSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProduct(productId));
  }, [dispatch, productId]);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  return (
    <div className="container mt-4">
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{message}</Message>
      ) : (
        <div className="row">
          <div className="col-md-6">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid rounded"
            />
          </div>
          
          <div className="col-md-6">
            <h2>{product.name}</h2>
            <div className="my-3">
              <span className="h4 text-primary">${product.price}</span>
            </div>
            
            <div className="my-3">
              <strong>Description:</strong> {product.description}
            </div>
            
            <div className="my-3">
              <strong>Brand:</strong> {product.brand}
            </div>
            
            <div className="my-3">
              <strong>Category:</strong> {product.category}
            </div>
            
            <div className="my-3">
              <strong>Rating:</strong> {product.rating} ({product.numReviews} reviews)
            </div>
            
            <div className="my-3">
              <strong>Status:</strong>{' '}
              {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
            </div>
            
            {product.countInStock > 0 && (
              <div className="my-3">
                <label htmlFor="qty">Quantity:</label>
                <select
                  id="qty"
                  className="form-select"
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            <button
              onClick={addToCartHandler}
              className="btn btn-primary w-100"
              disabled={product.countInStock === 0}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;
