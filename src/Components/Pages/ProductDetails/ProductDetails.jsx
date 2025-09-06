import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import Loader from "../../Loader/Loader";

export default function ProductDetail({ p }) {
    const navigate = useNavigate();
    const [selectedSize, setSelectedSize] = useState("S");
    const [selectedColor, setSelectedColor] = useState("black");
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [parchased, setPurchased] = useState([])
    const [mainImage, setMainImage] = useState(null);

    const handdleAddToCart = () => {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const handdleToSave = {
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        selectedColor,
        selectedSize,
        quantity: 1
    }

    
    const existingProductIndex = cart.findIndex(
        (item) => item.id === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor
    );

    if(existingProductIndex >= 0){
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push(handdleToSave)
    }
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Successfully Added Product in Cart")
        console.log(handdleToSave)
}

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then((res) => res.json())
            .then((data) => setProduct(data));

        fetch('https://dummyjson.com/products?limit=5&skip=0')
            .then((res) => res.json())
            .then((data) => setPurchased(data.products));
    }, [id]);

    if (!product) return <Loader />;

    const reviews = [
        {
            name: "Risko M",
            date: "May 16, 2021",
            rating: 5,
            review: "Can't say enough good things",
            detail:
                "I was really pleased with the overall shopping experience. The product quality is amazing, it looks and feels even better than I had anticipated.",
        },
        {
            name: "Jackie H",
            date: "April 6, 2021",
            rating: 5,
            review: "Very comfy and looks the part",
            detail:
                "These products are so comfortable, yet look classy enough that I can use them daily.",
        },
        {
            name: "Laura G",
            date: "February 24, 2021",
            rating: 4,
            review: "The last ones I may ever need",
            detail:
                "I bought two, and they’re amazing! Even after a dozen uses, they still look and feel good as new.",
        },
    ];


    return (
        <>
            <div className="bg-white">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <HomeIcon className="text-purple-600" />
                    <button
                    className="cursor-pointer"
                    onClick={()=>navigate("/products")}
                    >Home</button>
                </h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-10">
                    <div className="space-y-4">
                        <img
                            src={mainImage || product.thumbnail}
                            alt={product.title}
                            className="w-full rounded-lg"
                        />
                        <div className="grid grid-cols-3 gap-4">
                            {[product?.thumbnail, ...(product?.images?.slice(0, 3) || [])].map((img, i) => (
                                <img
                                    key={i}
                                    src={img}
                                    alt={product?.title || ""}
                                    className={`rounded-lg cursor-pointer border-2 ${mainImage === img ? "border-purple-600" : "border-transparent"
                                        }`}
                                    onClick={() => setMainImage(img)}
                                />
                            ))}


                        </div>
                    </div>

                    <div className="space-y-6">
                        <h1 className="text-3xl font-bold">{product.title}</h1>
                        <p className="text-2xl font-semibold text-purple-600">₹{product.price}</p>
                        <div>
                            <p className="text-gray-600 mb-2">Brand</p>
                            <p className="text-gray-800 font-medium">{product.brand}</p>
                        </div>

                        <div>
                            <p className="text-gray-600 mb-2">Color</p>
                            <div className="flex space-x-2 ">
                                <button
                                    className={`w-8 h-8 rounded-full border cursor-pointer ${selectedColor === "black" ? "ring-2 cursor-pointer ring-purple-600" : ""}`}
                                    style={{ backgroundColor: "black" }}
                                    onClick={() => setSelectedColor("black")}
                                ></button>
                                <button
                                    className={`w-8 h-8 rounded-full border cursor-pointer ${selectedColor === "gray" ? "ring-2 ring-purple-600" : ""}`}
                                    style={{ backgroundColor: "gray" }}
                                    onClick={() => setSelectedColor("gray")}
                                ></button>
                            </div>
                        </div>

                        <div>
                            <p className="text-gray-600 mb-2">Size</p>
                            <div className="flex space-x-3">
                                {["XS", "S", "M", "L", "XL"].map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-4 py-2 border rounded-lg cursor-pointer ${selectedSize === size ? "bg-purple-600 text-white" : "bg-gray-100"
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                        onClick={handdleAddToCart}
                        className="w-full bg-purple-600 hover:bg-purple-700 cursor-pointer text-white py-3 rounded-lg font-medium">
                            Add to Cart
                        </button>

                        <div>
                            <h2 className="text-lg font-semibold">Description</h2>
                            <p className="text-gray-600 mt-2">{product.description}</p>
                        </div>
                    </div>
                </div>

                <div className="px-10 py-8 border-t">
                    <h2 className="text-2xl font-bold mb-6">Recent Reviews</h2>
                    <div className="space-y-6">
                        {reviews.map((r, i) => (
                            <div key={i} className="border-b pb-4">
                                <div className="flex justify-between items-center">
                                    <p className="font-medium">{r.name}</p>
                                    <p className="text-sm text-gray-400">{r.date}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    {"⭐".repeat(r.rating)} <span className="ml-2 font-semibold">{r.review}</span>
                                </div>
                                <p className="text-gray-600 mt-2">{r.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="px-10 py-8 border-t">
                    <h2 className="text-2xl font-bold mb-6">Customers also purchased</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                        {parchased.map((p) => (
                            <div key={p.id} className="bg-white border rounded-lg shadow-sm p-4 text-center">
                                <img src={p.thumbnail} alt={p.title} className="w-full h-40 object-cover mb-3 rounded-lg" />
                                <h3 className="font-medium text-sm">{p.title}</h3>
                                <p className="text-purple-600 font-semibold">₹{p.price}</p>
                                <button
                                    onClick={() => navigate(`/product/${p.id}`)}
                                    className="mt-auto w-full bg-purple-600 hover:bg-purple-700 cursor-pointer text-white font-medium py-2 rounded-lg transition">
                                    Add to Cart
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
