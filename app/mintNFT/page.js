"use client"
import React, { useState } from 'react';
import { mintLicenseFractions } from '@/utils';
import Navbar from '@/components/Navbar';
export default function Mintnft(){
    const [licenseId, setLicenseId] = useState('');

  const handleMintLicenseFractions = async () => {
    await mintLicenseFractions(licenseId);
  };
    return(
        <div className=''>
            <Navbar />
            <div className='mt-72 border-2 rounded-md shadow-black p-6 mx-96'>
            <h2 className=' text-3xl font-semibold mb-5 text-center'><u>Mint License Fractions</u></h2>
            <input
            className='border-2 border-black w-24 ml-36 rounded-md text-center py-1 justify-center text-xl '
            type="text"
            placeholder="License ID"
            value={licenseId}
            onChange={e => setLicenseId(e.target.value)}
            />
            <button className='bg-blue-500 hover:bg-blue-400 font-semibold border-2 py-1 px-8 rounded-full ml-64' onClick={handleMintLicenseFractions}>Mint</button>
            </div>
        </div>
    )
}

