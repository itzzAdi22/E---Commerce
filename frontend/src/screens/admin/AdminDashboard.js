import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="container mt-4">
      <h1>Admin Dashboard</h1>
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center">
              <h5>Users</h5>
              <Link to="/admin/userlist" className="btn btn-primary">
                Manage Users
              </Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center">
              <h5>Products</h5>
              <Link to="/admin/productlist" className="btn btn-primary">
                Manage Products
              </Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center">
              <h5>Orders</h5>
              <Link to="/admin/orderlist" className="btn btn-primary">
                Manage Orders
              </Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center">
              <h5>Analytics</h5>
              <button className="btn btn-primary">
                View Analytics
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row mt-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h3>Welcome, {user.name}!</h3>
            </div>
            <div className="card-body">
              <p>This is your admin dashboard where you can manage all aspects of your e-commerce platform.</p>
              <div className="row">
                <div className="col-md-4">
                  <h5>Quick Stats</h5>
                  <ul className="list-unstyled">
                    <li>Total Users: 0</li>
                    <li>Total Products: 0</li>
                    <li>Total Orders: 0</li>
                    <li>Total Revenue: $0</li>
                  </ul>
                </div>
                <div className="col-md-4">
                  <h5>Recent Activity</h5>
                  <ul className="list-unstyled">
                    <li>No recent activity</li>
                  </ul>
                </div>
                <div className="col-md-4">
                  <h5>System Status</h5>
                  <ul className="list-unstyled">
                    <li>Database: Connected</li>
                    <li>API: Running</li>
                    <li>Cache: Active</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
