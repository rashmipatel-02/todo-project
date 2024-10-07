import React, { useState, useEffect } from 'react';
import './Form.css'; 

const Form = ({ onSubmit, initialData }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setEmail(initialData.email);
      setPhone(initialData.phone);
      setImage(initialData.image);
    } else {
      setName("");
      setEmail("");
      setPhone("");
      setImage("");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length < 3) {
      alert("Name should be at least 3 characters long.");
      return;
    }
    if (!email.includes("@")) {
      alert("Please enter a valid email.");
      return;
    }
    if (!/^\d+$/.test(phone)) {
      alert("Phone number should contain only digits.");
      return;
    }
    if (!image) {
      alert("Please provide an image URL.");
      return;
    }

    const user = { name, email, phone, image, status: true };
    onSubmit(user);

    setName("");
    setEmail("");
    setPhone("");
    setImage("");
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h3>{initialData ? "Edit User" : "Add User"}</h3>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
        required
      />
      <input
        type="url"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Image URL"
        required
      />
      <button type="submit">{initialData ? "Update" : "Submit"}</button>
    </form>
  );
};

export default Form;
