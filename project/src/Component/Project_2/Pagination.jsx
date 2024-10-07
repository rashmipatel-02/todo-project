import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange, recordsPerPage }) => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div style={styles.container}>
            <div style={styles.info}>
                <span>
                    Showing {Math.min((currentPage - 1) * recordsPerPage + 1, totalPages * recordsPerPage)} to {Math.min(currentPage * recordsPerPage, totalPages * recordsPerPage)} of {totalPages * recordsPerPage} Entries
                </span>
            </div>
            <div style={styles.buttons}>
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{ ...styles.button, ...styles.prevNextButton, ...(currentPage === 1 ? styles.disabledButton : {}) }}
                >
                    Prev
                </button>
                {pages.map(page => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        style={{ ...styles.button, ...{ fontWeight: currentPage === page ? 'bold' : 'normal' } }}
                    >
                        {page}
                    </button>
                ))}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    style={{ ...styles.button, ...styles.prevNextButton, ...(currentPage === totalPages ? styles.disabledButton : {}) }}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '20px',
        padding: '10px',
        fontFamily: 'Arial, sans-serif',
    },
    info: {
        fontSize: '16px',
        color: '#333',
    },
    buttons: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '5px', // Space between buttons
        flexWrap: 'wrap',
    },
    button: {
        backgroundColor: '#007bff',
        color: '#fff',
        border: '1px solid #007bff',
        borderRadius: '4px',
        padding: '5px 10px',
        cursor: 'pointer',
        fontSize: '14px',
        transition: 'background-color 0.3s ease, border 0.3s ease',
    },
    prevNextButton: {
        minWidth: '60px', // Ensures Prev/Next buttons are equal width
    },
    disabledButton: {
        backgroundColor: '#cccccc',
        border: '1px solid #cccccc',
        cursor: 'not-allowed',
    },
};

export default Pagination;
