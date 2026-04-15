import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const OrderListScreen = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, isError, message } = useSelector((state) => state.orders);

  useEffect(() => {
    // Fetch orders logic here
  }, [dispatch]);

  const deliverHandler = (id) => {
    if (window.confirm('Are you sure you want to mark this order as delivered?')) {
      // Mark as delivered logic here
    }
  };

  return (
    <div className="container mt-4">
      <h1>Orders</h1>
      
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{message}</Message>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders && orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : ''}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      <span className="badge bg-success">Paid</span>
                    ) : (
                      <span className="badge bg-danger">Not Paid</span>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      <span className="badge bg-success">Delivered</span>
                    ) : (
                      <span className="badge bg-warning">Not Delivered</span>
                    )}
                  </td>
                  <td>
                    <Link to={`/order/${order._id}`} className="btn btn-sm btn-info me-2">
                      Details
                    </Link>
                    {!order.isDelivered && (
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => deliverHandler(order._id)}
                      >
                        Mark Delivered
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderListScreen;
