import "./App.css";
import { useSolanaWallet } from "./hooks/useSolanaWallet";
import { ConnectButton } from "./components/ConnectButton";
import { GifGallery } from "./components/GifGallery";
import { InitializeProgramButton } from "./components/InitializeProgramButton";
import { useGifList } from "./hooks/useGifList";

const App = () => {
  const { walletAddress, connectWallet } = useSolanaWallet();
  const { gifList, shouldInitializeAccount, onAddNewGifLink, onInitializeAccount } = useGifList(walletAddress);

  return (
    <div className="App">
      <div className={walletAddress ? "authed-container" : "container"}>
        <div className="header-container">
          <p className="header">🖼 GIF Master</p>
          <p className="sub-text">View your GIF collection in the metaverse ✨</p>
          {walletAddress ? (
            shouldInitializeAccount ? (
              <InitializeProgramButton onInitializeClick={onInitializeAccount} />
            ) : (
              <GifGallery gifList={gifList} onNewGifAdded={onAddNewGifLink} />
            )
          ) : (
            <ConnectButton onConnectClick={connectWallet} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
