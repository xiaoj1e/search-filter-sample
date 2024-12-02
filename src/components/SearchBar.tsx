import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/SearchBar.module.css';
import Dropdown from './Dropdown';
import Filters from './Filters';
const mockResults = [
    {
      id: 1,
      title: 'Contract 1',
      supplier: 'Supplier A',
      contractSource: 'Source 1',
      location: 'Location 1',
      expirationDate: 'This Month',
    },
    {
      id: 2,
      title: 'Contract 2',
      supplier: 'Supplier B',
      contractSource: 'Source 2',
      location: 'Location 2',
      expirationDate: 'Next Month',
    },
    {
      id: 3,
      title: 'Contract 3',
      supplier: 'Supplier A',
      contractSource: 'Source 3',
      location: 'Location 3',
      expirationDate: '3 Months',
    },
    {
      id: 4,
      title: 'Contract 4',
      supplier: 'Supplier C',
      contractSource: 'Source 2',
      location: 'Location 1',
      expirationDate: 'This Month',
    },
  ];
  
interface SearchBarProps {
  onSearch: (query: string, filters: any) => void,
  results: any[]
}

const mockDropdownItems = [
  'Recent Search 1',
  'Recent Search 2',
  'Category 1',
  'Category 2',
];

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, results }) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    suppliers: null,
    contractSource: null,
    location: null,
    expirationDate: null,
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownItems, setDropdownItems] = useState<string[]>(mockDropdownItems);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setInputValue(query);
    setShowDropdown(!!query); // Show dropdown if there's input
    updateDropdownItems(query);
    onSearch(query, selectedFilters);
  };
  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setShowDropdown(false);
    }
  };

  const updateDropdownItems = (query: string) => {
    const mockSuggestions = ['Result 1', 'Result 2', 'Result 3', 'Result 4'];
    if (!query) {
      setDropdownItems([]);
      return;
    }
    const filteredItems = mockSuggestions.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setDropdownItems(filteredItems);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchClick = () => {
    onSearch(inputValue, selectedFilters);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleDropdownItemClick = (item: string) => {
    setInputValue(item);
    setShowDropdown(false);
    onSearch(item, selectedFilters);
  };

  const handleFilterChange = (filterType: string, value: string) => {
    const updatedFilters = { ...selectedFilters, [filterType]: value };
    setSelectedFilters(updatedFilters);
    onSearch(inputValue, updatedFilters);
  };

  const filters = {
    suppliers: ['Supplier A', 'Supplier B', 'Supplier C'],
    contractSource: ['Source 1', 'Source 2', 'Source 3'],
    location: ['Location 1', 'Location 2', 'Location 3'],
    expirationDate: ['This Month', 'Next Month', '3 Months'],
  };

  const applyFilters = (results: any[]) => {
    return results.filter((result) => {
      const { suppliers, contractSource, location, expirationDate } = selectedFilters;

      const supplierMatch = suppliers ? result.supplier === suppliers : true;
      const contractSourceMatch = contractSource ? result.contractSource === contractSource : true;
      const locationMatch = location ? result.location === location : true;
      const expirationDateMatch = expirationDate ? result.expirationDate === expirationDate : true;

      return supplierMatch && contractSourceMatch && locationMatch && expirationDateMatch;
    });
  };

  const filteredResults = applyFilters(results.length > 0 ? results : mockResults);

  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search for contracts..."
          className={styles.input}
          value={inputValue}
          onChange={handleInputChange}
          // onFocus={handleFocus}
          onFocus={() => setShowDropdown(true)}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
  
        />
        <button
          className={styles.searchButton}
          onClick={handleSearchClick}
          aria-label="Search"
        >
          🔍
        </button>
      </div>
      <div ref={dropdownRef}>
        <Dropdown
          items={dropdownItems}
          isVisible={showDropdown}
          onItemClick={handleDropdownItemClick}
        />
      </div>

      <Filters
        filters={filters}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
      />
      
      <div className={styles.resultsContainer}>
        {filteredResults.length > 0 ? (
          filteredResults.map((result) => (
            <div key={result.id} className={styles.resultCard}>
              <h3>{result.title}</h3>
              <p>Supplier: {result.supplier}</p>
              <p>Contract Source: {result.contractSource}</p>
              <p>Location: {result.location}</p>
              <p>Expiration Date: {result.expirationDate}</p>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
