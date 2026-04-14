import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../features/cart/cartSlice';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cart;

  // Calculate prices
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    } else if (!paymentMethod) {
      navigate('/payment');
    }
  }, [navigate, shippingAddress, paymentMethod]);

  const placeOrderHandler = () => {
    // Place order logic here
    // After successful order placement
    dispatch(clearCart());
    navigate('/orders');
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h2>Shipping</h2>
            </div>
            <div className="card-body">
              <p>
                <strong>Address:</strong> {shippingAddress.address}, {shippingAddress.city}{' '}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-header">
              <h2>Payment Method</h2>
            </div>
            <div className="card-body">
              <p>
                <strong>Method:</strong> {paymentMethod}
              </p>
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-header">
              <h2>Order Items</h2>
            </div>
            <div className="card-body">
              {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item._id} className="row align-items-center mb-3">
                    <div className="col-md-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded"
                      />
                    </div>
                    <div className="col-md-6">
                      <p>{item.name}</p>
                    </div>
                    <div className="col-md-4">
                      <p>
                        {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h2>Order Summary</h2>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Items:</span>
                <span>${itemsPrice.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span>${shippingPrice.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tax:</span>
                <span>${taxPrice}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <h4>Total:</h4>
                <h4>${totalPrice}</h4>
              </div>
              <button
                type="button"
                className="btn btn-primary w-100"
                disabled={cartItems.length === 0}
                onClick={placeOrderHandler}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
