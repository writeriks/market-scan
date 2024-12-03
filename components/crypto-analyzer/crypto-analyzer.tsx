'use client';

import React from 'react';
import FundingRates from '@/components/funding-rates';
import SearchTicker from '@/components/search-ticker/search-ticker';

const CryptoAnalyzer: React.FC = () => {
  return (
    <div className='w-full flex-col'>
      <div className='m-2'>
        <SearchTicker />
      </div>
      <div className='flex'>
        <div className='lg:w-1/2 p-4'>Coin Details Here</div>
        <div className='lg:w-1/2 p-4'>
          <FundingRates />
        </div>
      </div>
    </div>
  );
};

export default CryptoAnalyzer;
