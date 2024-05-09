import React, { useState } from 'react';
import { Form, Button, Card, Col} from 'react-bootstrap';
import background from "../../Images/TampaBackground.png";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordValid(newPassword.length >= 8 && newPassword.length <= 12);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your login logic here
    };
  
    return (
        <div >

        <Col md={6} className="mx-auto">
            <br/>

            <Card className="login-card" style={{  fontFamily: 'crimsonpro' }}>
        <Form onSubmit={handleSubmit}>
        <h2
            className="mb-4 text-center"
          >
            Log In
          </h2>            <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={handleUsernameChange}
                />
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={handlePasswordChange}
                    // isInvalid={!passwordValid}
                />
                {/* <Form.Control.Feedback type="invalid">
                    Password must be 8-12 characters long.
                </Form.Control.Feedback> */}
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
              }} type="submit" href="/home">Log In</Button>
        </Form>
        </Card>
        </Col>
        </div>
    );
};

export default Login;