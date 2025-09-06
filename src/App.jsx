import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './Components/Navbar';
import HomePage from './Components/Pages/HomePage/HomePage';
import BestSellers from './Components/Pages/BestSellers/BestSellers';
import Category from './Components/Pages/Category/Category';
import Footer from './Components/Pages/Footer/Footer';
import ProductList from './Components/Pages/ProductList/ProductList';
import ProductDetail from './Components/Pages/ProductDetails/ProductDetails';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <HomePage />
              <BestSellers />
              <Category />
            </>
          }
        />

        {/* Separate Products Page */}
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;