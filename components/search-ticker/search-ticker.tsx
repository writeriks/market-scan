'use client';

import React, { useState } from 'react';

import AutocompleteInput, {
  AutoCompleteInputOption,
} from '@/components/auto-complete-input/auto-complete-input';

interface SearchTickerProps {
  symbol: string;
  setSymbol: (symbol: string) => void;
}

const SearchTicker: React.FC<SearchTickerProps> = ({ setSymbol, symbol }) => {
  const frameworks: AutoCompleteInputOption[] = [
    { value: 'Next.js', label: 'Next.js' },
    { value: 'Nveltekit', label: 'SvelteKit' },
    { value: 'Nuxt.js', label: 'Nuxt.js' },
    { value: 'Remix', label: 'Remix' },
    { value: 'Astro', label: 'Astro' },
  ];

  const [selectedFramework, setSelectedFramework] = useState('');

  return (
    <div>
      <AutocompleteInput
        options={frameworks}
        value={selectedFramework}
        onChange={setSelectedFramework}
        placeholder='Type to search ticker...'
      />
      {selectedFramework && (
        <p className='mt-4'>
          You selected: {frameworks.find(f => f.value === selectedFramework)?.label}
        </p>
      )}
    </div>
  );
};

export default SearchTicker;
