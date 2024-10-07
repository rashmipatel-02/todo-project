import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem, editItem } from '../Redux/Action';
import './FormDisplay.css';

export default function FormDisplay() {
    const data = useSelector((store) => store.arr);
    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;  // You can adjust this value to control how many items per page

    function handleDelete(index) {
        dispatch(deleteItem(index));
    }

    function handleEdit(index) {
        const newData = [...data];
        newData[index].title = prompt('Enter new Title', newData[index].title);
        newData[index].image = prompt('Enter new URL', newData[index].image);
        dispatch(editItem({ index, newData }));
    }

 
    const filteredData = data.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const sortedData = [...filteredData].sort((a, b) => {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    });


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(sortedData.length / itemsPerPage);

    // Pagination controls
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <div className="search-sort-container">
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                    Sort by Price ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
                </button>
            </div>
            
            <div className="form-display-container">
                {currentItems.length > 0 ? (
                    currentItems.map((product, index) => (
                        <div key={index} className="form-display-card">
                            <img src={product.image} alt={product.title} />
                            <h3>{product.title}</h3>
                            <div style={{ display: "flex" }}>
                                <p className="price">Price: {product.price}</p>
                                <p className="old-price">Old Price: {product.oldPrice}</p>
                            </div>
                            <p>{product.description}</p>
                            <button onClick={() => handleDelete(index)} className="delete-btn">Delete</button>
                            <button onClick={() => handleEdit(index)}>Edit</button>
                        </div>
                    ))
                ) : (
                    <p>No products found</p>
                )}

            </div>
        
            <div className="pagination">
                <button onClick={prevPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={nextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </>
    );
}
