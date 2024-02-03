import React, { useState } from 'react'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";



const ImageSlider = () => {

    const [currentImage, setCurrentImage] = useState(0);

    const images = [
        "https://images.unsplash.com/photo-1683009427666-340595e57e43?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1682686578842-00ba49b0a71a?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1705335955751-fbc0c344088a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1705404193661-73eb21f6514a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1705326701287-346fc37a2c86?q=80&w=1944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1682687981974-c5ef2111640c?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ];

  const nextImage = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length);
  };


  return (
    <div className="relative w-[80vw] h-[80vh] overflow-hidden mx-auto mt-16 rounded-xl">
    <div
      className="flex transition-transform ease-in-out duration-300 transform -translate-x-full"
      style={{ transform: `translateX(${-currentImage * 100}%)` }}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index + 1}`}
          className="w-full h-full"/>
      ))}
    </div>

    {/* Buttons */}
    <div className='w-full flex justify-between absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] px-5'>
      <button onClick={prevImage} className="bg-white bg-opacity-30 py-5 px-3 rounded-md text-2xl"><FaAngleLeft /></button>
      <button onClick={nextImage} className="bg-white bg-opacity-30 py-5 px-3 rounded-md text-2xl"><FaAngleRight /></button>
    </div>
  </div>
  )
}

export default ImageSlider
