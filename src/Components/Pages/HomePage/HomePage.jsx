import React from 'react';
import LaptopImg from '../../../assets/Laptop1.png'
import MobileImg from '../../../assets/MobileWall.png'
import HeadphonImg from '../../../assets/HeadPhonImg.png'

const HomePage = () => {
    return (
        <>
            <div className='bg-gray-100 h-screen w-full p-4 pt-10 lg:pt-14 max-w-screen-2xl mx-auto mt-16'>
                <div className='bg-white h-screen w-full p-4 rounded-lg shadow-md justify-items-start flex flex-col items-start justify-center bg-cover object-cover' style={{ backgroundImage: `url(${LaptopImg})` }}>
                    <div className='pl-6 sm:pl-10 lg:pl-18 text-white'>
                        <label className="bg-red-500 text-black px-2.5 py-1.5">Best Prices</label>
                        <h2 className='text-lg font-bold text-left leading-tight mb-2 px-2 font-sans text-[3.5rem]'>Incredible Prices <br /> on All Your <br /> Favorite Items</h2>
                        <p className='text-white text-left mb-2 px-2 font-sans text-[1.5rem]'>Get more for less on selected brands</p>
                        <button className='bg-blue-500 text-white px-4 py-2 rounded-lg text-[1.5rem]'>Shop Now</button>
                    </div>
                </div>
            </div>

            <div className="w-full bg-white py-16 px-7">
                <div className="max-w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                
                    <div
                        className="bg-cover bg-center rounded-2xl p-8 flex flex-col justify-between text-white shadow-lg h-120"
                        style={{ backgroundImage: `url(${MobileImg})` }}
                    >
                        <div>
                            <label className="text-sm uppercase tracking-wide">Holiday Deals</label>
                            <h1 className="text-4xl font-bold leading-tight mt-2">
                                Up to <br /> 30% off
                            </h1>
                            <p className="mt-2">Selected Smartphone Brands</p>
                        </div>
                        <button className="bg-black/80 hover:bg-black text-white px-6 py-2 rounded-lg w-fit transition">
                            Shop
                        </button>
                    </div>

          
                    <div
                        className="bg-cover bg-center rounded-2xl p-8 flex flex-col justify-between text-white shadow-lg h-120"
                        style={{ backgroundImage: `url(${HeadphonImg})` }}
                    >
                        <div>
                            <label className="text-sm uppercase tracking-wide">Just In</label>
                            <h1 className="text-4xl font-bold leading-tight mt-2">
                                Take Your <br /> Sound <br /> Anywhere
                            </h1>
                            <p className="mt-2">Top Headphone Brands</p>
                        </div>
                        <button className="bg-black/80 hover:bg-black text-white px-6 py-2 rounded-lg w-fit transition">
                            Shop
                        </button>
                    </div>
                </div>
            </div>


        </>
    )
}

export default HomePage
