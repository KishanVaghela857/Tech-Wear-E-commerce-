import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  HomeIcon, 
  StarIcon, 
  HeartIcon, 
  ShareIcon,
  MinusIcon,
  PlusIcon,
  CheckIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowPathIcon
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";
import Loader from "../../Loader/Loader";

export default function ProductDetail() {
    const navigate = useNavigate();
    const [selectedSize, setSelectedSize] = useState("S");
    const [selectedColor, setSelectedColor] = useState("black");
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [mainImage, setMainImage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleAddToCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        const productToSave = {
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
            selectedColor,
            selectedSize,
            quantity: quantity
        };

        const existingProductIndex = cart.findIndex(
            (item) => item.id === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor
        );

        if (existingProductIndex >= 0) {
            cart[existingProductIndex].quantity += quantity;
        } else {
            cart.push(productToSave);
        }
        
        localStorage.setItem("cart", JSON.stringify(cart));
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
    };

    const handleWishlistToggle = () => {
        setIsWishlisted(!isWishlisted);
    };

    const handleQuantityChange = (change) => {
        setQuantity(prev => Math.max(1, prev + change));
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setIsLoading(true);
                const [productRes, relatedRes] = await Promise.all([
                    fetch(`https://dummyjson.com/products/${id}`),
                    fetch(`https://dummyjson.com/products/category/${product?.category || 'smartphones'}?limit=4`)
                ]);
                
                const productData = await productRes.json();
                const relatedData = await relatedRes.json();
                
                setProduct(productData);
                setRelatedProducts(relatedData.products);
                setMainImage(productData.thumbnail);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [id, product?.category]);

    if (isLoading) return <Loader />;
    if (!product) return <div className="text-center py-20">Product not found</div>;

    const reviews = [
        {
            name: "Sarah Johnson",
            date: "May 16, 2024",
            rating: 5,
            review: "Absolutely amazing quality!",
            detail: "I was really pleased with the overall shopping experience. The product quality is amazing, it looks and feels even better than I had anticipated. Highly recommend!",
            verified: true
        },
        {
            name: "Mike Chen",
            date: "April 6, 2024",
            rating: 5,
            review: "Perfect for daily use",
            detail: "These products are so comfortable, yet look classy enough that I can use them daily. Great value for money.",
            verified: true
        },
        {
            name: "Emily Rodriguez",
            date: "February 24, 2024",
            rating: 4,
            review: "Worth every penny",
            detail: "I bought two, and they're amazing! Even after a dozen uses, they still look and feel good as new. Will definitely buy again.",
            verified: false
        },
    ];

    const features = [
        { icon: TruckIcon, title: "Free Shipping", description: "On orders over $50" },
        { icon: ShieldCheckIcon, title: "2 Year Warranty", description: "Full coverage included" },
        { icon: ArrowPathIcon, title: "Easy Returns", description: "30-day return policy" },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 lg:px-20 py-4">
                    <nav className="flex items-center space-x-2 text-sm">
                        <button
                            onClick={() => navigate("/")}
                            className="flex items-center text-gray-500 hover:text-purple-600 transition-colors duration-200"
                        >
                            <HomeIcon className="h-4 w-4 mr-1" />
                            Home
                        </button>
                        <span className="text-gray-400">/</span>
                        <button
                            onClick={() => navigate("/products")}
                            className="text-gray-500 hover:text-purple-600 transition-colors duration-200"
                        >
                            Products
                        </button>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-900 font-medium">{product.title}</span>
                    </nav>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-20 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Product Images */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden">
                            <img
                                src={mainImage || product.thumbnail}
                                alt={product.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {[product?.thumbnail, ...(product?.images?.slice(0, 3) || [])].map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setMainImage(img)}
                                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                                        mainImage === img 
                                            ? "border-purple-600 ring-2 ring-purple-200" 
                                            : "border-gray-200 hover:border-gray-300"
                                    }`}
                                >
                                    <img
                                        src={img}
                                        alt={`${product?.title} view ${i + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-8">
                        {/* Header */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-2">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <StarSolidIcon 
                                                key={i} 
                                                className={`h-5 w-5 ${
                                                    i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                                                }`} 
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-600">({product.rating}) • 128 reviews</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={handleWishlistToggle}
                                        className={`p-2 rounded-full transition-colors duration-200 ${
                                            isWishlisted 
                                                ? 'bg-red-100 text-red-600' 
                                                : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
                                        }`}
                                    >
                                        <HeartIcon className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                                    </button>
                                    <button className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors duration-200">
                                        <ShareIcon className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                            
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
                            <p className="text-lg text-gray-600 mb-4">{product.brand}</p>
                            
                            <div className="flex items-center space-x-4 mb-6">
                                <span className="text-4xl font-bold text-purple-600">${product.price}</span>
                                <span className="text-2xl text-gray-400 line-through">${(product.price * 1.3).toFixed(0)}</span>
                                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                                    Save ${(product.price * 0.3).toFixed(0)}
                                </span>
                            </div>
                        </div>

                        {/* Color Selection */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Color</h3>
                            <div className="flex space-x-3">
                                {[
                                    { name: "Black", value: "black", color: "bg-black" },
                                    { name: "Gray", value: "gray", color: "bg-gray-500" },
                                    { name: "White", value: "white", color: "bg-white border-2 border-gray-300" }
                                ].map((color) => (
                                    <button
                                        key={color.value}
                                        onClick={() => setSelectedColor(color.value)}
                                        className={`w-12 h-12 rounded-full ${color.color} border-2 transition-all duration-200 ${
                                            selectedColor === color.value 
                                                ? "ring-4 ring-purple-200 border-purple-600" 
                                                : "border-gray-300 hover:border-gray-400"
                                        }`}
                                        title={color.name}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Size Selection */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Size</h3>
                            <div className="flex space-x-3">
                                {["XS", "S", "M", "L", "XL"].map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-6 py-3 border-2 rounded-lg font-semibold transition-all duration-200 ${
                                            selectedSize === size 
                                                ? "bg-purple-600 text-white border-purple-600" 
                                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Quantity</h3>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center border-2 border-gray-300 rounded-lg">
                                    <button
                                        onClick={() => handleQuantityChange(-1)}
                                        className="p-2 hover:bg-gray-100 transition-colors duration-200"
                                    >
                                        <MinusIcon className="h-4 w-4" />
                                    </button>
                                    <span className="px-4 py-2 font-semibold">{quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(1)}
                                        className="p-2 hover:bg-gray-100 transition-colors duration-200"
                                    >
                                        <PlusIcon className="h-4 w-4" />
                                    </button>
                                </div>
                                <span className="text-sm text-gray-600">Only 5 left in stock</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-4">
                            <button
                                onClick={handleAddToCart}
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                Add to Cart
                            </button>
                            
                            <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-200">
                                Buy Now
                            </button>
                        </div>

                        {/* Success Message */}
                        {showSuccessMessage && (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center">
                                <CheckIcon className="h-5 w-5 mr-2" />
                                Product added to cart successfully!
                            </div>
                        )}

                        {/* Features */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <div className="p-2 bg-purple-100 rounded-lg">
                                        <feature.icon className="h-5 w-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                                        <p className="text-sm text-gray-600">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Product Description */}
                <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Description</h2>
                    <div className="prose max-w-none">
                        <p className="text-gray-600 leading-relaxed">{product.description}</p>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
                        <div className="flex items-center space-x-2">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <StarSolidIcon key={i} className="h-5 w-5" />
                                ))}
                            </div>
                            <span className="text-lg font-semibold text-gray-900">4.8</span>
                            <span className="text-gray-600">(128 reviews)</span>
                        </div>
                    </div>
                    
                    <div className="space-y-6">
                        {reviews.map((review, index) => (
                            <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                                            {review.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <h4 className="font-semibold text-gray-900">{review.name}</h4>
                                                {review.verified && (
                                                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">
                                                        Verified Purchase
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <div className="flex text-yellow-400">
                                                    {[...Array(5)].map((_, i) => (
                                                        <StarSolidIcon 
                                                            key={i} 
                                                            className={`h-4 w-4 ${
                                                                i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                                            }`} 
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-sm text-gray-500">{review.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h5 className="font-semibold text-gray-900 mb-2">{review.review}</h5>
                                <p className="text-gray-600">{review.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Related Products */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">You might also like</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedProducts.map((relatedProduct) => (
                            <div
                                key={relatedProduct.id}
                                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                            >
                                <div className="relative overflow-hidden h-48">
                                    <img
                                        src={relatedProduct.thumbnail}
                                        alt={relatedProduct.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                            -{Math.floor(Math.random() * 30 + 10)}%
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors duration-200">
                                        {relatedProduct.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4">{relatedProduct.brand}</p>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-2xl font-bold text-purple-600">
                                                ${relatedProduct.price}
                                            </span>
                                            <span className="text-gray-400 line-through ml-2">
                                                ${(relatedProduct.price * 1.3).toFixed(0)}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => navigate(`/product/${relatedProduct.id}`)}
                                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
                                        >
                                            View
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
