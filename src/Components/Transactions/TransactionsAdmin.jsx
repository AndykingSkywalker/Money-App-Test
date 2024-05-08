import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const TransactionsAdmin = () => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8085/transactions', {
                name,
                category,
                price
            });
            console.log(response.data); // handle the response as needed
        } catch (error) {
            console.error(error);
        }
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };
    const transactions = [
        { id: 1, name: 'Transaction 1', category: 'Category 1', price: 10 },
        { id: 2, name: 'Transaction 2', category: 'Category 2', price: 20 },
        { id: 3, name: 'Transaction 3', category: 'Category 3', price: 30 },
    ];

    return (
        <div>
        <Container>
            <h1>Transactions Admin Page</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName"></Form.Group>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text" value={name} onChange={handleNameChange} />
                <Form.Group controlId="formCategory">
                    <Form.Label>Category:</Form.Label>
                    <Form.Control type="text" value={category} onChange={handleCategoryChange} />
                </Form.Group>
                <Form.Group controlId="formPrice">
                    <Form.Label>Price:</Form.Label>
                    <Form.Control type="text" value={price} onChange={handlePriceChange} />
                </Form.Group>
                <Button variant="primary" type="submit">Create Transaction</Button>
            </Form>
        </Container>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {/* Map over the transactions array and render each transaction */}
                {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                        <td>{transaction.id}</td>
                        <td>{transaction.name}</td>
                        <td>{transaction.category}</td>
                        <td>{transaction.price}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
};

export default TransactionsAdmin;