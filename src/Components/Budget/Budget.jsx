import React, { useState } from 'react';
import { Container, Form, ProgressBar, Card } from 'react-bootstrap';

const Budget = () => {
    const [salary, setSalary] = useState("");
    const [expenses, setExpenses] = useState("");
    const [savingsGoal, setSavingsGoal] = useState("");

    // Calculate disposable income
    const disposableIncome = (salary ? salary : 0) - (expenses ? expenses : 0);

    // Calculate savings completion percentage
    const savingsCompletion = savingsGoal ? (disposableIncome / savingsGoal) * 100 : 0;

    return (
        <Container>
            <h2>Budgeting Component</h2>

            <Form>
                <Form.Group controlId="savingsGoal">
                    <Form.Label>Savings Goal:</Form.Label>
                    <Form.Control
                        type="number"
                        value={savingsGoal}
                        onChange={(e) => setSavingsGoal(Number(e.target.value))}
                    />
                </Form.Group>
                <Form.Group controlId="salary">
                    <Form.Label>Salary:</Form.Label>
                    <Form.Control
                        type="number"
                        value={salary}
                        onChange={(e) => setSalary(Number(e.target.value))}
                    />
                </Form.Group>

                <Form.Group controlId="expenses">
                    <Form.Label>Expenses:</Form.Label>
                    <Form.Control
                        type="number"
                        value={expenses}
                        onChange={(e) => setExpenses(Number(e.target.value))}
                    />
                </Form.Group>
            </Form>
            <br />

            <Card>
                <Card.Body>
                    <Card.Title>Disposable Income: £{disposableIncome}</Card.Title>
                    <ProgressBar now={savingsCompletion.toFixed(2)} label={`${savingsCompletion.toFixed(2)}%`} />
                    <Card.Text>Savings Completion: {savingsCompletion.toFixed(2)}%</Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Budget;