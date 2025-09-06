import { useState, useEffect } from "react";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const selectedCategories = [
    "laptops",
    "smartphones",
    "fragrances",
    "groceries",
    "home-decoration",
    "mens-shoes",
  ];

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const promises = selectedCategories.map((cat) =>
          fetch(`https://dummyjson.com/products/category/${cat}`).then((res) =>
            res.json()
          )
        );
        const result = await Promise.all(promises);
        const formatted = result.map((res) => ({
          category: res.products[0]?.category || "Unknown",
          image: res.products[0]?.thumbnail || "",
        }));
        setCategories(formatted);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategory();
  }, []);

  return (
    <>
      <section className="w-full bg-gray-100 py-16 px-6 lg:px-20">
        <div className="w-full mx-auto text-center bg-white py-16">
          <h1 className="text-4xl font-bold mb-10">Shop by Category</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-10 justify-center">
            {categories.map((content, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-40 h-40 rounded-full overflow-hidden shadow-md">
                  <img
                    src={content.image}
                    alt={content.category}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="mt-3 font-medium capitalize">
                  {content.category.replace("-", " ")}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-gray-100 py-16 px-6 lg:px-20">
        <div className="w-full mx-auto bg-white flex flex-col md:flex-row items-center overflow-hidden rounded-lg shadow-md">
          <div className="w-full md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04"
              alt="Laptop & Tablet"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 p-12 text-left relative">
            <span className="absolute top-1 left-10 bg-red-600 text-white px-5 py-2 rounded-full text-sm font-semibold">
              Best Price
            </span>
            <h2 className="text-xl font-medium text-gray-700 mb-2">Save up to</h2>
            <h1 className="text-5xl font-bold mb-4">$150</h1>
            <p className="text-gray-600 mb-6 text-lg">
              on selected laptop & tablet brands <br />
              <span className="text-base text-gray-400">
                Terms and conditions apply
              </span>
            </p>
            <a
              href="/products"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full text-lg font-medium transition"
            >
              Shop
            </a>
          </div>
        </div>
      </section>

      <section className="w-full bg-gray-100 py-16 px-6 lg:px-20">
        <div className="w-full mx-auto bg-white flex flex-col md:flex-row items-center overflow-hidden rounded-lg shadow-md">
          <div className="w-full md:w-1/2 p-12 text-left relative">
            <span className="absolute top-1 left-10 bg-red-600 text-white px-5 py-2 rounded-full text-sm font-semibold">
              Best Price
            </span>
            <h2 className="text-xl font-medium text-gray-700 mb-2">Save up to</h2>
            <h1 className="text-5xl font-bold mb-4">$150</h1>
            <p className="text-gray-600 mb-6 text-lg">
              on selected laptop & tablet brands <br />
              <span className="text-base text-gray-400">
                Terms and conditions apply
              </span>
            </p>
            <a
              href="/products"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full text-lg font-medium transition"
            >
              Shop
            </a>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04"
              alt="Laptop & Tablet"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
