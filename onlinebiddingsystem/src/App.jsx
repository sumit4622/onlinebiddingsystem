import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import protectedRoute from "../src/landingPage/Components/ProtectedRoutes";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}
function Register() {
  localStorage.clear();
  return <Register />;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <protectedRoute>
                <Home />
              </protectedRoute>
            }
          />
          <Route>
            <Route path="/Login" element={<Login />}/>
            <Route paht = "/register" element={<Register/>} />
            <Route path="*" element = {<NotFound />} />
            
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
