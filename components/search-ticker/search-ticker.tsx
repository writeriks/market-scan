'use client';

import React, { useMemo } from 'react';

import AutocompleteInput from '@/components/auto-complete-input/auto-complete-input';
import { MexcAssetInfo } from '@/types/asset-type';

interface SearchTickerProps {
  symbol: string;
  setSymbol: (symbol: string) => void;
  allAssets: MexcAssetInfo[];
}

const SearchTicker: React.FC<SearchTickerProps> = ({ setSymbol, symbol, allAssets }) => {
  const options = useMemo(() => {
    return allAssets.map(asset => ({
      value: asset.symbol,
      label: asset.symbol,
    }));
  }, [allAssets]);

  return (
    <div>
      <AutocompleteInput
        options={options}
        value={symbol}
        onChange={setSymbol}
        placeholder='Type to search ticker...'
      />
      {symbol && (
        <p className='mt-4'>You selected: {allAssets.find(f => f.symbol === symbol)?.symbol}</p>
      )}
    </div>
  );
};

export default SearchTicker;
