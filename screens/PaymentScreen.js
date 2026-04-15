import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { savePaymentMethod } from '../features/cart/cartSlice';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod } = cart;

  const [paymentMethodSelected, setPaymentMethodSelected] = useState(paymentMethod || 'PayPal');

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [navigate, shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethodSelected));
    navigate('/placeorder');
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h1>Payment Method</h1>
              <div className="progress">
                <div className="progress-bar" role="progressbar" style={{ width: '66%' }}></div>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={submitHandler}>
                <div className="form-group">
                  <h3>Select Payment Method</h3>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="paypal"
                      name="paymentMethod"
                      value="PayPal"
                      checked={paymentMethodSelected === 'PayPal'}
                      onChange={(e) => setPaymentMethodSelected(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="paypal">
                      PayPal or Credit Card
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="stripe"
                      name="paymentMethod"
                      value="Stripe"
                      checked={paymentMethodSelected === 'Stripe'}
                      onChange={(e) => setPaymentMethodSelected(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="stripe">
                      Stripe
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="razorpay"
                      name="paymentMethod"
                      value="Razorpay"
                      checked={paymentMethodSelected === 'Razorpay'}
                      onChange={(e) => setPaymentMethodSelected(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="razorpay">
                      Razorpay
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="cod"
                      name="paymentMethod"
                      value="COD"
                      checked={paymentMethodSelected === 'COD'}
                      onChange={(e) => setPaymentMethodSelected(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="cod">
                      Cash on Delivery
                    </label>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">
                  Continue
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen;
