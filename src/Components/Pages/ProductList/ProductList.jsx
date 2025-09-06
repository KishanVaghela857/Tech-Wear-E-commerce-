import React, { useEffect, useState } from "react";
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";

export default function ProductList({product}) {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        fetch("https://dummyjson.com/products?limit=200")
            .then((res) => res.json())
            .then((data) => setProducts(data.products));

        fetch("https://dummyjson.com/products/categories")
            .then((res) => res.json())
            .then((data) => setCategoryList(data));
    }, []);

    const filteredProducts = selectedCategory
        ? products.filter((p) => p.category === selectedCategory)
        : products;

    return (
        <section className="w-full bg-gray-100 py-12 px-6 lg:px-20">

            <h1 className="text-2xl font-bold flex items-center gap-2 my-2.5">
                <HomeIcon className="text-purple-600" />
                <a href="/">
                    Home {selectedCategory && `> ${selectedCategory}`}
                </a>
            </h1>
            <div className="max-w-full mx-auto flex flex-col md:flex-row gap-8">
                <aside className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-4">Filters</h1>
                    <ul className="space-y-2">
                        {categoryList.map((category, index) => (
                            <li key={index}>
                                <button
                                    onClick={() =>
                                        setSelectedCategory(
                                            selectedCategory === category ? null : category.slug
                                        )
                                    }
                                    className={`w-full text-left px-3 py-2 rounded-lg ${selectedCategory === category
                                        ? "bg-purple-600 text-white"
                                        : "hover:bg-gray-200"
                                        }`}
                                >
                                    {category.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </aside>

                <main className="w-full md:w-3/4">
                    <h1 className="text-3xl font-bold mb-6">Best Sellers | TechWear</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2 p-6 flex flex-col items-center text-center"
                            >
                                <div className="w-full h-48 flex items-center justify-center mb-4">
                                    <img
                                        src={product.thumbnail}
                                        alt={product.title}
                                        className="max-h-40 object-contain"
                                    />
                                </div>

                                <h2 className="font-semibold text-lg mb-1 line-clamp-2">{product.title}</h2>
                                <p className="text-gray-500 text-sm mb-2">{product.brand}</p>

                                <div className="flex flex-col items-center mb-4">
                                    <p className="text-gray-400 line-through">₹{(product.price + 100).toFixed(2)}</p>
                                    <p className="text-purple-600 font-bold text-xl">₹{product.price.toFixed(2)}</p>
                                </div>

                                <button
                                onClick={()=>navigate(`/product/${product.id}`)}
                                className="mt-auto w-full bg-purple-600 hover:bg-purple-700 cursor-pointer text-white font-medium py-2 rounded-lg transition">
                                    View Product
                                </button>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </section>
    );
}
