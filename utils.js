"use client";
import { ethers, parseEther } from "ethers";
import { contractABI, contractAddress } from "./contractRefs";


let signer = null;
let provider;

async function connectWithMetamask() {
  if (typeof window.ethereum === 'undefined') {
    console.log("MetaMask not installed; using read-only defaults");
    provider = ethers.getDefaultProvider();
  } else {
    provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = await provider.getSigner();
  }
}

async function ensureSigner() {
  if (!signer) {
    await connectWithMetamask();
  }
}

connectWithMetamask();

// Function to create a license
export async function createLicense(batchTotalPrice, noOfBatches) {
    if (!batchTotalPrice || !noOfBatches) {
      console.error('Invalid input: batchTotalPrice and noOfBatches are required');
      return;
    }
    if (typeof window.ethereum === 'undefined') {
      console.error('Ethereum object not found. Do you have MetaMask installed?');
      return;
    }
    try {
      await ensureSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer)
      if (typeof contract.createLicense !== 'function') {
        throw new Error('createLicense function not found in the contract');
      }
      const transaction = await contract.createLicense(batchTotalPrice,noOfBatches);
      await transaction.wait();
      console.log('License created');
    } catch (error) {
      console.error('Error in createLicense:', error);
      throw error;
    }
  }

// Function to buy license fractions
export async function buyLicenseFractions(licenseId, quantity) {
    if (!licenseId || !quantity) throw new Error('Invalid parameters');
  
    try {
      await ensureSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const txValue = await contract.getFractionBuyPrice(licenseId, quantity);
      const transaction = await contract.buyLicenseFractions(
        licenseId, 
        quantity, 
        { value: txValue }
      );
      await transaction.wait();
      console.log('License fractions purchased');
    } catch (error) {
      console.error('Error in buyLicenseFractions:', error);
      throw error; 
    }
  }
  

// Function to mint license fractions
export async function mintLicenseFractions(licenseId) {
  if (!licenseId) return;

  if (typeof window.ethereum !== 'undefined') {
    try {
      await ensureSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const transaction = await contract.mintLicenseFractions(licenseId);
      console.log(transaction)
      await transaction.wait();
      console.log('License fractions minted');
    } catch (error) {
      console.error('Error in mintLicenseFractions:', error);
    }
  }
}

// Function to get fraction buy price
export async function getFractionBuyPrice(licenseId, quantity) {
    try {
      await ensureSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const priceWei = await contract.getFractionBuyPrice(licenseId, quantity);
      return priceWei;
    } catch (error) {
      console.error('Error fetching price:', error);
      throw error;
    }
  }






 
  
  