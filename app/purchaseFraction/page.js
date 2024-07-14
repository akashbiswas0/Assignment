"use client"

import Navbar from '../../components/Navbar';
import Input from '../../components/PurchaseInput';
import Purchase from '../../components/Purchase';
export default function PurchaseFraction() {
    
    return(
        <div>
            <Navbar />
        <div className='mt-40 text-center'>
                <span className='text-black mt-40 text-center text-5xl tracking-normal font-semibold'>
                    Buy 1/10th Fractionalized NFT
                </span>
                <div className=' w-1/2 mx-auto mt-5 h-80 backdrop-blur-md '>
                    <Input />  
                </div>
                </div>
                </div>
    )
}