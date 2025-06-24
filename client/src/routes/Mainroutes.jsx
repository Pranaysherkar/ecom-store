import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CreateProduct from "../pages/admin/CreateProduct";
import UpdateProduct from "../pages/admin/UpdateProduct";
import ProductDetail from "../pages/ProductDetail";
import UserProfile from "../pages/user/UserProfile";
import PageNotFound from "../PageNotFound";
import Unauthorized from "../pages/Unauthorized";
import ProtectedRoute from "../components/ProtectedRoute"; // ⬅️ Import this

const Mainroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={
        <ProtectedRoute>
          <UserProfile />
        </ProtectedRoute>
      } />
      <Route path="/admin/create-product" element={
        <ProtectedRoute adminOnly={true}>
          <CreateProduct />
        </ProtectedRoute>
      } />
      <Route path="/admin/update-product" element={
        <ProtectedRoute adminOnly={true}>
          <UpdateProduct />
        </ProtectedRoute>
      } />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Mainroutes;
