import "./App.css";
import { useEffect, useState } from "react";
import { useSolanaWallet } from "./hooks/useSolanaWallet";
import { ConnectButton } from "./components/ConnectButton";
import { GifGallery } from "./components/GifGallery";

const TEST_GIFS = [
  "https://media.giphy.com/media/3o7TKpzsXWPTApaBCU/giphy.gif",
  "https://media.giphy.com/media/3o7TKWahTGim2UIQQU/giphy.gif",
  "https://media.giphy.com/media/xEromGTgh6rcc/giphy.gif",
];

const App = () => {
  const [gifList, setGifList] = useState([]);
  const { walletAddress, connectWallet } = useSolanaWallet();

  const onNewGifAdded = async (gifLink) => {
    setGifList([gifLink, ...gifList]);
  };

  useEffect(() => {
    if (walletAddress) {
      console.log("Fetching GIF list...");

      // Call Solana program here.

      // Set state
      setGifList(TEST_GIFS);
    }
  }, [walletAddress]);

  return (
    <div className="App">
      <div className={walletAddress ? "authed-container" : "container"}>
        <div className="header-container">
          <p className="header">🖼 GIF Master</p>
          <p className="sub-text">View your GIF collection in the metaverse ✨</p>
          {walletAddress ? (
            <GifGallery gifList={gifList} onNewGifAdded={onNewGifAdded} />
          ) : (
            <ConnectButton onConnectClick={connectWallet} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
