import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowRightIcon, 
  SparklesIcon,
  FireIcon,
  StarIcon
} from "@heroicons/react/24/outline";

export default function Category() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  useEffect(() => {
    const selectedCategories = [
      "laptops",
      "smartphones",
      "fragrances",
      "groceries",
      "home-decoration",
      "mens-shoes",
    ];

    const fetchCategory = async () => {
      try {
        setIsLoading(true);
        const promises = selectedCategories.map((cat) =>
          fetch(`https://dummyjson.com/products/category/${cat}`).then((res) =>
            res.json())
        );
        const result = await Promise.all(promises);
        const formatted = result.map((res, index) => ({
          category: res.products[0]?.category || "Unknown",
          image: res.products[0]?.thumbnail || "",
          slug: selectedCategories[index],
          productCount: res.products?.length || 0,
          avgPrice: res.products?.reduce((acc, p) => acc + p.price, 0) / res.products?.length || 0,
        }));
        setCategories(formatted);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategory();
  }, []);

  return (
    <>
      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <SparklesIcon className="h-8 w-8 text-purple-600 mr-2" />
              <h1 className="text-4xl font-bold text-gray-900">Shop by Category</h1>
              <SparklesIcon className="h-8 w-8 text-purple-600 ml-2" />
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover amazing products across our carefully curated categories
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="group cursor-pointer"
                  onMouseEnter={() => setHoveredCategory(index)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  onClick={() => navigate(`/products?category=${category.slug}`)}
                >
                  <div className="relative">
                    <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
                      <img
                        src={category.image}
                        alt={category.category}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    
                    {/* Hover Overlay */}
                    {hoveredCategory === index && (
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-600/90 to-transparent rounded-2xl flex items-end p-4">
                        <div className="text-white">
                          <p className="text-sm font-medium">{category.productCount} products</p>
                          <p className="text-xs">From ${category.avgPrice.toFixed(0)}</p>
                        </div>
                      </div>
                    )}

                    {/* Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-2 py-1 rounded-full text-xs font-semibold">
                        {category.productCount}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <h3 className="font-semibold text-gray-900 capitalize group-hover:text-purple-600 transition-colors duration-200">
                      {category.category.replace("-", " ")}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      From ${category.avgPrice.toFixed(0)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Deals Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Deal 1 */}
            <div className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 opacity-90" />
              <div className="relative z-10 p-12 text-white">
                <div className="flex items-center mb-4">
                  <FireIcon className="h-6 w-6 text-yellow-400 mr-2" />
                  <span className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-bold">
                    HOT DEAL
                  </span>
                </div>
                <h2 className="text-4xl font-bold mb-4">Tech Revolution</h2>
                <h3 className="text-6xl font-black mb-4">50% OFF</h3>
                <p className="text-xl mb-8 text-white/90">
                  On all laptops, tablets, and accessories. Limited time offer!
                </p>
                <button
                  onClick={() => navigate('/products?category=laptops')}
                  className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
                >
                  <span>Shop Now</span>
                  <ArrowRightIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full" />
              <div className="absolute -left-5 -top-5 w-32 h-32 bg-white/5 rounded-full" />
            </div>

            {/* Deal 2 */}
            <div className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-teal-600 to-blue-600 opacity-90" />
              <div className="relative z-10 p-12 text-white">
                <div className="flex items-center mb-4">
                  <StarIcon className="h-6 w-6 text-yellow-400 mr-2" />
                  <span className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-bold">
                    NEW ARRIVAL
                  </span>
                </div>
                <h2 className="text-4xl font-bold mb-4">Smart Living</h2>
                <h3 className="text-6xl font-black mb-4">30% OFF</h3>
                <p className="text-xl mb-8 text-white/90">
                  Home decoration and smart home devices. Transform your space!
                </p>
                <button
                  onClick={() => navigate('/products?category=home-decoration')}
                  className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
                >
                  <span>Explore</span>
                  <ArrowRightIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full" />
              <div className="absolute -left-5 -top-5 w-32 h-32 bg-white/5 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose TechWear?</h2>
            <p className="text-xl text-white/90">Numbers that speak for themselves</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "50K+", label: "Happy Customers", icon: "👥" },
              { number: "10K+", label: "Products Sold", icon: "📦" },
              { number: "99%", label: "Satisfaction Rate", icon: "⭐" },
              { number: "24/7", label: "Customer Support", icon: "🛟" }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 transform group-hover:-translate-y-2">
                  <div className="text-4xl mb-4">{stat.icon}</div>
                  <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-white/90 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-20 text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-12">
            <div className="flex items-center justify-center mb-6">
              <SparklesIcon className="h-8 w-8 text-purple-600 mr-2" />
              <h2 className="text-3xl font-bold text-gray-900">Stay Updated</h2>
            </div>
            <p className="text-xl text-gray-600 mb-8">
              Get the latest deals, new arrivals, and exclusive offers delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              No spam, unsubscribe at any time
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
