import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Cart = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([]);


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

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } z-50`}
    >

      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <button onClick={onClose}>
          <XMarkIcon className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      <div className="p-4 flex flex-col gap-4 overflow-y-auto h-[calc(100%-120px)]">
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={index} className="flex gap-4 items-center border-b pb-2">
              <img src={item.thumbnail} alt={item.title} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1">
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-gray-500">
                  {item.selectedColor}, {item.selectedSize}
                </p>
                <p className="font-semibold">₹{item.price} x {item.quantity}</p>
              </div>
              <button
                className="text-red-500 font-bold"
                onClick={() => handleRemove(item.id, item.selectedColor, item.selectedSize)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t">
        <p className="font-bold mb-4">Total: ₹{totalPrice}</p>
        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
