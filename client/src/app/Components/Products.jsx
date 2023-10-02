"use client"
import React, { useState } from "react";
import Modal from "./Modal";
import ReactConfetti from "react-confetti";

export default function Products({ productsData }) {
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const filteredProducts = productsData.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  function handleInputChange(e) {
    setQuery(e.target.value);
  }

  async function handlePurchase(product) {
    try {
      // Post purchase data to server
      const response = await fetch("https://friends-merch-server.onrender.com/purchases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        // Product details successfully sent to the server.
        setShowModal(true);
        setConfetti(true); // Show confetti when modal is displayed
        console.log("Product purchased and details sent to the server.");
      } else {
        // Handle the case where the request to the server failed.
        console.error("Failed to send product details to the server.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  return (
    <div>
      <header className="md:flex">
        <div>
          <img src="/friends.png" className="md:w-1/2 p-0" alt="Merchandise" />
          <h1 className="font-bold text-2xl">MERCHANDISE</h1>
        </div>
        <input
          className="border border-black rounded-md p-2 w-full md:w-96 h-11"
          type="text"
          onChange={handleInputChange}
          placeholder="Search Products"
        />
      </header>
      <div className="md:grid grid-cols-4 grid-rows-auto gap-4 mt-12">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="mt-2 p-4 border border-gray-300 rounded-lg hover:border-black hover:cursor-pointer hover:shadow-lg"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-auto h-3/4"
              />

              <div className="flex justify-between">
                <h3 className="text-xl font-semibold pt-2">{product.name}</h3>
                <button
                  className="p-2 bg-blue-600 my-2 text-white rounded-md hover:bg-yellow-400 hover:text-black"
                  onClick={() => handlePurchase(product)}
                >
                  Purchase
                </button>
              </div>
              <div className="flex justify-between pt-2">
                <div className="text-yellow-500">
        
                  {product.rating} &#9733;
                </div>
                <div className="text-gray-500 ml-2">
    
                  Rs.{product.price.toFixed(2)}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-red-500 text-2xl">No matching products!</p>
        )}
      </div>
      {showModal && (
        <>
          <ReactConfetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={200}
            confettiSource={{ x: window.innerWidth / 2, y: 0 }}
            recycle={false}
            run={confetti} 
          />
          <Modal setShowModal={setShowModal} />
        </>
      )}
    </div>
  );
}
