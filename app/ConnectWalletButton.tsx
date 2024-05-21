"use client"
import React from 'react'
import { createThirdwebClient } from 'thirdweb';
import {
  ThirdwebProvider,
  ConnectButton,
  darkTheme,
} from "thirdweb/react";
import {
  createWallet,
  walletConnect,
} from "thirdweb/wallets";

const client = createThirdwebClient({
  clientId: "YOUR_CLIENT_ID",
});

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  walletConnect(),
  createWallet("com.trustwallet.app"),
];
const ConnectWalletButton = () => {
  return (
    <div className='font-sans absolute text-center scale-75 md:scale-100 md:top-5 md:right-10 md:left-[80%] right-[20%] left-[20%] top-5  px-4 py-2 rounded-full text-xl transition-all duration-300 '>
      <ConnectButton
        client={client}
        wallets={wallets}
        theme={darkTheme({
          colors: {
            accentText: "#F1740F",
            accentButtonBg: "#F1740F",
            borderColor: "#BA4B00",
            separatorLine: "#A3531C",
            danger: "#e54d2e",
            success: "#5bb98c",
            primaryText: "#F1740F",
            secondaryText: "#a6a6a6",
            accentButtonText: "#fff",
            primaryButtonText: "#FFF",
            primaryButtonBg: "#F1740F",
          },
        })}
        connectModal={{ size: "wide" }}
      />
    </div>
  )
}

export default ConnectWalletButton