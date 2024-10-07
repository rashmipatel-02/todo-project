import React from 'react';

const Search = ({ searchQuery, setSearchQuery }) => {
  return (
    <div style={styles.searchContainer}>
      <label htmlFor="search" style={styles.label}>Search:</label>
      <input
        type="text"
        id="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value.toLowerCase())} 
        placeholder="Search by name, email, or phone"
        style={styles.input}
      />
    </div>
  );
};

const styles = {
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    justifyContent: 'center',  
  },
  label: {
    marginRight: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '2px solid #ccc',
    borderRadius: '4px',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  inputFocus: {
    borderColor: '#009879',
  },
};

export default Search;
