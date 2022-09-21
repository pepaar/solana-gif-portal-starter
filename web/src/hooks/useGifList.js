import { useEffect, useState } from "react";
import { addGif, getGifList, initializeProgramBaseAccount } from "../api/gifListApi";

export const useGifList = (walletAddress) => {
  const [gifList, setGifList] = useState([]);
  const [isInitError, setIsInitError] = useState(false);

  const fetchGifList = () => {
    getGifList()
      .then((gifList) => {
        if (gifList) {
          setGifList(gifList);
        }
      })
      .catch((_error) => {
        setIsInitError(true);
      });
  };

  const onAddNewGifLink = async (gifLink) => {
    await addGif(gifLink);
    fetchGifList();
  };

  const onInitializeAccount = async () => {
    await initializeProgramBaseAccount();
    setIsInitError(false);
    fetchGifList();
  };

  useEffect(() => {
    if (walletAddress) {
      console.log("Fetching GIF list...");

      fetchGifList();
    }
  }, [walletAddress]);

  return {
    gifList,
    shouldInitializeAccount: isInitError,
    onAddNewGifLink,
    onInitializeAccount,
  };
};
