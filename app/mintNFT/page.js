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
        <div>
            <Navbar />
            <div className='mt-40 flex flex-col justify-center content-center'>
            <h2>Mint License Fractions</h2>
            <input
            className='border-2 border-black w-24 rounded-md text-center'
            type="text"
            placeholder="License ID"
            value={licenseId}
            onChange={e => setLicenseId(e.target.value)}
            />
            
            </div>
            <button className='bg-blue-300' onClick={handleMintLicenseFractions}>Mint</button>
        </div>
    )
}

