'use client';

import React, { useState } from 'react';
import FundingRates from '@/components/funding-rates';
import SearchTicker from '@/components/search-ticker/search-ticker';
import { useQuery } from '@tanstack/react-query';
import { fetchAllAssetsPrices, getFundingRateForAsset } from '@/services/api-service/api-service';
import AssetDetails from '@/components/asset-details/asset-details';

const CryptoAnalyzer: React.FC = () => {
  const [symbol, setSymbol] = useState<string>('BTCUSDT');

  const { data: allAssets } = useQuery({
    queryKey: ['fetch-all-assets'],
    queryFn: () => fetchAllAssetsPrices(),
  });
  const { data: fundingRates, isLoading } = useQuery({
    queryKey: [`get-funding-rates-${symbol}`],
    queryFn: () => getFundingRateForAsset(symbol),
  });

  return (
    <div className='w-full flex-col'>
      <div className='m-4'>
        <SearchTicker setSymbol={setSymbol} symbol={symbol} allAssets={allAssets ?? []} />
      </div>
      <div className='flex flex-col lg:flex-row'>
        <div className='lg:w-1/2 p-4'>
          <AssetDetails symbol={symbol} />
        </div>
        <div className='lg:w-1/2 p-4'>
          <FundingRates fundingRates={fundingRates ?? []} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default CryptoAnalyzer;
