import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Table, Modal, Card, Col} from 'react-bootstrap';
import axios from 'axios';

const TransactionsAdmin = () => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [showModal, setShowModal] = useState(false);

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

        const handleSubmit = async (e) => {
            e.preventDefault();
        
            let finalPrice = parseFloat(price);
            if (!isNaN(finalPrice)) {
                finalPrice = finalPrice.toFixed(2);
            } else {
                finalPrice = '';
            }
        
            const newTransaction = {
                name,
                category,
                price: finalPrice
            };
    
        try {
            const response = await axios.post('http://localhost:8085/transaction/add', newTransaction);
            if (response.data && response.data.id) {
                setTransactions([...transactions, response.data]);
                setShowModal(true);
                setName('');
                setCategory('');
                setPrice('');
                console.log("posted");
                console.log(response.data);
            } else {
                console.error('Invalid response data');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleClose = () => setShowModal(false);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8085/transaction/delete/${id}`);
            setTransactions(transactions.filter((transaction) => transaction.id !== id));
        } catch (error) {
            console.error('Error deleting transaction:', error);
        }
    };

    return (
        <div>
            <Container>
                <h1>Transactions Admin Page</h1>
                <Card className="login-card" style={{  fontFamily: 'crimsonpro' }}>

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
                    <br />
                    <Button style={{
                 backgroundColor: '#a87388', 
                 border: 'none',
                 color: 'white',
                 padding: '10px',
                 textAlign: 'center',
                 display: 'inline-block',
                 fontSize: '14px',
                 margin: '4px 2px',
                 borderRadius: '10px',
              }}  type="submit">Create Transaction</Button>
                </Form>
                </Card>
            </Container>
            <Modal style={{color: "black", fontFamily: 'crimsonpro'}} show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Transaction Added</Modal.Title>
                </Modal.Header>
                <Modal.Body>Transaction Added Successfully</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <br />
            <Col md={6} className="mx-auto">

            <Table striped bordered hover style={{  fontFamily: 'crimsonpro' }}>
            <thead             className="mb-4 text-center">
                    <tr >
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody  className="mb-4 text-center" >
                    {/* Map over the transactions array and render each transaction */}
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>{transaction.id}</td>
                            <td>{transaction.name}</td>
                            <td>{transaction.category}</td>
                            <td>{transaction.price}</td>
                            <td>
                            <Button style={{
                    backgroundColor: '#FF7171',
                  }} onClick={() => handleDelete(transaction.id)}>Delete</Button>
                        </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </Col>
        </div>
    );
};

export default TransactionsAdmin;