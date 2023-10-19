import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import ProtectedLayout from "layouts/ProtectedLayout";
import HomePage from "views/home";
import SignIn from "views/auth/SignIn";
import SignUp from "views/auth/SignUp";
import ForgotPassword from "views/auth/ForgetPassword";
import Auth from "layouts/auth";
import ErrorPage from "views/error";
import ArticleView from "views/admin/articleDetail";

const App = () => {
  return (
    <Routes>
      <Route path="auth/*" element={<AuthLayout />} />

      <Route element={<ProtectedLayout />}>
        <Route path="admin/*" element={<AdminLayout />} />
        <Route path="admin/feed/:id" element={<ArticleView />} />
      </Route>

      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<ErrorPage />} />

      <Route element={<Auth />}>
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      </Route>

    </Routes>
  );
};

export default App;
