import React, { useState } from 'react';
import { Form, Button, Table, Container, Modal } from 'react-bootstrap';

const Booking = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [bookings, setBookings] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentBooking, setCurrentBooking] = useState(null);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleTimeChange = (e) => {
        setTime(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newBooking = {
            name,
            date,
            time,
        };
        setBookings([...bookings, newBooking]);
        setCurrentBooking(newBooking);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setName('');
        setDate('');
        setTime('');
        setCurrentBooking(null);
    };

    const handleDelete = (index) => {
        const updatedBookings = [...bookings];
        updatedBookings.splice(index, 1);
        setBookings(updatedBookings);
    };

    const getAvailableTimes = (date) => {
        const times = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
        const bookedTimes = bookings.filter(booking => booking.date === date).map(booking => booking.time);
        return times.filter(time => !bookedTimes.includes(time));
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text" value={name} onChange={handleNameChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Date:</Form.Label>
                    <Form.Control type="date" value={date} onChange={handleDateChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Time:</Form.Label>
                <Form.Select value={time} onChange={handleTimeChange}>
                    <option value="">Select a time</option>
                    {getAvailableTimes(date).map((time, index) => (
                        <option key={index} value={time}>{time}</option>
                    ))}
                </Form.Select>
            </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
            {currentBooking && (
                <Modal style={{color: "black"}} show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Booking Confirmed</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Name: {currentBooking.name}</p>
                        <p>Date: {currentBooking.date}</p>
                        <p>Time: {currentBooking.time}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
            <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {bookings.map((booking, index) => {
                    const dateObj = new Date(booking.date);
                    const formattedDate = `${dateObj.getDate().toString().padStart(2, '0')}/${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj.getFullYear()}`;
                    return (
                        <tr key={index}>
                            <td>{booking.name}</td>
                            <td>{formattedDate}</td>
                            <td>{booking.time}</td>
                            <td>
                                <Button variant="danger" onClick={() => handleDelete(index)}>Delete</Button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
        </Container>
    );
};

export default Booking;