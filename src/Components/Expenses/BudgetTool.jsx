import React, { useState } from "react";
import { Table, Form, Button, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom/dist";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const BudgetTool = () => {  const [salary, setSalary] = useState(0);
  const [householdBills, setHouseholdBills] = useState(0);
  const [livingCosts, setLivingCosts] = useState(0);
  const [financeInsurance, setFinanceInsurance] = useState(0);
  const [familyFriends, setFamilyFriends] = useState(0);
  const [travel, setTravel] = useState(0);
  const [leisure, setLeisure] = useState(0);

  const calculateSurplus = () => {
    const totalExpenses =
      householdBills +
      livingCosts +
      financeInsurance +
      familyFriends +
      travel +
      leisure;
    return salary - totalExpenses;
  };
  const data = {
    labels: ['Household Bills', 'Living Costs', 'Finance and Insurance', 'Family and Friends', 'Travel', 'Leisure', 'Surplus'],
    datasets: [
      {
        data: [householdBills, livingCosts, financeInsurance, familyFriends, travel, leisure, calculateSurplus()],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#118C4F',
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
            '#118C4F',
        ]
        }
      ]
    };
  return (
    <div>
      <Row>
        <Col md={6}>
          <Card>
            <Form>
              <Form.Group controlId="salary">
                <Form.Label>Income</Form.Label>
                <Form.Control
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(parseInt(e.target.value))}
                  style={{ color: salary >= 0 ? "green" : "red", fontWeight: 'bold' }}
                  
                /> 
              </Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="householdBills">
                    <Form.Label>Household Bills</Form.Label>
                    <Form.Control
                      type="number"
                      value={householdBills}
                      onChange={(e) =>
                        setHouseholdBills(parseInt(e.target.value))
                      }
                      style={{ color: householdBills >= 0 ? "red" : "green", fontWeight: 'bold' }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="livingCosts">
                    <Form.Label>Living Costs</Form.Label>
                    <Form.Control
                      type="number"
                      value={livingCosts}
                      onChange={(e) => setLivingCosts(parseInt(e.target.value))}
                      style={{ color: livingCosts >= 0 ? "red" : "green", fontWeight: 'bold' }}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="financeInsurance">
                    <Form.Label>Finance and Insurance</Form.Label>
                    <Form.Control
                      type="number"
                      value={financeInsurance}
                      onChange={(e) =>
                        setFinanceInsurance(parseInt(e.target.value))
                      }
                      style={{ color: financeInsurance >= 0 ? "red" : "green" , fontWeight: 'bold'}}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="familyFriends">
                    <Form.Label>Family and Friends</Form.Label>
                    <Form.Control
                      type="number"
                      value={familyFriends}
                      onChange={(e) =>
                        setFamilyFriends(parseInt(e.target.value))
                      }
                      style={{ color: familyFriends >= 0 ? "red" : "green" , fontWeight: 'bold'}}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="travel">
                    <Form.Label>Travel</Form.Label>
                    <Form.Control
                      type="number"
                      value={travel}
                      onChange={(e) => setTravel(parseInt(e.target.value))}
                      style={{ color: travel >= 0 ? "red" : "green" , fontWeight: 'bold'}}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="leisure">
                    <Form.Label>Leisure</Form.Label>
                    <Form.Control
                      type="number"
                      value={leisure}
                      onChange={(e) => setLeisure(parseInt(e.target.value))}
                      style={{ color: leisure >= 0 ? "red" : "green", fontWeight: 'bold' }}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col className="text-center">
                  <Button variant="primary" onClick={calculateSurplus}>
                    Calculate Surplus
                  </Button>
                </Col>
              </Row>{" "}
            </Form>
          </Card>
          <br />
          <Card>
          <Row>
        <Col md={8}>
          <Pie data={data} />
        </Col>
      </Row>
      </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Expense Category</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Household Bills </td>
                  <td>{householdBills}</td>
                </tr>
                <tr>
                  <td>Living Costs</td>
                  <td>{livingCosts}</td>
                </tr>
                <tr>
                  <td>Finance and Insurance</td>
                  <td>{financeInsurance}</td>
                </tr>
                <tr>
                  <td>Family and Friends</td>
                  <td>{familyFriends}</td>
                </tr>
                <tr>
                  <td>Travel</td>
                  <td>{travel}</td>
                </tr>
                <tr>
                  <td>Leisure</td>
                  <td>{leisure}</td>
                </tr>
                <tr>
                  <td>Surplus</td>
                  <td>{calculateSurplus()}</td>
                </tr>
              </tbody>
            </Table>
          </Card>
          
         
         Get financial help ! Book an appoitment with one of our specialist <Link to="/Booking">Book Now</Link>
         <br />
          <Link to="/savings">Savings calculator</Link>
        </Col>
      </Row>
    </div>
  );
};

export default BudgetTool;
