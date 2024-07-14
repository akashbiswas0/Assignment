"use client"
import { ethers } from "ethers";
import { registryAbi, registryAddress } from "./contractRefs";


let provider;
let signer;
let contract;

export async function connectWallet() {
    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        contract = new ethers.Contract(registryAddress, registryAbi, signer);
        return signer.getAddress();
    } else {
        console.error("No crypto wallet found. Please install it.");
    }
}

export async function createLicense(batchTotalPrice, noOfBatches) {
    const tx = await contract.createLicense(batchTotalPrice, noOfBatches);
    await tx.wait();
    return tx;
}

export async function buyLicenseFractions(licenseId, quantity, totalValue) {
    const tx = await contract.buyLicenseFractions(licenseId, quantity, { value: totalValue });
    await tx.wait();
    return tx;
}

export async function mintLicenseFractions(licenseId) {
    const tx = await contract.mintLicenseFractions(licenseId);
    await tx.wait();
    return tx;
}
