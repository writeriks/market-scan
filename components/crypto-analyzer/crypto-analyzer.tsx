'use client';

import React, { useState } from 'react';
import FundingRates from '@/components/funding-rates';
import SearchTicker from '@/components/search-ticker/search-ticker';
import { useQuery } from '@tanstack/react-query';
import {
  fetchAllAssetsPrices,
  fetchPriceForAsset,
  getFundingRateForAsset,
} from '@/services/api-service/api-service';

const CryptoAnalyzer: React.FC = () => {
  const [symbol, setSymbol] = useState<string>('BTCUSDT');

  const { data: allAssets } = useQuery({
    queryKey: ['fetch-all-assets'],
    queryFn: () => fetchAllAssetsPrices(),
  });

  const { data: assetPrice } = useQuery({
    queryKey: [`get-price-for-${symbol}`],
    queryFn: () => fetchPriceForAsset(symbol),
  });

  const { data: fundingRates, isLoading } = useQuery({
    queryKey: [`get-funding-rates-${symbol}`],
    queryFn: () => getFundingRateForAsset(symbol),
  });

  /*     if (!allAssets || !assetPrice || !fundingRates) {
    return null;
  } */

  return (
    <div className='w-full flex-col'>
      <div className='m-2'>
        <SearchTicker setSymbol={setSymbol} symbol={symbol} allAssets={allAssets ?? []} />
      </div>
      <div className='flex flex-col lg:flex-row'>
        <div className='lg:w-1/2 p-4'>Coin Details Here</div>
        <div className='lg:w-1/2 p-4'>
          <FundingRates fundingRates={fundingRates ?? []} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default CryptoAnalyzer;
