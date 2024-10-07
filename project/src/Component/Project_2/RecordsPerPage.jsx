import React from 'react';

const RecordsPerPage = ({ setRecordsPerPage }) => {
  return (
    <div style={styles.container}>
      <label htmlFor="records-per-page" style={styles.label}>Show:</label>
      <select
        id="records-per-page"
        onChange={(e) => setRecordsPerPage(Number(e.target.value))}
        style={styles.select}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
      </select>
      <span style={styles.label}>&nbsp;Entries</span>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  label: {
    marginRight: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  select: {
    padding: '8px',
    fontSize: '16px',
    border: '2px solid #ccc',
    borderRadius: '4px',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  selectFocus: {
    borderColor: '#009879',
  },
};

export default RecordsPerPage;
