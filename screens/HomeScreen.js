import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProducts, getTopProducts } from '../features/products/productSlice';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const { products, isLoading, isError, message, topProducts } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getTopProducts());
  }, [dispatch]);

  return (
    <div>
      {/* Hero Section */}
      <div className="jumbotron bg-primary text-white py-5">
        <div className="container">
          <h1 className="display-4">Welcome to E-Commerce Platform</h1>
          <p className="lead">Discover amazing products at great prices!</p>
          <Link className="btn btn-light btn-lg" to="/products">
            Shop Now
          </Link>
        </div>
      </div>

      {/* Top Products */}
      <div className="container mt-4">
        <h2>Top Products</h2>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Message variant="danger">{message}</Message>
        ) : (
          <div className="row">
            {topProducts.map((product) => (
              <div key={product._id} className="col-md-4 col-sm-6 mb-4">
                <Product product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Latest Products */}
      <div className="container mt-4">
        <h2>Latest Products</h2>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Message variant="danger">{message}</Message>
        ) : (
          <div className="row">
            {products.slice(0, 6).map((product) => (
              <div key={product._id} className="col-md-4 col-sm-6 mb-4">
                <Product product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
