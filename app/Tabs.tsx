"use client"
import React, { useState, ChangeEvent } from 'react';
import Image from 'next/image';
import Button from './Button';
import { InteractWithWLClick } from './wsinthechat.js';

const Tabs = () => {
  const [state, setState] = useState('Token Links');
  const [address, setAddress] = useState('');
  const [whitelistLevelText, setWhitelistLevelText] = useState('');

  // Function to handle input change
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  // Function to handle button click
  const handleButtonClick = async () => {
    try {
      // Call InteractWithWLClick with the address
      const levelText = await InteractWithWLClick(address);
      setWhitelistLevelText(levelText);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main className="flex bg z-10 min-h-screen flex-col items-center justify-between">
      <div className='absolute min-w-[420px] min-h-[600px] scale-[0.6] md:scale-[1.15] bg-black/60 border-4 border-[#BA4B00] rounded-2xl p-4 px-14 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' style={{ marginTop: '30px' }}>
        <div className='flex w-full items-center gap-5 justify-between'>
          <button onClick={() => setState('Token Links')} className={`flex-1 transition-all duration-300 hover:bg-[#F1740Fb7] hover:text-white  text-[#A3531C] border-[3px] text-xl font-bold border-[#BA4B00] rounded-3xl mb-5 py-2 ${state === 'Token Links' ? 'bg-[#F1740F] text-white ' : ''}`}>Token Links</button>
          <button onClick={() => setState('WL Checker')} className={`flex-1 transition-all duration-300 hover:bg-[#f1750fb7] hover:text-white  text-[#A3531C] border-[3px] text-xl font-bold border-[#BA4B00] rounded-3xl mb-5 py-2 ${state === 'WL Checker' ? 'bg-[#F1740F] text-white ' : ''}`}>WL Checker</button>
        </div>
        {state === 'Token Links' ?
          <>
            <div className='flex flex-col justify-center items-center text-center'>
              <Image src={'https://images.guns.lol/KWEJy.png'} className='w-[80px] h-[80px]' width={11111} height={11111} alt='logo'></Image>
              <p className='bg-clip-text text-transparent bg-gradient-to-r from-[#F1740F] to-[#BA4B00] text-4xl font-extrabold'>Dragon Token</p>
              <p className='text-[#A3531C] py-3 font-bold'>cryptocryptocryptocryptocryptocryptocrypto</p>
              <p className='text-[#A3531C] font-bold max-w-[310px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut corrupti ad sequi expedita nam dolorum ipsam. Numquam eveniet impedit harum ratione?</p>
            </div>
            <div className='flex py-8 pb-14 justify-center gap-3 items-center flex-col'>
              <Button sitename='Example' sitelink='https://example.com' />
              <Button sitename='Example' sitelink='https://example.com' />
              <Button sitename='Example' sitelink='https://example.com' />
              <Button sitename='Example' sitelink='https://example.com' />
              <Button sitename='Example' sitelink='https://example.com' />
            </div>
          </> :
          <div className='flex flex-col justify-center items-center text-center'>
            <div className='flex flex-col justify-center items-center text-center' style={{ marginTop: '20px' }}>
              <input
                type="text"
                placeholder="Enter address"
                value={address}
                onChange={handleInputChange}
                className="border-[#BA4B00] placeholder:text-white placeholder:font-semibold  border-[3px] px-4 py-2 rounded-full text-xl text-white outline-none focus:border-[#BA4B00] focus:ring-0 bg-[#F1740F] "
                style={{ marginBottom: '10px', width: '300px' }} // Adjusted width to 300px
              />
              <button
                className="border-[#BA4B00] text-[#BA4B00] border-[3px] px-4 py-2 rounded-full text-xl transition-all duration-300 hover:bg-[#F1740F] hover:text-white"
                onClick={handleButtonClick}
                style={{ marginTop: '20px' }}
              >
                Check Whitelist
              </button>
            </div>
            {whitelistLevelText && (
              <p className="text-xl mt-4" style={{ color: 'white' }}>
                {whitelistLevelText}
              </p>
            )}
          </div>
        }
      </div>
    </main>
  );
};

export default Tabs;
