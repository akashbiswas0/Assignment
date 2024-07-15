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
            <div className='mt-72 border mx-96'>
            <h2 className=' text-2xl font-semibold mb-5  text-center'>Mint License Fractions</h2>
            <input
            className='border-2 border-black w-24 ml-64 rounded-md text-center py-1 justify-center text-xl '
            type="text"
            placeholder="License ID"
            value={licenseId}
            onChange={e => setLicenseId(e.target.value)}
            />
            <button className='bg-blue-300 py-1 px-8 rounded-full ml-96' onClick={handleMintLicenseFractions}>Mint</button>
            </div>
        </div>
    )
}

