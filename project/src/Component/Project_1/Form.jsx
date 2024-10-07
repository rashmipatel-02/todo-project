import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { myAction } from '../Redux/Action';
import './Form.css';


export default function Form() {
    const [state, setState] = useState({
        image: '',
        title: '',
        price: '',
        oldPrice: '',
        description: ''
    });

    const dispatch = useDispatch();

    function handleChange(e) {
        const { name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    const validation = () => {
        let isValid = true;

        if (!state.image || !/^https?:\/\/.+\..+/.test(state.image)) {
            alert('Invalid Image URL');
            isValid = false;
        }
        if (state.title.length < 3) {
            alert('Title must be at least 3 characters long');
            isValid = false;
        }
        if (!state.price || isNaN(state.price)) {
            alert('Price must be a number');
            isValid = false;
        }
        if (state.oldPrice && isNaN(state.oldPrice)) {
            alert('Old Price must be a number');
            isValid = false;
        }
        if (!state.description) {
            alert('Description is required');
            isValid = false;
        }
        return isValid;
    };

    function Submit(e) {
        e.preventDefault();
        if (validation()) {
            console.log(state);
            dispatch(myAction(state));
            alert('Form submission successful');
        }
    }

    return (
        <div className="form-container">
            <h1>Form</h1>
            <form onSubmit={Submit}>
                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={state.image}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={state.title}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="price"
                    placeholder="Price"
                    value={state.price}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="oldPrice"
                    placeholder="Old Price"
                    value={state.oldPrice}
                    onChange={handleChange}
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={state.description}
                    onChange={handleChange}
                />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}
