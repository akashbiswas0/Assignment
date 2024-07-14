import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';

export default function CreateInput() {
    const { isConnected } = useAccount();
    const [connected, setConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setConnected(isConnected);
    }, [isConnected]);

    return (
        <div>
            <div className="mt-8">
                <label htmlFor="price-input" className="block mb-2 text-3xl mt-2 font-medium text-black tracking-tight">total price of batch</label>
                <input type="number" placeholder="price of batch" id="price-input" className="bg-gray-50 border border-gray-300 font-semibold text-sm rounded-lg block ml-64 p-2.5 dark:white dark:border-gray-600 dark:placeholder-gray-800 text-black w-1/3" />

                <label htmlFor="batch-input" className="block mb-2 text-3xl mt-2 font-medium text-black tracking-tight">No. of batch</label>
                <input type="number" placeholder="No. of batch" id="batch-input" className="bg-gray-50 border border-gray-300 font-semibold text-sm rounded-lg block ml-64 p-2.5 dark:white dark:border-gray-600 dark:placeholder-gray-800 text-black w-1/3" />

                {connected && (
                    <button 
        
                        disabled={isLoading}
                        className="bg-black mt-5 hover:text-black border hover:border-black text-white p-1.5 px-8 rounded-full font-semibold hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Processing...' : 'Create batch'}
                    </button>
                )}
            </div>
        </div>
    );
}