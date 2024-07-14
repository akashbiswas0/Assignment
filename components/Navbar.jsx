"use client"
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
export default function Navbar(){
    return(
        
        <nav className="bg-white rounded-b-xl dark:bg-gray-500 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="https://rapidnode.xyz" className="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="https://yt3.googleusercontent.com/2yV8jbm5iyrmaxfipJqYacyUkhdiKEBumhMXgf-lP_YSn2tgmiHIf07XsQbMJYqTxv-76nlp=s900-c-k-c0x00ffffff-no-rj" className="h-10 rounded-full" alt="Flowbite Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">RapidNode</span>
            </a>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                   <ConnectButton />
                </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                        <ul className="flex text-xl flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-500  dark:border-gray-700">
                            
                            <Link href="/createBatch">
                            <li className="block py-2 px-3 text-gray-900 rounded md:p-0 md:dark:hover:text-black dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Create
                            </li>
                            </Link>
                            

                            <Link href="/purchaseFraction">
                            <li className="block py-2 px-3 text-gray-900 rounded md:p-0 md:dark:hover:text-black dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Purchase
                            </li>
                            </Link>
                            

                            <Link href="/mintNFT">
                            <li className="block py-2 px-3 text-gray-900 rounded md:p-0 md:dark:hover:text-black dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Mint
                            </li>
                            </Link>
                            
                        </ul>
                    </div>
                </div>
            </nav>
    )
}