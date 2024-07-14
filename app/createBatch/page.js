"use client"
import CreateInput from "@/components/createInput"
import Navbar from "@/components/Navbar"

export default function Create() {
    
    return(
        <div>
            <Navbar />
            <div className='mt-40 text-center'>
                <span className='text-black mt-40 text-center text-5xl tracking-normal font-semibold'>
                    Create Batches
                </span>
                <h1 className="text-xl font-medium font-roboto"> and Buy 1/10th Fractionalized NFT</h1>
                <div className='border-2 border-gray-700 w-1/2 mx-auto mt-2 h-80 backdrop-blur-md bg-gray-200'>
                    <CreateInput />
                </div>
            </div>
        </div>
    )
}