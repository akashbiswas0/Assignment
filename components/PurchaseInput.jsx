import React, { useState } from 'react';
import { buyLicenseFractions, getFractionBuyPrice } from '@/utils'; // Adjust the import path as needed

export default function Input() {
  const [licenseId, setLicenseId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleBuyLicenseFractions = async () => {
    try {
      setIsLoading(true);
      await buyLicenseFractions(parseInt(licenseId), parseInt(quantity));
      alert('License fractions purchased successfully!');
      setLicenseId('');
      setQuantity('');
    } catch (error) {
      console.error('Error purchasing license fractions:', error);
      // Handle error state or display error message to the user
      console.log('Error purchasing license fractions.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetPrice = async () => {
    try {
      const priceWei = await getFractionBuyPrice(parseInt(licenseId), parseInt(quantity));
      if (priceWei) {
        setPrice(priceWei.toString());
      } else {
        console.error('Price not available');
        alert('Price not available. Please try again later.');
      }
    } catch (error) {
      console.error('Error fetching price:', error);
      alert('Error fetching price. Please check console for details.');
    }
  };
  return (
    
    <div className="max-w-md mx-auto mt-10 p-6 border-1 border-black bg-white rounded-lg shadow-xl">
    <h2 className="text-2xl font-bold mb-4 text-black tracking-wider">Purchase License Fractions</h2>
    <div className="mb-4">
      <label htmlFor="licenseId" className="block mb-2 text-sm font-medium text-black">
        License ID
      </label>
      <input
        type="number"
        id="licenseId"
        value={licenseId}
        onChange={(e) => setLicenseId(e.target.value)}
        placeholder="Enter License ID"
        className="w-full p-2.5 bg-gray-50 border border-gray-300 text-black text-sm rounded-lg"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-black">
        Quantity
      </label>
      <input
        type="number"
        id="quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Enter Quantity"
        className="w-full p-2.5 bg-gray-50 border border-gray-300 text-black text-sm rounded-lg"
      />
    </div>
    <div className="flex justify-between mb-4">
      <button 
        className="bg-black text-white p-2 px-4 rounded-full disabled:opacity-50"
        onClick={handleBuyLicenseFractions}
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : 'Purchase NFT'}
      </button>
      <button 
        className="bg-gray-200 text-black p-2 px-4 rounded-full disabled:opacity-50"
        onClick={handleGetPrice}
        disabled={isLoading}
      >
        {isLoading ? 'Fetching...' : 'Get Price'}
      </button>
      
    </div>
    {price && <p className='text-lg font-semibold'>Price: {price} wei</p>}
  </div>
  );
}

