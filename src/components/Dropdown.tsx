import React from 'react';
import styles from '../styles/Dropdown.module.css';

interface DropdownProps {
  items: string[];
  isVisible: boolean;
  onItemClick: (item: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ items, isVisible, onItemClick }) => {
  if (!isVisible) return null;

  return (
    <div className={styles.dropdown}>
      <ul>
        {items.map((item, index) => (
          <li
            key={index}
            className={styles.dropdownItem}
            onClick={() => onItemClick(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
