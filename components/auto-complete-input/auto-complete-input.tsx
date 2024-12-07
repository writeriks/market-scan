'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';

export interface AutoCompleteInputOption {
  value: string;
  label: string;
}

interface AutocompleteInputProps {
  options: AutoCompleteInputOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Type to search...',
  className,
}) => {
  const [inputValue, setInputValue] = React.useState(value);
  const [filteredOptions, setFilteredOptions] = React.useState<AutoCompleteInputOption[]>([]);
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const optionsRef = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = e.target.value.toLowerCase();
    setInputValue(newValue);

    const filtered = options.filter(option => {
      const labelLowerCase = option.label.toLowerCase();
      return (
        labelLowerCase.startsWith(newValue) && // Matches starting with the entered text
        labelLowerCase.includes(newValue) // Matches containing the entered text
      );
    });
    setFilteredOptions(newValue === '' ? [] : filtered);
    setHighlightedIndex(-1);
  };

  const handleOptionClick = (option: AutoCompleteInputOption): void => {
    onChange(option.value);
    setInputValue(option.label);
    setFilteredOptions([]);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (filteredOptions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => (prev < filteredOptions.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => (prev > 0 ? prev - 1 : filteredOptions.length - 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex !== -1) {
          handleOptionClick(filteredOptions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setFilteredOptions([]);
        setHighlightedIndex(-1);
        break;
    }
  };

  const handleClear = (): void => {
    setInputValue('');
    setFilteredOptions([]);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  };

  React.useEffect(() => {
    if (highlightedIndex !== -1 && optionsRef.current) {
      const highlightedElement = optionsRef.current.children[highlightedIndex] as HTMLElement;
      highlightedElement.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex]);

  const renderHighlightedText = (label: string, query: string): React.ReactElement | string => {
    const index = label.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return label;

    const beforeMatch = label.slice(0, index);
    const match = label.slice(index, index + query.length);
    const afterMatch = label.slice(index + query.length);

    return (
      <>
        {beforeMatch}
        <span className='font-bold'>{match}</span>
        {afterMatch}
      </>
    );
  };

  return (
    <div className={cn('relative ', className)}>
      {/* eslint-disable-next-line jsx-a11y/role-supports-aria-props */}
      <input
        ref={inputRef}
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none'
        aria-autocomplete='list'
        aria-controls='autocomplete-options'
        aria-expanded={filteredOptions.length > 0}
      />
      {inputValue && (
        <button
          type='button'
          onClick={handleClear}
          className='absolute inset-y-0 right-6 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none'
        >
          ✕
        </button>
      )}

      {filteredOptions.length > 0 && (
        <ul
          id='autocomplete-options'
          ref={optionsRef}
          className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-background shadow-lg'
          role='listbox'
        >
          {filteredOptions.map((option, index) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option)}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={`cursor-pointer px-3 py-2 text-sm ${
                index === highlightedIndex ? 'bg-secondary/80' : 'hover:bg-secondary/80'
              }`}
              role='option'
              aria-selected={index === highlightedIndex}
            >
              {renderHighlightedText(option.label, inputValue)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteInput;
