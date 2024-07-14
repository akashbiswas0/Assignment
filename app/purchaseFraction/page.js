"use client"
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import Navbar from '../../components/Navbar';
import Input from '../../components/Input';
import Purchase from '../../components/Purchase';
export default function PurchaseFraction() {
    const { isConnected } = useAccount();
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        setConnected(isConnected);
    }, [isConnected]);
    return(
        <div>
            <Navbar />
        <div className='mt-40 text-center'>
                <span className='text-black mt-40 text-center text-5xl tracking-normal font-semibold'>
                    Buy 1/10th Fractionalized NFT
                </span>
                <div className='border-2 border-gray-700 w-1/2 mx-auto mt-5 h-80 backdrop-blur-md bg-gray-200'>
                    <Input />
                    {connected && <Purchase />}
                </div>
                </div>
                </div>
    )
}