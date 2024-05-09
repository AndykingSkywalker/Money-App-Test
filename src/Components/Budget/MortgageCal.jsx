import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  
    Card,
    Row,
    Col,
    Button,
    Table
  } from "react-bootstrap";
const MortgageCal = () => {
    const [mortgageBalance, setMortgageBalance] = useState(0);
    const [mortgageTerm, setMortgageTerm] = useState(0);
    const [mortgageInterest, setMortgageInterest] = useState(0);
    const [mortgagePayments, setMortgagePayments] = useState([]);

    const calculateMortgage = () => {
        const monthlyInterest = mortgageInterest / 100 / 12;
        const monthlyPayment = (mortgageBalance * monthlyInterest) / (1 - Math.pow(1 + monthlyInterest, -mortgageTerm));

        const payments = [];
        let remainingBalance = mortgageBalance; // Change const to let

        for (let i = 1; i <= 12; i++) {
            const interestPayment = remainingBalance * monthlyInterest;
            const principalPayment = monthlyPayment - interestPayment;
            remainingBalance = remainingBalance - principalPayment;

            payments.push({
                month: i,
                payment: monthlyPayment.toFixed(2),
                interest: interestPayment.toFixed(2),
                principal: principalPayment.toFixed(2),
                balance: remainingBalance.toFixed(2)
            });
        }

        setMortgagePayments(payments);
    };

    return (
        <div className="container">
                    <Row>
        <Col md={6} className="mx-auto">

        <Card className="login-card" style={{  fontFamily: 'crimsonpro', backgroundColor: 'rgba(255, 255, 255, 0.91)' }}>
            <h1>Mortgage Calculator</h1>
            <div className="form-group">
                <label htmlFor="mortgageBalance">Mortgage Balance:</label>
                <input
                    type="number"
                    className="form-control"
                    id="mortgageBalance"
                    value={mortgageBalance}
                    onChange={(e) => setMortgageBalance(parseFloat(e.target.value))}
                />
            </div>
            <div className="form-group">
                <label htmlFor="mortgageTerm">Mortgage Term (in months):</label>
                <input
                    type="number"
                    className="form-control"
                    id="mortgageTerm"
                    value={mortgageTerm}
                    onChange={(e) => setMortgageTerm(parseInt(e.target.value))}
                />
            </div>
            <div className="form-group">
                <label htmlFor="mortgageInterest">Mortgage Interest (%):</label>
                <input
                    type="number"
                    className="form-control"
                    id="mortgageInterest"
                    value={mortgageInterest}
                    onChange={(e) => setMortgageInterest(parseFloat(e.target.value))}
                />
            </div>
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
              }}  onClick={calculateMortgage}>
                Calculate
            </Button>
        </Card>
        <br/>

        </Col>
        <br/>
        
        <Table striped bordered hover style={{  fontFamily: 'crimsonpro' }}>
        <thead             className="mb-4 text-center">
                    <tr>
                        <th>Yearly</th>
                        <th>Payment</th>
                        <th>Interest</th>
                        <th>Principal</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {mortgagePayments.map((payment) => (
                        <tr key={payment.month}>
                            <td>{payment.month}</td>
                            <td>{payment.payment}</td>
                            <td>{payment.interest}</td>
                            <td>{payment.principal}</td>
                            <td>{payment.balance}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Card style={{  fontFamily: 'crimsonpro', backgroundColor: 'rgba(255, 255, 255, 0.91)' }}>
            <a href="https://www.halifax.co.uk/mortgages/mortgage-calculator.html#mortgagecalc" target="_blank" rel="noopener noreferrer">Overpayment Calculator</a>
            <br />
<b> Click <a href="https://www.experianidentityservice.co.uk/Register#_ga=2.252805002.2079425939.1715165846-1303040810.1715165846&_gac=1.186972506.1715165846.Cj0KCQjwxeyxBhC7ARIsAC7dS3-c17CFI7A7YotIkZlynxTUlAH9s_ayzTsKBX6xS2C9bzUREuDSbfYaAheuEALw_wcB">here</a> to Check   Your Credit Score for free </b>
</Card>
        </Row>
        </div>);
};

export default MortgageCal;