import React from 'react';
import SearchCard from './SearchCard';
//import styles from '../styles/SearchResults.module.css';
import '../styles/SearchResults.css';

interface SearchResult {
  title: string;
  description: string;
  metadata?: string;
}

interface SearchResultsProps {
  results: SearchResult[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <div className="resultsContainer">
      {/* {results.length ? (
        results.map((result, index) => (
          <SearchCard
            key={index}
            title={result.title}
            description={result.description}
            metadata={result.metadata}
          />
        ))
      ) : (
        <p className="noResults">No results found.</p>
      )} */}
    </div>
  );
};

export default SearchResults;
