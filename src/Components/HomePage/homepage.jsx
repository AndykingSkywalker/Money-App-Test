import React, { useEffect, useState } from 'react';
import { Container, Card, ListGroup } from 'react-bootstrap';
import axios from 'axios';

const HomePage = () => {
    const [randomItem, setRandomItem] = useState(null);
    const [expanded, setExpanded] = useState(false);
    const [transactions, setTransactions] = useState([]);
    useEffect(() => {
        const fetchRandomItem = async () => {
            const response = await axios.get('https://fakestoreapi.com/products');
            const products = response.data;
            const randomProduct = products[Math.floor(Math.random() * products.length)];
            setRandomItem(randomProduct);
        };

        fetchRandomItem();
    }, []);

    useEffect(() => {
        const GetTransactions = async () => {
            try {
                const response = await axios.get('http://localhost:8085/transaction/get');
                setTransactions(response.data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        
        };
        GetTransactions();}, []);

    const price = Math.floor(Math.random() * 100) + 1;

    return (
        <div>
            <br />
            <Container className="balance-container" style={{ width: '50%' }}>
                <Card>
                    <Card.Body>
                        <Card.Title>Account Balance</Card.Title>
                        {/* Add your account balance component here */}
                    </Card.Body>
                </Card>
            </Container>
            <br />
            <Container className="home-page d-flex justify-content-center text-center " style={{ maxHeight: "1000px", maxWidth: "1000px" }}>
                <br />
                {randomItem && (
                    <Card className="tile-container" style={{ width: '50%' }}>
                        <Card.Body>
                            <Card.Title onClick={() => setExpanded(!expanded)}>Item of the day</Card.Title>
                            {expanded && (
                                <>
                                    <Card.Subtitle className="mb-2 text-muted">{randomItem.title}</Card.Subtitle>
                                    <Card.Img
                                        variant="top"
                                        src={randomItem.image}
                                        alt={randomItem.title}
                                        style={{ maxHeight: "300px", maxWidth: "300px" }}
                                    />
                                    <Card.Text>{randomItem.description}</Card.Text>
                                    <Card.Text>Price: £{price}</Card.Text>
                                </>
                            )}
                        </Card.Body>
                    </Card>
                )}
<Container className="transaction-container" style={{ width: '100%' }}>
    <Card>
        <Card.Body>
            <Card.Title>Transactions</Card.Title>
            <ListGroup variant="flush">
                {transactions.map((transaction, index) => (
                    <ListGroup.Item key={index}>
                        Transaction {index + 1}: Name: {transaction.name}, Category: {transaction.category}, Price: £{transaction.price}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Card.Body>
    </Card>
</Container>
</Container>
        </div>
    );
};

export default HomePage;