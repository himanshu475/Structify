/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import styles from '../styles/SearchBar.module.css';
import { useSearch } from '../contexts/SearchContext';

// eslint-disable-next-line react-refresh/only-export-components
function SearchBar(){
    
    const {searchTerm, setSearchTerm}=useSearch();
            
    const handleSearch=(e)=>{
        e.preventDefault();

        console.log('Searching for : ', searchTerm);
    }

    return (
        <div className={styles.searchContainer}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <input
              type="text"
              placeholder="Search algorithms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </form>
        </div>
      );
}

export default SearchBar;