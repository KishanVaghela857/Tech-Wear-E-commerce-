import React, { useState, useEffect } from "react";
import LaptopImg from "../../../assets/Laptop1.png";
import MobileImg from "../../../assets/MobileWall.png";
import HeadphonImg from "../../../assets/HeadPhonImg.png";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import MopedIcon from "@mui/icons-material/Moped";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import RedeemIcon from "@mui/icons-material/Redeem";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  const heroSlides = [
    {
      image: LaptopImg,
      title: "Latest Technology",
      subtitle: "Discover the Future",
      description: "Experience cutting-edge technology with our premium collection",
      cta: "Explore Now",
      bgColor: "from-blue-600 to-purple-600"
    },
    {
      image: MobileImg,
      title: "Smartphones",
      subtitle: "Stay Connected",
      description: "The latest smartphones with advanced features and stunning design",
      cta: "Shop Phones",
      bgColor: "from-purple-600 to-pink-600"
    },
    {
      image: HeadphonImg,
      title: "Audio Excellence",
      subtitle: "Perfect Sound",
      description: "Immerse yourself in crystal-clear audio with our premium headphones",
      cta: "Shop Audio",
      bgColor: "from-green-600 to-blue-600"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevIndex) =>
        prevIndex === heroSlides.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  useEffect(() => {
    // Fetch featured products
    fetch("https://dummyjson.com/products?limit=6")
      .then((res) => res.json())
      .then((data) => {
        setFeaturedProducts(data.products);
        setIsLoading(false);
      });
  }, []);

  const features = [
    { 
      icon: LocalShippingIcon, 
      title: "Free Shipping", 
      description: "On orders over $50",
      color: "text-blue-600"
    },
    { 
      icon: MopedIcon, 
      title: "Fast Delivery", 
      description: "Same day delivery available",
      color: "text-green-600"
    },
    { 
      icon: RedeemIcon, 
      title: "Best Prices", 
      description: "Price match guarantee",
      color: "text-purple-600"
    },
    { 
      icon: AccessAlarmsIcon, 
      title: "24/7 Support", 
      description: "Always here to help",
      color: "text-orange-600"
    },
  ];

  return (
    <>
      {/* Hero Section with Carousel */}
      <section className="relative w-full h-screen overflow-hidden">
        <div className="relative w-full h-full">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} opacity-80`} />
              <div className="relative z-10 h-full flex items-center">
                <div className="max-w-7xl mx-auto px-6 lg:px-20 w-full">
                  <div className="max-w-2xl text-white space-y-8">
                    <div className="space-y-4">
                      <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-semibold rounded-full border border-white/30">
                        {slide.subtitle}
                      </span>
                      <h1 className="font-bold text-5xl sm:text-6xl lg:text-7xl leading-tight">
                        {slide.title}
                      </h1>
                      <p className="text-xl sm:text-2xl text-white/90 max-w-lg">
                        {slide.description}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={() => navigate("/products")}
                        className="bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      >
                        {slide.cta}
                      </button>
                      <button
                        onClick={() => navigate("/products")}
                        className="border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-all duration-300 px-8 py-4 rounded-full text-lg font-semibold"
                      >
                        View All Products
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Carousel Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group text-center p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-gray-50 to-white border border-gray-100"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${feature.color.replace('text-', 'from-')} to-${feature.color.replace('text-', '')} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600">Discover our handpicked selection of premium products</p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        -{Math.floor(Math.random() * 30 + 10)}%
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon key={i} className="w-4 h-4" />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{product.brand}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-purple-600">${product.price}</span>
                        <span className="text-gray-400 line-through ml-2">${(product.price * 1.3).toFixed(0)}</span>
                      </div>
                      <button
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-semibold transition-colors duration-300"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <button
              onClick={() => navigate("/products")}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Shopping?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and discover amazing deals on the latest technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/products")}
              className="bg-white text-purple-600 hover:bg-gray-100 transition-all duration-300 px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Shop Now
            </button>
            <button
              onClick={() => navigate("/products")}
              className="border-2 border-white text-white hover:bg-white hover:text-purple-600 transition-all duration-300 px-8 py-4 rounded-full text-lg font-semibold"
            >
              Browse Categories
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
