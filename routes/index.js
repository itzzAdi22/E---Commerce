import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Layout Components
import Layout from '../components/Layout';

// Public Routes
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import CartScreen from '../screens/CartScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

// Protected Routes (requires authentication)
import ProfileScreen from '../screens/ProfileScreen';
import ShippingScreen from '../screens/ShippingScreen';
import PaymentScreen from '../screens/PaymentScreen';
import PlaceOrderScreen from '../screens/PlaceOrderScreen';
import OrderScreen from '../screens/OrderScreen';

// Admin Routes (requires admin role)
import AdminDashboard from '../screens/admin/AdminDashboard';
import ProductListScreen from '../screens/admin/ProductListScreen';
import ProductEditScreen from '../screens/admin/ProductEditScreen';
import ProductCreateScreen from '../screens/admin/ProductCreateScreen';
import UserListScreen from '../screens/admin/UserListScreen';
import UserEditScreen from '../screens/admin/UserEditScreen';
import OrderListScreen from '../screens/admin/OrderListScreen';
import OrderDetailsScreen from '../screens/admin/OrderDetailsScreen';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Admin Route Component
const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  
  if (!user || !user.isAdmin) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Public Route Component (redirect if authenticated)
const PublicRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  
  if (user) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomeScreen />} />
        <Route path="product/:id" element={<ProductScreen />} />
        <Route path="cart" element={<CartScreen />} />
        
        {/* Auth Routes (Public - redirect if authenticated) */}
        <Route 
          path="login" 
          element={
            <PublicRoute>
              <LoginScreen />
            </PublicRoute>
          } 
        />
        <Route 
          path="register" 
          element={
            <PublicRoute>
              <RegisterScreen />
            </PublicRoute>
          } 
        />
        
        {/* Protected Routes (requires authentication) */}
        <Route 
          path="profile" 
          element={
            <ProtectedRoute>
              <ProfileScreen />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="shipping" 
          element={
            <ProtectedRoute>
              <ShippingScreen />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="payment" 
          element={
            <ProtectedRoute>
              <PaymentScreen />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="placeorder" 
          element={
            <ProtectedRoute>
              <PlaceOrderScreen />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="order/:id" 
          element={
            <ProtectedRoute>
              <OrderScreen />
            </ProtectedRoute>
          } 
        />
        
        {/* Admin Routes (requires admin role) */}
        <Route 
          path="admin/dashboard" 
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } 
        />
        <Route 
          path="admin/productlist" 
          element={
            <AdminRoute>
              <ProductListScreen />
            </AdminRoute>
          } 
        />
        <Route 
          path="admin/product/create" 
          element={
            <AdminRoute>
              <ProductCreateScreen />
            </AdminRoute>
          } 
        />
        <Route 
          path="admin/product/:id/edit" 
          element={
            <AdminRoute>
              <ProductEditScreen />
            </AdminRoute>
          } 
        />
        <Route 
          path="admin/userlist" 
          element={
            <AdminRoute>
              <UserListScreen />
            </AdminRoute>
          } 
        />
        <Route 
          path="admin/user/:id/edit" 
          element={
            <AdminRoute>
              <UserEditScreen />
            </AdminRoute>
          } 
        />
        <Route 
          path="admin/orderlist" 
          element={
            <AdminRoute>
              <OrderListScreen />
            </AdminRoute>
          } 
        />
        <Route 
          path="admin/order/:id" 
          element={
            <AdminRoute>
              <OrderDetailsScreen />
            </AdminRoute>
          } 
        />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
