import React from 'react';
import styles from '../styles/SearchCard.module.css';

interface SearchCardProps {
  title: string;
  description: string;
  metadata?: string; // Optional metadata like location, rating, etc.
}

const SearchCard: React.FC<SearchCardProps> = ({ title, description, metadata }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      {metadata && <p className={styles.metadata}>{metadata}</p>}
    </div>
  );
};

export default SearchCard;
