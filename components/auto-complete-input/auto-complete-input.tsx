'use client';

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
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Type to search...',
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
    const newValue = e.target.value;
    setInputValue(newValue);

    const filtered = options.filter(option =>
      option.label.toLowerCase().includes(newValue.toLowerCase())
    );
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

  React.useEffect(() => {
    if (highlightedIndex !== -1 && optionsRef.current) {
      const highlightedElement = optionsRef.current.children[highlightedIndex] as HTMLElement;
      highlightedElement.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex]);

  return (
    <div className='relative w-full max-w-xs'>
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
                index === highlightedIndex ? 'bg-gray-600' : 'hover:bg-gray-100'
              }`}
              role='option'
              aria-selected={index === highlightedIndex}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteInput;
