import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import { useDebounce } from './hooks/useDebounce';
import './App.css';

// interface SearchResult {
//   title: string;
//   description: string;
//   metadata?: string;
// }

// const mockResults: SearchResult[] = [
//   {
//     title: 'Shredding Service A',
//     description: 'Secure document shredding services for businesses and individuals.',
//     metadata: 'Location: New York, NY',
//   },
//   {
//     title: 'Shredding Service B',
//     description: 'Eco-friendly shredding with a certificate of destruction.',
//     metadata: 'Location: San Francisco, CA',
//   },
//   {
//     title: 'Document Shredding Pros',
//     description: 'Affordable and fast shredding services tailored to your needs.',
//     metadata: 'Location: Austin, TX',
//   },
// ];

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

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const debouncedQuery = useDebounce(query, 300);

  React.useEffect(() => {
    if (debouncedQuery) {
      setResults(
        mockResults.filter((item) =>
          item.title.toLowerCase().includes(debouncedQuery.toLowerCase())
        )
      );
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);

  return (
    <div className="App">
      <h1>Contract Search</h1>
      <SearchBar onSearch={setQuery} results={results} />
      <SearchResults results={results} />
    </div>
  );
};

export default App;
