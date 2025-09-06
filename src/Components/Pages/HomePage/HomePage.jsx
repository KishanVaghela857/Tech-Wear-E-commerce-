import React, { useState, useEffect } from "react";
import LaptopImg from "../../../assets/Laptop1.png";
import MobileImg from "../../../assets/MobileWall.png";
import HeadphonImg from "../../../assets/HeadPhonImg.png";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import MopedIcon from "@mui/icons-material/Moped";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import RedeemIcon from "@mui/icons-material/Redeem";
import { useNavigate} from "react-router-dom";

const HomePage = () => {

    const navigate = useNavigate()

  const [imgWall, setImgWall] = useState(0);
  const HereImage = [LaptopImg, MobileImg, HeadphonImg];

  useEffect(() => {
    const intervel = setInterval(() => {
      setImgWall((prevIndex) =>
        prevIndex === HereImage.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(intervel);
  }, [HereImage.length]);

  const iconsAndText = [
    { icon: MopedIcon, text: "Curb-side pickup" },
    { icon: LocalShippingIcon, text: "Free shipping" },
    { icon: RedeemIcon, text: "Low prices guaranteed" },
    { icon: AccessAlarmsIcon, text: "Available to you 24/7" },
  ];

  return (
    <>
      <section className="relative w-full flex justify-center bg-gray-100">
        <div
          className="relative w-full min-h-[80vh] bg-cover bg-center flex items-center px-6 sm:px-12 lg:px-20 transition-all duration-700 ease-in-out"
          style={{ backgroundImage: `url(${HereImage[imgWall]})` }}
        >

          <div className="absolute inset-0 bg-black/40 rounded-lg" />
          <div className="relative z-10 max-w-2xl text-white space-y-6">
            <span className="bg-red-500 px-3 py-1.5 text-sm font-semibold rounded">
              Best Prices
            </span>
            <h2 className="font-bold text-3xl sm:text-5xl lg:text-6xl leading-tight">
              Incredible Prices <br /> on All Your <br /> Favorite Items
            </h2>
            <p className="text-lg sm:text-xl">
              Get more for less on selected brands
            </p>
            <button
            onClick={()=> navigate("/products")}
             className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg text-lg font-medium cursor-pointer">
              Shop Now
            </button>
          </div>
        </div>
      </section>

      <section className="w-full bg-gray-100 py-16 px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div
            className="relative bg-cover bg-center rounded-2xl text-white shadow-lg h-[350px] flex flex-col justify-between p-8"
            style={{ backgroundImage: `url(${MobileImg})` }}
          >
            <div>
              <span className="text-sm uppercase tracking-wide">
                Holiday Deals
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold leading-tight mt-2">
                Up to 30% off
              </h1>
              <p className="mt-2">Selected Smartphone Brands</p>
            </div>
            <button
            onClick={()=> navigate("/products")}
             className="bg-black/70 hover:bg-black transition px-6 py-2 rounded-lg w-fit mt-4">
              Shop
            </button>
          </div>


          <div
            className="relative bg-cover bg-center rounded-2xl text-white shadow-lg h-[350px] flex flex-col justify-between p-8"
            style={{ backgroundImage: `url(${HeadphonImg})` }}
          >
            <div>
              <span className="text-sm uppercase tracking-wide">Just In</span>
              <h1 className="text-3xl sm:text-4xl font-bold leading-tight mt-2">
                Take Your Sound Anywhere
              </h1>
              <p className="mt-2">Top Headphone Brands</p>
            </div>
            <button
            onClick={()=> navigate("/products")} 
            className="bg-black/70 hover:bg-black transition px-6 py-2 rounded-lg w-fit mt-4">
              Shop
            </button>
          </div>
        </div>
      </section>

      <section className="w-full bg-gray-100 py-16 px-6 lg:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {iconsAndText.map((content, index) => (
            <div
              key={index}
              className="bg-white flex flex-col items-center justify-center text-center p-8 rounded-xl shadow-md hover:shadow-xl transition"
            >
              {content.icon && (
                <content.icon className="text-blue-600" style={{ fontSize: "60px" }} />
              )}
              <h1 className="font-bold text-lg sm:text-xl mt-4">
                {content.text}
              </h1>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default HomePage;
