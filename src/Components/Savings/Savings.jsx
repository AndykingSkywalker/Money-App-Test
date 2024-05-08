import React, { useState } from 'react';
import { Table, Form, Button } from 'react-bootstrap';

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

                <Button variant="primary" onClick={calculateSavings}>
                    Calculate
                </Button>
            </Form>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Savings Amount</th>
                        <th>Interest</th>
                    </tr>
                </thead>
                <tbody>
                    {savingsData.map((data) => (
                        <tr key={data.month}>
                            <td>{data.month}</td>
                            <td>{data.savings}</td>
                            <td>{data.interest}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Savings;