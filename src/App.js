import twitterLogo from './assets/twitter-logo.svg';
import React, { useEffect, useState } from "react";
import './App.css';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const [walletAddress, setWalletAddress] = useState(null)
const App = () => {
  
  //Wallet State

  const checkIfWalletIsConnected = async () => {
    if(window?.solana?.isPhantom){
      console.log('Phantom wallet found.')
      const response = await window.solana.connect({ onlyIfTrusted: true });
      console.log('Connected with Public Key: ', response.publicKey.toString())

      setWalletAddress(response.publicKey.toString())
    }
    else{
      alert('Solana object not found! Please install Pahntom Wallet 👻')
    }
  }

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    }
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  },[])

  const connectWallet = async() => {};

  const renderNotConnectedContainer = () => (
    <button className='cta-button connect-wallet-button'
           onClick={connectWallet}>Connect to Wallet</button>
  );

  return (
    <div className="App">
      <div className={walletAddress? 'authed-container' : 'container'}>
        <div className="header-container">
          <p className="header">🖼 GIF Portal</p>
          <p className="sub-text">
            View your GIF collection in the metaverse ✨
          </p>
          {!walletAddress && renderNotConnectedContainer()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
