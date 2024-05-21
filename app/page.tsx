import React from 'react';
import Tabs from './Tabs';
import Link from 'next/link';
import ConnectWalletButton from './ConnectWalletButton';

export default function Home() {
  return (
    <>
      <ConnectWalletButton />
      <Tabs />
    </>
  );
}
