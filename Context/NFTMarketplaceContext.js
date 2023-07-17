import React, { useState, useEffect, useContext } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import Router from "next/router";
import axios from "axios";
import { create as ipfsHttpClient } from "ipfs-http-client";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

// INTERNAL IMPORT
import { NFTMarketplaceAddress, nftMarketplaceABI } from "./Constants";
// FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider) =>
	new ethers.Contract(
		NFTMarketplaceAddress,
		nftMarketplaceABI,
		signerOrProvider
	);

// --CONNECTING WITH SMART CONTRACT --
const connectingWithSmartContract = async () => {
	try {
		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();
		const contract = fetchContract(signer);
		return contract;
	} catch (error) {
		console.log("Something went wrong");
	}
};

export const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = ({ children }) => {
	const titleData = "Discover, collect, and sell NFTs";

	// const checkContract = async () => {
	// 	const contract = await connectingWithSmartContract();
	// 	console.log(contract);
	// };
	// USE STATE
	const [currentAccount, setCurrentAccount] = useState("");
	// CHECK IF WALLET IS CONNECTED
	const checkIfWalletIsConnected = async () => {
		try {
			if (!window.ethereum) return console.log("Install MetaMask");

			const accounts = await window.ethereum.request({
				method: "eth_accounts",
			});

			if (accounts.length) {
				setCurrentAccount(accounts[0]);
			} else {
				console.log("No Account Found");
			}
		} catch (error) {
			console.log("Something wrong while connecting to wallet");
		}
	};

	useEffect(() => {
		checkIfWalletIsConnected();
	}, []);
	// Connection Wallet Function
	const connectWallet = async () => {
		try {
			if (!window.ethereum) return console.log("Install MetaMask");

			const accounts = await window.ethereum.request({
				method: "eth_requestAccount",
			});

			setCurrentAccount(accounts[0]);
			window.location.reload();
		} catch (error) {
			console.log("Something wrong while connecting to wallet");
		}
	};

	// UPLOAD to ipfs function
	const uploadToIPFS = async (file) => {
		try {
			const added = await client.add({ content: file });
			const url = `https://ipfs.infura.io/ipfs/${added.path}`;
			return url;
		} catch (error) {
			console.log("Error uploading to ipfs: ", error);
		}
	};

	// CREATENFT FUNCTION
	const createNFT = async (formInput, fileUrl, router) => {
		const { name, description, price } = formInput;

		if (!name || !description || !price || !fileUrl) {
			console.log("data is missing");
		}

		const data = JSON.stringify({ name, description, price, image: fileUrl });

		try {
			const added = await client.add(data);

			const url = `https://ipfs.infura.io/ipfs/${added.path}`;

			await createSale(url, price);
		} catch (error) {
			console.log(error);
		}
	};
	// createSale FUNCTION

	const createSale = async (url, formInputPrice, isReselling, id) => {
		try {
			const price = ethers.utils.parseUnits(formInputPrice, "ether");
			const contract = await connectingWithSmartContract();

			const listingPrice = await contract.getListingPrice();

			const transaction = !isReselling
				? await contract.createToken(url, price, {
						value: listingPrice.toString(),
				  })
				: contract.reSellToken(url, price, {
						value: listingPrice.toString(),
				  });

			await transaction.wait();
		} catch (error) {
			console.log("error while creating sale");
		}
	};

	// FETCHNFTS FUNCTION

	const fetchNFTs = async () => {
		try {
			const provider = new ethers.providers.JsonRpcBatchProvider();
			const contract = fetchContract(provider);

			const data = await contract.fetchMarketItem();

			const items = await Promise.all(
				data.map(
					async ({ tokenId, seller, owner, price: unformattedPrice }) => {
						const tokenURI = await contract.tokenURI(tokenId);

						const {
							data: { image, name, description },
						} = await axios.get(tokenURI);
						const price = ethers.utils.formatUnits(
							unformattedPrice.toString(),
							"ether"
						);
						return {
							price,
							tokenId: tokenId.toNumber(),
							seller,
							owner,
							image,
							name,
							description,
							tokenURI,
						};
					}
				)
			);
			return items;
		} catch (error) {
			console.log("error while fetching NFTs");
		}
	};
	return (
		<NFTMarketplaceContext.Provider
			value={{
				connectWallet,
				uploadToIPFS,
				titleData,
			}}>
			{children}
		</NFTMarketplaceContext.Provider>
	);
};
