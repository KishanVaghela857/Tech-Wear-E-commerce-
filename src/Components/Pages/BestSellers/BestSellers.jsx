import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BestSellers() {

    const navigate = useNavigate()

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products/category/smartphones?limit=4")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  return (
    <section className="w-full bg-gray-100 py-16 px-6 lg:px-20">
      <div className="w-full mx-auto text-center bg-white py-20">
        <h1 className="text-4xl font-bold mb-12">Best Sellers</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-xl transition relative"
            >
              <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded">
                SALE
              </span>
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-40 object-contain mb-4"
              />
              <h2 className="font-semibold text-md line-clamp-2 mb-1">
                {product.title}
              </h2>
              <p className="text-gray-500 text-sm">{product.brand}</p>
              <div className="mt-2 flex flex-col items-center">
                <p className="text-gray-400 line-through">
                  ₹{(product.price + 100).toFixed(2)}
                </p>
                <p className="text-purple-600 font-bold text-lg">
                  ₹{product.price.toFixed(2)}
                </p>
              </div>
              <button className="w-full h-[30px] bottom-3 left-3 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded  cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`)}
              >View</button>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <a
            href="/products"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition"
          >
            View All
          </a>
        </div>
      </div>
    </section>
  );
}
