import React, { useState } from 'react';
import { Table, Form, Button, Card,
    Row,
    Col, } from 'react-bootstrap';

    
const Savings = () => {
    const [monthlySavings, setMonthlySavings] = useState(0);
    const [interestRate, setInterestRate] = useState(0);
    const [savingsData, setSavingsData] = useState([]);

    const calculateSavings = () => {
        const data = [];
        let totalSavings = 0;

        for (let i = 1; i <= 12; i++) {
            const interest = (totalSavings + monthlySavings) * (interestRate / 100);
            totalSavings += monthlySavings + interest;

            data.push({
                month: i,
                savings: totalSavings.toFixed(2),
                interest: interest.toFixed(2),
            });
        }

        setSavingsData(data);
    };

    return (
        <div>
               <Row>
        <Col md={6} className="mx-auto">

        <Card className="login-card" style={{  fontFamily: 'crimsonpro', backgroundColor: 'rgba(255, 255, 255, 0.91)' }}>
            <Form>
                <Form.Group controlId="monthlySavings">
                    <Form.Label>Monthly Savings Amount</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter monthly savings amount"
                        value={monthlySavings}
                        onChange={(e) => setMonthlySavings(parseFloat(e.target.value))}
                    />
                </Form.Group>

                <Form.Group controlId="interestRate">
                    <Form.Label>Interest Rate (%)</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter interest rate"
                        value={interestRate}
                        onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                    />
                </Form.Group>
<br/>
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
              }}  onClick={calculateSavings}>
                    Calculate
                </Button>
            </Form>
            </Card>
            </Col>
            </Row>
            <Col md={6} className="mx-auto">
<br />
            <Table striped bordered hover style={{  fontFamily: 'crimsonpro' }}>
            <thead             className="mb-4 text-center">
                    <tr>
                        <th>Month</th>
                        <th>Savings Amount</th>
                        <th>Interest</th>
                    </tr>
                </thead>
                <tbody             className="mb-4 text-center">
                    {savingsData.map((data) => (
                        <tr key={data.month}>
                            <td>{data.month}</td>
                            <td>{data.savings}</td>
                            <td>{data.interest}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </Col>
        </div>
    );
};

export default Savings;