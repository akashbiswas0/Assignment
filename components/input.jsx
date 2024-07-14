
export default function Input() {
    return(
        <div>
            <div className="mb-6">
                <label for="default-input" class="block mb-2 text-3xl mt-8 font-medium text-black tracking-wider">License ID</label>
                <input type="number" placeholder="License ID" id="default-input" className="bg-gray-50 border border-gray-300 font-semibold text-sm rounded-lg block ml-64 p-2.5 dark:white dark:border-gray-600 dark:placeholder-gray-800 text-black w-1/3" />
                
                <label for="default-input" class="block mb-2 text-3xl mt-8 font-medium text-black tracking-wider">Quantity</label>
                <input type="number" placeholder="Quantity of Fractionalized NFT" id="default-input" className="bg-gray-50 border border-gray-300 font-semibold text-sm rounded-lg block ml-64 p-2.5 dark:white dark:border-gray-600 dark:placeholder-gray-800 text-black w-1/3" />
            </div>
        </div>
    );
};