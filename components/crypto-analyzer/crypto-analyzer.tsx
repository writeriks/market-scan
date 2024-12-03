'use client';

import React from 'react';
import FundingRates from '@/components/funding-rates';
import SearchTicker from '@/components/search-ticker/search-ticker';
import { useQuery } from '@tanstack/react-query';
import { fetchAllAssetsPrices, fetchPriceForAsset } from '@/services/api-service/api-service';

const CryptoAnalyzer: React.FC = () => {
  const { data } = useQuery({
    queryKey: ['fetch-all-assets'],
    queryFn: () => fetchAllAssetsPrices(),
  });

  console.log('🚀 ~ data:', data);

  const { data: assetPrice } = useQuery({
    queryKey: [`get-price-for-BTC`],
    queryFn: () => fetchPriceForAsset('BTC'),
  });
  console.log('🚀 ~ assetPrice:', assetPrice);

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
