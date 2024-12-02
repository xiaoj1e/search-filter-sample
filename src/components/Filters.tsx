import React from 'react';
import styles from '../styles/Filters.module.css';

interface FilterProps {
  filters: {
    suppliers: string[];
    contractSource: string[];
    location: string[];
    expirationDate: string[];
  };
  selectedFilters: {
    suppliers: string | null;
    contractSource: string | null;
    location: string | null;
    expirationDate: string | null;
  };
  onFilterChange: (filterType: string, value: string) => void;
}

const Filters: React.FC<FilterProps> = ({ filters, selectedFilters, onFilterChange }) => {
  const handleFilterChange = (filterType: string, value: string) => {
    onFilterChange(filterType, value);
  };

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filterSection}>
        <label>Suppliers</label>
        <select
          value={selectedFilters.suppliers || ''}
          onChange={(e) => handleFilterChange('suppliers', e.target.value)}
        >
          <option value="">Select Supplier</option>
          {filters.suppliers.map((supplier, index) => (
            <option key={index} value={supplier}>
              {supplier}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterSection}>
        <label>Contract Source</label>
        <select
          value={selectedFilters.contractSource || ''}
          onChange={(e) => handleFilterChange('contractSource', e.target.value)}
        >
          <option value="">Select Contract Source</option>
          {filters.contractSource.map((source, index) => (
            <option key={index} value={source}>
              {source}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterSection}>
        <label>Supplier Location</label>
        <select
          value={selectedFilters.location || ''}
          onChange={(e) => handleFilterChange('location', e.target.value)}
        >
          <option value="">Select Location</option>
          {filters.location.map((loc, index) => (
            <option key={index} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterSection}>
        <label>Expiration Date</label>
        <select
          value={selectedFilters.expirationDate || ''}
          onChange={(e) => handleFilterChange('expirationDate', e.target.value)}
        >
          <option value="">Select Expiration Date</option>
          {filters.expirationDate.map((date, index) => (
            <option key={index} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;
