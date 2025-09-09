import React, { useEffect, useState } from "react";
import { 
  XMarkIcon, 
  MinusIcon, 
  PlusIcon, 
  TrashIcon,
  ShoppingBagIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const Cart = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, [isOpen]); 

  const handleRemove = (id, color, size) => {
    const updatedCart = cartItems.filter(
      (item) => !(item.id === id && item.selectedColor === color && item.selectedSize === size)
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (id, color, size, change) => {
    setIsUpdating(true);
    const updatedCart = cartItems.map(item => {
      if (item.id === id && item.selectedColor === color && item.selectedSize === size) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setTimeout(() => setIsUpdating(false), 300);
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = totalPrice > 50 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + shipping + tax;

  const handleCheckout = () => {
    navigate('/checkout');
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } z-50 flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="flex items-center space-x-2">
            <ShoppingBagIcon className="h-6 w-6" />
            <h2 className="text-xl font-bold">Shopping Cart</h2>
            {cartItems.length > 0 && (
              <span className="bg-white/20 text-white text-sm px-2 py-1 rounded-full">
                {cartItems.length}
              </span>
            )}
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBagIcon className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Add some items to get started</p>
              <button
                onClick={() => {
                  navigate('/products');
                  onClose();
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex gap-4">
                    <div className="relative">
                      <img 
                        src={item.thumbnail} 
                        alt={item.title} 
                        className="w-20 h-20 object-cover rounded-lg" 
                      />
                      <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                        {item.quantity}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{item.title}</h3>
                      <p className="text-sm text-gray-500">
                        {item.selectedColor} • {item.selectedSize}
                      </p>
                      <p className="text-lg font-bold text-purple-600 mt-1">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    <div className="flex flex-col items-end space-y-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.selectedColor, item.selectedSize, -1)}
                          disabled={isUpdating}
                          className="p-1 hover:bg-gray-200 disabled:opacity-50 transition-colors duration-200"
                        >
                          <MinusIcon className="h-4 w-4" />
                        </button>
                        <span className="px-3 py-1 font-semibold text-sm">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.selectedColor, item.selectedSize, 1)}
                          disabled={isUpdating}
                          className="p-1 hover:bg-gray-200 disabled:opacity-50 transition-colors duration-200"
                        >
                          <PlusIcon className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemove(item.id, item.selectedColor, item.selectedSize)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        title="Remove item"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            {/* Price Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="font-semibold">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-300 pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-purple-600">${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleCheckout}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRightIcon className="h-5 w-5" />
              </button>
              
              <button
                onClick={() => {
                  navigate('/products');
                  onClose();
                }}
                className="w-full border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white py-3 rounded-xl font-semibold transition-all duration-200"
              >
                Continue Shopping
              </button>
            </div>

            {/* Free Shipping Notice */}
            {totalPrice < 50 && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700 text-center">
                  Add ${(50 - totalPrice).toFixed(2)} more for free shipping!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
