import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import store from './store';

import { 
  createBrowserRouter, createRoutesFromElements, 
  Route, RouterProvider 
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProductListScreen from './screens/admin/ProductListScreen';
import ProductEditScreen from './screens/admin/ProductEditScreen';
import OrderListScreen from './screens/admin/OrderListScreen';
import UserListScreen from './screens/admin/UserListScreen';
import UserEditScreen from './screens/admin/UserEditScreen';
import SearchScreen from './screens/SearchScreen';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/page/:pageNumber" element={<HomeScreen />} />
      <Route path="/search/:keyword" element={<HomeScreen />} />
      <Route path="/search/:keyword/page/:pageNumber" element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      
      {/* Protected Routes */}
      <Route path="/shipping" element={
        <ProtectedRoute>
          <ShippingScreen />
        </ProtectedRoute>
      } />
      <Route path="/payment" element={
        <ProtectedRoute>
          <PaymentScreen />
        </ProtectedRoute>
      } />
      <Route path="/placeorder" element={
        <ProtectedRoute>
          <PlaceOrderScreen />
        </ProtectedRoute>
      } />
      <Route path="/order/:id" element={
        <ProtectedRoute>
          <OrderScreen />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <ProfileScreen />
        </ProtectedRoute>
      } />
      
      {/* Admin Routes */}
      <Route path="/admin/productlist" element={
        <ProtectedRoute adminOnly={true}>
          <ProductListScreen />
        </ProtectedRoute>
      } />
      <Route path="/admin/productlist/:pageNumber" element={
        <ProtectedRoute adminOnly={true}>
          <ProductListScreen />
        </ProtectedRoute>
      } />
      <Route path="/admin/product/:id/edit" element={
        <ProtectedRoute adminOnly={true}>
          <ProductEditScreen />
        </ProtectedRoute>
      } />
      <Route path="/admin/orderlist" element={
        <ProtectedRoute adminOnly={true}>
          <OrderListScreen />
        </ProtectedRoute>
      } />
      <Route path="/admin/userlist" element={
        <ProtectedRoute adminOnly={true}>
          <UserListScreen />
        </ProtectedRoute>
      } />
      <Route path="/admin/user/:id/edit" element={
        <ProtectedRoute adminOnly={true}>
          <UserEditScreen />
        </ProtectedRoute>
      } />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
