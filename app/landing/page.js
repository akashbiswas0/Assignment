"use client"
import Navbar from '../../components/Navbar';
import Create from '../createBatch/page';
export default function Landing() {
   

    return (
        <div>
            <Navbar />
            <div className='mt-40 text-center'>
                <Create />
            </div>
        </div>
    );
};
