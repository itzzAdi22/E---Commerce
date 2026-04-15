import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Fetch order logic here
    const fetchOrder = async () => {
      setIsLoading(true);
      try {
        // Mock order data
        const mockOrder = {
          _id: orderId,
          user: { name: 'John Doe', email: 'john@example.com' },
          orderItems: [
            {
              name: 'Sample Product',
              qty: 1,
              image: '/images/sample.jpg',
              price: 99.99
            }
          ],
          shippingAddress: {
            address: '123 Main St',
            city: 'New York',
            postalCode: '10001',
            country: 'USA'
          },
          paymentMethod: 'PayPal',
          itemsPrice: 99.99,
          taxPrice: 15.00,
          shippingPrice: 10.00,
          totalPrice: 124.99,
          isPaid: false,
          isDelivered: false,
          createdAt: new Date().toISOString()
        };
        setOrder(mockOrder);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setMessage(error.message);
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const deliverHandler = () => {
    if (window.confirm('Are you sure you want to mark this order as delivered?')) {
      // Mark as delivered logic here
    }
  };

  return (
    <div className="container mt-4">
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{message}</Message>
      ) : order ? (
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <h2>Shipping</h2>
              </div>
              <div className="card-body">
                <p>
                  <strong>Name:</strong> {order.user.name}
                </p>
                <p>
                  <strong>Email:</strong> {order.user.email}
                </p>
                <p>
                  <strong>Address:</strong> {order.shippingAddress.address},{' '}
                  {order.shippingAddress.city} {order.shippingAddress.postalCode},{' '}
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <Message variant="success">Delivered</Message>
                ) : (
                  <Message variant="warning">Not Delivered</Message>
                )}
              </div>
            </div>

            <div className="card mt-3">
              <div className="card-header">
                <h2>Payment Method</h2>
              </div>
              <div className="card-body">
                <p>
                  <strong>Method:</strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <Message variant="success">Paid</Message>
                ) : (
                  <Message variant="warning">Not Paid</Message>
                )}
              </div>
            </div>

            <div className="card mt-3">
              <div className="card-header">
                <h2>Order Items</h2>
              </div>
              <div className="card-body">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="row align-items-center mb-3">
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
                ))}
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
                  <span>${order.itemsPrice.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping:</span>
                  <span>${order.shippingPrice.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Tax:</span>
                  <span>${order.taxPrice.toFixed(2)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <h4>Total:</h4>
                  <h4>${order.totalPrice.toFixed(2)}</h4>
                </div>
                
                {user && user.isAdmin && !order.isDelivered && (
                  <button
                    type="button"
                    className="btn btn-primary w-100"
                    onClick={deliverHandler}
                  >
                    Mark As Delivered
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Message variant="danger">Order not found</Message>
      )}
    </div>
  );
};

export default OrderScreen;
