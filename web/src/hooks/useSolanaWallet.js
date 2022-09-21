import { useCallback, useEffect, useState } from "react";

export const useSolanaWallet = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    const onLoad = async () => {
      const connectedWalletAddress = await checkIfWalletIsConnected();
      setWalletAddress(connectedWalletAddress);
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  const connect = useCallback(async () => {
    const connectedWalletAddress = await connecWallet();
    setWalletAddress(connectedWalletAddress);
  }, []);

  return { walletAddress, connectWallet: connect };
};

const connecWallet = async () => {
  const { solana } = window;

  if (solana) {
    const response = await solana.connect();
    console.log("Connected with Public Key:", response.publicKey.toString());
    return response.publicKey.toString();
  }

  return null;
};

const checkIfWalletIsConnected = async () => {
  try {
    const { solana } = window;

    if (solana) {
      if (solana.isPhantom) {
        console.log("Phantom wallet found!");

        const response = await solana.connect({ onlyIfTrusted: true });
        console.log("Connected with Public Key:", response.publicKey.toString());

        return response.publicKey.toString();
      }
    } else {
      alert("Solana object not found! Get a Phantom Wallet 👻");
    }
  } catch (error) {
    console.error(error);
  }

  return null;
};
