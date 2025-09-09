import React, { useEffect, useState } from "react";
import { 
  HomeIcon, 
  FunnelIcon, 
  Squares2X2Icon,
  ListBulletIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  HeartIcon
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function ProductList() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [sortBy, setSortBy] = useState('name');
    const [priceRange, setPriceRange] = useState([0, 2000]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const productsPerPage = 12;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const [productsRes, categoriesRes] = await Promise.all([
                    fetch("https://dummyjson.com/products?limit=100"),
                    fetch("https://dummyjson.com/products/categories")
                ]);
                
                const productsData = await productsRes.json();
                const categoriesData = await categoriesRes.json();
                
                setProducts(productsData.products);
                setCategoryList(categoriesData);
                
                // Get search params
                const search = searchParams.get('search');
                const category = searchParams.get('category');
                
                if (search) setSearchQuery(search);
                if (category) setSelectedCategories([category]);
                
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchData();
    }, [searchParams]);

    useEffect(() => {
        let filtered = [...products];

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(product =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filter by categories
        if (selectedCategories.length > 0) {
            filtered = filtered.filter(product =>
                selectedCategories.includes(product.category)
            );
        }

        // Filter by price range
        filtered = filtered.filter(product =>
            product.price >= priceRange[0] && product.price <= priceRange[1]
        );

        // Sort products
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'rating':
                    return b.rating - a.rating;
                case 'name':
                default:
                    return a.title.localeCompare(b.title);
            }
        });

        setFilteredProducts(filtered);
        setCurrentPage(1);
    }, [products, searchQuery, selectedCategories, priceRange, sortBy]);

    const handleCategoryToggle = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedCategories([]);
        setPriceRange([0, 2000]);
        setSortBy('name');
    };

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

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
                        <span className="text-gray-900 font-medium">Products</span>
                        {selectedCategories.length > 0 && (
                            <>
                                <span className="text-gray-400">/</span>
                                <span className="text-gray-900 font-medium">
                                    {selectedCategories.join(', ')}
                                </span>
                            </>
                        )}
                    </nav>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-20 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <aside className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                                <button
                                    onClick={clearFilters}
                                    className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                                >
                                    Clear All
                                </button>
                            </div>

                            {/* Search */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Search Products
                                </label>
                                <div className="relative">
                                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="mb-6">
                                <h3 className="text-sm font-medium text-gray-700 mb-3">Categories</h3>
                                <div className="space-y-2 max-h-48 overflow-y-auto">
                                    {categoryList.map((category, index) => (
                                        <label key={index} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedCategories.includes(category)}
                                                onChange={() => handleCategoryToggle(category)}
                                                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                            />
                                            {/* <span className="ml-2 text-sm text-gray-700 capitalize">
                                                {category.push('-', ' ') || ""}
                                            </span> */}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="mb-6">
                                <h3 className="text-sm font-medium text-gray-700 mb-3">Price Range</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm text-gray-500">${priceRange[0]}</span>
                                        <span className="text-sm text-gray-500">-</span>
                                        <span className="text-sm text-gray-500">${priceRange[1]}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="2000"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                    />
                                </div>
                            </div>

                            {/* Sort By */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-700 mb-3">Sort By</h3>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                >
                                    <option value="name">Name A-Z</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="rating">Rating</option>
                                </select>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    Products
                                    {filteredProducts.length > 0 && (
                                        <span className="text-gray-500 font-normal ml-2">
                                            ({filteredProducts.length} items)
                                        </span>
                                    )}
                                </h1>
                                {searchQuery && (
                                    <p className="text-gray-600">
                                        Search results for "{searchQuery}"
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                                {/* Mobile Filter Toggle */}
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    <FunnelIcon className="h-4 w-4" />
                                    <span>Filters</span>
                                </button>

                                {/* View Mode Toggle */}
                                <div className="flex items-center border border-gray-300 rounded-lg">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        <Squares2X2Icon className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        <ListBulletIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Products Grid/List */}
                        {isLoading ? (
                            <div className="flex justify-center items-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                            </div>
                        ) : filteredProducts.length === 0 ? (
                            <div className="text-center py-20">
                                <div className="text-gray-400 mb-4">
                                    <MagnifyingGlassIcon className="h-16 w-16 mx-auto" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                                <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
                                <button
                                    onClick={clearFilters}
                                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className={`${
                                    viewMode === 'grid' 
                                        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                                        : 'space-y-4'
                                }`}>
                                    {paginatedProducts.map((product) => (
                                        <div
                                            key={product.id}
                                            className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden ${
                                                viewMode === 'list' ? 'flex' : ''
                                            }`}
                                        >
                                            <div className={`relative overflow-hidden ${
                                                viewMode === 'list' ? 'w-48 h-48' : 'h-64'
                                            }`}>
                                                <img
                                                    src={product.thumbnail}
                                                    alt={product.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute top-4 right-4">
                                                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                                        -{Math.floor(Math.random() * 30 + 10)}%
                                                    </span>
                                                </div>
                                                <div className="absolute top-4 left-4">
                                                    <button className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors duration-200">
                                                        <HeartIcon className="h-4 w-4 text-gray-600" />
                                                    </button>
                                                </div>
                                            </div>
                                            
                                            <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                                                <div className="flex items-center mb-2">
                                                    <div className="flex text-yellow-400">
                                                        {[...Array(5)].map((_, i) => (
                                                            <StarIcon 
                                                                key={i} 
                                                                className={`h-4 w-4 ${
                                                                    i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                                                                }`} 
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
                                                </div>
                                                
                                                <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors duration-200">
                                                    {product.title}
                                                </h3>
                                                
                                                <p className="text-gray-600 text-sm mb-4">{product.brand}</p>
                                                
                                                <div className="flex items-center justify-between mb-4">
                                                    <div>
                                                        <span className="text-2xl font-bold text-purple-600">
                                                            ${product.price}
                                                        </span>
                                                        <span className="text-gray-400 line-through ml-2">
                                                            ${(product.price * 1.3).toFixed(0)}
                                                        </span>
                                                    </div>
                                                </div>
                                                
                                                <button
                                                    onClick={() => navigate(`/product/${product.id}`)}
                                                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200 transform hover:scale-105"
                                                >
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex justify-center items-center space-x-2 mt-12">
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Previous
                                        </button>
                                        
                                        {[...Array(totalPages)].map((_, i) => (
                                            <button
                                                key={i + 1}
                                                onClick={() => setCurrentPage(i + 1)}
                                                className={`px-4 py-2 rounded-lg ${
                                                    currentPage === i + 1
                                                        ? 'bg-purple-600 text-white'
                                                        : 'border border-gray-300 hover:bg-gray-50'
                                                }`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                        
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                            disabled={currentPage === totalPages}
                                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Next
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
